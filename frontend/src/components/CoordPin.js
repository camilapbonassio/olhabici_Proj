import React, {useState} from 'react'
import Pin from './Pin';
import Map, {Marker, Popup} from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux';

export default function CoordPin({id_o, c, setPopupInfo}) {

    



  return (
    <Marker 
         key= {id_o}
         longitude={c.longitude}
         latitude={c.latitude} 
         color={c.cor}
         //onClick={() => handlePin(c)}
         onClick={e => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation();
          setPopupInfo(c)
         }}
         >
          <Pin fill={c.cor}/>
    </Marker>








  )
}
