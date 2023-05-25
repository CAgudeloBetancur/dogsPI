import {
  GET_ALL_DOGS,
  GET_TEMPERAMENTS,
  ORDER_FILTER_CARDS,
  GET_DOGS_BY_NAME,
  GET_DOG_BY_ID,
  SET_USER_ID,
  SET_SHOW_FILTER,
  SET_SHOW_MENU,
  GET_DOG_TO_UPDATE,
  CLEAR_ALL_DOGS,
  SET_FILTERS_ORDERS,
  SET_USER_NAME,
} from './actions';

const initialState = {
  dogs: [], // All dogs (api + db)
  temperaments: [], // All temperaments
  filteredDogs: [], // Filters

  dogById: {},

  userId: '',
  userName: '',

  showFilter: true,
  showMenu: true,

  dogToUpdate: {
    name: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    minAge: '',
    maxAge: '',
    Temperaments: []
  },

  filtersOrders: {
    orderParam: 'any',
    order: 'any',
    origin: 'all',
    temperaments: [],
  }
}

const reducer = (state = initialState, {type,payload}) => {
  switch(type) {

    // ! Get all dogs
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: payload,
        filteredDogs: payload,
      }

    case GET_DOGS_BY_NAME:
      return {
        ...state,
        dogs: payload,
        filteredDogs: payload
      }

    case SET_FILTERS_ORDERS:
      return {
        ...state,
        filtersOrders: {
          ...payload
        }
      }

    // ! Filter Dogs
    case ORDER_FILTER_CARDS:

      let filterByTemps = [];

      let hasTemp = 0;
      if(state.filtersOrders.temperaments.length) {
        state.dogs.forEach(dog => {
          if(dog.hasOwnProperty('temperament')) {
            hasTemp = 0;
            state.filtersOrders.temperaments.forEach(t => {
              if(!dog.temperament.includes(t.name)) {
                hasTemp += 1;
              }
            }) 
            if(hasTemp === 0) filterByTemps.push(dog); 
          }
          if(dog.hasOwnProperty('Temperaments')) {
            hasTemp = 0;
            state.filtersOrders.temperaments.forEach(t => {
              if(!dog.Temperaments.includes(t.name)) {
                hasTemp += 1;
              }
            })
            if(hasTemp === 0) filterByTemps.push(dog); 
          }          
        })
      } else {filterByTemps = [...state.dogs]}

      // Filter by origin (api or db)

      let filterByOrigin = []

      if (filterByTemps.length) {
        if(state.filtersOrders.origin === 'db') {
          filterByOrigin = filterByTemps.filter(x => x.hasOwnProperty('fromDb') )
        }
        if(state.filtersOrders.origin === 'api') {
          filterByOrigin = filterByTemps.filter(x => !(x.hasOwnProperty('fromDb')) )
        }
        if(state.filtersOrders.origin === 'all') {
          filterByOrigin = filterByTemps;
        }
      }

      // order by name

      let orderedDogs = [];

      if(state.filtersOrders.order === "A") {
        if(state.filtersOrders.orderParam === 'name') {
          orderedDogs = [...filterByOrigin].sort((a,b) => {
              let fa = a.name.toLowerCase();
              let fb = b.name.toLowerCase();

              if (fa < fb) {
                  return -1;
              }
              if (fa > fb) {
                  return 1;
              }
              return 0;
          });
        } else if(state.filtersOrders.orderParam === 'weight') {
          // Dogs without average weight
          const withoutAvg = filterByOrigin.filter(dog => dog.avgWeight === 0);
          // Dogs with average weight
          const withAvg = filterByOrigin.filter(dog => dog.avgWeight !== 0);
          // Filter dogs with avg
          const filteredWithAvg = [...withAvg].sort((a,b) => a.avgWeight - b.avgWeight);
          // add dogs without avg weight to the end of filtered dogs array with avg weight
          // Do this to render the "unknown" avg Weight to the end of the render
          orderedDogs = [...filteredWithAvg,...withoutAvg];
        }else {
          orderedDogs = [...filterByOrigin]
        }
      }
      
      if(state.filtersOrders.order === "D") {
        if(state.filtersOrders.orderParam === 'name') {
          orderedDogs = [...filterByOrigin].sort((a,b) => {
            let fa = a.name.toLowerCase();
              let fb = b.name.toLowerCase();

              if (fa < fb) {
                  return 1;
              }
              if (fa > fb) {
                  return - 1;
              }
              return 0;
          });
        }else if(state.filtersOrders.orderParam === "weight") {
          orderedDogs = [...filterByOrigin].sort((a,b) => b.avgWeight - a.avgWeight);
        }else {
          orderedDogs = [...filterByOrigin]
        }
      }
      
      if(state.filtersOrders.order === "any") {
        orderedDogs = [...filterByOrigin]
      }

      return {
        ...state,
        filteredDogs: orderedDogs,
        dogsRendered: 0,
        pageRendered: 0,
        nextInt: 0,
        prevInt: 0
      }

    // ! Get dog by id
    case GET_DOG_BY_ID:
      return{
        ...state,
        dogById: state.dogs.find(dog => {
          if(/[a-z,A-Z]+/.test(payload)) {
            return dog.id === payload;
          } else {
            return dog.id === +payload;            
          }
        })
      }
    
    // ! Get all temperaments
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload
      }

    // ! Set user id

    case SET_USER_ID:
      return {
        ...state,
        userId: payload
      }

    // ! Set user name

    case SET_USER_NAME:
      return {
        ...state,
        userName: payload
      }

    // ! Set show filter

    case SET_SHOW_FILTER:
      return {
        ...state,
        showFilter: payload
      }

    // ! Set show Menu

    case SET_SHOW_MENU:
      return {
        ...state,
        showMenu: payload
      }

    // ! Get dog to update

    case GET_DOG_TO_UPDATE:
      return {
        ...state,
        dogToUpdate: {
          ...payload
        }
      }

    // ! Clear All dogs state

    case CLEAR_ALL_DOGS:
      return {
        ...state,
        dogs: [],
        filteredDogs: []
      }

    default: 
      return {...state}

  }
}

export default reducer;