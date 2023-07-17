const express = require('express')
const pool = require('../config/database');
const { Client } = require('pg');
const router = express.Router();


router.get('/distritos', async (req, res) =>{
    try {
        const distrito = await pool.query("Select * from olhabici.distritos");
        res.status(200).json(distrito.rows)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

module.exports = router