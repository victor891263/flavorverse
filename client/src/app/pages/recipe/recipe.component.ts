import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Recipe } from "../../types"
import { recipes } from "../../utilities/recipes"
import getTimeLabel from '../../utilities/getTimeLabel'
import { RecipesService } from "../../services/recipes.service"

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})

export class RecipeComponent implements OnInit {
    userId = '123'
    recipe: Recipe
    getTimeLabel = getTimeLabel

    rating = 0
    review: string

    setRating(n: number) {
        this.rating = n
    }

    submitReview() {
        this.recipesService.submitReview(this.recipe._id, {
            user: this.userId,
            body: this.review,
            rating: this.rating
        }).subscribe(() => {
            console.log('Review submitted!')
        })
    }

    likeReview(reviewId: string) {
        this.recipesService.likeReview(this.recipe._id, reviewId).subscribe(() => console.log('Liked review'))
    }

    dislikeReview(reviewId: string) {
        this.recipesService.dislikeReview(this.recipe._id, reviewId).subscribe(() => console.log('Disliked review'))
    }

    constructor(private route: ActivatedRoute, private recipesService: RecipesService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.recipe = recipes.find(recipe => recipe._id === params['id'])
        })
    }
}

/*

const ratingTotal = recipe.reviews.map(review => review.rating)
this.rating = ratingTotal.reduce((a, b) => a + b, 0) / ratingTotal.length

*/
