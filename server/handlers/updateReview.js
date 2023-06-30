const Recipe = require('../models/recipe')

module.exports = async (req, res) => {
    const currentUserId = req.user.id
    const newReview = req.body

    // find the recipe that the edited review belongs to
    const recipe = await Recipe.findById(req.params.recipeId, 'reviews')
    if (!recipe) {
        res.status(404).send(`The recipe you're trying to engage with doesn't exist`)
        return
    }

    // find the review and check if it is submitted by the currently logged in user
    const review = recipe.reviews.find(r => ((r._id.toString() === req.params.reviewId) && (r.user.toString() === currentUserId)))
    if (!review) {
        res.status(404).send(`The review that you're trying to engage with doesn't exist`)
        return
    }

    // update the review
    review.body = newReview.body
    review.rating = newReview.rating
    await recipe.save()

    res.sendStatus(200)
}