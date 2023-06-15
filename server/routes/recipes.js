const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const handleAccess = require('../middleware/handleAccess')

// get all recipes and filter them
router.get('/', async (req, res) => {
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

    const recipes = await Recipe.find({ title, servings, tags, ingredients, duration }, '-nutrition -ingredients -steps -reviews').populate('user', '_id username')
    res.send(recipes)
})

// get a recipe
router.get('/:id', async (req, res) => {
    const currentUserId = req.user.id

    const recipe = await Recipe.findById(req.params.id).populate('user', '_id username').populate('reviews.user', '_id username')

    if (!recipe) {
        res.status(404).send(`The recipe that you're trying to view doesn't exist`)
        return
    }

    // replace array of users with the lengths of said arrays
    recipe.triedBy = recipe.triedBy.length
    recipe.reviews.likes = recipe.reviews.likes.length
    recipe.reviews.dislikes = recipe.reviews.dislikes.length

    // if there is a user who is currently logged in, check if said user reacted to this recipe
    if (currentUserId) {
        recipe.tried = recipe.triedBy.some(userId => userId.toString() === currentUserId)
        recipe.reviews.forEach(review => {
            review.liked = review.likes.some(userId => userId.toString() === currentUserId)
            review.disliked = review.dislikes.some(userId => userId.toString() === currentUserId)
        })
    }

    res.send(recipe)
})

// get all tags
router.get('/tags', async (req, res) => {
    const recipesWithTags = await Recipe.find({}, 'tags')
    const tags = []
    recipesWithTags.forEach(item => {
        item.tags.forEach(tag => {
            if (!tags.includes(tag)) tags.push(tag)
        })
    })
    res.send(tags)
})

// get all ingredients
router.get('/ingredients', async (req, res) => {
    const recipesWithIngredients = await Recipe.find({}, 'ingredients')
    const ingredients = []
    recipesWithIngredients.forEach(item => {
        item.ingredients.forEach(ingredient => {
            if (!ingredients.includes(ingredient.name)) ingredients.push(ingredient.name)
        })
    })
    res.send(ingredients)
})

// add a recipe
router.post('/', handleAccess, async (req, res) => {
    const recipe = req.body
    const currentUserId = req.user.id

    await Recipe.create({
        ...recipe,
        user: new mongoose.Types.ObjectId(currentUserId)
    })

    res.sendStatus(200)
})

// update a recipe
router.put('/:id', handleAccess, async (req, res) => {
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
})

// delete a recipe
router.delete('/:id', handleAccess, async (req, res) => {
    const currentUserId = req.user.id

    // only delete the recipe if the recipe is submitted by the currently logged in user
    const result = await Recipe.findOneAndDelete({
        _id: req.params.id,
        user: currentUserId
    })

    if (!result) res.status(404).send(`The recipe you're trying to delete doesn't exist`)
    else res.sendStatus(200)
})

// execute when the user admits they have tried a recipe
router.post('/:id/triedBy', handleAccess, async (req, res) => {
    const currentUserId = req.user.id

    const result = await Recipe.findByIdAndUpdate(req.params.id, {
        $push: {
            triedBy: new mongoose.Types.ObjectId(currentUserId)
        }
    })

    if (!result) res.status(404).send(`The recipe you're trying to engage with doesn't exist`)
    else res.sendStatus(200)
})

// add a review to a recipe
router.post('/:id/reviews', handleAccess, async (req, res) => {
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
    })

    if (!result) res.status(404).send(`The recipe you're trying to engage with doesn't exist`)
    else res.sendStatus(200)
})

// like a review
router.post('/:recipeId/reviews/:reviewId/likes', handleAccess, async (req, res) => {
    const currentUserId = req.user.id

    const recipe = await Recipe.findById(req.params.recipeId)
    if (!recipe) {
        res.status(404).send(`The recipe you're trying to engage with doesn't exist`)
        return
    }

    const review = recipe.reviews.find(r => r._id.toString() === req.params.reviewId)
    if (!review) {
        res.status(404).send(`The review that you're trying to engage with doesn't exist`)
        return
    }

    review.likes.push(new mongoose.Types.ObjectId(currentUserId))
    await review.save()

    res.sendStatus(200)
})

// dislike a review
router.post('/:recipeId/reviews/:reviewId/dislikes', handleAccess, async (req, res) => {
    const currentUserId = req.user.id

    const recipe = await Recipe.findById(req.params.recipeId)
    if (!recipe) {
        res.status(404).send(`The recipe you're trying to engage with doesn't exist`)
        return
    }

    const review = recipe.reviews.find(r => r._id.toString() === req.params.reviewId)
    if (!review) {
        res.status(404).send(`The review that you're trying to engage with doesn't exist`)
        return
    }

    review.dislikes.push(new mongoose.Types.ObjectId(currentUserId))
    await review.save()

    res.sendStatus(200)
})

module.exports = router