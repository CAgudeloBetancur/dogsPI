import {ImUser} from 'react-icons/im';
import {MdDelete,MdEdit} from 'react-icons/md';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { getDogById, getDogToEdit } from '../redux/actions';
import { useEffect } from 'react';

function Card({dogId,userId,name,image,temperaments,weightRange,averageWeight,fromDb,initialFn}) {

  const dispatch = useDispatch();

  const handleDeleteBreed = async (event) => {
    if(!fromDb) return;
    const URL = 'http://localhost:3001/delete';
    const data = await axios.delete(`${URL}/${dogId}`);
    initialFn(userId);
  }

  useEffect(()=>{console.log(image)},[image])

  const handleEdit = () => {
    dispatch(getDogById(userId));
  }

  const handleUpdate = () => {
    dispatch(getDogToEdit(dogId));
  }

  return (
    <div className='card'>
                {
                  fromDb &&
                    <div>
                      <button className='edit' type="button">
                        <NavLink to={`/update/${dogId}`}><MdEdit /></NavLink>
                      </button>
                    </div>
                }
                {
                  fromDb &&
                    <div>
                      <button className='delete' type='button' onClick={handleDeleteBreed}><MdDelete /></button>
                    </div>
                }
                <NavLink className='card__link' to={`/detail/${dogId}`}>
                  <div className='card__headerImgContainer'>
                    <div className='card__header'>
                      <h3>{name}</h3>
                      <div className='card__headerButtons'>
                        {
                          fromDb &&
                          <i><ImUser /></i>
                        }
                      </div>
                    </div>
                    <div>
                      {
                        image !== null && 
                          <div 
                            className='imagen' 
                            style={
                              {
                                backgroundImage : `url(${image.url ? image.url : image})`
                              }
                            }
                          >
                        </div>}
                    </div>
                  </div>                  
                  <p className='card__temperaments'>{temperaments}</p>
                  <div className='card__info'>
                    <div className='card__infoWeight'>
                      <h5>Weight :</h5>
                      <p>{weightRange} kg</p>
                    </div>
                    <div className='card__infoAvg'>
                      <h5>Average Weight:</h5> 
                      <p>{averageWeight} kg</p></div>
                  </div>
                </NavLink>
                
    </div>
  )
}

export default Card;