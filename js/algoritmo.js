let operacion = prompt("Seleccione una opreacion: \n+\n-\n*\n/");
let numero;
let numero2;
let total;

while (operacion !="+" && operacion !="-" && operacion !="*" && operacion !="/"){
    operacion = prompt(typeof(operacion)+"Error. Seleccione una opreacion correcta: \n+\n-\n*\n/");
}

numero = prompt("Ingrese 'q' para salir. \nIngrese un numero: ");

while((isNaN(parseInt(numero)) && numero != "q")){

    numero = prompt("Ingrese 'q' para salir. \nNo ingresó un numero. \nIngrese un numero valido: ");
}

if (numero != "q") {
    numero2 = prompt("Ingrese 'q' para salir. \nIngrese otro numero para realizar la operación: ");

    while(isNaN(parseInt(numero2)) && numero2 != "q" || (operacion == "/" && numero2 == 0)){
        if (isNaN(parseInt(numero2)) && numero2 != "q") {
            numero2 = prompt("Ingrese 'q' para salir. \nNo ingresó un numero. \nIngrese un numero valido: ");
        }
        else{
            numero2 = prompt("Ingrese 'q' para salir. \nNo se puede dividir por 0. \nIngrese un numero valido: ");
        }
    }

    if (numero2 != "q"){
        numero = parseInt(numero);
        numero2 = parseInt(numero2);

        switch (operacion) {
            case "+":
                total = numero+numero2;
                break;
            case "-":
                total = numero-numero2;
                break;
            case "*":
                total = numero*numero2;
                break;
            case "/":
                total = numero/numero2;
                break;
        }
        alert(numero+operacion+numero2+" = "+total);
    }

}



