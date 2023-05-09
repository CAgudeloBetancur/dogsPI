const {Breed} = require('./../db');

const postDog = async (req,res) => {
  const {id,name,image,height,weight,age,temperament} = req.body;

  if(!name || !height || !weight || !age || !temperament) {
    return res.status(400).send('Faltan datos');
  }

  try {
    const dog = await Breed.create({
        id,
        name,
        image : !image ? null : image,
        height,
        weight,
        age,
    })

    await dog.addTemperaments(temperament);

    return dog
      ? res.status(200).json(dog)
      : res.status(400).send(`Dog already exists`)

  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  postDog
}