import React from 'react'
import "../pages/index_pages.css"

const Form1 =({type, name, value, handleChange, labelText}) => {
  return (
    <div className='login-div-input'>
        <label htmlFor={name} className='login-titulo-2'>{labelText}</label>
        <input
        type={type}
        name={name}
        value={value}
        onChange = {handleChange}
        className="login-input"/>

    </div>
  )
}

export default Form1 