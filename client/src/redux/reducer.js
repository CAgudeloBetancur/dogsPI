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
} from './actions';

const initialState = {
  dogs: [], // All dogs (api + db)
  temperaments: [], // All temperaments
  filteredDogs: [], // Filters

  dogById: {},

  userId: '',

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
        /* dbDogsID: payload[0].id > payload[payload.length - 1].id
          ? payload[0].id
          : payload[payload.length - 1].id */
      }

    case GET_DOGS_BY_NAME:
      return {
        ...state,
        dogs: payload,
        filteredDogs: payload
      }

    // ! Filter Dogs
    case ORDER_FILTER_CARDS:

      const {orderParam,order,origin,temperaments} = payload;

      // Filtro por temperament

      console.log(payload)

      let filterByTemps = [];

      let hasTemp = 0;
      if(temperaments.length) {
        state.dogs.forEach(dog => {
          if(dog.hasOwnProperty('temperament')) {
            hasTemp = 0;
            temperaments.forEach(t => {
              if(!dog.temperament.includes(t.name)) {
                hasTemp += 1;
              }
            }) 
            if(hasTemp === 0) filterByTemps.push(dog); 
          }
          if(dog.hasOwnProperty('Temperaments')) {
            hasTemp = 0;
            temperaments.forEach(t => {
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
        if(origin === 'db') {
          filterByOrigin = filterByTemps.filter(x => x.hasOwnProperty('fromDb') )
        }
        if(origin === 'api') {
          filterByOrigin = filterByTemps.filter(x => !(x.hasOwnProperty('fromDb')) )
        }
        if(origin === 'all') {
          filterByOrigin = filterByTemps;
        }
      }

      // order by name

      let orderedDogs = [];

      if(order === "A") {
        if(orderParam === 'name') {
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
        } else if(orderParam === 'weight') {
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
      
      if(order === "D") {
        if(orderParam === 'name') {
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
        }else if(orderParam === "weight") {
          orderedDogs = [...filterByOrigin].sort((a,b) => b.avgWeight - a.avgWeight);
        }else {
          orderedDogs = [...filterByOrigin]
        }
      }
      
      if(order === "any") {
        orderedDogs = [...filterByOrigin]
      }

      return {
        ...state,
        // filteredDogs: filterByTemps
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

    default: 
      return {...state}

  }
}

export default reducer;