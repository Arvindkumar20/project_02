// import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList';
import {useHttpClient} from "../../shared/hooks/http-hook.js";
import ErrorModel from "../../shared/components/UiEement/ErrorModel.js";
import LoadingSpinner from "../../shared/components/UiEement/LoadingSpinner.js";
import { useEffect, useState ,useContext} from 'react';
import { AuthContext } from '../../shared/context/auth-context.js';

const UserPlaces = () => {
  const [loadedPlaces,setLoadedPlaces]=useState();
  const {isLoading,error,clearError,sendRequest}=useHttpClient();
  const auth=useContext(AuthContext);
  const uid = auth.userId;

  useEffect(()=>{
    const fetchPlaces = async () => {
      try {
const responseData =await sendRequest(`http://localhost:3000/api/places/user/${uid}`)
        setLoadedPlaces(responseData.places);
      } catch (error) {
        // console.log(error)
      }
    }
    fetchPlaces();
  },[sendRequest,uid]);
  const placeDeleteHandler=(deletedPlace)=>{
setLoadedPlaces(prevPlaces=>prevPlaces.filter(place=>place.id!==deletedPlace))
  }
  return <>
<ErrorModel error={error} onClear={clearError}/>
  {isLoading && <div className='center'>
    <LoadingSpinner asOverlay />
  </div>
  }

 {!isLoading && loadedPlaces &&  <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler}/>}
  </>;
};

export default UserPlaces;
