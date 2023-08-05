const express = require('express')
const multer =  require('multer');
//const pool = require('../../connection')
const app = express()
const path = require("path");



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  'api/images')

    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer ({
    storage: storage
})

module.exports = {upload}