const {User} = require('./../db');

const signUpUser = async (req,res) => {

  const {name,email,password} = req.body;

  if(!name || !email || !password) return res.status(400).send('faltan datos');

  try {
    
    const userCreated = await User.create({
      name,
      email,
      password
    })

    return res.status(200).json(userCreated);

  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  signUpUser
}