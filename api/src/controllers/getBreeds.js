require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');

const KEY = `api_key=${API_KEY}`;
const BASE_URL = `https://api.thedogapi.com/v1/breeds`;
const SEARCH = '/search?q='

const getBreeds = async (req,res) => {

  const {name} = req.query;

  // const URL = `${BASE_URL}${!name ? '' : `${SEARCH}$name`}`

  
  try {
    
    const {data} = await axios.get(
      `${BASE_URL}${!name ? '?' : `${SEARCH}${name}&`}${KEY}`
    );

    if(Array.isArray(data) && !data.length) {
      throw new Error('Dogs not found');
    }

    return res.status(200).json(data);

  } catch (error) {

    return error.message.includes('Breeds') 
      ? res.status(404).send(error.message)
      : res.status(500).json(error.message);

  }


}

module.exports = {
  getBreeds
}