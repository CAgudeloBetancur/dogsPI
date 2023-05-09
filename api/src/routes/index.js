const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {getBreedById} = require('./../controllers/getBreedById');
const {getBreeds} = require('./../controllers/getBreeds');
const {getTemperaments} = require('./../controllers/getTemperaments');
const {postDog} = require('./../controllers/postDog');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ' Routes

// /dogs
// /dogs?name=...
router.get('/dogs',(req,res) => {
  getBreeds(req,res);
});

// /dogs/:idRaza
router.get('/dogs/:idBreed',(req,res) => {
  getBreedById(req,res);
});

// /dogs
router.post('/dogs',(req,res) => {
  postDog(req,res);
});

// /temperaments
router.get('/temperaments',(req,res) => {
  getTemperaments(req,res);
});

module.exports = router;
