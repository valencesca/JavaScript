function mostrarLocal(carrito,total){
    let div;
    let i = carrito.length-1;
    
    for (const el of carrito) {
        const {nombre,talle,precio} = el;
        div = document.createElement("div");
        div.setAttribute("class","producto row mb-3");
        div.innerHTML = `<h4 class = "col-3">${nombre}</h4>
        <h5 class = "col-3">Talle: ${talle}</h5>
        <h5 class = "col-3">$${precio}</h5>
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
    const {nombre,talle,precio} = carrito[i];
    div.innerHTML = `<h4 class = "col-3">${nombre}</h4>
        <h5 class = "col-3">Talle: ${talle}</h5>
        <h5 class = "col-3">$${precio}</h5>
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
        document.getElementById("total").innerHTML = "Total: $"+total;
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
                Swal.fire({
                    icon: 'error',
                    title: 'Ingrese un talle',
                  })
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
            Swal.fire({
                title: 'Desea borrar este producto del carrito?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si'
              }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Eliminado!',
                        'El producto fue removido del carrito',
                        'success'
                    )
                    e.preventDefault();
                    compra.splice(i,1);
                    console.log(compra);
                    compra.length > 0 ? localStorage.setItem("carrito",JSON.stringify(compra)) : localStorage.clear();
                }
              })
            
        });
    }    
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
    items = JSON.parse(items);
    compra = items.map((x) => x);
    total = calcularTotal(compra);
    mostrarLocal(compra,total);

}
total = cargarDatos(zapatillas,compra);
div = document.createElement("div");
borrarProducto(compra);
