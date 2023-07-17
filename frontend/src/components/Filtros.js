import React from 'react'

//import FormDashboard from '../../components/FormDashboard'
//import axios from "axios"
import { useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useSearchParams} from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from "react-toastify"
import { filterFetch } from '../slices/coordSlice'
import { useSelector, useDispatch } from 'react-redux';
//import DivDashboard from '../../components/DivDashboard';
import "./index.css";
//import { Calendar } from 'react-date-range';
import {config} from '../utils/url'


const URL = config.url



export default function MapaInterativo( ) {

//const {coordenadas, isLoading} = useSelector( state => state.occ)

const dispatch = useDispatch();

const initialState = {
  end: new Date(),  
  start: new Date()
}
  
const [parametros, setParametros] = useState(initialState);
const [datas, setDatas] = useState('')

const [cat, setCat] = useState([]);
console.log(parametros)
//const [startdate, setStartdate] = useState(new Date());
//const [enddate, setEnddate] = useState(new Date());
//const [show, setShow] = useState(false)
//const [searchParams, setSearchParams] = useSearchParams(); // mudar url?

/// axios get categorias
useEffect(() =>{
  fetch(`${URL}/api/categorias`)
  .then(response => response.json())
  .then((data) => setCat(data));
}, [])

const goToURL = ( ) =>{
  console.log(parametros, cat)

}



const handleChange = (e) => {
  const {name, checked} = e.target;
  if (name === "select-all-checkbox"){
    let tempCat = cat.map(i => {
      return { ...i, isChecked: checked}})
    
    console.log("allCategories", tempCat);
    setCat(tempCat)
  
  }else{
    let tempCat = cat.map( (i) => 
    i.cat_ocorrencia === name ? { ...i, isChecked : checked} : i)
    
    console.log("singleCategories", tempCat);
    setCat(tempCat)
  }
  
  console.log("categorias", cat)
}

//console.log(ili)



const handleDate= (e) =>{
  //console.log(e.target)
  const name = e.target.name;
  const value = e.target.value;
  setParametros({ ...parametros, [name]: value})
  setDatas({ ...datas, [name]: value})

}

const dateFormat = (date) =>{
    //console.log( new Date(date));
    var dt = new Date(date)
    console.log(dt)
    var month = '' + (dt.getMonth() + 1)
    var day = '' + dt.getDate()
    var year = '' + dt.getFullYear()

    if(month.length < 2){
       month = '0' + month
    }
    if( day.length < 2){
      day = '0' + day 
    }

 console.log([year, month, day].join('-'))
    return [year, month, day].join('-');
  }




const onSubmit = (e) =>{

  e.preventDefault()

  //const { start, end} = parametros
  //const startdate = dateFormat(start)
  //const enddate = dateFormat(end)
  
  const {start, end} = datas
  const startdate = start
  const enddate = end

  console.log(startdate, enddate, cat, cat.length)

//categorias 
  const tempdata1= cat.filter(e => e.isChecked === true)
  console.log (tempdata1)

  //const tempdata2 = tempdata1.map( e => e.id_c)
  //console.log (tempdata2)

  const tempdata2 = tempdata1.map( e => e.cat_ocorrencia)
  console.log (tempdata2)


//validacao

let array = []
  function validacao(){
    tempdata1.map( e => array.push(e.cat_ocorrencia))
    return array
  }
  validacao()
  console.log('array', array)

  if(!start || !end || array.length < 1){
    console.log( "campos vazios", cat)
    toast.error("Preeencha os campos vazios")
    return;
  }



  dispatch(filterFetch( {startdate: startdate, enddate: enddate, cat: tempdata2}))
        console.log( "info enviada",startdate, enddate, tempdata2)


}
       
 

  return (

    <div>

     
        
      <div className='filters'>

        <form className='filter-form' onSubmit={onSubmit}>

        <div className='titulo'>Selecione o período:</div>
        
        <div className='filter-form-fields'> 

        <input 
        type = 'date'
        name='start'
        value={parametros.start}
        onChange={handleDate} />

        <input 
        type = 'date'
        name='end'
        value={parametros.end}
        onChange={handleDate} /> 




        
        {/*<input 
          type = 'text'
          name = 'startdate'
          value={parametros.startdate}
          placeholder='Data inicial' 
          onChange={handleChangeText} />



          <input 
            type = 'text'
            name = 'enddate'
            value={parametros.enddate}
            placeholder='Data final' 
            onChange={handleChangeText}/> */}  
          
          </div>

          <div className='titulo'>Selecione as categorias:</div> 



          <div className='filter-form-checkbox'> 

            

            
            { cat.map((i) => (
              <div className='checkbox'>


                <div style={{backgroundColor: i.cor}} className='color'></div>
               
                <input
                  type="checkbox"
                  name = {i.cat_ocorrencia}
                  className='check-input' 
                  checked = {i?.isChecked || false}
                  onChange={handleChange}/>

                <label className='check-label'>{i.cat_ocorrencia}</label>
              
              </div>))}

              <div className='checkbox'>
             
                <input
                  type="checkbox"
                  name = "select-all-checkbox"
                  className='check-input-todas' 
                  checked = {cat.filter((i) => i?.isChecked !== true).length < 1}
                  onChange = {handleChange}/>

                <label className='check-label-todas'>Selecionar todas as opções</label> 

            </div>

           
           </div>

            <button 
            onClick = {goToURL}
            className='btn-form' type="submit" >Enviar</button>

        </form>
    </div>
           
        
      
        


        </div>
  
    
    
  )
}
