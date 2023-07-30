import {React, useContext} from 'react';
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react"
import { useEffect } from 'react';
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux';
import {loadOcorrenciaInfo} from '../slices/ocorrenciaSlice'
import "./index.css";
import { isDisabled } from '@testing-library/user-event/dist/utils';
import { UserContext } from '../Context'
import {config} from '../utils/url'




const URL = config.url

const initialState = {
    id_c: null,
    origem_id:'',
    destino_id: '',
  }

export default function OcorrenciaForm({ isPerfilDisabled, setPerfilDisabled, isOccDisabled, setOccDisabled}) {
 const  dispatch = useDispatch()


  const { location: {lng, lat}} = useSelector( state => state.occ)
  const {info_perfil} = useSelector( state => state.perfilInfo)
  //const {user} = useSelector( state => state.user)
  //const {id_u} = useSelector( state => state.user)
  
  
  //console.log(userPData)
  //const {id_u} = userPData
  const {userId} = useContext(UserContext)
  let id_u = userId
  console.log(id_u)

  

  ///load data
  const [ categoria, setCategoria] = useState([])
  const [ distrito, setDistrito] = useState([])

  useEffect(() =>{
    fetch(`${URL}/categorias`)
    .then(response => response.json())
    .then((data) => setCategoria(data));
  }, [])

console.log(categoria)

useEffect(() =>{
    fetch(`${URL}/distritos`)
    .then(response => response.json())
    .then((data) => setDistrito(data));
  }, [])

  console.log(distrito)
  

  ///set data
  const [file, setFile] = useState();
  const [values, setValues] = useState(initialState)
  const [date_oc, selectedDate_oc] = useState(new Date());
  const [fileName, setFileName] = useState("")

  console.log(date_oc)
  

  const resetForm = () => {
    let selects = document.querySelectorAll("select")
    selects.forEach(select => select.selectedIndex = 0)
  
  }
 
  const handleFile = (e) =>{
    const file = e.target.files[0]
    
    setFile(file)
    console.log("file", file)
    setFileName(file.name)

  }

  const dateFormat = (date_oc) =>{
    //console.log( new Date(date));
    var dt = new Date(date_oc)
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
  
  const handleChangeText = (e) =>{
    //console.log(e.target)
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value})}
     
  
  ///send data
  const onSubmit = (e) =>{
    
    e.preventDefault()

    //const {"0": {id_u}} = user
    const {id_c, origem_id, destino_id} = values
    console.log(date_oc)
    //const dt_occ = dateFormat(date_oc)
    const dt_occ = date_oc
    const id_p = info_perfil.id_p

    console.log(id_p, id_u, lng, lat, id_c, origem_id, destino_id, dt_occ)

    const formData = new FormData()
    formData.append( 'image', file);
    formData.append( 'id_u', id_u)
    formData.append( 'id_p', id_p)
    formData.append( 'longitude', lng)
    formData.append( 'latitude', lat)
    formData.append( 'id_c', id_c)
    formData.append( 'origem_id', origem_id)
    formData.append( 'destino_id', destino_id)
    formData.append( 'dt_ocorrencia', dt_occ)
    
  if(!id_c || !origem_id || !destino_id || dt_occ === 'NaN-NaN-NaN'){
    toast.error("Preeencha os campos vazios")
    return;
  }


  setFile('')
  setFileName('')
  selectedDate_oc('')
          
  axios.post(`${URL}/novaocorrencia`, formData)
    .then(res => {
      if (res.status === 201){
        const { id_o, id_p, longitude, latitude, id_c, origem_id, destino_id, dt_occ} = res.data
        dispatch(loadOcorrenciaInfo({id_o, id_p, longitude, latitude, id_c, origem_id, destino_id, dt_occ}))
        toast.success("Dados enviados com suceso");
        setOccDisabled(true);}
      })
    .catch(error => console.log(error.response.data.message))

  }

  

  return (
   
    <div className='filters'>

        <form  className='form' onSubmit={onSubmit}>   
      
            <div className='form_control_coordinates'>

              <div 
                className={isOccDisabled ? "titulo-2-disabled": "titulo-2"}>
                  Arraste o pin azul até o local desejado 
                  </div>
             
              <input 
           
              className={isOccDisabled? "input-disabled a" : "input-enabled"}  
              type = 'text'
              name = 'longitude'
              value={lng}
              placeholder='Longitude' 
              onChange={handleChangeText} />

  
       

              <input 
             
              className={isOccDisabled? "input-disabled a" : "input-enabled"}
              type = 'text'
              placeholder='Latitude'
              name='latitude'
              value={lat}
              onChange={handleChangeText} />

            </div>

            <div className='form_control'>

            <div className={isOccDisabled ? "titulo-2-disabled": "titulo-2"}>
                  Selecione o problema observado
            </div>            

              <select
              disabled= {isOccDisabled}
              className={isOccDisabled? "select-disabled" : "select-enabled"} 
              onChange={handleChangeText}
              name = "id_c">
                  
                  <option disabled selected>
                    Selecione o problema
                  </option>
                  
                  
                  {categoria.map((opts, i) => 
                    <option value={opts.id_c}>
                      {opts.cat_ocorrencia}
                    </option>)}

                </select>

                <div 
                className={isOccDisabled ? "titulo-2-disabled": "titulo-2"}>
                  Selecione origem e destino do trajeto
                </div>

                <select
                disabled= {isOccDisabled}
                className={isOccDisabled ? "select-disabled" : "select-enabled"} 
                onChange={handleChangeText}
                name = "origem_id">
                  
                  <option disabled selected>
                    Selecione o local de origem
                  </option>
                  
                  
                  {distrito.map((opts, i) => 
                    <option value={opts.id_d}>
                      {opts.distrito}
                    </option>)}

                </select>

                <select
                disabled= {isOccDisabled}
                className={isOccDisabled ? "select-disabled" : "select-enabled"} 
                onChange={handleChangeText}
                name = "destino_id">
                  
                  <option disabled selected>
                    Selecione o local de destino
                  </option>
                  
                  
                  {distrito.map((opts, i) => 
                    <option value={opts.id_d}>
                      {opts.distrito}
                    </option>)}

                </select>

                {/*<Calendar handleChangeText = {handleChangeText} value={values} setValue={setValue}/>*/}
                
                <div 
                className={isOccDisabled ? "titulo-2-disabled": "titulo-2"}
                >Selecione a data em que foi o problema foi observado
                </div>
                

                <input 
                className={isOccDisabled? "input-disabled" : "input-enabled"}
                type = 'date'
                name='dt_ocorrencia'
                value={date_oc}
                onChange={(e)=>selectedDate_oc(e.target.value)} />

                   
                <div className='file-container' onChange={handleFile}>
                  <label for='arquivo' className={isOccDisabled ? "upload-disabled": "upload"}>
                    Anexar imagem 
                  </label>
                  <input 
                    name="arquivo"
                    id="arquivo"
                    type="file"
                    />
                  <div className={isOccDisabled ? "titulo-1-disabled": "titulo-1"}>
                    Nome do arquivo carregado: {fileName ? fileName : ""}
                  </div>
                </div>
                  
                
                

                
                </div>

                <div className='form_control'>

                <button 
                onClick={resetForm}
                type="submit" 
                className={isOccDisabled ? "btn-disabled": "btn"}
                disabled ={isOccDisabled}>
                  
                  Reportar problema
                  </button>

                 

                </div>
            </form>
      </div>

  )
}
