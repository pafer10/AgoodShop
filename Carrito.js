export default class Carrito {
  
  constructor(productos) {
    this.productos = [];
  }
      //Primero, este método nos permitirá ir actualizando nuestro carrito
      //cada vez que el valor del input cambie. Para ello, le pasamos primero
      //las variables que necesitaremos que muestre a la hora de actualizarlo:
      //su SKU, la cantidad, el nombre y el precio. A continuación, establecemos
      //una nueva variable que primero se recorra el array de productos y busque 
      //el producto cuyo SKU coincida con el SKU que reciba.
      actualizarUnidades(SKU, unidades, title, price) {
        let productoEncontrado = this.productos.find(function (producto){
          return producto.SKU === SKU;
          
        });
        //En caso de encontrarse, le diremos que únicamente modifique la cantidad.
        //Es decir, en caso de que ese producto ya se haya añadido al carrito y que,
        //por consiguiente, el SKU ya aparezca dentro, solo aumentaremos o reduciremos
        //la cantidad.
          if (productoEncontrado) {
            productoEncontrado.cantidad += unidades;
          }
          //Si ese producto aún no se ha añadido al carrito lo incluiremos con sus datos. 
          else {
            this.productos.push({
              SKU, 
              title,
              price,
              cantidad: unidades
              });
          }
        }
        
        //Esta función finalmente no se ha utilizado en el script porque dentro de 'actualizarUnidades'
        //se ha llamado también a la información de dicho producto. 
        obtenerInformacionProducto(sku) {

          // let productoEncontrado = this.productos.find(function(producto){
          //   producto.SKU === sku;
          // });

          //   if (productoEncontrado) {
          //     return {
          //       SKU: productoEncontrado.SKU,
          //       cantidad: productoEncontrado.cantidad
          //     };
          //   }
          //   else {
          //     return "Producto no encontrado";
          //   }
        }
        
        //Esta función es algo más genérica, nos permite, además de calcular el total
        //del carrito, devolver un objeto carrito con el total y los productos. 
        //Me supuso algunos problemas porque no era necesario solo con esta función
        //para poder mostrar el total. Es necesaria para que se muestren los productos
        //en la web y, para poder mostrar el resultado de la operación del total recurrí
        //a la creación otra función más específica. 

        obtenerCarrito() {
          //Definimos la variable finalFinal para mostrar el calculo total dentro de ella. 
          //Usamos un .reduce para agrupar los elementos del array producto en un único valor.
        let finalFinal = this.productos.reduce(function(acumulador, producto) {
          return acumulador + (producto.cantidad * producto.price);
        }, 0);
        
        //Devolvemos primero el objeto completo con el total obtenido y los productos
        return {
          total: finalFinal.toFixed(2),
          currency: "€",
          //Recorremos los productos con .map que nos devolverá un nuevo objeto para 
          //cada producto con las variables que le especificamos. Es la lista de productos transformada.
          productos: this.productos.map(function(producto) {
            return {
            sku: producto.SKU,
            cantidad: producto.cantidad,
            total: (producto.cantidad * producto.price).toFixed(2),
            title: producto.title,
            price: producto.price
            }
          })
        }
      }

      //Esta función fue necesaria para poder mostrar en la web 
      //el calculo total de los productos.
      sacarTotalCarrito (){
        let carritoTotal = this.productos.reduce(function(acumulador, producto) {
          return acumulador + (producto.cantidad * producto.price);
        }, 0);
        return carritoTotal.toFixed(2);
      }
  }
