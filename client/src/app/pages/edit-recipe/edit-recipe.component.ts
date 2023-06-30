import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from "@angular/router"
import {RecipesService} from "../../services/recipes.service"
import {Recipe} from "../../types"
import {HttpErrorResponse} from "@angular/common/http"
import {EditProfileSkeletonComponent} from "../../components/edit-profile-skeleton/edit-profile-skeleton.component"
import { recipes } from "../../utilities/recipes"

@Component({
    selector: 'app-edit-recipe',
    templateUrl: './edit-recipe.component.html',
    styleUrls: ['./edit-recipe.component.css']
})

export class EditRecipeComponent implements OnInit {
    recipe: Recipe
    retrievalErrorMsg: string
    skeleton = EditProfileSkeletonComponent

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
