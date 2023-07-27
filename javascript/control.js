let TotalDeCompra = 0;
let mueble = prompt('1-Sofá cama... $15000\n2-Mesa de roble tallada... $75000\n3-Escritorio de madera pulida... $60000\n4-asiento estilo Otomanas... $32000\npulse 0 para salir');

while (mueble != "0"){
    switch(mueble){
        case '1':
            alert('agregaste Sofá cama a tu canasta $15000');
            sumarTotalDeCompra(15000);
            break;
        case '2':
            alert('agregaste Mesa de roble tallada $75000');
            sumarTotalDeCompra(75000);
            break;
        case '3':
            alert('agregaste Escritorio de madera pulida $60000');
            sumarTotalDeCompra(60000);
            break;
        case '4':
            alert('agregaste asiento estilo Otomanas $32000');
            sumarTotalDeCompra(32000);
            break;
        default:
            alert("codigo incorrecto o no disponible");
            break;
    }
    mueble = prompt('1-Sofá cama... $15000\n2-Mesa de roble tallada... $75000\n3-Escritorio de madera pulida... $60000\n4-asiento estilo Otomanas... $32000\npulse 0 para salir');
}

alert("el valor de tu canasta es $" +TotalDeCompra);

function sumarTotalDeCompra(_precioMueble){
    TotalDeCompra = TotalDeCompra + _precioMueble;
    console.log("subtotal de tu compra $"+TotalDeCompra)
}