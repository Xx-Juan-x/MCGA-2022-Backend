const router = require('express').Router();
const products = require('../schemes/product');

router.get('/', (req, res) =>{
    products.find({isDeleted: false})
    .then(data => res.json(data))
    .catch(error => res.status(500).json({mensaje: error}))
})

router.get('/:name', (req, res) =>{
    const name = req.params.name
    products.findOne({name: name})
    .then(data => {
        if(!data){
            return res.status(404).json({mensaje: "No funciona"})
        }
        return res.json(data)
    })
    .catch(error => res.status(500).json({mensaje: error}))
})

router.post('/add', (req, res) => {
    const newProducts = new products(req.body);
    newProducts
    .save()
    .then(data => res.status(200).json({mensaje: "Producto creado", data}))
    .catch(() => res.status(500).json({mensaje: "Error"}));
    
})

module.exports = router;