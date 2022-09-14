const express = require('express');
const productsRouters = require('./product');
const proveedoresRouters = require('./proveedores');
//Traer el archivo proveedores



const router = express.Router();

router.use("/proveedores", proveedoresRouters);
router.use("/products", productsRouters);


module.exports = router;