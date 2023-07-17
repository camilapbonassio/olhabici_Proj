import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";


const initialState ={
    isLoading: false,
    info_ocorrencia: []
}

const ocorrenciaInfoSlice = createSlice ({
    name: 'ocorrenciaInfo',
    initialState,
    reducers:{ 
        loadOcorrenciaInfo(state, action) {
            state.info_ocorrencia = action.payload
        }
          
    }
       
})
export const  {loadOcorrenciaInfo} = ocorrenciaInfoSlice.actions;


export default ocorrenciaInfoSlice.reducer