import React, { Fragment } from 'react'
import "./index.css"
import { useMap } from 'react-map-gl'
import PerfilForm from './PerfilForm'
import DadosCadastrados from './DadosCadastrados'
import OcorrenciaForm from './OcorrenciaForm'
import Filtros from './Filtros'
import { useRef, useState, useEffect} from 'react';
import {FaBars} from 'react-icons/fa'
import AddButton from './AddButton'
import { UserContext} from '../Context'
import axios from "axios"



export default function Overlay() {

  const [tab, setTab] = useState(1)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isPerfilDisabled, setPerfilDisabled] = useState(false)
  const [isOccDisabled, setOccDisabled] = useState(true)

  //const { userPData, setUserPData} = useContext(UserContext)
  //console.log(userPData.id_u)
  
 
  

  return (

    
  <div className='overlay-container'>
  { showSidebar ?  (
    
    <Fragment>
    <div className='overlay-map'>


    <div className='ov ov-mobile'>
        <div 
          className='overlay-map-button-close close-mobile'
          onClick={() => setShowSidebar(!showSidebar)}>
            X
        </div>
    </div>

    

    
    
    
      <ul className='tab'>
        <li className='tab1' onClick={()=> setTab(1)}>Busca</li>
        <li className='tab1' onClick={() => setTab(2)}>Adicionar local</li>
        <li className='tab1' onClick={()=> setTab(3)}>Seus locais</li>
      </ul>

      
              {tab === 2 ? (
              <div className= 'overlay'>
              <PerfilForm setPerfilDisabled={setPerfilDisabled} isPerfilDisabled={isPerfilDisabled} setOccDisabled={setOccDisabled} isOccDisabled={isOccDisabled}/> 
              <OcorrenciaForm setPerfilDisabled={setPerfilDisabled} isPerfilDisabled={isPerfilDisabled} setOccDisabled={setOccDisabled} isOccDisabled={isOccDisabled} />
              {isOccDisabled && isPerfilDisabled ?  (
                <AddButton setPerfilDisabled={setPerfilDisabled} isPerfilDisabled={isPerfilDisabled} setOccDisabled={setOccDisabled} isOccDisabled={isOccDisabled}/>
              ): ("")}
              
              </div>) : 
              (<div className= 'overlay'></div>)
              }

              {tab === 1 ? (
              <div className= 'overlay'>
              <Filtros/>
              </div>) : 
              (<div className= 'overlay'></div>)
              }

              {tab === 3 ? (
              <div className= 'overlay'>
              <h1> Locais cadastrados </h1>
              <DadosCadastrados />
              </div>) : 
              (<div className= 'overlay'></div>)
              }

    </div>
    </Fragment>
    
    ) : (

      <div 
      className='overlay-map-button-open open-mobile'
      onClick={() => setShowSidebar(!showSidebar)}><FaBars /></div>




        

      )}
    </div>

  )

      }