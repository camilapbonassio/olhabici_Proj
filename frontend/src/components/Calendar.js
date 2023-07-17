import React, { useRef } from 'react';
import { useState, useEffect } from "react";
import {Calendar} from 'react-date-range';
import format from 'date-fns/format';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


const CalendarComp = ({value, setValue, handleChangeText}) => {
  const [ calendar, setCalendar] = useState('')
  const [open, setOpen]= useState(false)
  const refOne = useRef(null)

  useEffect(()=>{
    setCalendar(format(new Date(), 'yyyy/MM/dd'))
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  const hideOnClickOutside = (e) => {
    console.log(e.target)
    if(refOne.current && !refOne.current.contains(e.target)){
      setOpen(false)
    }
  }



  const handleSelect = (date) =>{
    console.log(date)
    setCalendar(format(date, 'yyyy/MM/dd'))
  }



  return (

    < div className='Calendar'>

      <input
      name = 'dt_ocorrencia' 
      value={ calendar }
      readOnly
      className='inputBox'
      onClick={ () => setOpen(open => !open)}
      onChange={handleChangeText}
      locale={"ptBR"}
      
      />

  <div ref = {refOne}>
    {open &&
    <Calendar
        date={new Date()}
        onChange={handleSelect}
        className='calendarElement'
      />
    }

  </div>

    </div>
  )
}

export default CalendarComp
