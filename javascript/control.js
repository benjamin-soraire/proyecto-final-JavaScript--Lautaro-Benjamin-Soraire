console.table(muebles)

function filtrarPorPrecio(precioMax){
    const filtrados = muebles.filter((muebles) =>  muebles.precio <= precioMax);
    //console.log(filtrados)//
    return filtrados
}	

let precioMueble = parseFloat(prompt("ingresar precio maximo (0-salir)"))
while(precioMueble != 0){
    if(isNaN(precioMueble) || precioMueble < 0){
        alert("ingresa un valor valido");
    }
    else{
        const mueblesFiltrados = filtrarPorPrecio(precioMueble);
    console.table(mueblesFiltrados);
    }
    precioMueble = parseFloat(prompt("ingresar precio maximo (0-salir)"));
}
