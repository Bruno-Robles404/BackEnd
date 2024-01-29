// Paso 1: Definir la clase "ProductManager"
class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Verificar si el código ya existe en algún producto
        const codigoExistente = this.products.some(producto => producto.code === code);
        if (codigoExistente) {
            throw new Error("El código ya está repetido");
        }

        // Generar un id único para el nuevo producto
        const id = Date.now();

        // Crear el objeto del producto
        const producto = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        // Agregar el producto al array de productos
        this.products.push(producto);

        // Devolver el id del producto agregado
        return id;
    }

    getProductById(id) {
        const producto = this.products.find(producto => producto.id === id);
        if (!producto) {
            throw new Error("No se encontró el producto");
        }
        return producto;
    }
}

// Paso 2: Crear una instancia de la clase "ProductManager"
const productManager = new ProductManager();

// Paso 3: Llamar a los métodos de la instancia
console.log(productManager.getProducts()); // Output: []

const id = productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log(productManager.getProducts());
// Output: [{ id: <id generado automáticamente>, title: "producto prueba", description: 
//"Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }]

try {
    productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
} catch (error) {
    console.log(error.message); // Output: "El código ya está repetido"
}

console.log(productManager.getProductById(id)); // Output: { id: <id generado automáticamente>, 
//title: "producto prueba", description: "Este es un producto prueba", price: 200,
// thumbnail: "Sin imagen", code: "abc123", stock: 25 }