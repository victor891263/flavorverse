const Recipe = require("../models/recipe")

module.exports = async (req, res) => {
    const currentUserId = req.user.id

    const recipe = await Recipe.findById(req.params.id).populate('user', '_id username img').populate('reviews.user', '_id username img').lean()

    if (!recipe) {
        res.status(404).send(`The recipe that you're trying to view doesn't exist`)
        return
    }

    recipe.reviews.forEach(review => {
        // if there is a user who is currently logged in, check if said user reacted to this recipe
        if (currentUserId) {
            review.liked = review.likes.some(userId => userId.toString() === currentUserId)
            review.disliked = review.dislikes.some(userId => userId.toString() === currentUserId)
        }
        // calculate the amount of likes and dislikes for each review
        review.likes = review.likes.length
        review.dislikes = review.dislikes.length
    })

    res.send(recipe)
}