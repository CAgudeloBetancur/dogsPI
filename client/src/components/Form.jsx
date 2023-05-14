import { useEffect, useState } from 'react';
import {useNavigate,useLocation,NavLink} from 'react-router-dom';

function Form({login,signup}) {

  const navigation = useNavigate();
  const currentLocation = useLocation();

  const [location, setLocation] = useState(currentLocation.pathname);

  // Apply conditional spreading to the name property
  // Only added to the object if we are in the "/signup" route
  const [userData,setUserData] = useState({
    email: '',
    password: '',
    ...(location === '/signup' ? {name : ''} : {})
  })

  const handleInputChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name] : event.target.value
    })
  }

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    console.log(userData)
    signup(userData)
  }

  const handleLogInSubmit = (event) => {
    event.preventDefault();
    login(userData)
  }

  return (
    <form>

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

      {location === '/login' 
          &&
        <button>
          <NavLink to="/signup">Create Account</NavLink>        
        </button>
      }

      <button 
        onClick={location === '/login' ? handleLogInSubmit : handleSignUpSubmit}
      >
        {location === '/login' ? 'Log in' : 'Sign up'}
      </button>

    </form>
  )
}

export default Form;