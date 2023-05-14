const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {getBreedById} = require('./../controllers/getBreedById');
const {getBreeds} = require('./../controllers/getBreeds');
const {getTemperaments} = require('./../controllers/getTemperaments');
const {postDog} = require('./../controllers/postDog');
const {loginUser} = require('./../controllers/loginUser');
const {signUpUser} = require('./../controllers/signUpUser');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ' Routes

// get all dogs
// get dog by name if query exists
router.get('/dogs',(req,res) => {
  getBreeds(req,res);
});

// find dogs by id
router.get('/dogs/:idBreed',(req,res) => {
  getBreedById(req,res);
});

// create dogs
router.post('/dogs',(req,res) => {
  postDog(req,res);
});

// get all dogs temperaments
router.get('/temperaments',(req,res) => {
  getTemperaments(req,res);
});

// users login
router.post('/login',(req,res) => {
  loginUser(req,res);
})

// users signup
router.post('/signup',(req,res) => {
  signUpUser(req,res);
})

module.exports = router;
