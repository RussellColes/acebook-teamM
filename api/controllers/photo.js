const Photo = require("../models/photo");
const { generateToken } = require("../lib/token");
const fs = require('fs');
const path = require('path');


async function upload(req, res) {
    console.log(req.file)
    const photoName = req.file.filename;
    const photoPath = req.file.path;
    // const photoPath = "I broke your code";
    // const dateNow = Date.now() 
    const user_id = req.user_id
    const photos = await Photo.find({ user_id: user_id })
    if (photos.length !== 0) {
      const pathParts = __dirname.split(path.sep);
      const apiIndex = pathParts.indexOf('api');
      const apiPath = pathParts.slice(0, apiIndex + 1).join(path.sep);
      console.log(apiPath);
      console.log(`${apiPath}/${photos[0].photoFilePath}`);
      fs.unlink(`${apiPath}/${photos[0].photoFilePath}`, (err) => {
        console.log(err);
      })
      const result = await Photo.findByIdAndDelete(photos[0]._id)
    }
  
    try {
      await Photo.create({photoFileName: photoName, photoFilePath: photoPath, user_id: user_id})
      res.json({status:"ok"})
    } catch (error) {
      res.json({status:"error"})
    }

  }


async function get(req, res) {
  try {
    const photo = await Photo.find({ user_id: req.user_id })
    const newToken = generateToken(req.user_id);
    // const photoPath = path.join(__dirname, photos[0].photoFilePath);
    // console.log(photoPath)
    // fs.readFile(photoPath, (err, data) => {
    //     if (err) {
    //       console.error("Error reading photo:", err);
    //       return res.status(500).json({ message: "Error reading photo" });
    //     }
      
    //     res.setHeader('Content-Type', 'image/png');
    //     res.status(200).send(data);
    //   });
  let filePath
  if (photo.length === 0) {
    filePath = "uploads/default_photo.webp"
  } else {
    filePath = photo[0].photoFilePath
  }
    res.status(200).json({ filePath: filePath, token: newToken })

  } catch (error) {
    res.status(400);
}

}


const photoController = {
    upload: upload,
    get: get
  };

module.exports = photoController;