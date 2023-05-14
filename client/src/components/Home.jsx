import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { orderFilterCards,getDogsByName, getAllDogs } from '../redux/actions';
import Pagination from './Pagination';
import Select from './Select';

function Home() {
  
  const dispatch = useDispatch();
  
  const [orderAndFilter,setOrderAndFilter ] = useState({
    orderParam: 'any',
    order: 'any',
    origin: 'all',
    temperaments: [],
  });
  
  const handleOrderFilter = (event) => {
    setOrderAndFilter({
      ...orderAndFilter,
      [event.target.name] : event.target.value
    })
  }

  const [searchName,setSearchName] = useState('');

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  }

  /* const handleSearchNameButton = (event) => {
    event.preventDefault();
    dispatch(getDogsByName(searchName));
    dispatch(orderFilterCards(orderAndFilter));
  } */
  
  useEffect(() => {
    dispatch(orderFilterCards(orderAndFilter));
    console.log(orderAndFilter.orderParam);
  }, [orderAndFilter]);

  const handleTemperamentsSelect = (arr) => {
    setOrderAndFilter({
      ...orderAndFilter,
      temperaments: arr
    })
  }

  useEffect(()=>{
    dispatch(getDogsByName(searchName));
    dispatch(orderFilterCards(orderAndFilter))
  },[searchName]);
  
  return (
    <div>
      <div className='filter__container'>
        <input type="text" value={searchName} onChange={handleSearchName}/>
        {/* <button type="button" onClick={handleSearchNameButton}>Search</button> */}
        <h4>Ordenar por: </h4>        
        <select onChange={handleOrderFilter} name="orderParam">
          {/* <option value="" selected disabled>-- Ordenar --</option> */}
          <option value="any" selected>Any</option>
          <option value="name">Name</option>
          <option value="weight">Weight</option>
        </select>
        <select onChange={handleOrderFilter} disabled={orderAndFilter.orderParam === 'any'} name="order">
          {/* <option value="" selected disabled>-- Ordenar --</option> */}
          <option value="any" disabled selected>Orden</option>
          <option value="A" >Ascendente</option>
          <option value="D">Descendente</option>
        </select>
        <h4>Filtrar por: </h4>
        <Select arrFunction={handleTemperamentsSelect}/>
        <select onChange={handleOrderFilter} name="origin">
          {/* <option value="" selected disabled>-- Ordenar --</option> */}
          <option value="all" disabled selected>Origin</option>
          <option value="all">All</option>
          <option value="api">The Dog API</option>
          <option value="db">Data Base</option>
        </select>
      </div>
      <Pagination orderAndFilter={orderAndFilter}/> 
    </div>
  )
}

export default Home;