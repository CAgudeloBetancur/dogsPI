const fs = require('fs');

const getImage = (req,res) => {

  const imageName = req.params.imageName;
  const readStream = fs.createReadStream(`src/images/${imageName}`).pipe(res);
  // readStream.pipe(res);

}

module.exports = {
  getImage
}