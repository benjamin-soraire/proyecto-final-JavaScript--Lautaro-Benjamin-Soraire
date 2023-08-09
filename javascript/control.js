const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");

function cargarProducto(){

    contenedorProductos.innerHTML = "";

    muebles.forEach(muebles => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${muebles.imagen}" alt=" ${muebles.titulo} ">
                    <div class="producto-detalle">
                        <h3 class="producto-titulo"> ${muebles.titulo} </h3>
                        <p class="producto-precio">${muebles.precio} </p>
                        <button class="producto-agregar" id="${muebles.id}">agregar</button>
                    </div>
        `;
        contenedorProductos.append(div);
    })
}

cargarProducto(muebles);

botonesCategoria.forEach(boton => (
    boton.addEventListener("click", (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const mueblesBoton  = muebles.filter(muebles => muebles.categotia.id === e.currentTarget.id)
        cargarProducto(mueblesBoton)

    })

))