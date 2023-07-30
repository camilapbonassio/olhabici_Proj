import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";

import {config} from '../utils/url'


const URL = config.url

export const allOccFetch = createAsyncThunk(
    "occ/allOccFetch", () => {
        const promise = axios.get(`${URL}/ocorrencia`)  //json
        const dataPromise = promise.then((response) => response.data)
        console.log(dataPromise)
        return dataPromise
    })


    /// estou usando axios
/*    
export const allCatOccFetch = createAsyncThunk(
    "occ/allCatOccFetch", () => {
        const promise = axios.get('http://localhost:8800/api/categorias')  //json
        const dataPromise = promise.then((response) => response.data)
        console.log(dataPromise)
        return dataPromise
        })
    */

export const filterFetch = createAsyncThunk(
    "occ/filterFetch", 
        async(parametros, thunkAPI) =>{
            try {
                //const { startdate, enddate} = {parametros}
                console.log(parametros.cat)                
                const response  = await axios.get(`${URL}/getCoord?startdate=${parametros.startdate}&enddate=${parametros.enddate}&cat=${parametros.cat}`, 
                { parametros: { startdate: parametros.startdate, enddate: parametros.enddate, ili: parametros.cat}})
                console.log("resposta", response.data)
                return response.data
                
            } catch (error) {
                return thunkAPI.rejectWithValue(error.response.data.message)
                
            }
            
        }
    );
    


const initialState ={
    isLoading: false,
    coordenadas: [],
    cat_ocorrencia: [],
    //pins: sessionStorage.getItem("pins") ? JSON.parse(sessionStorage.getItem("pins")):[],
    location: { lng: -47.949649, lat:-15.810361},
    //location: { lng:0, lat: 0}
    zoomPoint: { y:0, x:0}
}

const occSlice = createSlice ({
    name: 'occ',
    initialState,
    reducers:{ 
        /*
        //display point desc - DivDash Component
        showPin(state, action) {
            const pinObj= state.coordinates.filter(
                (coordinate) => coordinate.id === action.payload.id
            );
                console.log(pinObj)
                state.pins = pinObj
                //state.pins.push(pinObj);
                sessionStorage.setItem("pins", JSON.stringify(state.pins))
                //sessionStorage.setItem("pins", JSON.stringify(state.pins));
          },
        */
        update_location(state, action) {
            state.location = action.payload
        },
        update_zoomToPoint(state, action){
            console.log(action)
            //sessionStorage.setItem("zoomPoint", JSON.stringify(action.payload))
            state.zoomPoint = action.payload

        }
          
    },
    extraReducers:  (builder) => {

        builder.addCase(allOccFetch.pending, (state, {payload}) =>{
            state.isLoading = true;
        });

        builder.addCase(allOccFetch.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.coordenadas = action.payload
            
        });
        
        builder.addCase(allOccFetch.rejected, (state, {payload}) =>{
            state.isLoading = false;
            toast.error(payload)
            console.log(payload)
        });

        /*
        /// getl all ilicitos

        builder.addCase(allCatOccFetch.pending, (state, {payload}) =>{
            state.isLoading = true;
        });

        builder.addCase(allCatOccFetch.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.cat_ocorrencia = action.payload
            
        });
        
        builder.addCase(allCatOccFetch.rejected, (state, {payload}) =>{
            state.isLoading = false;
            toast.error(payload)
            console.log(payload)
        });

        */


        //dateRange

        builder.addCase(filterFetch.pending, (state, {payload}) =>{
            state.isLoading = true;
        });

        builder.addCase(filterFetch.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.coordenadas = action.payload
            
        });
        
        builder.addCase(filterFetch.rejected, (state, {payload}) =>{
            state.isLoading = false;
            toast.error(payload)
            console.log(payload)
        });

        

    }

       
})
export const  {update_location, update_zoomToPoint} = occSlice.actions;


export default occSlice.reducer


