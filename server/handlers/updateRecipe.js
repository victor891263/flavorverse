const Recipe = require("../models/recipe")

module.exports = async (req, res) => {
    const newRecipe = req.body
    const currentUserId = req.user.id

    // removed properties of the recipe that the user cannot edit via the user interface
    delete newRecipe.user
    delete newRecipe.triedBy
    delete newRecipe.reviews

    // only update the recipe if the recipe is submitted by the currently logged in user
    const result = await Recipe.findOneAndUpdate({
        _id: req.params.id,
        user: currentUserId
    }, newRecipe)

    if (!result) res.status(404).send(`The recipe you're trying to update doesn't exist`)
    else res.sendStatus(200)
}