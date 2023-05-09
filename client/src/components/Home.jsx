import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getAllDogs,pages } from '../redux/actions';

function Home() {

  const dispatch = useDispatch();

  const initial = async () => {
    await dispatch(getAllDogs())
    dispatch(pages(20));
  }
  
  useEffect(() => {
    initial();
  },[])
  
  const page = useSelector(state => state.page);
  const interval = useSelector(state => state.forwardInterval);
  
  /* useEffect(() => {
    console.log(page);
    console.log(interval);
  },[page,interval]) */
  
  const handlePage = () => {
    window.scrollTo({
      top: 0,
    });
    dispatch(pages(20));
  }

  return (
    <div>
      <>
        {
          page.map(dog => {
            return (
              <div style={{width:'25rem',margin:'0 auto'}} key={dog.id}>
                <img style={{maxWidth:'100%'}}src={dog.image.url} alt="imagen"/>
                <p>{dog.id}</p>
                <p>{dog.name}</p>
                <p>{dog.life_span}</p>
              </div>
            )
          }) 
        }
      </>
      {!(page.length < 20) && <button type='button' onClick={handlePage}>Page &#62;</button>}
    </div>
  )
}

export default Home;