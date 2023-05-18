
const uploadImage = (req,res) => {
  const imageName = req.file.filename;
  return res.status(200).send({imageName});
}

module.exports = {
  uploadImage
}