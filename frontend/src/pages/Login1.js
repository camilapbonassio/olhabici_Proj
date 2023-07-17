import { useState, useEffect, useContext } from "react"
import Form1 from "../components/Form1.js"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, loginContext } from "../slices/userSlice";
import { UserContext } from '../Context';
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png"
import "./index_pages.css";
import { render } from "@testing-library/react";
import axios from "axios"


const initialState = {
    nome: '',
    email: '',
    password: '',
}

function Login1() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    
    //useContext
    const {Login, authenticated} = useContext(UserContext)



    //const {id_u, userData} = useSelector((state) => state.user)
    //const {id_uc, userDatac} = useSelector((state) => state.user)
    //const {id_u, nome, email} = userPData
    const [values, setValues] = useState(initialState)

    
  
    
    const handleChange = (e) =>{
        //console.log(e.target)
        const name = e.target.name;
        const value = e.target.value;
        setValues({ ...values, [name]: value})
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        //console.log(e.target)
        
        const { nome, email, password} = values
        console.log(nome, email, password)
        if(!nome || !email || !password ){
            
            toast.error("Preeencha os campos vazios")
            return;
        }else{
            Login({nome:nome, email:email, senha: password})
            //dispatch(loginUser(values))
            //dispatch(loginContext())
            //console.log("dispatch") 
            
       

    /*
    axios.post('http://localhost:8800/api/users/login',{
            email: email,
            senha: password,
            nome: nome
        })
        .then(res => {
           
                //console.log(res.data)
                //sessionStorage.setItem("token", res.data)
                const { id_u, nome, email} =res.data
                //dispatch(loginContext({id_u, nome, email}))
                //console.log("dispatch")  
                setUserPData({id_u: id_u, nome: nome, email: email})
                console.log(userPData)
                
                
              
               
                //toast.success("Bem -Vind@")        
            
        })
        .catch(error => console.log(error.response.data.message))
        //dispatch(loginUser(values))
        //dispatch(loadUser(null))
    */
       
    }

    
    
}


    
    useEffect(() =>{
        if(authenticated){
            navigate('/')
        }
    }, [authenticated, navigate]); 
    


    return(
        <div className="login-div">
            <div className="login-form login-form-w">
                <img className='login-logo' src={logo} alt='logo'/>

            </div>
            <form className='login-form' onSubmit={onSubmit}>
                
                <Form1 labelText ="Nome" type = 'text' name="nome" value = {values.nome} handleChange={handleChange}> </Form1>
                <Form1 labelText ="Email" type = 'email' name="email" value = {values.email} handleChange={handleChange}> </Form1>
                <Form1 labelText= "Senha" type = 'password' name="password" value = {values.password} handleChange={handleChange}> </Form1>
            

                <button type="submit" className="login-btn-form" >
                    Enviar 
                </button>

                <ul className="login-links">
                    <li><span>Esqueceu a senha?</span><a href="/PassRecover">Recuperar Senha</a></li>
                    <li><span>Usuário não cadastrado?</span><a href="/Register">Cadastrar usuário</a></li>
                </ul>
            </form>
        </div>
    )





}

export default Login1