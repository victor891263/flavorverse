const Recipe = require("../models/recipe")
const mongoose = require("mongoose")

module.exports = async (req, res) => {
    const review = req.body
    const currentUserId = req.user.id

    const result = await Recipe.findByIdAndUpdate(req.params.id, {
        $push: {
            reviews: {
                user: new mongoose.Types.ObjectId(currentUserId),
                body: review.body,
                rating: review.rating
            }
        }
    }, { new: true }) // return the updated recipe

    if (!result) {
        res.status(404).send(`The recipe you're trying to engage with doesn't exist`)
        return
    }

    // re-calculate the rating of the recipe every time a new review is added
    let sumOfAllRatings = 0
    result.reviews.forEach(review => {
        sumOfAllRatings += review.rating
    })
    const recipeRating = sumOfAllRatings / result.reviews.length

    // assign the calculated rating to the recipe and save it to the database
    result.rating = recipeRating
    result.save()

    res.send(result)
}