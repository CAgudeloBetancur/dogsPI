import axios from 'axios';

export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const ORDER_FILTER_CARDS = 'ORDER_FILTER_CARDS';
export const PREV_PAGE = 'PREV_PAGE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME';

export const getAllDogs = () => {
  const endPoint = 'http://localhost:3001/dogs';
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