import React from 'react'
import "./index.css";
import { useSelector, useDispatch } from 'react-redux';

const DivDashboard = ()=> {

  const {coordinates, isLoading, pins} = useSelector( state => state.coord);
  //console.log(pins)
  
  
  return (
    <div className='show-content'>

      {pins.map(p =>(
        <div key={p?.id}>{p.descricao}</div>  
      ) 
      )}

    </div>


  );

}

export default DivDashboard
