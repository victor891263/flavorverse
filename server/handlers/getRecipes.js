const Recipe = require("../models/recipe")

module.exports = async (req, res) => {
    const title = req.query.title
    const tags = req.query.tags && { $in: JSON.parse(decodeURI(req.query.tags)) }
    const ingredients = req.query.ingredients && {
        $in: JSON.parse(decodeURI(req.query.ingredients))
    }
    const servings = (req.query.servingsMin || req.query.servingsMax) && {
        ...(req.query.servingsMin && { $gte: req.query.servingsMin }),
        ...(req.query.servingsMax && { $lte: req.query.servingsMax })
    }
    const rating = (req.query.ratingMin || req.query.ratingMax) && {
        ...(req.query.ratingMin && { $gte: req.query.ratingMin }),
        ...(req.query.ratingMax && { $lte: req.query.ratingMax })
    }
    const prep = (req.query.prepMin || req.query.prepMax) && {
        ...(req.query.prepMin && { $gte: req.query.prepMin }),
        ...(req.query.prepMax && { $lte: req.query.prepMax })
    }
    const cook = (req.query.cookMin || req.query.cookMax) && {
        ...(req.query.cookMin && { $gte: req.query.cookMin }),
        ...(req.query.cookMax && { $lte: req.query.cookMax })
    }

    const recipes = await Recipe.find({
        ...(title && {
            title
        }),
        ...(servings && {
            servings
        }),
        ...(tags && {
            tags
        }),
        ...(rating && {
            rating
        }),
        ...(ingredients && {
            'ingredients.$.name': ingredients
        }),
        ...(prep && {
            'duration.prep': prep
        }),
        ...(cook && {
            'duration.cook': cook
        })
    }, '-nutrition -ingredients -steps -reviews').populate('user', '_id username img')
    res.send(recipes)
}