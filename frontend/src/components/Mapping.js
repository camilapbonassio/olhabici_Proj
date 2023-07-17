import * as React from 'react';
import { useRef, useState, useEffect} from 'react';
import {render} from 'react-dom';
import Map, {Marker, Popup} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import mapboxgl from 'mapbox-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useSelector, useDispatch } from 'react-redux';
import { ClassNames } from '@emotion/react';
import "./index.css";
import DivDashboard from './DivDashboard';
import {/*showPin*/ update_location} from '../slices/coordSlice'
import Overlay from './Overlay';
import {useMap, NavigationControl, GeolocateControl} from 'react-map-gl';
import Pin from './Pin';
import "./index.css";
import {config} from '../utils/url'


const URL = config.url
//const TOKEN = process.env.MAPBOX_TOKEN





const Mapping = () => {

  const mapRef = useRef()
  const dispatch = useDispatch();
  
  const {coordenadas,  location: {lng, lat}} = useSelector( state => state.occ)
 
  
  
  const [popupInfo, setPopupInfo] = useState(null);
  
  //const [zoomP, setZoomP] = useState({y:y, x:x });
  //const {y, x} = zoomP

  let ZPoints = useSelector((state) => state.occ.zoomPoint)
  
 
  
  
  
/*
  useEffect(() => {   
    
      if(longitude && latitude){
        console.log(latitude, longitude)
        setZoomP({lngY: longitude, latX:latitude})
        console.log(zoomP)
        const {lngY, latX} = zoomP

        function flyToPoint () {
          mapRef.current.flyTo({ 
          center: [lngY, latX],
          zoom: 15
        })
      }
      flyToPoint()

    }
    
  }, [latitude, longitude ]);
  */
  
  ////



  

  useEffect(() => {   
   
    if(ZPoints){
      console.log(ZPoints)
      
      const {x, y} = ZPoints
      console.log(x, y)

      function flyToPoint (y, x) {
        console.log(x,y)
        mapRef.current?.flyTo({ 
          center: [y, x],
          zoom: 15 })
       }

      flyToPoint(y, x)
      
    }
    

    /*
   if(x && y){
      console.log(zoomP)
      console.log(longitude, latitude)

      
      function flyToPoint () {
      mapRef.current.flyTo({ 
      center: [y, x],
      zoom: 15
  })
  }

  flyToPoint()
  
}
*/  
}, [ZPoints]);





/////















  //const [isOpen, setIsOpen] = useState(false);

  //const toggleOverlay = () =>{
  //  setIsOpen(!isOpen)
  //};

 
  //const [latLong, setLatLog] = useState({lat:0, lng:0})


  
  /*
  const handlePin = (c) => {
    dispatch(showPin(c))
  }
  */

 //const showLatLong = (e) => {
    //console.log(evt);
    //console.log(e.lngLat)
    //const { lat, lng } = e.lngLat
    //setLatLog({lat, lng})}
  
//console.log("coordenadas", latLong)







  return (

    <div>

    <Map mapLib={maplibregl}
      ref={mapRef}
      initialViewState={{
        
        latitude: lat,
        longitude: lng,
        zoom: 12
        
      }}
      style={{width: '100vw', height: '90vh', position: 'absolute', margin:'0px'}}
      mapStyle= 'https://api.maptiler.com/maps/hybrid/style.json?key=dld42vT5KtM3scAIfGdh'
      //onClick = {showLatLong}
      
    >
      {coordenadas.map(c =>(

        
        
         <Marker 
         key= {c.id_o}
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
         
         ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              <div>Data: {popupInfo.createdat || '' } </div>
              <div>Categoria: {popupInfo.cat_ocorrencia || ''}</div>
              {
                popupInfo.img_path? 
                <img width = '100%'  
                src={`${URL}/${popupInfo.img_path}`} 
                alt='imgCadastrada'/> :
               <div style={{fontWeight: 'bold'}} > no image </div>
              }
              
            </div>
            
          </Popup>
         )}

        
     
        <Marker 
        longitude= {lng} 
        latitude={lat}
        draggable
        onDragEnd={(e) => dispatch(update_location({lng: e.lngLat.lng, lat: e.lngLat.lat}))
        } 
        anchor="center"  />


      <NavigationControl />

      <GeolocateControl
      position = 'top-right'
      trackUserLocation
      //onGeolocate = {(e) => dispatch(update_location({lng: e.coords.longitude, lat: e.coords.latitude}))}
      />

    </Map>

    <Overlay />


    </div>
   
    )
}

export default Mapping



