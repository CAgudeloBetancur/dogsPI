import axios from "axios";
import Form from "./Form";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllDogs,setUserId } from "../redux/actions";

function Login({setAccess}) {

  const dispatch = useDispatch();

  const navigate = useNavigate(); 

  const login = async (userData,existErr) => {
    
    if(!existErr) {
      const URL = 'http://localhost:3001/login';
      try {
        const {data} = await axios.post(URL,userData);
        const {access,userId} = data;
        dispatch(setUserId(userId));
        setAccess(access);
        console.log(data);
        access && navigate('/home')    
      } catch (error) {
        window.alert(error.response.data)
      }
    }


  }

  return (
    <Form login={login}/>
  )
}

export default Login;