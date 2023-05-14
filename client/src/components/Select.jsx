import {getTemperaments} from './../redux/actions';
import { useState,useEffect,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";

function Select({arrFunction,btnReference}) {

  const [arrTemp, setArrTemp] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const dispatch = useDispatch();

  const selectRef = useRef(null); // ! useRef

  const initialTemperaments = async () => {
    await dispatch(getTemperaments());
  }

  const handleClickOutSide = (e) => {
    if(!selectRef.current.contains(e.target)) {
      setShowOptions(false);
    } else {
      
    }
    if(btnReference) {
      if(btnReference.current.contains(e.target)) {
        setArrTemp([]);
      } 
    }
  }
  
  useEffect(() => {
    initialTemperaments();
    document.addEventListener('click',handleClickOutSide,true)
  },[])

  const temperaments = useSelector(state => state.temperaments);  

  /* useEffect(()=>{
    console.log(temperaments);
  },[temperaments]) */

  const handleTemperament = (event) => {
    const temp = {
      id: event.target.id,
      name: event.target.value
    }
    const exist = arrTemp.find(t => t.id === temp.id);
    setArrTemp(
      !exist
        ? [...arrTemp,temp]
        : arrTemp.filter(t => t.id !== temp.id)
    )
  }

  useEffect(() => {
    arrFunction(arrTemp);
  },[arrTemp])

  const handleTempSelectClick = () => {
    setShowOptions(!showOptions)
  } 

  // 

  return (
    <div className='select' ref={selectRef}>
      <button onClick={handleTempSelectClick}>( {arrTemp.length} ) Temperaments</button>
      <div className={`select__container${showOptions ? ' show' : ' hide'}`}>
        <div className='select__optionsContainer'>
          {
            ((!arrTemp.length && showOptions) || arrTemp.length) && temperaments.map((t,i) => {
              return (
                <div key={i} className='select__option'>
                  <input id={t.id} onChange={handleTemperament} value={t.name} type="checkbox" className='tempCheckbox'/>
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