const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProveedoresSchemas = new Schema({
    id:{
        type: Schema.Types.ObjectId
    },
    name:{
        type: String,
        required: true,
        maxlenght: 30
    },
    description:{
        type: String,
        maxlenght: 100,
    },
    telefono:{
        type: String,
        required: true,
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
})

//Asocia un nombre al esquema que nosotros querramos
module.exports = mongoose.model("proveedores", ProveedoresSchemas);