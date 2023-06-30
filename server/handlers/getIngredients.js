const Recipe = require("../models/recipe")

module.exports = async (req, res) => {
    const recipesWithIngredients = await Recipe.find({}, 'ingredients')
    const ingredients = []
    recipesWithIngredients.forEach(item => {
        item.ingredients.forEach(ingredient => {
            if (!ingredients.includes(ingredient.name)) ingredients.push(ingredient.name)
        })
    })
    res.send(ingredients)
}