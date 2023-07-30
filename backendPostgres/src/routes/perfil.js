const express = require('express')
//const pool = require('../../connection')
const db = require("../../db");
//const { Client } = require('pg');
const router = express.Router();


router.get('/perfis', async (req, res) =>{
    try {
        const perfis = await db.query("Select * from olhabici.perfil");
        res.status(200).json(perfis.rows)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})


//add coordinate
router.post('/novoperfil', async (req, res) => {

    console.log(req.body.id_u, req.body.nome_p, req.body.genero, req.body.cor_raca, req.body.idade)

    try{
        const newProfile = await db.query(` 
        insert into olhabici.perfil ( id_u, nome_p, genero, cor_raca, idade)
        values ($1, $2, $3, $4, $5) RETURNING id_p, id_u, nome_p, genero, cor_raca, idade; `,
        [ req.body.id_u, req.body.nome_p, req.body.genero, req.body.cor_raca, req.body.idade])
        res.status(201).send(newProfile.rows[0])
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})



//delete coordinate

router.delete('/perfis/:id', async (req, res) =>{
    try {
        await db.query("delete from olhabici.perfil where id_p=$1", [req.params.id])
        res.status(200).json({message: "deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//update coordinate 

router.put('/perfis/:id', async (req,res) => {
    try {
        const {id} = req.params
        const {id_p, id_u, nome_p, cor_raca, idade} = req.body

        const oldCoord = await db.query("Select * from coleta_campo.coordenadas where id_p = $1", [id_p])
        //console.log(oldCoord)

        const newCoord = await db.query(
        "update olhabici.perfil set id_u = $1, nome_p = $2, cor_raca = $3, idade = $4 where id_p=$5;", 
        [id_u? id_u : oldCoord.rows[0].id_u, 
        nome_p ? nome_p : oldCoord.rows[0].nome_p,
        cor_raca ? cor_raca : oldCoord.rows[0].cor_raca, 
        idade ? idade : oldCoord.rows[0].idade,  
        id_p])

        res.status(201).json(newCoord.rows[0])


    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})




module.exports = router