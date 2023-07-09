const Recipe = require("../models/recipe")
const mongoose = require("mongoose")

module.exports = async (req, res) => {
    const currentUserId = req.user.id
    const { recipeId, reviewId } = req.params

    const recipe = await Recipe.findById(recipeId, 'reviews')
    if (!recipe) {
        res.status(404).send(`The recipe you're trying to engage with doesn't exist`)
        return
    }

    const review = recipe.reviews.find(r => r.id === reviewId)
    if (!review) {
        res.status(404).send(`The review that you're trying to engage with doesn't exist`)
        return
    }

    const userObjectId = new mongoose.Types.ObjectId(currentUserId)

    if (review.likes.includes(userObjectId)) {
        await Recipe.updateOne({
            "_id": recipeId,
            "reviews._id": reviewId
        }, {
            $pull: { "reviews.$.likes": userObjectId }
        })
    } else {
        await Recipe.updateOne({
            "_id": recipeId,
            "reviews._id": reviewId
        }, {
            $addToSet: { "reviews.$.likes": userObjectId }
        })
    }

    res.sendStatus(200)
}