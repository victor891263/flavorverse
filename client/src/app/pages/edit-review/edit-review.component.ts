import {Component, OnInit} from '@angular/core'
import handleAutoResize from "../../utilities/handleAutoResize"
import {ActivatedRoute, Router} from "@angular/router"
import {RecipesService} from "../../services/recipes.service"
import {HttpErrorResponse} from "@angular/common/http"
import {EditProfileSkeletonComponent} from '../../components/edit-profile-skeleton/edit-profile-skeleton.component'
import {recipes} from "../../utilities/recipes"

type BriefReview = {
    body: string
    rating: number
}

@Component({
    selector: 'app-edit-review',
    templateUrl: './edit-review.component.html',
    styleUrls: ['./edit-review.component.css']
})

export class EditReviewComponent implements OnInit {
    recipeId: string
    reviewId: string

    review: BriefReview
    errorMsg: string
    submitErrorMsg: string
    handleAutoResize = handleAutoResize

    skeleton = EditProfileSkeletonComponent

    setRating(n: number) {
        this.review.rating = n
    }

    submitChanges(e) {
        e.target.innerText = 'Submitting...'
        e.target.disabled = true
        this.recipesService.editReview(this.recipeId, this.reviewId, this.review).subscribe(() => {
            this.router.navigate(['/recipes/' + this.recipeId])
        }, (error: HttpErrorResponse) => {
            this.submitErrorMsg = error.message
            setTimeout(() => this.submitErrorMsg = '', 5000)
            e.target.innerText = 'Submit'
            e.target.disabled = false
        })
    }

    deleteReview(e) {
        e.target.innerText = 'Deleting...'
        e.target.disabled = true
        this.recipesService.deleteReview(this.recipeId, this.reviewId).subscribe(() => {
            this.router.navigate(['/recipes/' + this.recipeId])
        }, (error: HttpErrorResponse) => {
            this.submitErrorMsg = error.message
            setTimeout(() => this.submitErrorMsg = '', 5000)
            e.target.innerText = 'Delete review'
            e.target.disabled = false
        })
    }

    constructor(private route: ActivatedRoute, private router: Router, private recipesService: RecipesService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.review = recipes[0].reviews[0]
            this.recipeId = params['recipeId']
            this.reviewId = params['reviewId']
        })
    }
}

/*



this.recipesService.getReview(params['recipeId'], params['reviewId']).subscribe((response: BriefReview) => {
    this.review = response
}, (error: HttpErrorResponse) => {
    this.errorMsg = error.message
})

*/
