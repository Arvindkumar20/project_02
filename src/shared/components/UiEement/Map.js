import { useRef, useEffect } from 'react';

import './Map.css';

const Map = props => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);
  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;

// import axios from 'axios';

// const options = {
//   method: 'GET',
//   url: 'https://google-map-places.p.rapidapi.com/maps/api/geocode/json',
//   params: {
//     address: '1600 Amphitheatre+Parkway, Mountain View, CA',
//     language: 'en',
//     region: 'en',
//     result_type: 'administrative_area_level_1',
//     location_type: 'APPROXIMATE'
//   },
//   headers: {
//     'x-rapidapi-key': 'Sign Up for Key',
//     'x-rapidapi-host': 'google-map-places.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }