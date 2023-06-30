const Recipe = require("../models/recipe")

module.exports = async (req, res) => {
    const currentUserId = req.user.id

    // only delete the recipe if the recipe is submitted by the currently logged in user
    const result = await Recipe.findOneAndDelete({
        _id: req.params.id,
        user: currentUserId
    })

    if (!result) res.status(404).send(`The recipe you're trying to delete doesn't exist`)
    else res.sendStatus(200)
}