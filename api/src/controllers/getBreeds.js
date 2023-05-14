require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');
const {Breed,Dog,Temperament} = require('./../db')

const KEY = `api_key=${API_KEY}`;
const BASE_URL = `https://api.thedogapi.com/v1/breeds`;
// const SEARCH = '/search?q='

const getBreeds = async (req,res) => {

  // Capture query
  const {name} = req.query;
  
  // Array to All dogs (BD & API)
  let todos = [];

  try {
    
    // All Dogs from API
    const {data} = await axios.get(`${BASE_URL}?${KEY}`); 

    // All Dogs from DB
    const todosBD = await Breed.findAll({
      /* where: {
        name: 'Chamizo',
      }, */
      // attributes: ['id','name'],
      include: {
        model: Temperament,
        // attributes: ['name'],
        through: {
          attributes: []
        }
      }
    });

    const avgWeight = (min,max) => (min + max) / 2; 
    
    // Add average weight to dogs from API
    const dataAvgWeight = data.map(dog => {

      const minMaxWeigth = dog.weight.metric.split(' - ');
      const avg = avgWeight(+minMaxWeigth[0],+minMaxWeigth[1]);

      return {
        ...dog,
        avgWeight: minMaxWeigth.length > 1 
          ? !avg ? 0 : avg 
          : !(+dog.weight.metric) ? 0 : +dog.weight.metric
      }
    })

    const temp = await Dog.findAll();


    // Add average weight to todosBD (from DB)
    let todosBdAvgWeight = [];
    if(todosBD.length) {
      todosBdAvgWeight = todosBD.sort((a,b)=> b.dataValues.id - a.dataValues.id)
      .map((dog) => {
        const minMax = dog.weight.split(' - ');
        return {
          ...dog.dataValues,
          Temperaments: dog.Temperaments.map(t => t.name).join(', '), 
          avgWeight: avgWeight(+minMax[0],+minMax[1]),
          fromDb: true
        }
      })
    }

    todos = [...todosBdAvgWeight,...dataAvgWeight];
    // todos = [...todosBD,...dataAvgWeight];

    // Filtros por nombre
    if(name) {
      // Filtrando api
      const filtDogApi = dataAvgWeight.filter(dog => {
        return dog.name.toLowerCase().includes(name.toLowerCase())
      });

      // Filtrando BD
      let filtDogBD = []

      if(todosBdAvgWeight.length) {
        filtDogBD = todosBdAvgWeight.filter(dog => {
          return dog.name.toLowerCase().includes(name.toLowerCase())
        })
      }

      todos = [...filtDogBD,...filtDogApi];
    }

    if(Array.isArray(data) && !data.length) {
      throw new Error('Dogs not found');
    }

    return res.status(200).json(todos);
    // return res.status(200).json(todos);
    // return res.status(200).json(await perro.getTemperaments({ joinTableAttributes: [] }));

  } catch (error) {

    return error.message.includes('Breeds') 
      ? res.status(404).send(error.message)
      : res.status(500).json(error.message);

  }


}

module.exports = {
  getBreeds
}