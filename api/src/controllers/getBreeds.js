require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');
const {Breed,Dog,Temperament,User} = require('./../db')

const KEY = `api_key=${API_KEY}`;
const BASE_URL = `https://api.thedogapi.com/v1/breeds`;
// const SEARCH = '/search?q='

const getBreeds = async (req,res) => {

  // Capture query
  const {name,userid} = req.query;
  
  // Array to group All dogs (BD & API)
  let todos = [];

  try {
    
    // All Dogs from API
    const {data} = await axios.get(`${BASE_URL}?${KEY}`); 

    // All Dogs from User

    console.log('Socioooo')
    
    const {Breeds} = await User.findByPk(userid,{
      include: {
        model: Breed,
        include: {
          model: Temperament,
          through: {
            attributes: []
          }
        }
      }
    })
    

    // return res.status(200).json(Breeds);

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

    // const temp = await Dog.findAll();

    // Add average weight to todosBD (from DB)
    let avgUserBreeds = [];
    if(Breeds.length) {
      avgUserBreeds = Breeds.sort((a,b)=> b.dataValues.id - a.dataValues.id)
      .map((dog) => {
        const minMax = dog.dataValues.weight.split(' - ');
        return {
          ...dog.dataValues,
          Temperaments: dog.dataValues.Temperaments.map(t => t.name).join(', '), 
          avgWeight: avgWeight(+minMax[0],+minMax[1]),
          fromDb: true
        }
      })
    }

    todos = [...avgUserBreeds.reverse(),...dataAvgWeight];

    // Filtros por nombre
    if(name) {
      // Filtrando api
      console.log('Hola socio, si envia el nombre')
      const filtDogApi = dataAvgWeight.filter(dog => {
        return dog.name.toLowerCase().includes(name.toLowerCase())
      });

      // Filtrando BD
      let filtDogBD = []

      if(avgUserBreeds.length) {
        filtDogBD = avgUserBreeds.filter(dog => {
          return dog.name.toLowerCase().includes(name.toLowerCase())
        })
      }

      todos = [...filtDogBD,...filtDogApi];
    }

    if(Array.isArray(data) && !data.length) {
      throw new Error('Dogs not found');
    }

    return res.status(200).json(todos);

  } catch (error) {

    return error.message.includes('Breeds') 
      ? res.status(404).send(error.message)
      : res.status(500).json(error.message);

  }


}

module.exports = {
  getBreeds
}