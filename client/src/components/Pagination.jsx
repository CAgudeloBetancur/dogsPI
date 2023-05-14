import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getAllDogs,nextPage,prevPage } from '../redux/actions';

function Pagination({orderAndFilter}) {

  const handlePage = () => {
    window.scrollTo({
      top: 0,
    });
  }

  const dispatch = useDispatch();

  const initial = async () => {
    await dispatch(getAllDogs())
  }
  
  useEffect(() => {
    initial();
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
    // console.log(filteredDogs);
    setLeftoverDogs(filteredDogs.length % dogsPerPage)
    setCompletePages(Math.floor(filteredDogs.length / dogsPerPage))
    setCurrentPage(1);
    setBase(0);
    setHead(dogsPerPage);
  },[filteredDogs])

  useEffect(() => {
    if(leftoverDogs > 0) {
      setTotalPages(completePages + 1);
    }
    if(leftoverDogs === 0) {
      setTotalPages(completePages);
    }
  },[completePages,leftoverDogs]);

  // ! Calculos paginado

  /* useEffect(()=> {
    console.log("Total pages: " + totalPages);
    console.log("currentPage: " + currentPage);
  },[totalPages,currentPage]) */

  /* useEffect(()=>{
    console.log('base: ' + base)
    console.log('head: ' + head)
  },[head,base]) */

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
    <div>

      <h1>Perros: {filteredDogs.length}</h1>

      {/* <h2>orderParam: {orderAndFilter.orderParam}</h2>
      <h2>order: {orderAndFilter.order}</h2>
      <h2>origin: {orderAndFilter.origin}</h2>
      <h2>Temperaments</h2>
      {
        orderAndFilter.temperaments.map((t,i) => <p key={i}>{t.name}</p>)
      }
      <hr/>
      <h3>{filteredDogs.length}</h3> */}

      {
        filteredDogs.map((dog,i) => {
          if(i >= base && i < head) {
            return (
              <div className='card' key={i}>
                <h3>{dog.id} {dog.name}</h3>
                {dog.image !== null && <img src={dog.image.url} alt={dog.name + ' image'} />}
                <p>{dog.fromDb ? dog.Temperaments : dog.temperament}</p>
                <p>Rango de Peso: {dog.fromDb ? dog.weight : dog.weight.metric} kg</p>
                <p><b>Peso promedio:</b> {dog.avgWeight === 0 ? 'unknown' : dog.avgWeight}</p>
              </div>
            )
          }
        })
      }
      {
        currentPage > 1 && <button type="button" onClick={handlePrevious}>Previous</button>
      }

      {filteredDogs.length !== 0 && <span>{currentPage} / {totalPages}</span>}

      { 
        currentPage < totalPages && <button type="button" onClick={handleNext}>Next</button>
      }
    </div>
  )
}

export default Pagination;