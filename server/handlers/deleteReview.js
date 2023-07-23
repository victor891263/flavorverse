const Recipe = require('../models/recipe')

module.exports = async (req, res) => {
    const currentUserId = req.user.id
    const { reviewId, recipeId } = req.params

    // find the recipe that the edited review belongs to
    const recipe = await Recipe.findById(recipeId, 'reviews')
    if (!recipe) {
        res.status(404).send(`The recipe you're trying to engage with doesn't exist`)
        return
    }

    // find the review and check if it is submitted by the currently logged in user
    const review = recipe.reviews.find(r => ((r._id.toString() === reviewId) && (r.user.toString() === currentUserId)))
    if (!review) {
        res.status(404).send(`The review that you're trying to engage with doesn't exist`)
        return
    }

    // delete the review
    recipe.reviews = recipe.reviews.filter(r => r._id.toString() !== reviewId)

    // re-calculate the rating of the recipe every time a new review is added
    let sumOfAllRatings = 0
    recipe.reviews.forEach(review => {
        sumOfAllRatings += review.rating
    })
    const recipeRating = sumOfAllRatings / recipe.reviews.length

    // assign the calculated rating to the recipe
    recipe.rating = recipeRating

    // save it to the database
    await recipe.save()

    res.sendStatus(200)
}