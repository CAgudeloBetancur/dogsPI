import axios from "axios";
import { useState,useEffect,useRef } from "react";
import Select from "./Select";
import { useSelector,useDispatch } from "react-redux";
import {getAllDogs, getTemperaments} from '../redux/actions';
import {NavLink} from 'react-router-dom';
import CrUpForm from "./CrUpForm";

function CreateDog() {
  
  const userId = useSelector(state => state.userId);

  const dispatch = useDispatch()

  const initialData = async (id) => {
    await dispatch(getAllDogs(id));
  }

  useEffect(() => {
    
    return () => {
      initialData(userId);
    }
    
  },[])  

  return (
    <CrUpForm/>
  )
}

export default CreateDog;