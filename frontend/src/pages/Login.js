import { useState, useEffect } from "react"
import Form from "../components/Form"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, loginUser } from "../slices/userSlice"
import { useNavigate } from "react-router-dom";
import "./index_pages.css";

const initialState = {
    nome: '',
    email: '',
    password: '',
}

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    console.log(user)
    
    const [values, setValues] = useState(initialState)
    console.log(values)

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
        }
        dispatch(loginUser(values))
        
        console.log("dispatch")

    }


    useEffect(() =>{
        if(user.id_u){
            console.log(user.id_u)
            navigate('/')
        }
    }, [user.id_u, navigate]);

    return(
        <div className="login-div">
            <form  onSubmit={onSubmit}>
                <h3>Login</h3>
                <Form type = 'text' name="nome" value = {values.nome} handleChange={handleChange}> </Form>
                <Form type = 'email' name="email" value = {values.email} handleChange={handleChange}> </Form>
                <Form type = 'password' name="password" value = {values.password} handleChange={handleChange}> </Form>
            

                <button type="submit" className="login-btn-form" disabled={isLoading}>
                    Submit
                </button>
        </form>
        </div>
    )





}

export default Login