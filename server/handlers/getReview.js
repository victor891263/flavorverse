const Recipe = require("../models/recipe")

module.exports = async (req, res) => {
    const currentUserId = req.user.id
    const recipeId = req.params.recipeId
    const reviewId = req.params.reviewId

    const recipe = await Recipe.findById(recipeId, 'reviews')
    if (!recipe) {
        res.status(404).send(`The recipe you're trying to engage with doesn't exist`)
        return
    }

    const review = recipe.reviews.find(r => ((r.id === reviewId) && (r.user.toString() === currentUserId)))
    if (!review) {
        res.status(404).send(`The review that you're trying to engage with doesn't exist`)
        return
    }

    res.send(review)
}