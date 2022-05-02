function elegirProducto(opciones) {

    let msg = "Escriba una opcion: \n";
    let size = opciones.length;

    for(i = 0;i<opciones.length;i++){
        msg = msg+(i+1)+") "+opciones[i]+"\n";
    }
    let producto = prompt(msg);
    producto = validarNumeros(producto,size,msg);

    return opciones[producto-1].toLowerCase();
}

function validarNumeros(numero,size,msg){
    let esNumero = isNaN(parseInt(numero));

    while (esNumero || numero > size){
        alert("Ingrese una opcion válida");
    
        numero = prompt(msg);
    }
    return numero;
}
function mostrarListaProductos(producto,lista){
    let msg = producto.toUpperCase()+"\n";

    for(i = 0;i<lista.length;i++){
        msg = msg+(i+1)+") "+lista[i].nombre+" --- $"+lista[i].precio+ "\n";
    }
    return msg;
}
function seleccionarProductos(producto,lista){

    let precio;
    let size = lista.length+1;
   
    let msg = mostrarListaProductos(producto,lista);

    msg = msg +(lista.length+1)+") Elegir otro producto \n";

    let eleccion = prompt(msg);
    eleccion = validarNumeros(eleccion,size,msg);

    if(eleccion > lista.length){
        precio = -1;
    }
    else{
        precio = lista[eleccion-1].precio;
    }
    return precio;
}

function correrProductos(producto,total,lista){
    precio = seleccionarProductos(producto,lista);
    while (precio != -1) {
        total = suma(total,precio);
        alert("Carrito: "+total);
        precio = seleccionarProductos(producto,lista);
    }
    return total;
}

function agregarProducto(producto, lista) {
    let nombre = prompt("Ingrese el nombre del producto: ");
    let precio = parseInt(prompt("Ingrese el precio del producto: "));

    while(isNaN(precio)){
        precio = parseInt(prompt("No ingresó un numero. \nIngrese un precio valido: "));
    }

    lista.push(new Producto(nombre,precio));
    let msg = mostrarListaProductos(producto,lista);
    alert("Se agrego correctamente.\n"+msg);
}

class Producto{
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
    }
}

const suma = (total,precio) => total + precio;


let salir = false;
let total = 0;
let opciones = ["Zapatillas", "Remeras", "Agregar productos" ,"Salir"];
let productos = ["Zapatillas", "Remeras"];
let remeras = [];
let zapatillas = [];

remeras.push(new Producto("negra",500));
remeras.push(new Producto("gris",800));
remeras.push(new Producto("blanca",600));
zapatillas.push(new Producto("Air Force 1 Blancas",18000));
zapatillas.push(new Producto("Jordan",25000));
zapatillas.push(new Producto("Adidas Superstar",12000));

while(!salir){
    let producto = elegirProducto(opciones);
    if (producto == "remeras"){
        total = correrProductos(producto,total,remeras);
    }
    else if(producto == "zapatillas"){
        total = correrProductos(producto,total,zapatillas);
    }
    else if(producto == "agregar productos"){
        let nuevoProd = elegirProducto(productos);
        if (nuevoProd == "remeras"){
            agregarProducto(nuevoProd,remeras);
        }
        else{
            agregarProducto(nuevoProd,zapatillas);
        }
    }
    else{
        salir = true;
        alert("El total es de: $"+total)
    }
}
