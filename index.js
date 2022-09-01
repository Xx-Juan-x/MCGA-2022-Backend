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

/*const jugadores = [
    { ID: "1", clase: "mago", nivel: 35, inventario:
    ["Manzana", "Poción de maná", "Vara mágica"] },
    { ID: "2", clase: "ladron", nivel: 65, inventario:
    ["Daga", "Katana de fuego", "Poción de vida"] },
    { ID: "4", clase: "curandero", nivel: 73, inventario:
    ["Vara mágica", "Armadura ligera"] },
    { ID: "3", clase: "espadachin", nivel: 36, inventario:
    ["Casco de hierro", "Katana de fuego", "Pocíón de velocidad"] },
    { ID: "5", clase: "mago", nivel: 26, inventario:
    ["Carta de PecoPeco", "Oridecon", "Poción de concentración"] },
]

const sospechosos = jugadores.filter(item => item.inventario
    .some(elementoInventario => elementoInventario === "Katana de fuego")
).map(elemento => elemento.ID);

console.log(sospechosos);*/

const { json } = require('body-parser');
const { profileEnd } = require('console');
const express = require('express');
const fs = require('fs');
const products = require('./data/MOCK_DATA.json')
const app = express();

const PORT = 3000;

console.log(products);

app.use(express.json());

// Envío un mensaje al server
app.get('/',(req, res)=>{
res.send("Hola mundo");
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
    fs.writeFile('./data/MOCK_DATA.json', JSON.stringify(products), (error)=>{
        if(error){
            res.status(500).json({mensaje: "Internal Error"});
        }
    });
    res.json(newProducts);
})

//app.delete('products/delete/:id')

//Indico el puerto 
app.listen(PORT, () =>{
    console.log('OK');
})

