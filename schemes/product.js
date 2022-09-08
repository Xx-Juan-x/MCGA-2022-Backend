const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductsSchemas = new Schema({
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
    price:{
        type: Number,
        min: 1,
        required: true
    },
    stock:{
        type: Number,
        min: 0,
        required: true,
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
})

//Asocia un nombre al esquema que nosotros querramos
module.exports = mongoose.model("Products", ProductsSchemas);