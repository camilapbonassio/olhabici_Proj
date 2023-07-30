const express = require('express')
//const pool = require('../../connection')
const db = require("../../db");
//const { Client } = require('pg');
const router = express.Router();


router.get('/genero', async (req, res) =>{
    try {
        const genero = await db.query("Select * from olhabici.genero");
        res.status(200).json(genero.rows)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

module.exports = router