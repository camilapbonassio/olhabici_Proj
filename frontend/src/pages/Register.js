import { useState, useEffect } from "react"
import Form1 from "../components/Form1"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from "../slices/userSlice"
import { useNavigate } from "react-router-dom";
import "./index_pages.css";

const initialState = {
    nome: '',
    email: '',
    password: '',
}

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { isLoading, register} = useSelector((state) => state.user)
    console.log(register)
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
        if(!nome || !email || !password ){
            toast.error("Preeencha os campos vazios")
            return;
        }
        dispatch(registerUser({email: email, password: password, nome:nome}))

    }

    useEffect(() =>{
        if(register){
            console.log(register)
            navigate('/login1')
        }
    }, [register, navigate]);



    return(
        <div className="login-div">
        <form className='login-form' onSubmit={onSubmit}>
        <h2 className="login-titulo-1">Novo usuário</h2>
            <Form1 labelText ="Nome" type = 'text' name="nome" value = {values.nome} handleChange={handleChange}> </Form1>
            <Form1 labelText ="Email" type = 'email' name="email" value = {values.email} handleChange={handleChange}> </Form1>
            <Form1 labelText= "Senha" type = 'password' name="password" value = {values.password} handleChange={handleChange}> </Form1>

            <button type="submit" className="login-btn-form" disabled={isLoading}>
                Cadastrar novo usuário
            </button>

            <ul className="login-links">
                <li><a href="/Login1">Voltar para a página inicial</a></li>
            </ul>
        </form>
        </div>
    )





}

export default Register