import { Component } from '@angular/core'
import {recipe} from "../../utilities/skeletons"
import {Recipe} from "../../types"

@Component({
    selector: 'app-recipe-skeleton',
    templateUrl: './recipe-skeleton.component.html',
    styleUrls: ['./recipe-skeleton.component.css']
})
export class RecipeSkeletonComponent {
    recipe: Recipe = recipe
}
