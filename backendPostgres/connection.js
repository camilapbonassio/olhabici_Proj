require('dotenv').config();
const {Client} = require('pg')

const client = new Client( {
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: process.env.DIALECT
});

module.exports = client;

/*
client.connect();

client.query(`Select * from coleta_campo.cat_ilicitos`, (err, res)=>{
  if(!err){
    console.log(res.rows)
  }else{
    console.log(err.message)
  }
  client.end;
})

*/
