import axios from "axios";
import { useState,useEffect,useRef } from "react";
import Select from "./Select";
import { useSelector,useDispatch } from "react-redux";
import validations from "../validations";
import {getAllDogs, getDogById, getTemperaments} from '../redux/actions';
import {NavLink, useLocation, useParams} from 'react-router-dom';

function CrUpForm() {
  
  const userId = useSelector(state => state.userId);

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    name: [],
    height: [],
    weight: [],
    age: []
  });

  const [elmName, setElmName] = useState('');
  const [noErr, setNoErr] = useState(false);

  useEffect(()=>{
    console.log(errors);
  },[errors])

  useEffect(()=>{
    console.log(noErr);
  },[noErr,errors])

  const createBtnRef = useRef(null); // ! useRef

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

  useEffect(()=>{
    validations(
      elmName,
      errors,
      setErrors,
      dogData,
    )
    handleEmptyFields()
    console.log(dogData)
  },[dogData])

  const handleChange = (event) => {
    setDogData({
      ...dogData,
      [event.target.name]: event.target.value
    })
    setElmName(event.target.name);
  } 

  // ? Uppload image

  const [file, setFile] = useState();
  const [imageName,setImageName] = useState();

  useEffect(() => {
    if(file !== undefined) setImageName(file.name);
    handleEmptyFields()
  }, [file])

  const [emptyFields, setEmptyFields] = useState(true);

  const handleEmptyFields = () => {
    if(
      file !== undefined &&
      dogData.name !== '' &&
      dogData.minAge !== '' &&
      dogData.maxAge !== '' &&
      dogData.minWeight !== '' &&
      dogData.maxWeight !== '' &&
      dogData.minHeight !== '' &&
      dogData.maxHeight !== '' &&
      dogData.temperament.length > 0 ) {
        setEmptyFields(false)
    } else {
      setEmptyFields(true);
    }
  }

  const handleImage = async () => {
    if(noErr && !emptyFields) {
      const URL = 'http://localhost:3001/upload-image';    
      const formData = new FormData();
      formData.append('image',file,file.name);
      const {data} = await axios.post(
        URL, 
        formData, 
        { headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setImageName(data.imageName)
    }

  }

  // Confirm no errors
  useEffect(()=>{
    if(file && 
      errors.name.length === 0 && 
      errors.height.length === 0 && 
      errors.weight.length === 0 && 
      errors.age.length === 0 && 
      dogData.temperament.length > 0) {
        setNoErr(true);
      }
  },[errors,dogData,file])

  /* useEffect(()=>{
    console.log(emptyFields);
  },[emptyFields]) */

  // ? Dog Model

  const createDog = ({name,minHeight,maxHeight,minWeight,maxWeight,minAge,maxAge,temperament},image) => {
    // console.log(errors.name)
    if(noErr) {
      const dog = {
        name,
        height: `${minHeight} - ${maxHeight}`,
        weight: `${minWeight} - ${maxWeight}`,
        age: `${minAge} - ${maxAge} years`,
        userId,
        temperament,
        image: `http://localhost:3001/image/${image}`
      }
      // console.log(dog);
      return dog;   
    }
  }

  const submitDog = async (dog) => {
    const URL = 'http://localhost:3001/dogs'
    if(noErr && !emptyFields) {
      try {
        const {data} = await axios.post(URL,dog);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  const [showError, setShowError] = useState(false)

  const handleCreate = async (event) => {
    event.preventDefault();
    if(noErr && !emptyFields) {
      await handleImage();
      console.log(imageName);
      await submitDog(createDog(dogData,imageName));
      setShowError(false)
    } else {
      setShowError(true);
    }
  }

  const getSelectedTemps = (arrTemps) => {
    setDogData({
      ...dogData,
      temperament: [...arrTemps]
    })
  }

  return (
    <div className="createFormContainer">
      <form className="createDog">
        <input 
          className="name"
          name="name" 
          type="text" 
          placeholder="Name"
          value={dogData.name}
          onChange={handleChange}
        />

        <div className="formBlock">
          <input 
            name="minHeight"
            type="number" 
            placeholder="Minimun height"
            value={dogData.minHeight}
            onChange={handleChange}
          />
          <input 
            disabled={
              dogData.minHeight.length === 0 || dogData.minHeight <= 0 
            }
            min={+dogData.minHeight + 1}
            name="maxHeight" 
            type="number" 
            placeholder="Maximun height"
            value={dogData.maxHeight}
            onChange={handleChange}
          />
        </div>
        <div className="formBlock">
          <input 
            max={
              dogData.maxWeight.length > 1 
                ? dogData.maxWeight - 1
                : null
            }
            name="minWeight" 
            min={1}
            type="number"
            placeholder="Minimun weight"
            value={dogData.minWeight}
            onChange={handleChange}
          />
          <input 
            disabled={
              dogData.minWeight.length === 0 || dogData.minWeight <= 0
            }
            min={+dogData.minWeight + 1}
            name="maxWeight" 
            type="number" 
            placeholder="Maximun weight"
            value={dogData.maxWeight}
            onChange={handleChange}
          />
        </div>

        <div className="formBlock">
          <input 
            max={
              dogData.maxAge.length > 1 
                ? dogData.maxAge - 1
                : null
            }
            min={1}
            name="minAge" 
            type="number" 
            placeholder="Minimun life span"
            value={dogData.minAge}
            onChange={handleChange}
          />
          <input
            disabled={
              dogData.minAge.length === 0 || dogData.minAge <= 0
            }
            min={+dogData.minAge + 1}
            name="maxAge" 
            type="number" 
            placeholder="Maximun life span"
            value={dogData.maxAge}
            onChange={handleChange}
          />
        </div>

        <Select arrFunction={getSelectedTemps} btnReference={createBtnRef}/>

        <input
          className="file"
          type="file" 
          filename={file} 
          onChange={e => setFile(e.target.files[0])}
          accept="image/*"
        />        

        <button 
          ref={createBtnRef} 
          className="createBtn" 
          onClick={handleCreate}
        >
          Create
        </button>

        <div className="formError__container">
          {
            (showError && emptyFields) && <p className="formError">Empty fields</p>
          }
          {
            (showError && file === undefined) && <p className="formError">Select image</p>
          }
          {
            errors.name.length > 0 && errors.name.map((err,i) => {
              return (
                <p className="formError" key={i}>{err}</p>
              )
            })
          }

          {
            errors.height.length > 0 && errors.height.map((err,i) => {
              return(
                <p className="formError" key={i}>{err}</p>
              )
            })
          }
          {
            errors.weight.length > 0 && errors.weight.map((err,i) => {
              return(
                <p className="formError" key={i}>{err}</p>
              )
            })
          } 
          {
            errors.age.length > 0 && errors.age.map((err,i) => {
              return(
                <p className="formError" key={i}>{err}</p>
              )
            })
          }
          {
            errors.temperament !== '' && <p className="formError">{errors.temperament}</p>
          }
          
        </div>        

      </form>

    </div>
  )
}

export default CrUpForm;