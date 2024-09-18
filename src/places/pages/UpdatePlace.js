import  { useEffect, useState,useContext } from 'react';
import { useParams,useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElement/Input';
import Button from '../../shared/components/FormElement/Button';
import Card from '../../shared/components/UiEement/Card';
import LoadingSpinner from '../../shared/components/UiEement/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/utils/Validators.js';
import { AuthContext } from '../../shared/context/auth-context.js';
import { useForm } from '../../shared/hooks/Form-hook.js';
import './PlaceForm.css';
import {useHttpClient} from '../../shared/hooks/http-hook.js';
import ErrorModel from "../../shared/components/UiEement/ErrorModel.js"
const UpdatePlace = () => {
  const  auth=useContext(AuthContext);
  const histiry=useHistory();
  const placeId = useParams().placeId;
  const [loadedPlace,setLoadedPlace]=useState();
const {sendRequest,error,clearError,isLoading}=useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

useEffect(()=>{
  const fetchPlace = async () => {
  try {
   const reseponseData=await sendRequest(`http://localhost:3000/api/places/${placeId}`);
   setLoadedPlace(reseponseData.place)
   setFormData(
    {
      title: {
        value: reseponseData.place.title,
        isValid: true
      },
      description: {
        value:reseponseData.place.description,
        isValid: true
      }
    },
    true
  );
    
  } catch (error) {
   console.log(error) 
  }
}
fetchPlace();
},[sendRequest,placeId,setFormData])


  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
try {
 await sendRequest(`http://localhost:3000/api/places/${placeId}`,'PATCH',JSON.stringify({
    title:formState.inputs.title.value,
    description:formState.inputs.description.value
  }),
  {
    'Content-Type':'application/json'
  }
);
histiry.push('/'+auth.userId+'/places');
} catch (error) {
  console.log(error)
}

  };
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay/>
      </div>
    );
  }
  if (!loadedPlace&&!error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }



  return (
  <>
  <ErrorModel error={error} onClear={clearError}/>
   {!isLoading && loadedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={loadedPlace.title}
        initialValid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={loadedPlace.description}
        initialValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>}
  </>
  );
};

export default UpdatePlace;

