import { createContext, useContext, useState, useReducer, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import {config} from './utils/url';
import axios from "axios";

//create contex

const URL= config.url



export const UserContext = createContext();



//Create Provider
export function UserContextProvider({children}){
    //const navigate = useNavigate()

    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        if(token && id){
            //api.defaults.headers.Authorization =`Bearer${JSON.parse(token)}`
            setAuthenticated(true);
            setUserId(id)
        }

        setLoading(false)


    }, []);

///
async function Login(dta) {
    console.log(dta)
    const response = await axios.post(`${URL}/users/login`, dta);

    
    const {data: {id_u, token}} = response
    console.log(id_u, token)
    //let token = data
    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('id', JSON.stringify(id_u))
    //api.defaults.headers.Authorization = `Bearer${token}`
    if(token){
        setAuthenticated(true);
        setUserId(id_u)
    }else{
        toast.error("problema de validação")
    }
    
   
    //redirect('/')

    console.log(URL)
    console.log(token)
    console.log(id_u)
    console.log(authenticated)
    console.log(response);
}

function Logout(){
    setAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('id')
    //api.defaults.headers.Authorization = undefined
    //redirect('/login1')
    
}



    


 


    return (

    <UserContext.Provider value ={{userId, authenticated, Login, Logout, loading }}>
            {children}
    </UserContext.Provider>

        

 

)

       
}

