require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');

const {Temperament} = require('./../db');

const KEY = `api_key=${API_KEY}`;
const URL = `https://api.thedogapi.com/v1/breeds`;

const getTemperaments = async (req,res) => {
  try {
    const {data} = await axios(`${URL}?${KEY}`);
    
    let tp = []
    
    const temp = data.map(breed => breed.temperament)

    temp.forEach(t => {
        if(t) tp = [...tp,...t.split(', ')] ;
      } );
      
    tp = [...new Set(tp)].sort();

    const objTemp = tp.map(t => {return { name: t } });

    const tempCount = await Temperament.count();

    if(!tempCount) await Temperament.bulkCreate(objTemp);

    const tempBD = await Temperament.findAll();
    
    return res.status(200).json(tempBD);

  } catch (error) {

    return res.status(500).send(error.message);
    
  }


}

module.exports = {
  getTemperaments
}