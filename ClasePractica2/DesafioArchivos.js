const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.id = 0;
    }

    addProduct(product) {
        product.id = ++this.id;
        this.products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    getProducts() {
        this.products = JSON.parse(fs.readFileSync(this.path));
        return this.products;
    }

    getProductById(id) {
        this.products = JSON.parse(fs.readFileSync(this.path));
        return this.products.find(product => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        this.products = JSON.parse(fs.readFileSync(this.path));
        let product = this.products.find(product => product.id === id);
        if (product) {
            Object.assign(product, updatedProduct);
            product.id = id; // Ensure the id is not changed
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }

    deleteProduct(id) {
        this.products = JSON.parse(fs.readFileSync(this.path));
        this.products = this.products.filter(product => product.id !== id);
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
}

const productManager = new ProductManager('path_to_your_json_file');

productManager.addProduct({
    name: "Producto 1",
    description: "Descripción del producto 1",
    price: 100,
    image: "imagen1.jpg",
    code: "P001",
    stock: 50
});

