const express = require('express')
const router = express.Router()
const getRecipes = require('../handlers/getRecipes')
const getRecipe = require('../handlers/getRecipe')
const getTags = require('../handlers/getTags')
const getIngredients = require('../handlers/getIngredients')
const addRecipe = require('../handlers/addRecipe')
const updateRecipe = require('../handlers/updateRecipe')
const deleteRecipe = require('../handlers/deleteRecipe')
const addReview = require('../handlers/addReview')
const likeReview = require('../handlers/likeReview')
const dislikeReview = require('../handlers/dislikeReview')
const handleAccess = require('../middleware/handleAccess')

// get all recipes and filter them
router.get('/', getRecipes)

// add a recipe
router.post('/', handleAccess, addRecipe)

// get all tags
router.get('/tags', getTags)

// get all ingredients
router.get('/ingredients', getIngredients)

// get a recipe
router.get('/:id', getRecipe)

// update a recipe
router.put('/:id', handleAccess, updateRecipe)

// delete a recipe
router.delete('/:id', handleAccess, deleteRecipe)

// add a review to a recipe
router.post('/:id/reviews', handleAccess, addReview)

// like a review
router.post('/:recipeId/reviews/:reviewId/likes', handleAccess, likeReview)

// dislike a review
router.post('/:recipeId/reviews/:reviewId/dislikes', handleAccess, dislikeReview)

module.exports = router