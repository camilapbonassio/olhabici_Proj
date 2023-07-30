const express = require('express')
const pool = require('../../connection')
//const { Client } = require('pg');
const router = express.Router();


router.get('/categorias', async (req, res) =>{
    try {
        const categoria = await pool.query("Select * from olhabici.categoria");
        res.status(200).json(categoria.rows)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

module.exports = router