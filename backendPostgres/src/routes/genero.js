const express = require('express')
const pool = require('../../connection')
//const { Client } = require('pg');
const router = express.Router();


router.get('/genero', async (req, res) =>{
    try {
        const genero = await pool.query("Select * from olhabici.genero");
        res.status(200).json(genero.rows)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

module.exports = router