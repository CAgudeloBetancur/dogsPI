import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {getAllDogs} from '../redux/actions';
import CrUpForm from "./CrUpForm";
import {SiDatadog} from 'react-icons/si';

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
    <div>
      <CrUpForm/>
    </div>
  )
}

export default CreateDog;