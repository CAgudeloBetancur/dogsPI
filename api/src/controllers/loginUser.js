
const sequelize = require('sequelize');
const {User,Breed} = require('./../db');

const loginUser = async (req,res) => {
  const {email,password} = req.body;

  if(!email || !password) {
    return res.status(400).send('Faltan Datos');
  }

  try {

    /* const nextBreedId = await Breed.findAll({
      attributes: [
        [sequelize.fn('max', sequelize.col('id')), "maxId"]
      ]
    }) */

    const userFound = await User.findOne({
      where: {
        email
      }
    })

    if(!userFound) {
      return res.status(400).send('Usuario no encontrado, debes registrarte');
    }else if(userFound.password === password) {
      // {access: true}
      return res.status(200).json({access: true, userId: userFound.id});
    }else {
      return res.status(403).json('Email or Password incorrect');
    }

  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  loginUser
}