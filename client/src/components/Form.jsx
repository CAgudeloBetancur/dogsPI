import { useEffect, useState } from 'react';
import {useLocation,NavLink} from 'react-router-dom';
import Logo from './Logo';
import {FaUserCircle,FaUserPlus} from 'react-icons/fa';
import logSignValidations from "../logSignValidations";

function Form({login,signup,confirm}) {

  const currentLocation = useLocation();

  const [location, setLocation] = useState(currentLocation.pathname);

  const [errors, setErrors] = useState({
    name: [],
    password: [],
    email: []
  });

  const [nomElem,setNomElem] = useState('');

  const [existErr,setExistErr] = useState(false);

  useEffect(()=>{
    if(
      errors.name.length > 0 ||
      errors.password.length > 0 ||
      errors.email.length > 0
    ) {
      setExistErr(true);
    } else {
      setExistErr(false);
    }
  },[errors])

  // Apply conditional spreading to the name property
  // Only added to the object if we are in the "/signup" route
  const [userData,setUserData] = useState({
    email: '',
    password: '',
    ...(location === '/signup' ? {name : ''} : {})
  })

  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(()=>{
    if(location === '/signup') {
      logSignValidations(nomElem,errors,setErrors,userData);
      if(userData.email !== '' && userData.password !== '' && userData.name !== '') setShowError(false);
    }
    if(location === '/login') {
      if(userData.email !== '' && userData.password !== '') setShowError(false);
    }
  },[userData])


  const handleInputChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name] : event.target.value
    })
    setNomElem(event.target.name);
  }

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    if(
      userData.name !== '' &&
      userData.password !== '' &&
      userData.email !== '') {
        await signup(userData,existErr)
      } else {
        setShowError(true);
      }
  }

  const handleLogInSubmit = (event) => {
    event.preventDefault();
    if(
      userData.email !== '' &&
      userData.password !== ''
    ) {
      login(userData,existErr)
    }else {
      setShowError(true);
    }
  }

  return (
    <div className='logSignForm__container'>


      <Logo />

      <p className='logSignForm__subtitle'>
        {location === '/login' ? 'Login' : 'Sign Up'}
      </p>        

      <form className='logSignForm'>

        <p className='logSignForm__icon'>
          {location === '/login' ? <FaUserCircle /> : <FaUserPlus /> }
        </p>

        {
          location === '/signup' 
            && 
          <input
            // onChange={handleSignupInputChange}
            onChange={handleInputChange}
            type="text" 
            name="name" 
            id="name" 
            value={userData.name}
            placeholder="Name"
          />
        }

        <input
          // onChange={location === '/login' ? handleInputChange : handleSignupInputChange}
          onChange={handleInputChange}
          type="email" 
          name="email" 
          id="email" 
          value={userData.email}
          placeholder="Email"
        />

        <input 
          // onChange={location === '/login' ? handleInputChange : handleSignupInputChange}
          onChange={handleInputChange}
          type="password" 
          name="password" 
          id="password"
          value={userData.password} 
          placeholder="Password"
        />


        <div className='logSignForm__buttons'>
          <button 
            onClick={location === '/login' ? handleLogInSubmit : handleSignUpSubmit}
            >
            {location === '/login' ? 'Log in' : 'Sign up'}
          </button>

          {
            location === '/signup' &&
            <button className='logSignForm__buttonLink'>
              <NavLink className='logSignForm__link' to='/login'>Back to Login</NavLink>
            </button>
          }

        </div>

        {location === '/login' 
            &&
            <NavLink 
              className='logSignForm__create' to="/signup">
                Create Account
            </NavLink>        
        }

        <div className='formError__container'>
          {
            showError && <p className='formError'>Missing Data</p>
          }
          {
            (location === '/signup' && errors.name.length > 0) && 
              errors.name.map((error,i) => {
                return (
                  <p className='formError'>{error}</p>
                )
              })
          }
          {
            (location === '/signup' && errors.email.length > 0) &&
              errors.email.map((error,i) => {
                return (
                  <p className='formError'>{error}</p>
                )
              })
          }
          {
            (location === '/signup' && errors.password.length > 0) &&
              errors.password.map((error,i) => {
                return (
                  <p className='formError'>{error}</p>
                )
              })
          }
        </div>

      </form>



    </div>
  )
}

export default Form;