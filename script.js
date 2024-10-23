import Carrito from "./Carrito.js";
const carrito = new Carrito();
var productos = [];
document.addEventListener('DOMContentLoaded', function(event) {

   
    function cargarTabla(productos) {

        const tablaProductos = document.getElementById("cuerpoTabla");

        productos.forEach(producto => {

            //columna que junta dos datos del API: título y referencia.
            const titleSku = document.createElement('td');
            titleSku.innerHTML = `${producto.title}<br><p>REF:</p>${producto.SKU}`;
            
            //fila cantida, botón (+), (-) e input.
            const cantidad = document.createElement('td');
            const botonCantidadMas = document.createElement('button');
            botonCantidadMas.innerText = '+';
            const inputCantidad = document.createElement('input');
            inputCantidad.style="width: 20px; height: 20px;"
            inputCantidad.min = '0';
            inputCantidad.value = '0';
            const botonCantidadMenos = document.createElement('button');
            botonCantidadMenos.innerText = '-'
            cantidad.append(botonCantidadMas, inputCantidad, botonCantidadMenos);

        
            //función que aumente la cantidad al pulsar botón más:
            //el +inputCantidad cambia a number la variable para poder indicarle, en este caso,
            //la condición de que no puede estar en negativo.
            botonCantidadMas.addEventListener('click', function(event) {
                inputCantidad.value ++;
                //Le pasamos los valores que recibía el método en la clase: SKU y el valor incrementado
                //que hemos guardado en inputCantidad.
                carrito.actualizarUnidades(producto.SKU, 1, producto.title, producto.price);
                calculoTotal();
                cargarCarrito();
            });


            botonCantidadMenos.addEventListener('click', function(event) {
                if(+inputCantidad.value > 0){
                    inputCantidad.value = +inputCantidad.value -1; 
                    carrito.actualizarUnidades(producto.SKU, -1, producto.title, producto.price);
                    calculoTotal(); 
                    cargarCarrito();
                } 
                
            });

            const price = document.createElement('td');
            price.innerText = producto.price;

            //Introducir el total para que utilice el número seleccionado en el input y el precio asociado
            //a dicho producto.
            const total = document.createElement('td');
            total.innerText = '0';

            function calculoTotal () {
                let cantidadTotal = +inputCantidad.value;
                let precioProducto = producto.price;
                total.innerText = (cantidadTotal * precioProducto).toFixed(2);
            }

            const tr = document.createElement('tr');
            tr.append(titleSku, cantidad, price, total);

            tablaProductos.append(tr);
        })
    }

    
    function cargarCarrito(productos) {


        let cesta = document.getElementById("cesta");
        cesta.innerHTML = "";

        //Recoge los datos del objeto carrito.
        let infoCarrito = carrito.obtenerCarrito();
        infoCarrito.productos.forEach(function(producto){
            let prod = document.createElement('p');
            prod.innerText = `${producto.title} x${producto.cantidad} Total: ${producto.price}€`;
            cesta.append(prod);
        });


        let totalFinal = document.createElement('div');
        totalFinal.innerText = `Total: ${carrito.sacarTotalCarrito()}€`;

        cesta.append(totalFinal);

        document.getElementById("cantidadTotal").innerText = `Precio Total: ${carrito.sacarTotalCarrito()}€`;
        // let totalFinal = document.createElement('p');
        // totalFinal.innerHTML = `Total: ${infoCarrito.total}€`;
        // cesta.append(totalFinal);
        
        // document.getElementById("cantidadTotal").innerText = `Precio Total: ${infoCarrito.total}${infoCarrito.currency}`
        };
   


    fetch('https://jsonblob.com/api/1296529608542117888')
    .then(response => response.json())
        .then(products => {
            productos = products.products;
            cargarTabla(productos);
            cargarCarrito();
      
        })
    })
