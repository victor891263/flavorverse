const Recipe = require("../models/recipe")
const {v2: cloudinary} = require("cloudinary");
const fs = require("fs");

module.exports = async (req, res) => {
    const newRecipe = JSON.parse(req.body.data)
    const img = req.file
    const currentUserId = req.user.id

    // removed properties of the recipe that the user cannot edit via the user interface
    delete newRecipe.user
    delete newRecipe.triedBy
    delete newRecipe.reviews

    // if the user submitted an image, upload it to cloudinary
    if (img) {
        // if the user has an old image, remove it from cloudinary
        if (newRecipe.img) {
            const publicId = newRecipe.img.match(/\/([^/]+)\.[a-zA-Z0-9]+$/)[1] // extract the public id from the image url
            await cloudinary.uploader.destroy(publicId)
        }

        // upload to cloudinary
        const response = await cloudinary.uploader.upload(img.path)
        newRecipe.img = response.secure_url

        // once the image has been uploaded to cloudinary, delete the image from the file system
        fs.unlink(img.path, error => {
            if (error) throw error
        })
    }

    // only update the recipe if the recipe is submitted by the currently logged in user
    const result = await Recipe.findOneAndUpdate({
        _id: req.params.id,
        user: currentUserId
    }, newRecipe)

    if (!result) res.status(404).send(`The recipe you're trying to update doesn't exist`)
    else res.sendStatus(200)
}