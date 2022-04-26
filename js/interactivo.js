function elegirProducto() {
    let msg = "Escriba una opcion: \n-Zapatillas \n-Remeras \n-Salir";
    let producto = prompt(msg);
    while (producto.toLowerCase() !== "zapatillas" && producto.toLowerCase() !== "remeras" && producto.toLowerCase() !== "salir") {
        producto = prompt("Ingrese una opcion válida\n"+ msg);
    }
    return producto;
}
function validarNumeros(numero, producto){
    let msg = "\nIngrese el numero del producto:  ";

    while (numero != 1 && numero != 2 && numero != 3 && numero != 4){
        alert("Ingrese una opcion válida");

        if(producto == "remera"){
            numero = prompt("REMERAS\n 1) Negra --- $500 \n 2) Gris -- $800\n 3) Blanca -- $600\n 4) Elegir otro producto"+msg);
        }
        else{
            numero = prompt("ZAPATILLAS\n 1) Air Force 1 Blancas --- $18000 \n 2) Jordan -- $25000\n 3) Adidas Superstar -- $12000\n 4) Elegir otro producto"+msg);
        }
    }
    return numero;
}
function seleccionarRemeras(producto){
    let precio;
    let remeras = prompt("REMERAS\n 1) Negra --- $500 \n 2) Gris -- $800\n 3) Blanca -- $600\n 4) Elegir otro producto \nIngrese el numero del producto:  ");
    remeras = validarNumeros(remeras,"remera");
    switch (remeras) {
        case "1":
            precio = 500;
            break;
        case "2":
            precio = 800;
            break;
        case "3":
            precio = 600;
            break;
        case "4":
            precio = -1;
    }
    return precio;
}

function seleccionarZapatillas(producto) {
    let precio;
    let zapas = prompt("ZAPATILLAS\n 1) Air Force 1 Blancas --- $18000 \n 2) Jordan -- $25000\n 3) Adidas Superstar -- $12000\n 4) Elegir otro producto\nIngrese el numero del producto:  ");
    zapas = validarNumeros(zapas,"zapatilla");
    switch (zapas) {
        case "1":
            precio = 18000;
            break;
        case "2":
            precio = 25000;
            break;
        case "3":
            precio = 12000;
            break;
        case "4":
            precio = -1;
    }
    return precio;
}
function correrRemeras(producto,total){
    precio = seleccionarRemeras(producto);
    while (precio != -1) {
        total = suma(total,precio);
        alert("Carrito: "+total);
        precio = seleccionarRemeras(producto);
    }
    return total;
}
function correrZapatillas(producto,total){

    precio = seleccionarZapatillas(producto);
    while (precio != -1) {
        total = suma(total,precio);
        alert("Carrito: "+total);
        precio = seleccionarZapatillas(producto);
    }
    return total;
}

const suma = (total,precio) => total + precio;

let salir = false;
let total = 0;

while(!salir){
    let producto = elegirProducto();
    if (producto == "remeras"){
        total = correrRemeras(producto,total);
    }
    else if(producto == "zapatillas"){
        total = correrZapatillas(producto,total);
    }
    else{
        salir = true;
        alert("El total es de: $"+total)
    }
}
