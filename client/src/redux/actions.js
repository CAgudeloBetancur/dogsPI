import axios from 'axios';

export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const ORDER_FILTER_CARDS = 'ORDER_FILTER_CARDS';
export const PREV_PAGE = 'PREV_PAGE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_SHOW_FILTER = 'SET_SHOW_FILTER';
export const SET_SHOW_MENU = 'SET_SHOW_MENU';
export const GET_DOG_TO_UPDATE = 'GET_DOG_TO_UPDATE';
export const CLEAR_ALL_DOGS = 'CLEAR_ALL_DOGS';
export const SET_FILTERS_ORDERS = 'SET_FILTERS_ORDERS';
export const SET_USER_NAME = 'SET_USER_NAME';

export const getAllDogs = (userId) => {
  const endPoint = `http://localhost:3001/dogs?userid=${userId}`;
  return async (dispatch) => {
    try {
      const {data} = await axios(endPoint);
      return dispatch({
        type: GET_ALL_DOGS,
        payload: data
      })
    } catch (error) {
      console.log(error.message);
    }
  }
}

export const getDogsByName = (name,userId) => {
  const endPoint = `http://localhost:3001/dogs?name=${name}&userid=${userId}`;
  return async (dispatch) => {
    try{
      const {data} = await axios(endPoint);
      console.log(data);
      return dispatch({
        type: GET_DOGS_BY_NAME,
        payload: data
      })
    } catch(error) {
      console.log(error.message);
    }
  }
}

export const getTemperaments = () => {
  const endPoint = 'http://localhost:3001/temperaments';
  return async (dispatch) => {
    try {
      const {data} = await axios(endPoint);
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: data
      })
    } catch (error) {
      console.log(error.message);
    }
  }
}

export const setFiltersOrders = (filterOrders) => {
  return {
    type: SET_FILTERS_ORDERS,
    payload: filterOrders
  }
}

export const orderFilterCards = () => {
  return {
    type: ORDER_FILTER_CARDS,
    payload: null
  }
}

export const getDogById = (id) => {
  return {
    type: GET_DOG_BY_ID,
    payload: id
  }
}

export const setUserId = (userId) => {
  return {
    type: SET_USER_ID,
    payload: userId
  }
}

export const setUserName = (userName) => {
  return {
    type: SET_USER_NAME,
    payload: userName
  }
}

export const setShowFilter = (valor) => {
  return {
    type: SET_SHOW_FILTER,
    payload: valor
  }
}

export const setShowMenu = (valor) => {
  return {
    type: SET_SHOW_MENU,
    payload: valor
  }
}

export const getDogToEdit = (dogId) => {
  const URL = `http://localhost:3001/dog-to-update/${dogId}`;
  return async (dispatch) => {
    try {
      const {data} = await axios(URL);
      return dispatch({
        type: GET_DOG_TO_UPDATE,
        payload: data
      })
    } catch (error) {
      console.log(`Mijo, mire: ${error.response.data.message}`);
    }
  }
}

export const clearAllDogs = (bool) => {
  return {
    type: CLEAR_ALL_DOGS,
    payload: bool
  }
}