const {Breed,User} = require('./../db');

const fs = require('fs');
const path = require('path');
const {rimraf, rimrafSync} = require('rimraf');

const updateBreed = async (req,res) => {

  const {name,image,height,weight,age,temperament,userId,previousImage} = req.body;

  // Breed id
  const {id} = req.params
  
  let tempsId = []

  if(temperament) tempsId = temperament.map(temp => temp.id);

  try {

    const data = await Breed.update(
      {
        ...(name ? {name} : {}),
        ...(image ? {image} : {}),
        ...(height ? {height} : {}),
        ...(weight ? {weight} : {}),
        ...(age ? {age} : {})
      },
      {
        where: {
          id
        }
      }
    )

    const dog = await Breed.findByPk(id)

    await dog.setTemperaments(tempsId);

    if(image) {
      rimraf(`C:/Users/user/Downloads/PI-Dogs-main/api/src/images/${previousImage}`);
    }

    console.log();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).send('Mijo, vea: ' + error.message)
  }
  

}

module.exports = {
  updateBreed
}