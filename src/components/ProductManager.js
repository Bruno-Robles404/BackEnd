
import { promises as fs } from "fs";

export default class ProductManager {

    constructor() {
        this.path = "./products.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
        } else {
            let newProduct = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                id: ProductManager.id
            };
            this.products.push(newProduct)
            await fs.writeFile(this.path, JSON.stringify(this.products));
        };
    };

    readFile = async () => {
        let respuestaProducts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(respuestaProducts)
    }

    getProducts = async () => {
        let respuestaGetProducts = await this.readFile()
        return console.log(respuestaGetProducts)
    }

    getProductsById = async (id) => {
        let respuestaProductsId = await this.readFile()
        if (!respuestaProductsId.find(products => products.id === id)) {
            console.log("el producto no se encuentra en stock")
        } else {
            return console.log(respuestaProductsId.find(products => products.id === id))
        }
    };

    deleteProductById = async (id) => {
        let eliminaProductId = await this.readFile()
        let productFilter = eliminaProductId.filter(products => products.id != id)
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("producto eliminado")
    };

    updateProduct = async ({ id, ...producto }) => {
        await this.deleteProductById(id);
        let previousProduct = await this.readFile();
        let modifyProduct = [{...producto, id}, ...previousProduct];
        await fs.writeFile(this.path, JSON.stringify(modifyProduct));
    };
}


//const products = new ProductManager();

/*products.addProduct("converse", "zapatillas", "4000", "imagen01", "conv001", "4")
products.addProduct("nike", "zapatillas", "6000", "imagen02", "nike002", "5") 
products.addProduct("adidas", "zapatillas", "7000", "imagen03", "adi003", "6")
products.addProduct("reebok", "zapatillas", "5000", "imagen04", "ree004", "3") 
products.addProduct("toper", "zapatillas", "3000", "imagen05", "top005", "5") 
products.addProduct("lacoste", "zapatillas", "7000", "imagen06", "lac006", "4")
products.addProduct("fila", "zapatillas", "6000", "imagen07", "fil007", "5") 
products.addProduct("hundeArmour", "zapatillas", "8000", "imagen08", "hun008", "4")
products.addProduct("jhonFoos", "zaProductManager.jspatillas", "6000", "imagen09", "foo009", "5") 
products.addProduct("vans", "zapatillas", "5000", "imagen10", "van010", "5") */

//products.getProducts()

// products.getProductsById(2)

// products.getProductsById(4)

// products.deleteProductById(1)

/*products.updateProduct({
    title: 'nike',
    description: 'zapatillas',
    price: '7000',
    thumbnail: 'imagen02',
    code: 'nike002',
    stock: '5',
    id: 2
})*/