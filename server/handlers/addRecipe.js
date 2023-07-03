const Recipe = require("../models/recipe")
const mongoose = require("mongoose")
const {v2: cloudinary} = require("cloudinary")
const fs = require("fs")

module.exports = async (req, res) => {
    const recipe = JSON.parse(req.body.data)
    const img = req.file
    const currentUserId = req.user.id

    // if the user submitted an image, upload it to cloudinary
    let imgUrl
    if (img) {
        // upload to cloudinary
        const response = await cloudinary.uploader.upload(img.path)
        imgUrl = response.secure_url

        // once the image has been uploaded to cloudinary, delete the image from the file system
        fs.unlink(img.path, error => {
            if (error) throw error
        })
    }

    const createdRecipe = await Recipe.create({
        ...recipe,
        ...(imgUrl && { img: imgUrl }), // if a cloudinary image link is found, insert that into database too
        user: new mongoose.Types.ObjectId(currentUserId)
    })

    res.send(createdRecipe.id)
}