import Carrito from "./Carrito.js";
const carrito = new Carrito();
var productos = [];
document.addEventListener('DOMContentLoaded', function(event) {
    //Función que carga la tabla donde aparecerán los productos y las respectivas
    //cantidades a través de buttons que el usuario elija, así como el precio total
    //del producto multiplicado por esa cantidad.
    function cargarTabla(productos) {

        const tablaProductos = document.getElementById("cuerpoTabla");

        //De esta forma recorreremos los productos.
        productos.forEach(producto => {

            //columna que junta dos datos del API: título y referencia.
            const titleSku = document.createElement('td');
            titleSku.innerHTML = `<br>${producto.title}<br>REF:${producto.SKU}<br><br>`;
            
            //fila cantidad, botón (+) y (-) para seleccionar la cantidad
            //de producto e input.
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

        
            //evento que aumenta la cantidad al hacer click en el botón más:
            botonCantidadMas.addEventListener('click', function(event) {
                inputCantidad.value ++;
                //Le pasamos los valores que recibe el método en nuestra clase Carrito: SKU 
                // title y precio, así como el valor incrementado que hemos guardado en inputCantidad.
                carrito.actualizarUnidades(producto.SKU, 1, producto.title, producto.price);
                //Es muy importante que llamemos a los métodos para que estos datos se almacenen.
                calculoTotal();
                cargarCarrito();
            });

            //Segundo evento para el botón menos donde le indicamos, especificando
            //con '+' que inputCantidad tiene un valor numérico, que siempre que
            //la cantidad sea mayor que 0 nos decremente la cantidad para nunca 
            //trabajar con métodos negativos.
            botonCantidadMenos.addEventListener('click', function(event) {
                if(+inputCantidad.value > 0){
                    inputCantidad.value = +inputCantidad.value -1; 
                    carrito.actualizarUnidades(producto.SKU, -1, producto.title, producto.price);
                    calculoTotal(); 
                    cargarCarrito();
                } 
                
            });

            //columna para el precio a la que le introducimos el valor 'price' de la API.       
            const price = document.createElement('td');
            price.innerText = producto.price;

            //Introducir el total para que utilice el número seleccionado en el input y el precio asociado
            //a dicho producto.
            const total = document.createElement('td');
            total.innerText = '0';

            //A esta función recurriremos en ambos eventos de los botones (+) y (-).
            //Creamos dos variables definiendo en primer lugar la cantidadTotal como
            //el valor numérico de la cantidad que aparezca en nuestro input. Y, en 
            //segundo lugar, el precio del producto para poder introducir el calculo 
            //en nuestra columna del total.
            function calculoTotal () {
                let cantidadTotal = +inputCantidad.value;
                let precioProducto = producto.price;
                total.innerText = (cantidadTotal * precioProducto).toFixed(2);
            }

            //Por último, introducimos todos nuestros datos dentro de un 'tr. 
            const tr = document.createElement('tr');
            tr.append(titleSku, cantidad, price, total);

            tablaProductos.append(tr);
        })
    }

    //Esta función primero nos mostrará el apartado del total de productos elegidos,
    //además del precio unitario de cada uno y su nombre. Después, para terminar, 
    //mostrará el total final del carrito, es decir, la suma del total obtenido por producto.
    function cargarCarrito(productos) {

        //Inicializamos vacío nuestro elemento 'div' del html, para que al pulsar
        //sobre los productos estos se acumulen, no que se muestren por separado 
        //cada vez que pulsemos. 
        let cesta = document.getElementById("cesta");
        cesta.innerHTML = "";

        //Recogemos los datos del objeto carrito con nuestro método ubicado en la clase.
        let infoCarrito = carrito.obtenerCarrito();
        //Recorremos los productos para que, al pulsar sobre los botones nos muestre directamente
        //los valores 'title', 'cantidad' y 'price'. Sin olvidarnos de introducir con un append
        //toda esta información dentro de nuestro div 'cesta' especificado previamente. 
        infoCarrito.productos.forEach(function(producto){
            let prod = document.createElement('p');
            prod.innerText = `${producto.title} x${producto.cantidad} Total: ${producto.price}€`;
            cesta.append(prod);
        });

        //De esta forma añadimos nuestro total final, después de haber creado
        //prreviamente una nueva función en nuestra clase Carrito que nos devuelva
        //la operación necesaria. Será necesario, de nuevo, incluir con un append
        //esta nueva sección. 
        let totalFinal = document.createElement('div');
        totalFinal.innerText = `Total: ${carrito.sacarTotalCarrito()}€`;

        cesta.append(totalFinal);
        
        };
   

    
    fetch('https://jsonblob.com/api/1296529608542117888')
    .then(response => response.json())
        .then(products => {
            productos = products.products;
            cargarTabla(productos);
            cargarCarrito();
      
        })
    })
