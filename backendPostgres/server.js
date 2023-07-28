const express = require("express");
const app = express()
const ocorrencia = require('./src/routes/ocorrencia')
const auth = require('./src/routes/auth')
const perfil = require('./src/routes/perfil')
const raca = require('./src/routes/cor_e_raca')
const categoria = require('./src/routes/categoria')
const distritos = require('./src/routes/distrito')
const multer =  require('multer');
const path = require("path");
const genero = require('./src/routes/genero')
require('dotenv').config()


const cors = require('cors');
//const client = require("./connection")

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT","DELETE"]
  }));
app.use(express.static("public"))
app.use('/public', express.static('public'));



app.use('/api', ocorrencia)
app.use('/api', auth)
app.use('/api', perfil)
app.use('/api', raca)
app.use('/api', categoria)
app.use('/api', distritos)
app.use('/api', genero)



const port = process.env.PORT || 8800; 

app.listen(port, () => {
    console.log("backend server in running")
})

//client.connect();