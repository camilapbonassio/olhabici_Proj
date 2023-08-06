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
import CoordPin from './CoordPin';


const URL = config.url
//const TOKEN = process.env.MAPBOX_TOKEN





const Mapping = () => {

  const mapRef = useRef()
  const dispatch = useDispatch();
  
  const coordenadas = useSelector( state => state.occ.coordenadas)

  //const {location: {lng, lat}} = useSelector( state => state.occ.location)

  const {lng, lat} = useSelector( state => state.occ.location)

  const [popupInfo, setPopupInfo] = useState(null);
  

  //const [zoomP, setZoomP] = useState({y:y, x:x });
  //const {y, x} = zoomP

  let ZPoints = useSelector((state) => state.occ.zoomPoint)
  
 

  

  useEffect(() => {   
   
    if(ZPoints){
      //console.log(ZPoints)
      
      const {x, y} = ZPoints
      //console.log(x, y)

      function flyToPoint (y, x) {
        //console.log(x,y)
        mapRef.current?.flyTo({ 
          center: [y, x],
          zoom: 15 })
       }

      flyToPoint(y, x)
      
    }
    

}, [ZPoints]);



  return (
    

    <div>
      {//console.log(coordenadas)
      }

    

    <Map mapLib={maplibregl}
      ref={mapRef}
      initialViewState={{
        
        latitude: lat,
        longitude: lng,
        zoom: 12, 
        maxBounds: [
          [ -48.5374, -16.2619], // Southwest coordinates
          [ -47.4119, -15.4854] // Northeast coordinates
          ]
       
        
      }}
      style={{width: '100vw', height: '90vh', position: 'absolute', margin:'0px'}}
      //mapStyle= "mapbox://styles/mapbox/streets-v9"
      mapStyle= 'https://api.maptiler.com/maps/hybrid/style.json?key=dld42vT5KtM3scAIfGdh'
      //onClick = {showLatLong}
      
    >
      
     
      
      {coordenadas.map(c =>(        
       <CoordPin key ={c.id_o} c={c} setPopupInfo={setPopupInfo} />
      ))}

      {popupInfo && popupInfo.createdat && (
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
                popupInfo.img_name? 
                <img width = '100%'  
                src={`${URL}/images/${popupInfo.img_name}`} 
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



