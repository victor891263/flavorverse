const Recipe = require("../models/recipe")

module.exports = async (req, res) => {
    const currentUserId = req.user.id

    const recipe = await Recipe.findById(req.params.id).populate('user', '_id username img').populate('reviews.user', '_id username img')

    if (!recipe) {
        res.status(404).send(`The recipe that you're trying to view doesn't exist`)
        return
    }

    // replace array of users with the lengths of said arrays
    recipe.triedBy = recipe.triedBy.length
    recipe.reviews.likes = recipe.reviews.likes.length
    recipe.reviews.dislikes = recipe.reviews.dislikes.length

    // if there is a user who is currently logged in, check if said user reacted to this recipe
    if (currentUserId) {
        recipe.tried = recipe.triedBy.some(userId => userId.toString() === currentUserId)
        recipe.reviews.forEach(review => {
            review.liked = review.likes.some(userId => userId.toString() === currentUserId)
            review.disliked = review.dislikes.some(userId => userId.toString() === currentUserId)
        })
    }

    res.send(recipe)
}