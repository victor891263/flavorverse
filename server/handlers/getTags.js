const Recipe = require("../models/recipe")

module.exports = async (req, res) => {
    const recipesWithTags = await Recipe.find({}, 'tags')
    const tags = []
    recipesWithTags.forEach(item => {
        item.tags.forEach(tag => {
            if (!tags.includes(tag)) tags.push(tag)
        })
    })
    res.send(tags)
}