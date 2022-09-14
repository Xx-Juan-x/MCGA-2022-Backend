const router = require('express').Router();
const proveedores = require('../schemes/proveedores');

//Endpoints
router.get('/', (req, res) =>{
    proveedores.find({isDeleted: false})
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({mensaje: error}))
})

router.get('/:id', (req, res) =>{
    const id = req.params.id
    proveedores.findOne({_id: id})
    .then(data => {
        if(!data){
            return res.status(404).json({mensaje: "No existe"});
        }
        return res.json(data)
    })
    .catch(error => res.status(500).json({mensaje: error}))
})

router.post('/add', (req, res) => {
    const newProveedores = new proveedores(req.body);
    newProveedores
    .save()
    .then(data => res.status(201).json({mensaje: "Proveedor creado", data}))
    .catch(() => res.status(500).json({mensaje: "Error"}));
})

router.put("/update/:id", (req,res) => {
    const id = req.params.id;
    proveedores.findByIdAndUpdate(id, req.body)
    .then(data => res.status(200).json({mensaje: "Proveedor actualizado", data}))
    .catch(() => res.status(500).json({mensaje: error}));
})

router.delete("/delete/:id", (req,res) => {
    const id = req.params.id;
    proveedores.findByIdAndUpdate(id, {isDeleted: true})
    .then(data => {
        if (!data) {
            return res.status(404).json({mensaje: "No existe"})
        }
        return res.status(204).json({mensaje:"Proveedor eliminado logicamente"});
    })
    .catch(error => res.status(500).json({mensaje: error}));
})

router.put("/alta/:id", (req,res) => {
    const id = req.params.id;
    proveedores.findByIdAndUpdate(id, {isDeleted: false})
    .then(data => res.status(200).json({mensaje: `El proveedor ${data.name} ha sido habilitado nuevamente`}))
    .catch(() => res.status(500).json({mensaje: error}));
})

module.exports = router;