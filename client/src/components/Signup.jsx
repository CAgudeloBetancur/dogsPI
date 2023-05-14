import axios from "axios";
import Form from "./Form"
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate()

  const signup = async (userData) => {

    const URL = 'http://localhost:3001/signup';
    try {
      const {data} = await axios.post(URL,userData);
      console.log(data);
      data.name && navigate('/login');
    } catch (error) {
      window.alert(error.response.data);
    }

  }

  return (
    <Form signup={signup}/>
  )
}

export default Signup