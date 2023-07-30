import React from 'react'
import axios from "axios"
import { useState, useContext } from "react"
import { useEffect } from 'react';
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux';
import {loadPerfilInfo} from '../slices/perfilSlice'
//import { UserContext} from '../Context'
import "./index.css";
import { UserContext } from '../Context'
import {config} from '../utils/url'




const URL = config.url


const initialState = {
  nome_p: '',
  cor_raca: '',
  idade: '',
  genero: ''
}



export default function PerfilForm({ userPData, setUserPData, isPerfilDisabled, setPerfilDisabled, isOccDisabled, setOccDisabled}) {
  const dispatch = useDispatch()
  //const {id_u} = useSelector( state => state.user)
  //console.log(id_u)


  //const user = useSelector( state => state.user)
  //console.log(user)

  
  //console.log(userPData)
  //const {id_u, nome, email} = userPData 

  const {userId} = useContext(UserContext)
  let id_u = userId
  console.log(id_u)
 
  
 
 
  const [values, setValue] = useState(initialState)
  const [ raca, setRaca] = useState([])
  const [ genero, setGenero] = useState([])
  
 

  useEffect(() =>{
    fetch(`${URL}/genero`)
    .then(response => response.json())
    .then((data) =>setGenero(data));
  }, [])


console.log(genero)

  useEffect(() =>{
  fetch(`${URL}/cor_raca`)
  .then(response => response.json())
  .then((data) => setRaca(data));
}, [])

console.log(raca)

const resetForm = () => {
  let selects = document.querySelectorAll("select")
  selects.forEach(select => select.selectedIndex = 0)

}

 

 const handleChangeText = (e) =>{
  //console.log(e.target)
  const name = e.target.name;
  const value = e.target.value;
  setValue({ ...values, [name]: value})
  }

  const handleChangeAmount =(value) => {
    if (value < 1){
      setValue({...values, idade:18})
    } else if(value > 100){
      setValue({...values, idade: 100})
    }else if (value === ''){
      setValue('')
    }else {
      setValue({ ...values, idade: value})
    }
  }

  

const onSubmit = (e) =>{
  e.preventDefault()
  //console.log(user)

  
    
  //const {"0": {id_u}} = user
  const {nome_p, cor_raca, idade, genero} = values
 
 


  console.log( nome_p, cor_raca, idade, id_u)
  if(!nome_p || !cor_raca || !idade ){
    toast.error("Preeencha os campos vazios")
    return;
  }

  setValue(initialState)

  axios.post(`${URL}/novoperfil`, { nome_p: nome_p, cor_raca: cor_raca, genero:genero, id_u: id_u, idade: idade })
  .then(res => {
      if (res.status === 201){
        const { id_p, id_u, nome_p, genero, cor_raca, idade} =res.data
        dispatch(loadPerfilInfo({id_p: id_p, id_u: id_u, nome_p: nome_p, cor_raca: cor_raca, genero:genero, idade: idade }))
        toast.success("Dados enviados")        
        setPerfilDisabled(true)
        setOccDisabled(false)
      }
      } )
  .catch(error => console.log(error.response.data.message))
}

  
    return (
  
      <div className='filters'>

        <form  className='form' onSubmit={onSubmit} id='myForm'>   
      
            <div className='form_control'>

            <div className={isPerfilDisabled? "titulo-2-disabled": "titulo-2"}>Dados sobre o perfil</div>
              
             
              <input 
             
              disabled = {isPerfilDisabled}
              className={isPerfilDisabled ? "input-disabled": "input-enabled"}
              type = 'text'
              name = 'nome_p'
              value={values.nome_p}
              placeholder='Como que ser chamad@' 
              onChange={handleChangeText} />
          

              <input
              
              disabled = {isPerfilDisabled} 
              className={isPerfilDisabled ? "input-disabled": "input-enabled"}
              type = 'number'
              name='idade'
              value = {values.idade}
              placeholder='Idade'
              onChange={(e) => handleChangeAmount(e.target.value)} />
             

           
              <select 
            
              disabled= {isPerfilDisabled}
              className={isPerfilDisabled ? "select-disabled" : "select-enabled"}
              onChange={handleChangeText}
              name = "cor_raca">
                  
                  <option disabled selected>
                    Selecione cor ou raça
                  </option>
                  
                  
                  {raca.map((opts, i) => 
                    <option value={opts.id_r}>
                      {opts.cat_cor_raca}
                    </option>)}

                </select>

                <select
               
                disabled = {isPerfilDisabled} 
                className={isPerfilDisabled ? "select-disabled" : "select-enabled"} 
                onChange={handleChangeText}
                name = "genero">
                  
                  <option disabled selected>
                    Selecione o gênero
                  </option>
                  
                  
                  {genero.map((opts, i) => 
                    <option value={opts.id_g}>
                      {opts.cat_genero}
                    </option>)}

                </select>
                
                </div>

                <div className='form_control'>

                

                <button 
                type="submit" 
                className={isPerfilDisabled ? "btn-disabled": "btn"}
                disabled ={isPerfilDisabled}
                onClick={resetForm}
                
              
                
                
                >Enviar dados sobre perfil</button>

                </div>      
        </form>
      </div>
  )
}
