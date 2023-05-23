import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getAllDogs } from '../redux/actions';
import Card from './../components/Card';

function Pagination({orderAndFilter}) {

  const handlePage = () => {
    window.scrollTo({
      top: 0,
    });
  }

  const userId = useSelector(state => state.userId);

  const [dogs, setDogs] = useState([]);
  
  const dispatch = useDispatch(); 

  const initial = async (usrid) => {
    await dispatch(getAllDogs(usrid));
  }

  useEffect(()=>{
    initial(userId);
  },[])
  
  const filteredDogs = useSelector(state => state.filteredDogs);
  
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const [leftoverDogs, setLeftoverDogs] = useState(0);
  const [completePages, setCompletePages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [base, setBase] = useState(0);
  const [head, setHead] = useState(dogsPerPage);

  useEffect(()=>{
    setDogs(filteredDogs)
    setLeftoverDogs(filteredDogs.length % dogsPerPage)
    setCompletePages(Math.floor(filteredDogs.length / dogsPerPage))
    setCurrentPage(1);
    setBase(0);
    setHead(dogsPerPage);
  },[filteredDogs])

  useEffect(() => {  
    return () => {
      setDogs([]);
    }
  }, [])
  

  useEffect(() => {
    if(leftoverDogs > 0) {
      setTotalPages(completePages + 1);
    }
    if(leftoverDogs === 0) {
      setTotalPages(completePages);
    }
  },[completePages,leftoverDogs]);

  // ! Calculos paginado

  const handleNext = () => {

    if((leftoverDogs > 0 && currentPage < totalPages - 1) || (leftoverDogs === 0 && currentPage < totalPages)){
      setBase(head);
      setHead(head + dogsPerPage);
      setCurrentPage(currentPage + 1);
    } 
    if(leftoverDogs > 0 && currentPage === totalPages - 1) {
      setBase(head);
      setHead(head + leftoverDogs);
      setCurrentPage(currentPage + 1);
    }

    handlePage();

  }
  
  const handlePrevious = () => {

    setBase(base - dogsPerPage);
    setHead(base);
    setCurrentPage(currentPage - 1);

    handlePage();

  }

  return (
    <div className='page'>

      <div className='page__pagination'>
        {
          currentPage > 1 && <button type="button" onClick={handlePrevious}>Previous</button>
        }

        {filteredDogs.length !== 0 && <span>{currentPage} / {totalPages}</span>}

        { 
          currentPage < totalPages && <button type="button" onClick={handleNext}>Next</button>
        }
      </div>


      <h1 className='home__title'>{filteredDogs.length} Results</h1>

      <div className='page__cardsContainer'>
        {
          dogs.map((dog,i) => {
            if(i >= base && i < head) {
              return (

                <Card
                  key={i} 
                  dogId={dog.id}
                  userId={userId}
                  name={dog.name}
                  image={dog.image}
                  temperaments={dog.fromDb ? dog.Temperaments : dog.temperament}
                  weightRange={dog.fromDb ? dog.weight : dog.weight.metric}
                  averageWeight={dog.avgWeight === 0 ? 'unknown' : dog.avgWeight}
                  fromDb={dog.fromDb && dog.fromDb}
                  initialFn={initial}
                />

              )
            }
          })
        }
      </div>
      
    </div>
  )
}

export default Pagination;