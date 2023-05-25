import axios from "axios";
import Form from "./Form";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAllDogs,setUserId, setUserName } from "../redux/actions";
import { useEffect } from "react";

function Login({setAccess}) {

  const dispatch = useDispatch();

  const navigate = useNavigate(); 

  useEffect(()=>{
    dispatch(clearAllDogs(true));
  },[])

  const login = async (userData,existErr) => {
    
    if(!existErr) {
      const URL = 'http://localhost:3001/login';
      try {
        const {data} = await axios.post(URL,userData);
        const {access,userId,userName} = data;
        dispatch(setUserId(userId));
        dispatch(setUserName(userName));
        setAccess(access);
        access && navigate('/home')    
      } catch (error) {
        window.alert(error.response.data.error);
      }
    }


  }

  return (
    <Form login={login}/>
  )
}

export default Login;