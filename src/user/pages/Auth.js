import { useState, useContext } from 'react';
// import  {BACKEND_URI} from "../../env.js";
import Card from '../../shared/components/UiEement/Card';
import Input from '../../shared/components/FormElement/Input';
import Button from '../../shared/components/FormElement/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/utils/Validators.js';
import { useForm } from '../../shared/hooks/Form-hook.js';
import { AuthContext } from '../../shared/context/auth-context.js';
import './Auth.css';
import ErrorModal from '../../shared/components/UiEement/ErrorModel.js';
import LoadingSpinner from '../../shared/components/UiEement/LoadingSpinner.js'
import { useHttpClient } from '../../shared/hooks/http-hook.js';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
const {isLoading,error,sendRequest,clearError}=useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(`http://localhost:3000/api/users/login`, 'POST', JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
          {
                'Content-Type': 'application/json'
              });
       console.log(responseData); 
    auth.login(responseData.user._id);
      } catch (error) {
        console.log(error)
      }
    } else {  
      try {
        const responseData = await sendRequest(`http://localhost:3000/api/users/signup`, 'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
         {
            'Content-Type': 'application/json'
          });
        console.log(responseData); 
    auth.login(responseData.user._id);
      } catch (error) {
        console.log(error)
      }
     
    }

  };

  return (
   <>
   {isLoading && <LoadingSpinner overlay/>}
   <ErrorModal error={error} onClear={clearError}/>
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
   </>
  );
};

export default Auth;
