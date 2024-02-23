import express from "express"
import ProductManager from "./components/ProductManager.js"


const app = express()
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager();
const products = new ProductManager();
const readProducts = products.readFile();

app.get("/products", async (req, res) => {
    let limit =parseInt(req.query.limit);

    if(!limit) return res.send(await readProducts);

    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit);
  
    res.send(productLimit);
})

app.get("/products/:id", async (req, res) => {
    let id = parseInt (req.params.id);
    let productsById = await manager.getProductsById(id);

    if(productsById){
         res.send(productsById)
    }else {
        res.send({error:"El producto no existe"})
    }  
})



const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Express port local ${server.address().port}`)
})

server.on("error", (error) => console.log(`Error del Servidor ${error}`))