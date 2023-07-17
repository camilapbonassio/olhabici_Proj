import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";


const initialState ={
    isLoading: false,
    info_perfil: []
}

const perfilInfoSlice = createSlice ({
    name: 'perfilInfo',
    initialState,
    reducers:{ 
        loadPerfilInfo(state, action) {
            state.info_perfil = action.payload
        }
          
    }
       
})
export const  {loadPerfilInfo} = perfilInfoSlice.actions;


export default perfilInfoSlice.reducer