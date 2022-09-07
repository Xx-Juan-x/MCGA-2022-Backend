/*const personas = [
    {
        profesion: "programador",
        edad: 21,
        estudiosCompletos: "Secundario Completo"
    },
    {
        profesion: "programador",
        edad: 25,
        estudiosCompletos: "Secundario Incompleto"
    },
    {
        profesion: "frontend",
        edad: 22,
        estudiosCompletos: "Universitario Incompleto"
    },
    {
        profesion: "backend",
        edad: 30,
        estudiosCompletos: "Universitario Completo"
    },
    {
        profesion: "backend",
        edad: 25,
        estudiosCompletos: "Universitario Incompleto"
    },
    {
        profesion: "UX",
        edad: 25,
        estudiosCompletos: "Universitario Completo"
    },
    {
        profesion: "UI",
        edad: 19,
        estudiosCompletos: "Secundario Completo"
    },
    {
        profesion: "Project Manager",
        edad: 40,
        estudiosCompletos: "Universitario Completo"
    },
    {
        profesion: "programador",
        edad: 19,
        estudiosCompletos: "Secundario Completo"
    },
    {
        profesion: "backend",
        edad: 26,
        estudiosCompletos: "Universitario Incompleto"
    },
]

const empresas = [
    {
        cantEmpleados: 15,
        rubro: "backend",
        empleados: ()=>{
            personas.filter(persona => persona.profesion == "backend")
        }
    },
]
console*/

const { json } = require('body-parser');
const { profileEnd } = require('console');
const express = require('express');
const fs = require('fs');
const products = require('./data/MOCK_DATA.json')
const app = express();
const PORT = 3000;

//console.log(products);

app.use(express.json());

// Envío un mensaje al server
// El 200 indica que está succes con el servidor
app.get('/',(req, res)=>{
res.send(200, "Bienvenido al servidor");
})

//Dato que viene del servidor, por eso trabajo con el req
app.get('/products/name/:name', (req, res)=>{
    const name = req.params.name;
    const filterdProducts = products.filter((item) => item.name === name);
    // Indico si no hay algun producto que me devuelva un estado de 204
    if(filterdProducts.length === 0){
        return res.status(204).json(filterdProducts);
    }
    //Si todo esta ok me devuelve el array con el nombre y el producto que existe
    res.status(200).json(filterdProducts);
})

app.get('/products', (req, res)=>{
    res.json(products);
})

app.post('/products/add', (req, res) =>{
    const newProducts = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
    }
    if(products.some(item => item.id === req.body.id)){
        return res.status(500).json({mensaje: "Este producto ya existe"});
    }
    products.push(newProducts);
    //Herramienta para escribir archivos (file system)
    fs.writeFile('./data/MOCK_DATA.json', JSON.stringify(products), (error)=>{
        if(error){
            res.status(500).json({mensaje: "Internal Error"});
        }
    });
    res.json(newProducts);
})

app.delete('/products/delete/:id', (req, res) => {
    const id = req.params.id;
    const filteredProducts = products.filter(product => product.id == id)

    if(filteredProducts.length === 0){
        return res.status(204).json({message: "Producto no encontrado"});
    }
    //En que número está ese elemento
    const index = products.indexOf(filteredProducts[0]);
    //A partir del index
    products.splice(index, 1);
    fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(products), (error) => {
        if(error) res.status(500).json({message: 'internal error'})
    })
    res.status(200).json({message: "Product deleted"});
})

/*app.delete('/products/delete/:name', (req, res) => {
    const productName = req.params.name;
    const filteredProducts = products.filter(product => product.name.includes(productName));

    if(filteredProducts.length === 0){
        return res.status(204).json({message: "Producto no encontrado"});
    }
    //En que número está ese elemento
    const index = products.indexOf(filteredProducts[0]);
    //A partir de la posicion del arreglo borra la cantidad de elementos que se le pase.
    products.splice(index, 1);

    fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(products), (error) => {
        if(error) res.status(500).json({message: 'internal error'})
    })
    res.status(200).json({message: "Product deleted"});
})*/

//Arranca nuestro servidor api
app.listen(PORT, () =>{
    console.log('OK');
})

