require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');

const key = `?api_key=${API_KEY}`;
const URL = `https://api.thedogapi.com/v1/breeds`;

const getBreedById = async (req,res) => {

  const {idBreed} = req.params;

  console.log('hola');

  try {
    
    const {data} = await axios(`${URL}/${idBreed}${key}`);

    if(!data.name) throw new Error(`ID : ${idBreed} was not found, sorry`);

    const breed = {
      id: data.id,
      image: `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`,
      height: data.height.metric,
      weight: data.weight.metric,
      life_span: data.life_span
    }

    return res.status(200).json(breed);

  } catch (error) {
    return res.status(500).send(error.message);
  }

}

module.exports = {
  getBreedById
}