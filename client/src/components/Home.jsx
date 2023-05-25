import {TbDog} from 'react-icons/tb';
import {FaSearch} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import { orderFilterCards,getDogsByName, setFiltersOrders} from '../redux/actions';
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

  const {showFilter,userId} = useSelector(state => state);
  
  const handleOrderFilter = (event) => {
    setOrderAndFilter({
      ...orderAndFilter,
      [event.target.name] : event.target.value
    })
  }

  const [searchName,setSearchName] = useState('');

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
    if(event.target.value === '') {
      dispatch(getDogsByName(event.target.value,userId));
    }
  }

  const handleSearchNameButton = (event) => {
    if(searchName !== '') {
      event.preventDefault();
      dispatch(getDogsByName(searchName,userId));
    }
  }
  
  useEffect(() => {
    dispatch(setFiltersOrders(orderAndFilter));
    dispatch(orderFilterCards());
  }, [orderAndFilter]);

  const handleTemperamentsSelect = (arr) => {
    setOrderAndFilter({
      ...orderAndFilter,
      temperaments: arr
    })
  }

  const handleKeyDown = (event) => {
    if(searchName !== '') {
      if(event.key === "Enter") {
        dispatch(getDogsByName(searchName,userId)); 
      }
    }
  }

  return (
    <div>
      <div className="filter__containerLimit">
        <div className={`filter__container${showFilter ? ' showFilter' : ''}`}>
          <div className='filter__searchContainer'>
            <i><FaSearch /></i>
            <input type="text" placeholder='Search name...' className='searchBar' value={searchName} onChange={handleSearchName} onKeyDown={handleKeyDown}/>
            <button type="button" className='searchButton' onClick={handleSearchNameButton}>Search</button>
            <NavLink className='filter__createButton' to="/create">
              Create Your Own Dog
            </NavLink>
          </div>

          <div className='filter__filterOrderContainer'>
            <div className='filter__orderContainer'>
              <h4 className='filterTitle'>Ordenar</h4>        
              <select className='filterSelect' onChange={handleOrderFilter} name="orderParam">
                {/* <option value="" selected disabled>-- Ordenar --</option> */}
                <option value="any" selected>Any</option>
                <option value="name">Name</option>
                <option value="weight">Weight</option>
              </select>
              <select className='filterSelect' onChange={handleOrderFilter} disabled={orderAndFilter.orderParam === 'any'} name="order">
                {/* <option value="" selected disabled>-- Ordenar --</option> */}
                <option value="any" disabled selected>Orden</option>
                <option value="A" >Ascendente</option>
                <option value="D">Descendente</option>
              </select>
            </div>

            <div className='filter__filterContainer'>
              <h4 className='filterTitle'>Filtrar</h4>
              <Select arrFunction={handleTemperamentsSelect}/>
              <select className='filterSelect' onChange={handleOrderFilter} name="origin">
                {/* <option value="" selected disabled>-- Ordenar --</option> */}
                <option value="all" disabled selected>Origin</option>
                <option value="all">All</option>
                <option value="api">The Dog API</option>
                <option value="db">Data Base</option>
              </select>
            </div>

          </div>        
        </div>
      </div>

      <Pagination orderAndFilter={orderAndFilter}/>

      <NavLink className='filter__mobileCreateButton' to="/create">
        <TbDog />
      </NavLink>
    </div>
  )
}

export default Home;