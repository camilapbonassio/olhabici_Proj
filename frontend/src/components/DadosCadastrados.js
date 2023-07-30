import {React, useContext} from 'react';
import { useState } from "react"
import { useEffect } from 'react';
import { toast } from "react-toastify"
import { UserContext } from '../Context'
import axios from 'axios';
import "./index.css";
import { useSelector, useDispatch } from 'react-redux';
import {update_zoomToPoint} from '../slices/coordSlice';
import {config} from '../utils/url'


const URL = config.url

export default function DadosCadastrados() {

  const {zoomPoint: {longitude, latitude}} = useSelector( state => state.occ)
  
  const {userId} = useContext(UserContext)
   
  const [ data, setData] = useState([])
  console.log(data)

  const dispatch = useDispatch();
  
  

    /*

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
          // get the data from the api
          const data = await fetch('http://localhost:8800/api/ocorrencia');
          // convert the data to json
          const json = await data.json();
          console.log(json)
          let filtered = json.filter((j => j.id_u === userId))
          console.log(filtered)
      
          // set state with the result
          //setData(json);
        }
      
        // call the function
        fetchData()
          // make sure to catch any error
          .catch(console.error);;
      }, [])


*/

useEffect(() => {
  axios.get(`${URL}/ocorrencia`)
  .then(response => {
   const {data} = response
   console.log(data)
   console.log(userId)
   const result = data.filter((dt)=> dt.id_u == userId)
   console.log(result)
   setData(result)

  })

}, []);

const deletePin = (id) =>{
  axios.delete(`${URL}/${id}`)
.then(res => {
  if (res.status === 201){
    console.log(res)
    console.log(id)
    toast.success("Dado removido")  
    console.log(data)
    let newData = data.filter(dt => dt.id_p !== id) 
    console.log(newData)
    setData(newData)     
  }
  } )
.catch(error => console.log(error.response.data.message))

} 





    
 
  return (

    <>

    <div className='dadosCadastrados'>
    <>
      <div className='show' >Data</div>
      <div className='show'>Categoria</div>
      <div className='show'>Imagem</div>
      <div className='show'>Deletar</div>

  
     {data.map(dt => 

      <>
      {console.log(typeof(dt.longitude))}
   
      <div className='show'  >     
        <div>{dt.createdat}</div>
      </div>
     
    
      
      <div className='show' >
        <div>{dt.cat_ocorrencia}</div>
      </div>
     
      <div> 
        {dt.img_path? 
      <div className='show'>
        <img className='img_cadastrada' 
        src={`${URL}/images/${dt.img_name}`} 
        alt='imgCadastrada'/>
      </div> : 
        <div className='show' >
          não há imagem cadastrada
        </div>
        }
      </div>

      <div className='dadosCadastrais-button'>
      
      <button className='button-button'
      onClick={() => deletePin(dt.id_p)}>
      <div className = 'x'>X</div>
      </button> 

      <div 
      style={{textDecoration: 'underline', color:'blue', cursor:'pointer'}}
      onClick={() => dispatch(update_zoomToPoint({y: dt.longitude, x: dt.latitude}))}
      >flyTo

      </div>
      
      </div>
 
      
    
      <div className=' borda_dados_cadast'></div>
      <div className=' borda_dados_cadast'></div>
      <div className=' borda_dados_cadast'></div>
      <div className=' borda_dados_cadast'></div>
      </>
      
      )}

    

      </>
      </div>

      <div className='botao_dados_cadastrais'>
      <>
      
      </>
      
    </div>
    </>
    
    
  )
}
