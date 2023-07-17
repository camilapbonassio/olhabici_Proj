import React from 'react'
import "./index.css";

export default function AddButton({isOccDisabled, isPerfilDisabled, setOccDisabled, setPerfilDisabled}) {

const handleClick = (e) => {
    setPerfilDisabled(false)
    setOccDisabled(true)
}

  return (
    <button 
    className='btn'
    type="submit"
    onClick={handleClick} >
    Adicionar novo local
    </button>
  )
}
