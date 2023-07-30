const express = require('express')
//const pool = require('../../connection')
const db = require("../../db");
//const { Client } = require('pg');
const router = express.Router();


router.get('/cor_raca', async (req, res) =>{
    try {
        const raca = await db.query("Select * from olhabici.cor_raca");
        res.status(200).json(raca.rows)
        console.log(raca.rows)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
    
})

module.exports = router