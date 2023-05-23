import { useEffect, useState } from "react";
import CrUpForm from "./CrUpForm";
import { useDispatch, useSelector } from "react-redux";
import { getDogToEdit } from "../redux/actions";
import { useParams } from "react-router-dom";
import axios from "axios";


function UpdateDog() {

  const {id} = useParams();
  const dispatch = useDispatch();

  const [dog, setDog] = useState();

  /* const getDogToEdit = async (id) => {
    const URL = `http://localhost:3001/dog-to-update/${id}`;
    try {
      const {data} = await axios(URL);
      console.log(data);
      setDog(data);      
    } catch (error) {
      console.log('Error en el update dog ' + error.message);
    }
  } */

  useEffect(()=>{
    /* getDogToEdit(id); */
  },[])


  return (
    <CrUpForm dog={dog}/>
  )
}

export default UpdateDog;