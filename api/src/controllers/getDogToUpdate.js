const {Breed,Dog,Temperament,User} = require('./../db')

const getDogToUpdate = async (req,res) => {

  const {id} = req.params;

  try {
    
    const dogToEdit = await Breed.findByPk(id,{
      include: {
        model: Temperament,
        through: {  
          attributes: []
        }
      }
    })

    if(!dogToEdit) {
      return res.status(400).send('Dog not found');
    }

    const [minHeight,maxHeight] = dogToEdit.dataValues.height.split(' - ');
    const [minWeight,maxWeight] = dogToEdit.dataValues.weight.split(' - ');
    const [minAge,initialMaxAge] = dogToEdit.dataValues.age.split(' - ');
    const [maxAge,yearsString] = initialMaxAge.split(' ');

    const dogToEditTempsId = {
      id: dogToEdit.dataValues.id,
      name: dogToEdit.dataValues.name,
      prevImage: dogToEdit.dataValues.image,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      minAge,
      maxAge,
      Temperaments: dogToEdit.dataValues.Temperaments.map(t => t.id)
    }

    return res.status(200).json(dogToEditTempsId);

  } catch (error) {
    return res.status(500).send(error.message);
  }

}

module.exports = {
  getDogToUpdate
}