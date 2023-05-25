const {User} = require('./../db');

const signUpUser = async (req,res) => {

  const {name,email,password} = req.body;

  if(!name || !email || !password) return res.status(400).json({error: 'Missing data'});

  try {
    
    const userCreated = await User.create({
      name,
      email,
      password
    })

    // userCreated.addBreed(1);

    return res.status(200).json(userCreated);

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Email ya registrado'});
  }
}

module.exports = {
  signUpUser
}