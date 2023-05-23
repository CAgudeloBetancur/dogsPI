import axios from "axios";
import { useState,useEffect,useRef } from "react";
import Select from "./Select";
import { useSelector,useDispatch } from "react-redux";
import validations from "../validations";
import {getAllDogs, getDogById, getTemperaments} from '../redux/actions';
import {NavLink, useLocation, useParams} from 'react-router-dom';
import { SiDatadog } from "react-icons/si";

function CrUpForm() {
  
  const {id} = useParams();
  const {userId} = useSelector(state => state);
  // const {dogToUpdate} = useSelector(state => state);
  /* const [tempsUpdate, setTempsUpdate] = useState([
    ...(dogToUpdate !== undefined ? [...dogToUpdate.Temperaments] : [])
  ]); */
  const [dogToUpdate, setDogToUpdate] = useState({})
  const [temperament, setTemperament] = useState([])
  const [tempReady, setTempReady] = useState([])

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

  const getDogToEdit = async (id) => {
    const URL = `http://localhost:3001/dog-to-update/${id}`;
    try {
      const {data} = await axios(URL);
      console.log(data);
      setDogData({
        ...data,
        temperament: [...data.Temperaments]
      })
      setTemperament([...data.Temperaments]);
      setTempReady(true);      
    } catch (error) {
      console.log('Error en el update dog ' + error.message);
    }
  }

  const location = useLocation().pathname;

  useEffect(()=>{
    if(location === `/update/${id}`) {
      getDogToEdit(id);
    }
  },[location,id])


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
    console.log(temperament);
  },[temperament])

  const createBtnRef = useRef(null); // ! useRef

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

  useEffect(()=>{
    console.log(dogToUpdate);
  },[dogToUpdate])

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

  const [date, setDate] = useState(new Date())

  const [imageDate, setImageDate] = useState(`${date.getDate()}_${date.getMonth()}_${date.getFullYear()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`);

  useEffect(() => {
    if(file !== undefined) setImageName(`${imageDate}_${file.name}`);
    handleEmptyFields()
    setImageDate(`${date.getDate()}_${date.getMonth()}_${date.getFullYear()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`)
  }, [file])


  const [emptyFields, setEmptyFields] = useState(true);

  const noEmptyFields = () => {
    return (dogData.name !== '' &&
      dogData.minAge !== '' &&
      dogData.maxAge !== '' &&
      dogData.minWeight !== '' &&
      dogData.maxWeight !== '' &&
      dogData.minHeight !== '' &&
      dogData.maxHeight !== '' &&
      dogData.temperament.length > 0) 
    
  }
  
  const handleEmptyFields = () => {
    console.log(noEmptyFields());
    if(file !== undefined && location === '/create' && noEmptyFields()) {  
        setEmptyFields(false)
    } else if((file !== undefined || file === undefined) && location === `/update/${id}` && noEmptyFields()) {
      setEmptyFields(false);
    } else {
      setEmptyFields(true);
    }
  }

  const handleImage = async () => {
    if(noErr && !emptyFields && (file !== undefined)) {
      const URL = 'http://localhost:3001/upload-image';    
      const formData = new FormData();
      formData.append('image',file,imageName);
      const {data} = await axios.post(
        URL, 
        formData, 
        { headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }

  }

  const noErrorExist = () => {
    return (errors.name.length === 0 && 
      errors.height.length === 0 && 
      errors.weight.length === 0 && 
      errors.age.length === 0 && 
      dogData.temperament.length > 0)
  }

  // Confirm no errors
  useEffect(()=>{
    /* errors.name.length === 0 && 
      errors.height.length === 0 && 
      errors.weight.length === 0 && 
      errors.age.length === 0 && 
      dogData.temperament.length > 0 */
    if(location === '/create' && file && noErrorExist()) {
      setNoErr(true);
    } else if (location === `/update/${id}` && noErrorExist()) {
      setNoErr(true);
    }
    console.log(file)
  },[errors,dogData,file,location,id])

  /* useEffect(()=>{
    console.log(emptyFields);
  },[emptyFields]) */

  // ? Dog Model

  const createDog = ({name,minHeight,maxHeight,minWeight,maxWeight,minAge,maxAge,temperament,prevImage},image) => {
    console.log(image)
    if(noErr) {
      const dog = {
        name,
        height: `${minHeight} - ${maxHeight}`,
        weight: `${minWeight} - ${maxWeight}`,
        age: `${minAge} - ${maxAge} years`,
        userId,
        temperament,
        image: image !== undefined ? `http://localhost:3001/image/${image}` : null,
        prevImage
      }
      // console.log(dog);
      return dog;   
    }
  }

  const submitUpdateDog = async (dog) => {
    const BASE_URL = 'http://localhost:3001';
    console.log(file);
    if(noErr && !emptyFields) {
      try {
        if(location === '/create') {
          const {data} = await axios.post(`${BASE_URL}/dogs`,dog);
        }
        if(location === `/update/${id}`) {
          const {data} = await axios.put(`${BASE_URL}/update/${id}`,dog);
          console.log(data)
        }
        setFile(undefined);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  const [showError, setShowError] = useState(false)

  const [arrTempsBackUp, setArrTempsBackUp] = useState([])
  const [arrTempsIdBackUp, setArrTempsIdBackUp] = useState([])
  const [submitEvent, setSubmitEvent] = useState(true)
  const [clearSelect, setClearSelect] = useState(false)

  const handleCreateUpdate = async (event) => {
    event.preventDefault();
    console.log(noErr);
    if(noErr && !emptyFields) {
      if(location === '/create') {
        await submitUpdateDog(createDog(dogData,imageName));
      }
      if(location === `/update/${id}`) {
        await submitUpdateDog(createDog(dogData,imageName));
      }
      await handleImage();
      setShowError(false)
      setSubmitEvent(true)
      setArrTempsBackUp([])
      setArrTempsIdBackUp([])
      setImageName()
      setDogData({
        name : '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minAge: '',
        maxAge: '',
        temperament: []
      })
      const fileImg = document.querySelector('.file');
      fileImg.value = '';
      setClearSelect(true);
    } else {
      setShowError(true);
      setSubmitEvent(false);
    }
  }

  const handleClearSelect = (bool) => {
    setClearSelect(bool);
  }

  const handleSubmitEvent = (bool) => {
    setSubmitEvent(bool);
  }

  const getSelectedTemps = (arrTemps) => {
    setDogData({
      ...dogData,
      temperament: [...arrTemps]
    })
    if(arrTemps.length > 0) {
      setArrTempsIdBackUp(...arrTemps.map(t => t.id));
      setArrTempsBackUp([...arrTemps])
    }
  }

  // ! Update Dog

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log('hola')
  }


  return (
    <div className="createFormContainer">

      <h1 className="form__title">¡Create Your Own Dog!</h1>

      <form className="createDog" onSubmit={(event)=>{
        event.target.reset()
      }}>
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
            /* disabled={
              dogData.minHeight.length === 0 || dogData.minHeight <= 0 
            } */
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

        <Select 
          updateTemps={
            (location === `/update/${id}` && tempReady) 
              && temperament
          }
          clearSelect={clearSelect}
          handleClearSelect={handleClearSelect}
          submitEvent={submitEvent}
          handleSubmitEvent={handleSubmitEvent}
          arrTempsIdBackup={arrTempsIdBackUp}
          arrTempsBackUp={arrTempsBackUp}
          dogId={id} 
          arrFunction={getSelectedTemps} 
          btnReference={createBtnRef}
        />

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
          onClick={handleCreateUpdate}
        >
          Create
        </button>

        <div className="formError__container">
          {
            (showError && emptyFields) && <p className="formError">Empty fields</p>
          }
          {
            (location === '/create' && showError && file === undefined) && <p className="formError">Select image</p>
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

      <p className="createForm__icon"><SiDatadog /></p>

    </div>
  )
}

export default CrUpForm;