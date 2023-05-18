import axios from 'axios';
import { useDispatch } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { getDogById } from '../redux/actions';

function Card({dogId,userId,name,image,temperaments,weightRange,averageWeight,fromDb,initialFn}) {

  const dispatch = useDispatch();

  const handleDeleteBreed = async (event) => {
    if(!fromDb) return;
    const URL = 'http://localhost:3001/delete';
    const data = await axios.delete(`${URL}/${dogId}`);
    initialFn(userId);
  }

  const handleEdit = () => {
    dispatch(getDogById(userId));
  }

  return (
    <div className='card'>
                <NavLink className='card__link' to={`/detail/${dogId}`}>
                  <h3>{name}</h3>
                  {image !== null && <img src={image.url ? image.url : image} alt={name + ' image'} />}
                  <div className='card__info'>
                    <p>{temperaments}</p>
                    <p><b>Rango de Peso:</b> {weightRange} kg</p>
                    <p><b>Peso promedio:</b> {averageWeight}</p>
                  </div>
                </NavLink>
                {
                  <div>
                    <button type='button' onClick={handleDeleteBreed}>Eliminar</button>
                  </div>
                }
    </div>
  )
}

export default Card;