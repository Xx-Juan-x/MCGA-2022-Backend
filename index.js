const { json } = require('body-parser');
const { profileEnd, Console, error } = require('console');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const router = require('./router');

app.use(express.json());
app.use(router);

app.get('/',(req, res)=>{
    res.send(200, "Bienvenido al servidor");
})

mongoose.connect('mongodb+srv://Juan:Juan@cluster0.kmpcmvf.mongodb.net/?retryWrites=true&w=majority')
.then(
    app.listen(()=>{
        console.log('DB OK');
        app.listen(PORT, () => console.log('Server OK'))
    })
)
.catch((error)=> console.log("DB Failed" + error))

const PORT = 3000;

