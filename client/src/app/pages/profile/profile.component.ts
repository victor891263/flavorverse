import {Component, OnInit} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {Recipe, User} from "../../types"
import getTimeLabel from '../../utilities/getTimeLabel'
import {users} from "../../utilities/users"
import {recipes} from "../../utilities/recipes"

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
    profile: User
    recipes: Recipe[]
    getTimeLabel = getTimeLabel

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.profile = users.find(user => user._id === params['id'])
        })
        this.recipes = recipes
    }
}
