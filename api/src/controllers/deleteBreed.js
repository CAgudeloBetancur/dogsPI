const {Breed} = require('./../db');

const deleteBreed = async (req,res) => {
  const {id} = req.params;

  try {
    await Breed.destroy({
      where : {
        id
      }
    }) 
    return res.status(200).json({success: true})
  } catch (error) {
    return res.status(500).send(error.message);
  }

}

module.exports = {
  deleteBreed
}