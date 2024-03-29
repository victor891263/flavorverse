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
            console.log(newRecipe.img)
            const publicId = newRecipe.img.match(/\/([^/]+)\.[a-zA-Z0-9]+$/)[1] // extract the public id from the image url
            const r = await cloudinary.uploader.destroy(publicId)
            console.log(r)
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
    }, newRecipe, { new: true }).populate('user', '_id username img').populate('reviews.user', '_id username img')

    if (result) {
        const recipe = result.toObject()

        // recalculate the amount of likes and dislikes and liked/disliked states for each review of the newly returned recipe object
        recipe.reviews.forEach(review => {
            review.liked = review.likes.some(userId => userId.toString() === currentUserId)
            review.disliked = review.dislikes.some(userId => userId.toString() === currentUserId)
            review.likes = review.likes.length
            review.dislikes = review.dislikes.length
        })

        res.send(recipe)
    } else {
        res.status(404).send(`The recipe you're trying to update doesn't exist`)
    }
}