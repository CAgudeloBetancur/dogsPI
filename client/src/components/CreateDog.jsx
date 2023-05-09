import axios from "axios";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {getTemperaments} from '../redux/actions';

function CreateDog() {

  const dispatch = useDispatch();

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

  let [dogID,setDogID] = useState(265);

  const handleChange = (event) => {
    setDogData({
      ...dogData,
      [event.target.name]: event.target.value
    })
  }

  const initialTemperaments = async () => {
    await dispatch(getTemperaments());
  }

  useEffect(() => {
    initialTemperaments();
  },[])

  const temperaments = useSelector(state => state.temperaments);  

  const createDog = async ({name,minHeight,maxHeight,minWeight,maxWeight,minAge,maxAge,temperament}) => {
    const dog = {
      id: dogID,
      name,
      height: `${minHeight} - ${maxHeight}`,
      weight: `${minWeight} - ${maxWeight}`,
      age: `${minAge} - ${maxAge} years`,
      temperament 
    }

    setDogID(dogID += 1);

    const URL = 'http://localhost:3001/dogs'

    try {
      const {data} = await axios.post(URL,dog);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    // console.log(temperaments)
    console.log(dogData.temperament)
  }, [temperaments,dogData.temperament]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    createDog(dogData);
  }

  const handleTemperament = (event) => {
    setDogData({
      ...dogData,
      temperament: !(dogData.temperament.includes(+event.target.value)) 
        ? [...dogData.temperament,+event.target.value]
        : dogData.temperament.filter(t => t !== +event.target.value)
    }
    )
  }

  return (
    <div>
      <form>
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
        <button onClick={handleSubmit}>
          Enviar
        </button>
      </form>
        <div>
          {
            temperaments.map((t,i) => {
              return (
                <span key={i}>
                  <input id={i} onChange={handleTemperament} value={t.id} type="checkbox"/>
                  <label htmlFor={i}>{t.name}</label>
                </span>
              )
            })
          }
        </div>
    </div>
  )
}

export default CreateDog