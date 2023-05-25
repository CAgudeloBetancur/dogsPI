const {Temperament} = require('./../db');

const postTemperament = async (req,res) => {

  const {name} = req.body;

  try {
    
    const tempCreated = await Temperament.create({
      name
    })

    return res.status(200).json(tempCreated);

  } catch (error) {
    return res.status(500).send(error.message);
  }


}

module.exports = {
  postTemperament
}