function mostrarLocal(carrito,total){
    let div;
    let i = carrito.length-1;
    document.getElementById("titulo").innerHTML = "Carrito de compras";
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
    document.getElementById("titulo").innerHTML = "Carrito de compras";
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
function mostrarProductos() {
    let div;
    fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach((producto) => {

            div = document.createElement("div");
            div.setAttribute("class","m-3 col imageContainer--"+producto.id+" agrandarImg");
            div.innerHTML = `<div class="d-flex flex-row align-items-stretch bd-highlight footer__links justify-content-between">
                                    <div class="p-2 bd-highlight align-items-end">
                                        <h3 class="h3 fs-5 fst-italic">$${producto.precio}</h3>
                                    </div>
                                    <div class="p-2 bd-highlight">
                                        <form action="">
                                            <select name="size" id="size">
                                                <option selected>-</option>
                                                <option value="38"disabled>38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                            </select>
                                            <button type="submit" class="agregar btn btn-dark btn-outline-info btn-lg btn-block boton">Agregar</button>
                                        </form>
                                    </div>
                                </div>`;
            document.getElementById("productos").appendChild(div);
            
        });
        total = cargarDatos(data,compra);
        borrarProducto(compra);
    })
}

function cargarDatos(zapatillas,compra) {
    let btns = document.getElementsByClassName("agregar");
    let precio, talle;
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", (e)=> {
            e.preventDefault();
            console.log(e);
            precio = zapatillas[i].precio;
            nombre = zapatillas[i].nombre;
            talle = e.path[1][0].value;
            if(talle == "-"){
                Swal.fire({
                    icon: 'error',
                    title: 'Ingrese un talle',
                  })
            }
            else{
                compra.push(new Producto(nombre,precio,talle));
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
    console.log(btns.length);
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
                    e.path[1].innerText = null;
                    compra.splice(i,1);
                    console.log(compra);
                    let total = calcularTotal(compra);

                    if (total > 0 ) {
                        document.getElementById("total").innerHTML = "Total: $"+calcularTotal(compra); 
                    }
                    else{
                        document.getElementById("total").innerHTML = null;
                        document.getElementById("titulo").innerHTML = null;
                    }
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


class Producto{
    constructor(nombre, precio,talle){
        this.nombre = nombre;
        this.precio = precio;
        this.talle = talle;
    }
}

const suma = (total,precio) => total + precio;

const carrito = [];
let compra = [];
prods = false;

mostrarProductos();

if (localStorage.length > 0) {
    let items = localStorage.getItem("carrito");
    items = JSON.parse(items);
    console.log(items);
    compra = items.map((x) => x);
    total = calcularTotal(compra);
    mostrarLocal(compra,total);

}


