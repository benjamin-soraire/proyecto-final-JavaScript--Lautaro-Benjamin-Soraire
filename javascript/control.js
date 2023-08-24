let muebles = [];
fetch("./javascript/items.json")
    .then(Response => Response.json())
    .then(data => {
        muebles = data;
        cargarProducto(muebles);
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProducto(mueblesElegidos) {


    contenedorProductos.innerHTML = "";

    mueblesElegidos.forEach(muebles => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${muebles.imagen}" alt=" ${muebles.titulo} ">
                    <div class="producto-detalle">
                        <h3 class="producto-titulo"> ${muebles.titulo} </h3>
                        <p class="producto-precio">$${muebles.precio} </p>
                        <button class="producto-agregar" id="${muebles.id}">agregar</button>
                    </div>
        `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}



botonesCategoria.forEach(boton => {

    boton.addEventListener("click", (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {

            const productosCategoria = muebles.find(muebles => muebles.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productosCategoria.categoria.nombre;

            const productosBoton = muebles.filter(muebles => muebles.categoria.id === e.currentTarget.id);
            cargarProducto(productosBoton)

        } else {
            tituloPrincipal.innerText = "todos los productos";
            cargarProducto(muebles);
        }
    })


});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    Toastify({
        text: "Agregado al carrito!",
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
    const productoAgregado = muebles.find(muebles => muebles.id === idBoton);
    if (productosEnCarrito.some(muebles => muebles.id === idBoton)) {
        const index = productosEnCarrito.findIndex(muebles => muebles.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    

    localStorage.setItem("productos-en-carrito", JSON. stringify(productosEnCarrito))
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, muebles)=> acc + muebles.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}



