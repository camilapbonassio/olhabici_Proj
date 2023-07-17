import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";
import { getUserFromLocalStorage, addUserToLocalStorage, removeUserFromLocalStorage } from "../utils/localStorageFunctions";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {config} from '../utils/url'


const URL = config.url


export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(data, thunkAPI) =>{
        console.log(data)
        //console.log(`Login User: ${JSON.stringify(user)}`);
        try {
            const resp = await axios.post(`${URL}/api/users/login`,{
                email: data.email,
                senha: data.password,
                nome: data.nome
            });
            console.log(resp)

            //sessionStorage.setItem("token", resp.data)
    
            return resp.data
        } catch (error) {
            //toast.error(error.response.data.message)
            return thunkAPI.rejectWithValue(error.response.data.message)
            
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(user, thunkAPI) =>{
        console.log(user)
        try {
            const resp = await axios.post(`${URL}/api/users/r/register`, user)
            console.log(resp)
            return resp.data
        } catch (error) {
            //toast.error(error.response.data.message)
            return thunkAPI.rejectWithValue(error.response.data.message)
            
        }
    }
)


const initialState ={
    //token: sessionStorage.getItem("token"),
    //nome: "",
    //email: "", 
    isLoading: false,
    //user: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")):null,
    register: null,
    id_u: null,
    userData:{nome: '',  email:''},
    id_uc: null,
    userDatac:{nome: '',  email:''}
}

const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers:{
        /*
        logoutUser(state){
            //sessionStorage.removeItem("token")
            
            
            state.userData = {nome: '', email:''}
            state.id_u = null
            
            
       
        }, */

        
        loginContext(state, action){
            
            const temp = { ...action.payload}
            console.log(temp.id_u)

            state.id_uc = temp.id_u
            state.userDatac = {nome: temp.nome, email:temp.email}

            console.log(state.id_uc, state.userDatac)

        }

       /* loadUser(state, action, payload){
            //console.log(payload)
            const token = action.payload;
            if (token){
                const user = jwtDecode(token);
                console.log(user)

                return{
                    ...state, 
                    token,
                    nome: user?.nome,
                    email: user?.email,
                    id_u: user?.id_u
                }
            }
        } */
    },
    extraReducers:  (builder) => {

        builder.addCase(loginUser.pending, (state, {payload}) =>{
            state.isLoading = true;
        });

        builder.addCase(loginUser.fulfilled, (state, action) =>{
            //const {user} = payload;
            state.isLoading = false;

            //sessionStorage.setItem("token", action.payload)

            toast.success("Bem-vind@");
            console.log(action.payload)

            const temp = { ...action.payload}
            console.log(temp.id_u)
            state.userData = {nome: temp.nome, email:temp.email}
            state.id_u = temp.id_u

            console.log(state.id_u, state.userData)
            
            
         
            

            
            //sessionStorage.setItem("token", JSON.stringify(state.token))
            
        });
        
        builder.addCase(loginUser.rejected, (state, {payload}) =>{
            state.isLoading = false;
            toast.error(payload)
            console.log(payload)
        });


        //register

        builder.addCase(registerUser.pending, (state, {payload}) =>{
            state.isLoading = true;
        });

        builder.addCase(registerUser.fulfilled, (state, action) =>{
            //const {user} = payload;
            //toast.success("Bem-vind@");

            state.isLoading = false;

            const temp = { ...action.payload}
            state.register = temp;
            //sessionStorage.setItem("user", JSON.stringify(state.user))
            
        });
        
        builder.addCase(registerUser.rejected, (state, {payload}) =>{
            state.isLoading = false;
            toast.error(payload)
        });


    }

       
})

export default userSlice.reducer
export const { loginContext } = userSlice.actions