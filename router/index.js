const express = require('express');
const productsRouters = require('./product');

//Traer el archivo proveedores

const router = express.Router();

router.use("/products", productsRouters);

module.exports = router;