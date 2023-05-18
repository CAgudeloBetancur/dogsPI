import axios from 'axios';

export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const ORDER_FILTER_CARDS = 'ORDER_FILTER_CARDS';
export const PREV_PAGE = 'PREV_PAGE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';
export const SET_USER_ID = 'SET_USER_ID';

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

export const getDogsByName = (name) => {
  const endPoint = `http://localhost:3001/dogs?name=${name}`;
  return async (dispatch) => {
    try{
      const {data} = await axios(endPoint);
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

export const orderFilterCards = (orderFilter) => {
  return {
    type: ORDER_FILTER_CARDS,
    payload: orderFilter
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