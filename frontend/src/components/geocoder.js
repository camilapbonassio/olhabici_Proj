import MapboxGeocoder, {GeocoderOptions} from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const Geocoder = () =>{
   const ctrl = new MapboxGeocoder({
    accessToken: ,
    marker: false,
    collapsed: true
   })
   useControl(() => ctrl);
   ctrl.on('result', (e) => {
      const coords = e.result.geometry.coordinates;
      dispatch(update_location({lng: coords[0], lat: coords[1]}))
   });
   return null;
}

export default Geocoder;