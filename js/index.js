function mostrarListaProductos(producto,lista){
    let msg = producto.toUpperCase()+"\n";

    for(i = 0;i<lista.length;i++){
        msg = msg+(i+1)+") "+lista[i].nombre+" --- $"+lista[i].precio+ "\n";
    }
    return msg;
}
function mostrarLocal(carrito,total){
    let div;
    let i = carrito.length-1;
    
    for (const el of carrito) {
        div = document.createElement("div");
        div.setAttribute("class","producto row mb-3");
        div.innerHTML = `<h4 class = "col-3">${el.nombre}</h4>
        <h5 class = "col-3">Talle: ${el.talle}</h5>
        <h5 class = "col-3">$${el.precio}</h5>
        <button type="submit" class="col-3 borrar btn btn-dark btn-outline-info btn-lg btn-block boton">Borrar</button>`;
        document.getElementById("carrito").appendChild(div);
    }
    document.getElementById("carrito").appendChild(div);
    let x = document.getElementById("total");
    console.log(x);
    if(x == null){
        div = document.createElement("div")
        div.innerHTML = `<h2 id= "total" class ="total">Total: $${total}</h2>`;
        document.getElementById("precio").appendChild(div);
    }
    else{
        document.getElementById("total").innerHTML = "$"+total;
    }
    
}
function mostrarCarritoHTML(carrito,total) {
    let div;
    let i = carrito.length-1;
    div = document.createElement("div");
    div.setAttribute("class","producto row mb-3");

    div.innerHTML = `<h4 class = "col-3">${carrito[i].nombre}</h4>
        <h5 class = "col-3">Talle: ${carrito[i].talle}</h5>
        <h5 class = "col-3">$${carrito[i].precio}</h5>
        <button type="submit" class="col-3 borrar btn btn-dark btn-outline-info btn-lg btn-block boton">Borrar</button>`;
    
    document.getElementById("carrito").appendChild(div);
    let x = document.getElementById("total");
    console.log(x);
    if(x == null){
        div = document.createElement("div")
        div.innerHTML = `<h2 id= "total" class ="total">Total: $${total}</h2>`;
        document.getElementById("precio").appendChild(div);
    }
    else{
        document.getElementById("total").innerHTML = "$"+total;
    }
    
}

function cargarDatos(zapatillas,compra) {
    let btns = document.getElementsByClassName("agregar");
    let precio, talle;
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", (e)=> {
            e.preventDefault();
            console.log(e);
            precio = e.path[3].children[0].outerText.replace(/[^\w\s]/gi, '');
            talle = e.path[1][0].value;
            if(talle == "-"){
                alert("Ingrese un talle");
            }
            else{
                compra.push(new Producto(zapatillas[i],precio,talle));
                console.log(compra);
                total = calcularTotal(compra);
                console.log(total);
                
                mostrarCarritoHTML(compra,total);
                localStorage.setItem("carrito",JSON.stringify(compra));
                localStorage.setItem("Total",total);
                console.log(localStorage);
            }
            return compra; 
        });
    }
}
function borrarProducto(compra) {
    let btns = document.getElementsByClassName("borrar");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", (e)=> {
            e.preventDefault();
            compra.splice(i,1);
            e.remove();
        });
    }    
    let precio = carrito[borrar-1].precio;

    return total-precio;
}

function calcularTotal(compra) {
    let total = 0;
    for (const prod of compra) {
        total = suma(total,parseInt(prod.precio));
    }
    return total;
}
function mostrarDatos(compra){
    msg = `GRACIAS POR SU COMPRA ${compra[0]} ${compra[1]}!

    Se enviará a ${compra[3]}  
    Le estará llegando la factura a ${compra[2]}`
    alert(msg);
}

class Producto{
    constructor(nombre, precio,talle){
        this.nombre = nombre;
        this.precio = precio;
        this.talle = talle;
    }
}

const suma = (total,precio) => total + precio;

const zapatillas = ["nikeblancas","adidaspixar","newbalance","fila","adidassuperstar","jordanblancas","nikenegras","jordan","yeezy"];
const carrito = [];
let compra = [];

if (localStorage.length > 0) {
    let items = localStorage.getItem("carrito");
    console.log(items);
    items = JSON.parse(items);
    console.log(items);
    compra = items.map((x) => x);
    console.log(compra);
    total = calcularTotal(compra);
    console.log(total);
    mostrarLocal(compra,total);

}
total = cargarDatos(zapatillas,compra);
div = document.createElement("div");
