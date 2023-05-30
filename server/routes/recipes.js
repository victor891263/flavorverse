const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const handleAccess = require('../middleware/handleAccess')

// get all recipes and filter them
router.get('/', async (req, res) => {
    const title = req.query.title || { $exists: true }
    const servings = req.query.servings ? Number(req.query.servings) : { $exists: true }
    const tags = req.query.tags ? { $in: JSON.parse(req.query.tags) } : { $exists: true }
    const ingredients = req.query.ingredients ? { $in: JSON.parse(req.query.ingredients) } : { $exists: true }
    const duration = {
        prep: req.query.prep ? {
            $gte: JSON.parse(req.query.prep)[0],
            $lte: JSON.parse(req.query.prep)[1]
        }:{
            $exists: true
        },
        cook: req.query.cook ? {
            $gte: JSON.parse(req.query.cook)[0],
            $lte: JSON.parse(req.query.cook)[1]
        }:{
            $exists: true
        }
    }

    const recipes = await Recipe.find({ title, servings, tags, ingredients, duration }).populate('user', '_id username')
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

    if (currentUserId) {
        recipe.tried = recipe.triedBy.some(userId => userId.toString() === currentUserId)
        recipe.reviews.forEach(review => {
            review.liked = review.likes.some(userId => userId.toString() === currentUserId)
            review.disliked = review.dislikes.some(userId => userId.toString() === currentUserId)
        })
    }

    res.send(recipe)
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

module.exports = router