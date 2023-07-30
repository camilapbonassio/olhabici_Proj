const express = require('express')
//const pool = require('../../connection')
const db = require("../../db/index");
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
//const jwTokens = require('../utils/jwt');

//login

router.post("/users/login", async (req, res) => { 
    try {
        const {nome, email, senha} = req.body;
        console.log(email)
        
        const user = await db.query("select id_u, nome, email, senha from olhabici.usuario where email= $1", [email]);
        console.log(user.rows[0])
            if (user.rowCount > 0){ 
                //password check
                const match = await bcrypt.compare(senha, user.rows[0].senha);
                //console.log(match)
                if(!match) return res.status(401).json({message:"Nome ou senha inválido"})
                
                //JWT
                const id_u = user.rows[0].id_u
                let token = jwt.sign({id_u: id_u, nome: nome, email: email}, process.env.JWT_SECRET_KEY)
                console.log(token, id_u)
                
                //send to front
                res.send({token:token, id_u:id_u}) 

                //res.send(user.rows[0])

            }else {res.status(400).json({message: "Nome ou senha inválido"})}
        
    } catch (error) {
        res.status(401).json({error: error.message}) 
    }

})




/*

router.post("/users/login", async (req, res) => {
    try {
        //find user
        //console.log(req.body.nome, req.body.email)
        const user = await pool.query(
            "select id_u, nome, email, senha from olhabici.usuario where nome = $1 and email= $2", [ req.body.nome, req.body.email]);
            //console.log(user)

            if (user.rowCount > 0){
                //usuário tem conta cadastrada
                //console.log("1", user.rows)
                //console.log("2", req.body.password)
                const match = await bcrypt.compare( req.body.senha, user.rows[0].senha);
                //console.log(match)
                //console.log(user.rows[0].senha)
                //comparar senhas
               
                    if (!match){
                        res.status(400).json({message: "Nome ou senha inválido"})
                        
                    }else{
                        //login
                        //console.log("resultado", user)
                        res.send(user.rows)

                        
                        
                    }
            }else{
                
                res.status(400).json({message: "Nome ou senha inválido"})

            }
    
        
    } catch (error) {
        res.status(500).json({message: "bad request"})
        console.log("bad request")
    }
   
    
        
})

*/


router.post("/users/r/register", async (req, res) => {
    const user = await db.query(
        "select email from olhabici.usuario where email= $1 ", [req.body.email]
    );

    if ( user.rowCount === 0){
        //register
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        const newUser = await db.query(
            "insert into olhabici.usuario (nome, email, senha) values ($1, $2, $3)",
            [req.body.nome, req.body.email, hashedPass]
        );     

        res.send({message: "autorizado"})
    }else{
        res.json({message: "email existente"})
    }
})

module.exports = router;