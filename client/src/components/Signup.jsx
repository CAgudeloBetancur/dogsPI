import axios from "axios";
import Form from "./Form"
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {

  const location = useLocation().pathname;

  const navigate = useNavigate()

  const [confirm, setConfirm] = useState(false);

  const signup = async (userData,existErr) => {

    if(!existErr) {
      const URL = 'http://localhost:3001/signup';
      try {
        const {data} = await axios.post(URL,userData);
        if(data.name) {
          setConfirm(true);
          setTimeout(() => {
            navigate('/login');          
          }, 1500);
        }
      } catch (error) {
        window.alert(error.response.data.error);
      }
    }

  }

  return (
    <div className="signUp__container">
      <Form signup={signup}/>
      {
          (location === '/signup' && confirm) && <p className='message__confirm'>User Created Successfully</p>
      }
    </div>
  )
}

export default Signup