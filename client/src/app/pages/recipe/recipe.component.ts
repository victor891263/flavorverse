import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {Recipe, Review} from "../../types"
import { recipes } from "../../utilities/recipes"
import getTimeLabel from '../../utilities/getTimeLabel'
import { RecipesService } from "../../services/recipes.service"
import getCurrentUser from '../../utilities/getCurrentUser'
import {HttpErrorResponse} from "@angular/common/http"
import {RecipeSkeletonComponent} from '../../components/recipe-skeleton/recipe-skeleton.component'
import handleAutoResize from "../../utilities/handleAutoResize"

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})

export class RecipeComponent implements OnInit {
    currentUser = getCurrentUser()
    skeleton = RecipeSkeletonComponent

    recipe: Recipe

    rating = 0
    review: string

    retrievalErrorMsg: string
    errorMsg: string

    getTimeLabel = getTimeLabel
    handleAutoResize = handleAutoResize

    setRating(n: number) {
        this.rating = n
    }

    submitReview(e) {
        e.target.innerText = 'Submitting...'
        e.target.disabled = true
        this.recipesService.submitReview(this.recipe._id, {
            user: this.currentUser._id,
            body: this.review,
            rating: this.rating
        }).subscribe((response: Recipe) => {
            this.recipe.reviews = response.reviews
            e.target.innerText = 'Submit'
            e.target.disabled = false
        },(error: HttpErrorResponse) => {
            this.errorMsg = error.message
            setTimeout(() => this.errorMsg = '', 5000)
            e.target.innerText = 'Submit'
            e.target.disabled = false
        })
    }

    likeReview(reviewId: string) {
        const review = this.recipe.reviews.find(review => review._id === reviewId)
        this.handleReact(review, 'like')

        this.recipesService.likeReview(this.recipe._id, reviewId).subscribe(() => {
            console.log('Liked review')
        }, (error: HttpErrorResponse) => {
            this.errorMsg = error.message
            setTimeout(() => this.errorMsg = '', 5000)
            this.handleReact(review, 'like')
        })
    }

    dislikeReview(reviewId: string) {
        const review = this.recipe.reviews.find(review => review._id === reviewId)
        this.handleReact(review, 'dislike')

        this.recipesService.dislikeReview(this.recipe._id, reviewId).subscribe(() => {
            console.log('Disliked review')
        }, (error: HttpErrorResponse) => {
            this.errorMsg = error.message
            setTimeout(() => this.errorMsg = '', 5000)
            this.handleReact(review, 'dislike')
        })
    }

    handleReact(review: Review, type: 'like' | 'dislike') {
        if (type === 'like') {
            if (review.liked) review.likes--
            else review.likes++
            review.liked = !review.liked
        }
        if (type === 'dislike') {
            if (review.disliked) review.dislikes--
            else review.dislikes++
            review.disliked = !review.disliked
        }
    }

    constructor(private route: ActivatedRoute, private recipesService: RecipesService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.recipesService.getRecipe(params['id']).subscribe(response => {
                this.recipe = response
            }, (error: HttpErrorResponse) => {
                this.retrievalErrorMsg = error.message
            })
        })
    }
}

/*
this.route.params.subscribe(params => {
    this.recipe = recipes.find(recipe => recipe._id === params['id'])
})

this.route.params.subscribe(params => {
    this.recipesService.getRecipe(params['id']).subscribe(response => {
        this.recipe = response
    }, (error: HttpErrorResponse) => {
        this.retrievalErrorMsg = error.message
    })
})
*/

/*
const ratingTotal = recipe.reviews.map(review => review.rating)
this.rating = ratingTotal.reduce((a, b) => a + b, 0) / ratingTotal.length
*/
