const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")); 
console.log(productosEnCarrito);
const ContenedorCarritoVacio = document.querySelector("carrito-vacio");
const ContenedorCarritoProductos = document.querySelector("carrito-productos");
const ContenedorCarritoAcciones = document.querySelector("carrito-acciones");
const ContenedorCarritoComprado = document.querySelector("carrito-comprado");

if(productosEnCarrito){
        ContenedorCarritoVacio.classList.remove("disabled");
        ContenedorCarritoProductos.classList.remove("disabled");
        ContenedorCarritoAcciones.classList.remove("disabled");
        ContenedorCarritoComprado.classList.remove("disabled");
}else{

};