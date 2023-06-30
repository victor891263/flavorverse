const Recipe = require("../models/recipe")
const mongoose = require("mongoose")

module.exports = async (req, res) => {
    const recipe = req.body
    const currentUserId = req.user.id

    const createdRecipe = await Recipe.create({
        ...recipe,
        user: new mongoose.Types.ObjectId(currentUserId)
    })

    res.send(createdRecipe.id)
}