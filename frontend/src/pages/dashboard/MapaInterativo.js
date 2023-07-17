import React from 'react'
import Mapping from '../../components/Mapping'
import Filtros from '../../components/Filtros'
//import FormDashboard from '../../components/FormDashboard'
import { TextField, Button, Checkbox } from '@mui/material';
//import axios from "axios"
import { useState } from "react"
import { useSearchParams} from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from "react-toastify"
import { filterFetch } from '../../slices/coordSlice'
import { useSelector, useDispatch } from 'react-redux';
//import DivDashboard from '../../components/DivDashboard';
import "./index.css";
import { Calendar } from 'react-date-range';



export default function MapaInterativo( ) {


 

  return (

    <div>

      <Mapping />
        
    </div>
  
    
    
  )
}
