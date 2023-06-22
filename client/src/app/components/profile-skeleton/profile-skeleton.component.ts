import { Component } from '@angular/core'
import { profile, recipe } from '../../utilities/skeletons'

@Component({
    selector: 'app-profile-skeleton',
    templateUrl: './profile-skeleton.component.html',
    styleUrls: ['./profile-skeleton.component.css']
})
export class ProfileSkeletonComponent {
    profile = profile
    recipes = [recipe, recipe, recipe]
}
