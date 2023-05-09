import axios from 'axios';

export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const PAGES = 'PAGES';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const CLEAN_TEMPERAMENTS = 'CLEAN_TEMPERAMENTS';

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

export const pages = (interval) => {
  return {
    type: PAGES,
    payload: interval
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