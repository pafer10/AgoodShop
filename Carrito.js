export default class Carrito {
  
  constructor(productos) {
    this.productos = [];
  }
      actualizarUnidades(SKU, unidades, title, price) {
        let productoEncontrado = this.productos.find(function (producto){
          return producto.SKU === SKU;
          
        });
          if (productoEncontrado) {
            productoEncontrado.cantidad += unidades;
          }
          else {
            this.productos.push({
              SKU, 
              title,
              price,
              cantidad: unidades
              });
          }
        }
    
        obtenerInformacionProducto(sku) {

          let productoEncontrado = this.productos.find(function(producto){
            producto.SKU === sku;
          });

            if (productoEncontrado) {
              return {
                SKU: productoEncontrado.SKU,
                cantidad: productoEncontrado.cantidad
              };
            }
            else {
              return "Producto no encontrado";
            }
        }
    
        obtenerCarrito() {
        let finalFinal = this.productos.reduce(function(acumulador, producto) {
          return acumulador + (producto.cantidad * producto.price);
        }, 0);
        
        return {
          total: finalFinal.toFixed(2),
          currency: "€",
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

      sacarTotalCarrito (){
        let carritoTotal = this.productos.reduce(function(acumulador, producto) {
          return acumulador + (producto.cantidad * producto.price);
        }, 0);
        return carritoTotal.toFixed(2);
      }
  }
