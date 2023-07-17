import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route, redirect} from "react-router-dom";
import Login1 from "./pages/Login1"
import Erro from './pages/Erro';
import PassRecover from './pages/PassRecover';
import Register from './pages/Register';
import AdicionarCoordenada from "./pages/dashboard/AdicionarCoordenada";
import Estatisticas from "./pages/dashboard/Estatisticas"
import MapaInterativo from "./pages/dashboard/MapaInterativo"
import SharedLayout from "./pages/dashboard/SharedLayout"
//import ProtectedRoute from './pages/dashboard/ProtectedRoute';
import { UserContext, UserContextProvider } from './Context';
import {React, useContext} from 'react';
import { Navigate } from "react-router-dom";

/*
const CustomRoute = (isPrivate) => {
  const { authenticated, loading } =useContext(UserContext);
    if(loading){
      return <h1>loading...</h1>
  }
  if (isPrivate && !authenticated) {
     redirect("/login1")
  }
  return <Route {...rest} />
}*/



const ProtectedRoute = ({children}) => {
  

  const { authenticated } = useContext(UserContext)
  return authenticated? children: <Navigate to ='/login1' replace />
  
  }
  






function App() {
  return (
    <div className="App">
    <UserContextProvider >
      <BrowserRouter>
     
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <SharedLayout/>
            </ProtectedRoute>
          }>
            <Route isPrivate index element = {<MapaInterativo />} />
            <Route path="/estatisticas" element = {<Estatisticas />} />
            <Route path="/adicionar-coordenada" element = {<AdicionarCoordenada />} />
          </Route> 
          
          <Route path="/login1" element={<Login1 />} />
          <Route path="/register" element={<Register />} /> 
          <Route path ="/PassRecover" element = {<PassRecover />}/> 
          <Route path="*" element = {<Erro />}/>

        </Routes>
      
        <ToastContainer/>
      
      </BrowserRouter>
    </UserContextProvider>
    </div>
  );
}

export default App;
