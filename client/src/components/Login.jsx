import axios from "axios";
import Form from "./Form";
import {useNavigate} from "react-router-dom";

function Login({setAccess}) {

  const navigate = useNavigate();

  const login = async (userData) => {

    const URL = 'http://localhost:3001/login';
    try {
      const {data} = await axios.post(URL,userData);
      const {access} = data;
      setAccess(access);
      access && navigate('/home')      
    } catch (error) {
      window.alert(error.response.data)
    }

  }

  return (
    <Form login={login}/>
  )
}

export default Login;