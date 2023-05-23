const {Breed,User} = require('./../db');

const postDog = async (req,res) => {
  const {name,image,height,weight,age,temperament,userId} = req.body;

  if(!name || !height || !weight || !age || !temperament || !userId) {
    return res.status(400).send('Faltan datos');
  }

  const tempsId = temperament.map(temp => temp.id);

  const user = await User.findByPk(userId);

  console.log(image);

  try {
    const dog = await Breed.create({
      name,
      image : !image ? null : image,
      height,
      weight,
      age,
    })

    await dog.addTemperaments(tempsId);

    await user.addBreed([dog.id])
    
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