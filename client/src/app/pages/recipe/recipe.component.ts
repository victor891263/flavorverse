import { Component, OnInit } from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Recipe, Review} from "../../types"
import getTimeLabel from '../../utilities/getTimeLabel'
import { RecipesService } from "../../services/recipes.service"
import getCurrentUser from '../../utilities/getCurrentUser'
import {HttpErrorResponse} from "@angular/common/http"
import handleAutoResize from "../../utilities/handleAutoResize"
import createObserverObject from "../../utilities/createObserverObject";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})

export class RecipeComponent implements OnInit {
    get currentUser() {
        return getCurrentUser()
    }

    isBoxOpen = false

    toggleBox(isOpen: boolean) {
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden'
            this.isBoxOpen = true
        } else {
            document.documentElement.style.overflow = 'auto'
            this.isBoxOpen = false
        }
    }

    recipe: Recipe

    rating = 0
    review: string

    retrievalErrorMsg: string
    errorMsg: string
    successMsg: string

    isEditReviewBoxOpen = false
    selectedReview: Review

    getTimeLabel = getTimeLabel
    handleAutoResize = handleAutoResize

    get ratingCountArray() {
        return [5, 4, 3, 2, 1].map(item => ([
            this.countReview(item, 'raw'),
            this.countReview(item, 'percentage')
        ]))
    }

    get isReviewAlreadyGiven() {
        return this.recipe.reviews.find(r => r.user._id === this.currentUser._id)
    }

    openEditReview(review: Review) {
        this.selectedReview = {...review}
        document.documentElement.style.overflow = 'hidden'
        this.isEditReviewBoxOpen = true
    }

    closeEditReview() {
        document.documentElement.style.overflow = 'auto'
        this.isEditReviewBoxOpen = false
    }

    handleRecipeUpdateSuccess(newRecipe: Recipe) {
        this.recipe = newRecipe
    }

    deleteRecipe(e) {
        e.target.innerText = 'Deleting'
        e.target.disabled = true
        this.recipesService.deleteRecipe(this.recipe._id).subscribe(createObserverObject(() => {
            this.router.navigate(['/'])
        }, msg => {
            this.errorMsg = msg
            e.target.innerText = 'Delete'
            e.target.disabled = false
        }, undefined, true))
    }

    submitEditedReview() {
        this.recipesService.editReview(this.recipe._id, this.selectedReview._id, this.selectedReview).subscribe(createObserverObject(() => {
            this.successMsg = 'Your reply has been successfully updated'
            setTimeout(() => this.successMsg = '', 5000)
            // update the current recipe
            const review = this.recipe.reviews.find(r => r._id === this.selectedReview._id)
            review.rating = this.selectedReview.rating
            review.body = this.selectedReview.body
        }, msg => {
            this.errorMsg = msg
        }, undefined, true))
    }

    submitReview() {
        this.recipesService.submitReview(this.recipe._id, {
            user: this.currentUser._id,
            body: this.review,
            rating: this.rating
        }).subscribe(createObserverObject(
        (response) => {
            // the response is the updated recipe. Update the state of this component based on the updated recipe
            this.successMsg = 'Your review has been added successfully'
            setTimeout(() => this.successMsg = '', 5000)
            this.recipe.reviews = response.reviews
            this.recipe.rating = response.rating
        },msg => {
            this.errorMsg = msg
        }, undefined, true))
    }

    likeReview(reviewId: string) {
        const review = this.recipe.reviews.find(review => review._id === reviewId)
        this.handleReact(review, 'like')
        this.recipesService.likeReview(this.recipe._id, reviewId).subscribe({
            error: (error: HttpErrorResponse) => {
                this.errorMsg = error.error || error.message || 'An unknown error has occurred'
                setTimeout(() => this.errorMsg = '', 5000)
                this.handleReact(review, 'like')
            }
        })
    }

    dislikeReview(reviewId: string) {
        const review = this.recipe.reviews.find(review => review._id === reviewId)
        this.handleReact(review, 'dislike')
        this.recipesService.dislikeReview(this.recipe._id, reviewId).subscribe({
            error: (error: HttpErrorResponse) => {
                this.errorMsg = error.error || error.message || 'An unknown error has occurred'
                setTimeout(() => this.errorMsg = '', 5000)
                this.handleReact(review, 'dislike')
            }
        })
    }

    deleteReview(e, reviewId: string) {
        e.target.innerText = 'Deleting'
        e.target.disabled = true
        this.recipesService.deleteReview(this.recipe._id, reviewId).subscribe(createObserverObject(() => {
            this.successMsg = 'Your review has been successfully deleted'
            setTimeout(() => this.successMsg = '', 5000)
            // update the current recipe
            const newReviews = this.recipe.reviews.filter(r => r._id !== reviewId)
            this.recipe.reviews = newReviews
            // re-calculate the rating of the recipe
            let sumOfAllRatings = 0
            this.recipe.reviews.forEach(review => {
                sumOfAllRatings += review.rating
            })
            this.recipe.rating = sumOfAllRatings / this.recipe.reviews.length
        }, msg => {
            this.errorMsg = msg
            e.target.innerText = 'Delete'
            e.target.disabled = false
        }, undefined, true))
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

    countReview(rating: number, type: 'raw' | 'percentage') {
        const filtered = this.recipe.reviews.filter(review => review.rating === rating)
        if (type === 'raw') return filtered.length.toString()
        if (type === 'percentage') return `${((filtered.length / this.recipe.reviews.length) * 100)}%`
        return null
    }

    constructor(private route: ActivatedRoute, private router: Router, private recipesService: RecipesService, private titleService: Title, private metaService: Meta) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.recipesService.getRecipe(params['id']).subscribe(createObserverObject(response => {
                this.recipe = response
                // set metadata
                this.titleService.setTitle(`Flavorverse - ${response.title}`)
                this.metaService.addTag({ name: 'description', content: response.desc.slice(0, 20) })
            }, msg => {
                this.retrievalErrorMsg = msg
            }))
        })
    }
}
