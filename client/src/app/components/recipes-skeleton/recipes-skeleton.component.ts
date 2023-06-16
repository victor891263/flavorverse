import { Component } from '@angular/core'
import { recipe } from "../../utilities/skeletons"

@Component({
    selector: 'app-recipes-skeleton',
    templateUrl: './recipes-skeleton.component.html',
    styleUrls: ['./recipes-skeleton.component.css']
})

export class RecipesSkeletonComponent {
    recipes = [ recipe, recipe, recipe ]
}
