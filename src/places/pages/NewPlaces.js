import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElement/Input';
import Button from '../../shared/components/FormElement/Button';
import ErrorModel from '../../shared/components/UiEement/ErrorModel';
import LoadingSpinner from '../../shared/components/UiEement/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/utils/Validators.js';
import { useForm } from '../../shared/hooks/Form-hook.js';
import { useHttpClient } from '../../shared/hooks/http-hook.js';
import { AuthContext } from '../../shared/context/auth-context.js';
import ImageUpload from '../../shared/components/FormElement/ImageUpload.js'
import './PlaceForm.css';
const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );
  const history = useHistory();
  const placeSubmitHandler = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', formState.inputs.title.value);
    formData.append('description', formState.inputs.description.value);
    formData.append('address', formState.inputs.address.value)
    // formData.append('creator',auth.userId);
    formData.append('image', formState.inputs.image.value);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/new`,
        'POST',
        formData,
        { Authorization: 'Bearer ' + auth.token }
      );
      history.push('/');
    } catch (err) {
      // console.log(err)
    }
  };
  return (
    <React.Fragment>
      <ErrorModel error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload id='image' onInput={inputHandler} errorText="Please provide an image" />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};
export default NewPlace;
