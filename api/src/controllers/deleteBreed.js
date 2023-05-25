const {Breed} = require('./../db');
const {rimraf} = require('rimraf');

const deleteBreed = async (req,res) => {
  const {id,img} = req.query;

  console.log(req.body);

  try {
    await Breed.destroy({
      where : {
        id
      }
    }) 
    rimraf(`C:/Users/user/Downloads/PI-Dogs-main/api/src/images/${img}`);
    return res.status(200).json({success: true})
  } catch (error) {
    return res.status(500).send(error.message);
  }

}

module.exports = {
  deleteBreed
}