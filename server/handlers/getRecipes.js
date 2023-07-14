const Recipe = require("../models/recipe")

module.exports = async (req, res) => {
    const { title, tags, ingredients, servingsMin, servingsMax, ratingMin, ratingMax, prepMin, prepMax, cookMin, cookMax } = req.query

    const query = {}

    const servings = {}
    const rating = {}
    const prep = {}
    const cook = {}

    if (title) query.title = title
    if (tags) query.tags = { $in: JSON.parse(decodeURI(req.query.tags)) }
    if (ingredients) query['ingredients.$.name'] = { $in: JSON.parse(decodeURI(req.query.ingredients)) }

    if (servingsMin) servings.$gte = servingsMin
    if (servingsMax) servings.$lte = servingsMax
    if (Object.keys(servings).length > 0) query.servings = servings

    if (ratingMin) rating.$gte = ratingMin
    if (ratingMax) rating.$lte = ratingMax
    if (Object.keys(rating).length > 0) query.rating = rating

    if (prepMin) prep.$gte = prepMin
    if (prepMax) prep.$lte = prepMax
    if (Object.keys(prep).length > 0) query['duration.prep'] = prep

    if (cookMin) cook.$gte = cookMin
    if (cookMax) cook.$lte = cookMax
    if (Object.keys(cook).length > 0) query['duration.cook'] = cook

    const recipes = await Recipe.find(query, '-nutrition -ingredients -steps -reviews').populate('user', '_id username img')
    res.send(recipes)
}
