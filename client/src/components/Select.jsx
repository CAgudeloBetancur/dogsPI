import {getTemperaments} from './../redux/actions';
import { useState,useEffect,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';

function Select({dogId,clearSelect,handleClearSelect,handleSubmitEvent,arrTempsBackUp,submitEvent,arrTempsIdBackUp,updateTemps,arrFunction,btnReference}) {

  // const {Temperaments} = useSelector(state => state.dogToUpdate);

  const location = useLocation().pathname;

  const initialTemperaments = async () => {
    await dispatch(getTemperaments());
  }

  const temperaments = useSelector(state => state.temperaments);
  
  const [tempsId, setTempsId] = useState([
    ...(  
      location === `/update/${dogId}` && 
      updateTemps !== undefined  
        ? updateTemps 
        : []
    ),
    ...(  
      location === `/create` && arrTempsIdBackUp !== undefined  
        ? arrTempsIdBackUp
        : []
    )
  ])

  useEffect(()=>{
    if(clearSelect) {
      setTempsId([])
      handleClearSelect(false);
    }
  },[clearSelect])

  const [arrTemp, setArrTemp] = useState([]);

  useEffect(()=>{
    console.log(updateTemps);
    if(updateTemps !== undefined) {
      setTempsId([
        ...(Array.isArray(updateTemps) ? [...updateTemps] : [])
      ])
    }
    if(updateTemps !== undefined && location === `/update/${dogId}`) {
      setArrTemp([
        ...(Array.isArray(updateTemps) ? temperaments.filter(t => updateTemps.includes(t.id)) : [])
      ])
    }
  },[updateTemps,temperaments])

  const [initialTemps, setInitialTemps] = useState([
    ...( location === `/update/${dogId}` && updateTemps !== undefined ?
      temperaments.filter(t => {
        return updateTemps.includes(t.id)        
      }) : []
    ),
    ...( location === `/create` && arrTempsIdBackUp !== undefined ?
      temperaments.filter(t => {
        return arrTempsIdBackUp.includes(t.id)        
      }) : []
    )
  ])

  const [showOptions, setShowOptions] = useState(false);

  const dispatch = useDispatch();

  const selectRef = useRef(null); // ! useRef

  const handleClickOutSide = (e) => {
    if(selectRef.current !== null) {
      if(!selectRef.current.contains(e.target)) {
        setShowOptions(false);
      } else {
        
      }
    }
    if(btnReference) {
      if(btnReference.current !== null) {
        if(btnReference.current.contains(e.target)) {
          setArrTemp([]);
        }
      }
    }
  }
  
  useEffect(() => {
    initialTemperaments();
    document.addEventListener('click',handleClickOutSide,true)
  },[])

  useEffect(()=>{
    console.log(tempsId);
    setArrTemp([
      ...arrTemp,
    ])
  },[tempsId])

  const handleTemperament = (event) => {
    const temp = {
      id: +event.target.id,
      name: event.target.value
    }
    
    const existTempId = tempsId.find(id => id === +event.target.id);
    setTempsId(
      !existTempId 
      ? [...tempsId, +event.target.id]
      : tempsId.filter(id => id !== +event.target.id)
    )

    const existTemp = arrTemp.find(t => t.id === temp.id);
    setArrTemp(
      !existTemp
        ? [...arrTemp,temp]
        : arrTemp.filter(t => t.id !== temp.id)
    )
  }

  useEffect(()=>{
    if(!submitEvent && arrTempsBackUp !== undefined) {
      setArrTemp([...arrTempsBackUp]);
      handleSubmitEvent(true);
    }
  },[submitEvent])

  useEffect(() => {
    arrFunction(arrTemp);
  },[arrTemp])

  const handleTempSelectClick = (event) => {
    event.preventDefault()
    setShowOptions(!showOptions)
  } 

  // 

  return (
      <div className='select' ref={selectRef}>
        <button className='select__button' onClick={handleTempSelectClick}>( {tempsId.length} ) Temperaments</button>
        <div className={`select__container${showOptions ? ' show' : ' hide'}`}>
          <div className='select__optionsContainer'>
            {
              ((!arrTemp.length && showOptions) || arrTemp.length) && temperaments.map((t,i) => {
                return (
                  <div key={i} className='select__option'>
                    <input
                      checked={tempsId?.includes(t.id)}
                      id={t.id} 
                      onChange={handleTemperament} 
                      value={t.name} 
                      type="checkbox" 
                      className='tempCheckbox'
                    />
                    <label htmlFor={t.id} className='tempLabel'>{t.name}</label>
                  </div>
                )
              })                       
            }
          </div>
        </div>            
      </div>
  )
}

export default Select