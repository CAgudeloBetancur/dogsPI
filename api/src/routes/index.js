const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({storage: storage})

const {getBreedById} = require('./../controllers/getBreedById');
const {getBreeds} = require('./../controllers/getBreeds');
const {getTemperaments} = require('./../controllers/getTemperaments');
const {postDog} = require('./../controllers/postDog');
const {loginUser} = require('./../controllers/loginUser');
const {signUpUser} = require('./../controllers/signUpUser');
const {uploadImage} = require('./../controllers/uploadImage');
const {getImage} = require('./../controllers/getImage');
const {deleteBreed} = require('./../controllers/deleteBreed');
const {getDogToUpdate} = require('./../controllers/getDogToUpdate');
const {updateBreed} = require('./../controllers/updateBreed');
const {postTemperament} = require('./../controllers/postTemperament');

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

// delete breed (use queries)
router.delete('/delete',(req,res)=>{
  deleteBreed(req,res);
})

// get dog to update
router.get('/dog-to-update/:id',(req,res) => {
  getDogToUpdate(req,res);
})

// update breed
router.put('/update/:id',(req,res)=>{
  updateBreed(req,res);
})

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

// image upload
router.post('/upload-image',upload.single('image'),(req,res) => {
  uploadImage(req,res);
})

// get image 
router.get('/image/:imageName',(req,res) => {
  getImage(req,res);
})

// post temperament
router.post('/temperament',(req,res)=>{
  postTemperament(req,res);
})

module.exports = router;
