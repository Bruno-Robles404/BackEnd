
//Realizar una clase “ProductManager” que gestione un conjunto de productos.

class ProductManager {
    constructor() {
        this.products = [];
    }
    //la clase "ProductManager" tiene un método "addProduct" que agrega un producto al arreglo de productos inicial. 
    //Se valida que no se repita el campo "code" y que todos los campos sean obligatorios. 
    //Al agregar un producto, se crea con un id autoincrementable. 
    //Además, la clase tiene un método "getProducts" que devuelve el arreglo con todos los productos creados hasta ese momento.

    addProduct(title, description, price, thumbnail, code, stock) {

        // Validar que todos los campos sean obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios");
        }

        // Validar que no se repita el campo "code"
        const existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
            throw new Error("El código ya está repetido");
        }

        // Crear un id autoincrementable
        const id = this.products.length + 1;

        // Crear el objeto del producto
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        // Agregar el producto al arreglo de productos
        this.products.push(product);
    }
    //devuelve los productos
    getProducts() {
        return this.products;
    }
    //el método "getProductById" busca en el arreglo el producto que coincide con el id proporcionado 
    //y muestra un error "Not found" en la consola si no se encuentra ningún producto con ese id.
    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("Not found");
        }
        return product;
    }
}

const productManager = new ProductManager();

productManager.addProduct("Producto 1", "Descripción del producto 1", 100, "imagen1.jpg", "P001", 50);
productManager.addProduct("Producto 2", "Descripción del producto 2", 150, "imagen2.jpg", "P002", 30);
productManager.addProduct("Producto 3", "Descripción del producto 3", 200,"imagen3.jpg", "P003", 40);


console.log(productManager.getProducts());

console.log(productManager.getProductById(1)); // Output: { id: 1, title: "Producto 1", 
                                               //description: "Descripción del producto 1", price: 100
                                               //thumbnail: "imagen1.jpg", code: "P001", stock: 50 }

console.log(productManager.getProductById(3)); //En el caso de no poner un valor daria 
                                              //Error: Todos los campos son obligatorios 

console.log(productManager.getProductById(4)); // Output: "Not found"