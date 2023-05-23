import {useDispatch,useSelector} from 'react-redux';
import { useParams} from 'react-router-dom';
import { useEffect,useState } from 'react';
import { getDogById } from '../redux/actions';

function Detail() {

  const dispatch = useDispatch();

  const {id} = useParams();

  const [dogReady,setDogReady] = useState(false)

  useEffect(()=>{
    dispatch(getDogById(id));
  },[id])

  const dogById = useSelector(state => state.dogById);

  useEffect(()=>{
    setDogReady(true);
    console.log(dogById)
  },[dogById])

  return (
    <div className='detail'>
      {
        dogReady &&
        <div className='detail__card'>
          <h1>{dogById.name}</h1>
          <div className='detail__imgIdContainer'>
            <p className='detail__id'>ID : <b>{dogById.id}</b></p>
            {
              dogById.image !== null && 
                <img 
                  src={dogById.image.url 
                    ? dogById.image.url 
                    : dogById.image
                  } 
                  alt={dogById.name + ' image'
                  } 
                />
            }
          </div>
          <p className='detail__temperaments'>{dogById.fromDb ? dogById.Temperaments : dogById.temperament}</p>
          <p className='detail__weight'>
            <b>Weight Range: </b>
            {dogById.fromDb ? dogById.weight : dogById.weight.metric} kg - (Average: {dogById.avgWeight === 0 ? 'unknown' : dogById.avgWeight} kg)
          </p>
          <p className='detail__height'>
            <b>Height: </b> 
            {dogById.fromDb ? dogById.height : dogById.height.metric}
          </p>
          <p className='detail__age'>
            <b>Life Span: </b> 
            {dogById.fromDb ? dogById.age : dogById.life_span}
          </p>
        </div>
      }
    </div>
  )
}

export default Detail;