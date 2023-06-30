const Recipe = require("../models/recipe")
const mongoose = require("mongoose")

module.exports = async (req, res) => {
    const currentUserId = req.user.id

    const recipe = await Recipe.findById(req.params.recipeId, 'reviews')
    if (!recipe) {
        res.status(404).send(`The recipe you're trying to engage with doesn't exist`)
        return
    }

    const review = recipe.reviews.find(r => r._id.toString() === req.params.reviewId)
    if (!review) {
        res.status(404).send(`The review that you're trying to engage with doesn't exist`)
        return
    }

    review.dislikes.push(new mongoose.Types.ObjectId(currentUserId))
    await review.save()

    res.sendStatus(200)
}