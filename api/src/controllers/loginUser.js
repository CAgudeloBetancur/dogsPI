
const {User} = require('./../db');

const loginUser = async (req,res) => {
  const {email,password} = req.body;

  if(!email || !password) {
    return res.status(400).send('Faltan Datos');
  }

  try {
    const userFound = await User.findOne({
      where: {
        email
      }
    })
    if(!userFound) {
      return res.status(400).send('Usuario no encontrado, debes registrarte');
    }else if(userFound.password === password) {
      return res.status(200).json({access: true});
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