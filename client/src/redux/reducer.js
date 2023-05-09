import {GET_ALL_DOGS,PAGES,GET_TEMPERAMENTS,CLEAN_TEMPERAMENTS} from './actions';

const initialState = {
  dogs: [],
  page: [],
  temperaments: [],
  forwardInterval: 0,
  delTemp: {}
}

const reducer = (state = initialState, {type,payload}) => {
  switch(type) {

    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: payload,
      }

    case PAGES:
      const p = []
      if(state.forwardInterval + payload < state.dogs.length) {
        for(let i = state.forwardInterval; i < state.forwardInterval + payload; i++) p.push(state.dogs[i]);        
      }else {
        for(let j = state.forwardInterval; j < state.dogs.length; j++) p.push(state.dogs[j]);
      }
      return {
        ...state,
        page: p,
        forwardInterval: state.forwardInterval += payload
      }
      
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload
      }

    default: 
      return {...state}

  }
}

export default reducer;