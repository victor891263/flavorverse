import {Component, Input} from '@angular/core'
import {RecipeBrief} from "../../types"
import getTimeLabel from '../../utilities/getTimeLabel'

@Component({
    selector: 'app-recipe-small',
    templateUrl: './recipe-small.component.html',
    styleUrls: ['./recipe-small.component.css']
})
export class RecipeSmallComponent {
    @Input() recipe: RecipeBrief
    getTimeLabel = getTimeLabel
}
