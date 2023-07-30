const express = require('express')
const pool = require('../../connection')
//const { Client } = require('pg');
const router = express.Router();
const multer =  require('multer');
const {upload} = require ("../middleware/multerM")




///get all ocurrencies 
router.get('/ocorrencia', async (req, res) =>{
    try {
        const coordenadas = await pool.query("Select * from olhabici.consulta");
        res.status(200).json(coordenadas.rows)
        //console.log(coordenadas)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        //console.log(error)
    }
    
})

//get filtered data
router.get('/getCoord', async (req, res) =>{

    //const obj = Object.entries(req.query)
    //console.log(obj[2][1])
    
    const dt_inicio1 = req.query.startdate
    const dt_inicio2 = JSON.stringify(dt_inicio1)
    console.log(dt_inicio2)

    const dt_fim1 = req.query.enddate
    const dt_fim2 = JSON.stringify(dt_fim1)
    console.log(dt_fim2)

    const cat_str= req.query.cat
    console.log('cat_str', cat_str)

   
    const cat_split = cat_str.split(',')
    console.log('cat_split', cat_split)
    
    

    
    try {
        const datafilter = await pool.query("select * from olhabici.consulta where dt_ocorrencia >= $1 and dt_ocorrencia <= $2 and cat_ocorrencia = any($3)", [dt_inicio2, dt_fim2, cat_split]);
        //console.log(req.params.startdate, req.params.enddate)
        res.status(200).json(datafilter.rows)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



//post data

router.post('/novaocorrencia', upload.single('image'), async (req, res) => {
    
   const {id_u, id_p, longitude, latitude, id_c, origem_id, destino_id, dt_ocorrencia} = req.body

    // process all other fields

    try{

        if(req.file){

            const {path, filename} = req.file

            // process image here

            const newOcc= await pool.query(`insert into olhabici.ocorrencia ( id_u, id_p, longitude, latitude, id_c, origem_id, destino_id, dt_ocorrencia, img_path, img_name) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING id_u, id_p, longitude, latitude, id_c, origem_id, destino_id, dt_ocorrencia, img_path, img_name`, 
            [id_u, id_p, longitude, latitude, id_c, origem_id, destino_id, dt_ocorrencia, path, filename])


            console.log('result ', newOcc.rows[0])
            res.status(201).send(newOcc.rows[0])
            
            
        }else{

        const newOcc= await pool.query(`insert into olhabici.ocorrencia ( id_u, id_p, longitude, latitude, id_c, origem_id, destino_id, dt_ocorrencia) values ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING id_u, id_p, longitude, latitude, id_c, origem_id, destino_id, dt_ocorrencia`, 
        [id_u, id_p, longitude, latitude, id_c, origem_id, destino_id, dt_ocorrencia])

        console.log(newOcc.rows[0])
        res.status(201).send(newOcc.rows[0])
                
        
    }
       
        
    } catch(error){

        res.status(500).json({message: error.message})



    }
})


router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const deletedId =await pool.query(`delete from olhabici.consulta where id_p = $1 returning id_p`, [id])
        res.status(201).send(deletedId.rows[0])
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

module.exports = router
/*
router.get('/coordenadas/:startdate/:enddate', async (req, res) =>{
    
    try {
        const datafilter = await pool.query("Select * from coleta_campo.consulta_coordenadas where dt between $1 and  $2", [req.params.startdate, req.params.enddate]);
        //console.log(req.params.startdate, req.params.enddate)
        res.status(200).json(datafilter.rows)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
*/




///filter by date

/*

router.get('/getCoord', async (req, res) =>{
   
    const startdate = req.query.startdate
    const enddate = req.query.enddate
    console.log(startdate)
    
    try {
        const datafilter = await pool.query("Select * from coleta_campo.consulta_coordenadas where dt between $1 and  $2", [req.query.startdate, req.query.enddate]);
        //console.log(req.params.startdate, req.params.enddate)
        res.status(200).json(datafilter.rows)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

*/


/*
//filter by date and cat_ilicito
router.get('/coordenadas/:startdate/:enddate/ilicitos/:ilicito', async (req, res) =>{

    try {
        const filtro= await pool.query("Select * from coleta_campo.consulta_coordenadas where dt between $1 and $2 and ilicito_desc = $3 ", 
        [req.params.startdate, req.params.enddate, req.params.ilicito]);
        res.status(200).json(filtro.rows)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//filter by date and cat_atividade
router.get('/coordenadas/:startdate/:enddate/:atividade', async (req, res) =>{
    try {
        const filter = await pool.query("Select * from coleta_campo.consulta_coordenadas where dt between $1 and  $2 and atividade_desc = $3 ", 
        [req.params.startdate, req.params.enddate, req.params.atividade]);
        res.status(200).json(filter.rows)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//filter all
router.get('/coordenadas/:startdate/:enddate/:atividade/ilicitos/:ilicito', async (req, res) =>{
    try {
        const allFilter = await pool.query("Select * from coleta_campo.consulta_coordenadas where dt between $1 and  $2 and atividade_desc = $3 and ilicito_desc = $4 ", 
        [req.params.startdate, req.params.enddate, req.params.atividade, req.params.ilicito]);
        res.status(200).json(allFilter.rows)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

*/



