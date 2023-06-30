const Recipe = require("../models/recipe")

module.exports = async (req, res) => {
    const title = req.query.title || { $exists: true }
    const servings = req.query.servings ? Number(req.query.servings) : { $exists: true }
    const tags = req.query.tags ? { $in: JSON.parse(decodeURI(req.query.tags)) } : { $exists: true }
    const ingredients = req.query.ingredients ? { $in: JSON.parse(decodeURI(req.query.ingredients)) } : { $exists: true }
    const duration = {
        prep: (req.query.prepMin || req.query.prepMax) ? {
            ...(req.query.prepMin && { $gte: req.query.prepMin }),
            ...(req.query.prepMax && { $lte: req.query.prepMax })
        }:{
            $exists: true
        },
        cook: (req.query.cookMin || req.query.cookMax) ? {
            ...(req.query.cookMin && { $gte: req.query.cookMin }),
            ...(req.query.cookMax && { $lte: req.query.cookMax })
        }:{
            $exists: true
        }
    }

    const recipes = await Recipe.find({ title, servings, tags, ingredients, duration }, '-nutrition -ingredients -steps -reviews').populate('user', '_id username img')
    res.send(recipes)
}