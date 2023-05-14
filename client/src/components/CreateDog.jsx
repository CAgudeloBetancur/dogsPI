import axios from "axios";
import { useState,useEffect,useRef } from "react";
import Select from "./Select";
import { useSelector,useDispatch } from "react-redux";
import {getAllDogs, getTemperaments} from '../redux/actions';

function CreateDog() {

  const dispatch = useDispatch();

  const [createBtn,setCreateBtn] = useState(null);

  let [dogData,setDogData] = useState({
    name : '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    minAge: '',
    maxAge: '',
    temperament: []
  });

  const createBtnRef = useRef(null); // ! useRef
  
  const handleChange = (event) => {
    setDogData({
      ...dogData,
      [event.target.name]: event.target.value
    })
  }    
  
  const initialData = async () => {
    await dispatch(getAllDogs());
    await dispatch(getAllDogs());
  }
  
  useEffect(() => {
    initialData();
  },[])
  
  const dbDogID = useSelector(state => state.dbDogsID);
  
  let [dogID,setDogID] = useState(1);

  const createDog = async ({name,minHeight,maxHeight,minWeight,maxWeight,minAge,maxAge,temperament}) => {
    const dog = {
      id: dogID + dbDogID,
      name,
      height: `${minHeight} - ${maxHeight}`,
      weight: `${minWeight} - ${maxWeight}`,
      age: `${minAge} - ${maxAge} years`,
      temperament 
    }

    console.log(dog)

    setDogID(dogID += 1)

    const URL = 'http://localhost:3001/dogs'

    try {
      const {data} = await axios.post(URL,dog);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }  

  const handleSubmit = (event) => {
    event.preventDefault();
    createDog(dogData);
  }

  const getSelectedTemps = (arrTemps) => {
    setDogData({
      ...dogData,
      temperament: [...arrTemps]
    })
  }

  return (
    <div>
      <form className="createDog">
        <input 
          name="name" 
          type="text" 
          placeholder="Name"
          value={dogData.name}
          onChange={handleChange}
        />
        <input 
          name="minHeight" 
          type="number" 
          placeholder="Minimun height"
          value={dogData.minHeight}
          onChange={handleChange}
        />
        <input 
          name="maxHeight" 
          type="number" 
          placeholder="Maximun height"
          value={dogData.maxHeight}
          onChange={handleChange}
        />
        <input 
          name="minWeight" 
          type="number" 
          placeholder="Minimun weight"
          value={dogData.minWeight}
          onChange={handleChange}
        />
        <input 
          name="maxWeight" 
          type="number" 
          placeholder="Maximun weight"
          value={dogData.maxWeight}
          onChange={handleChange}
        />
        <input 
          name="minAge" 
          type="number" 
          placeholder="Minimun life span"
          value={dogData.minAge}
          onChange={handleChange}
        />
        <input 
          name="maxAge" 
          type="number" 
          placeholder="Maximun life span"
          value={dogData.maxAge}
          onChange={handleChange}
        />
        <button ref={createBtnRef} className="createBtn" onClick={handleSubmit}>
          Enviar
        </button>
      </form>

      <Select arrFunction={getSelectedTemps} btnReference={createBtnRef}/>

    </div>
  )
}

export default CreateDog;