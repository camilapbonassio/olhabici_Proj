import {React, useContext} from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {FaBars} from 'react-icons/fa'
import { FiArrowRight } from "react-icons/fi";
import logo from "../img/logo.png"
import {links} from "../data/data"
import { SideBarData } from '../data/data';
import "./index.css";
import { useSelector, useDispatch } from 'react-redux';
//import { logoutUser } from '../slices/userSlice';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Context';

const Navbar = () => {

//const {user} = useSelector((state) => state.user);
const navigate = useNavigate()
const dispatch = useDispatch();
const [showLink, setshowLink] = useState(false);
//const user = useSelector((state) => state.user)

const { Logout } = useContext(UserContext)




const toggleLinks = () =>{
  setshowLink(!showLink)
}


  return (
    <nav>
     
      <div className='nav-center'>
      
        
        <div className='nav-header'>
        
          <img className='logo' src={logo} alt='logo'/>

          { /*<div className='link-container'>
            
            <ul className='links'>
              {SideBarData.map((item, index)=>{
              return <li key={index}>
                  <a href={item.path}>{item.title}</a>
                </li>
              })}
            </ul>

            </div> */}

          <div className='sair-btn'>
              <button
              type='button'
              className='btn-nav'
              //onClick = {(e) => dispatch(logoutUser())}
              //onClick = {() => dispatch(logoutUser())  }>
              onClick = {Logout}>
                Sair
                </button>
          </div>
          
         
        
        </div>

        
        
        

      
        
      
      {/*mobile*/}


    <div className='nav-mobile'>
    <div className='nav-header-mobile'>
        <img className='logo' src={logo} alt='logo'/>
        <div className='sair-btn-mobile'>
              <button
              type='button'
              className='btn-nav'
              //onClick = {(e) => dispatch(logoutUser())}
              //onClick = {() => dispatch(logoutUser())  }>
              onClick = {Logout}>
                Sair
                </button>
          </div>
        
        {/*<button className='nav-toggle-mobile' onClick={toggleLinks}><FaBars /></button>*/}
    </div>
    
   
   
      </div>



    </div>
    

    </nav>
  )
}


export default Navbar

/*
<nav className='side-bar-menu'>
        <ul className='side-bar-menu-items'>
          
          {SideBarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
          )}
          
          )}
        </ul>
      </nav>
      */