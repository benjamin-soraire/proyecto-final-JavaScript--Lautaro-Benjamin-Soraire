let productosEnCarrito = localStorage.getItem("productos-en-carrito");
    productosEnCarrito = JSON.parse(productosEnCarrito);
const ContenedorCarritoVacio = document.querySelector("#carrito-vacio");
const ContenedorCarritoProductos = document.querySelector("#carrito-productos");
const ContenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const ContenedorCarritoComprado = document.querySelector("#carrito-comprado");
let BotonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar" );


function CargarProductosCarrito(){
        if (productosEnCarrito && productosEnCarrito.length > 0) {

        ContenedorCarritoVacio.classList.add("disabled");
        ContenedorCarritoProductos.classList.remove("disabled");
        ContenedorCarritoAcciones.classList.remove("disabled");
        ContenedorCarritoComprado.classList.add("disabled");

        ContenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(muebles => {

        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
        <img class= "carrito-producto-img" src="${muebles.imagen}" alt="${muebles.titulo}">
        <div class="carrito-producto-titulo">
            <small></small>
            <h3>${muebles.titulo}</h3>
        </div>
        <div class="carrito-producto-cantidad">
            <small>cantidad</small>
            <p>${muebles.cantidad}</p>
        </div>
            <div class="carrito-producto-precio">
                <small>precio</small>
                <p>$${muebles.precio} </p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>subtotal</small>
                <p>$${muebles.precio * muebles.cantidad} </p>
            </div>
            <button class="carrito-producto-eliminar" id="${muebles.id}"><i class="bi bi-trash3"></i></button>`
            ContenedorCarritoProductos.append(div);
        });
        

} else {

        ContenedorCarritoVacio.classList.remove("disabled");
        ContenedorCarritoProductos.classList.add("disabled");
        ContenedorCarritoAcciones.classList.add("disabled");
        ContenedorCarritoComprado.classList.add("disabled");
}
    actualizarBotonesEliminar();
    actualizarTotal();

}

CargarProductosCarrito();

function actualizarBotonesEliminar() {
    BotonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    
    BotonesEliminar.forEach(boton => {
        boton.addEventListener ("click", EliminarDelCarrito);
    });
    }

    function EliminarDelCarrito(e){

        Toastify({
            text: "Producto eliminado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#b5b479",
            },
            onClick: function(){} // Callback after click
          }).showToast();

        const idBoton = e.currentTarget.id;
        const index = productosEnCarrito.findIndex(muebles => muebles.id === idBoton);

        productosEnCarrito.splice(index, 1);
        CargarProductosCarrito();

        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }

    botonVaciar.addEventListener("click", vaciarCarrito);
    function vaciarCarrito () {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Estas Seguro?',
            text: `se eliminaran ${productosEnCarrito.reduce((acc, muebles)=>acc + muebles.cantidad, 0)} productos en el carrito!!`,
            icon: 'Atento',
            showCancelButton: true,
            confirmButtonText: 'Si, estoy seguro!',
            cancelButtonText: 'No quiero!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        CargarProductosCarrito();
              swalWithBootstrapButtons.fire(
                'confirmado!',
                'Eliminada la compra',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'Sigue vigente tu compra',
                'error'
              )
            }
          })



    }

    function actualizarTotal(){
        const totalCalculado = productosEnCarrito.reduce((acc, muebles) => acc + (muebles.precio * muebles.cantidad), 0);
        total.innerText = `$${totalCalculado}`;

    }


    botonComprar.addEventListener("click", comprarCarrito);
    function comprarCarrito () {

      Swal.fire({
        position: 'top',
        icon: 'Muchas Gracias!',
        title: 'Compra Confirmada',
        showConfirmButton: false,
        timer: 1500
      })

        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        CargarProductosCarrito();

        ContenedorCarritoVacio.classList.add("disabled");
        ContenedorCarritoProductos.classList.add("disabled");
        ContenedorCarritoAcciones.classList.add("disabled");
        ContenedorCarritoComprado.classList.remove("disabled");

    }