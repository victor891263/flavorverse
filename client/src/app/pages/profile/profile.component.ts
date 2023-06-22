import {Component, OnInit} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {Recipe, RecipeBrief, User} from "../../types"
import getTimeLabel from '../../utilities/getTimeLabel'
import {users} from "../../utilities/users"
import {recipes} from "../../utilities/recipes"
import {UsersService} from "../../services/users.service"
import {HttpErrorResponse} from "@angular/common/http"
import {ProfileSkeletonComponent} from '../../components/profile-skeleton/profile-skeleton.component'
import getCurrentUser from '../../utilities/getCurrentUser'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
    profile: User
    recipes: RecipeBrief[]

    errorMsg: string
    skeleton = ProfileSkeletonComponent

    currentUser = getCurrentUser()

    getTimeLabel = getTimeLabel

    constructor(private route: ActivatedRoute, private usersService: UsersService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.usersService.getUser(params['id']).subscribe(response => {
                this.profile = response.user
                this.recipes = response.recipes
            }, (error: HttpErrorResponse) => {
                this.errorMsg = error.message
            })
        })
    }
}

/*
this.route.params.subscribe(params => {
    this.usersService.getUser(params['id']).subscribe(response => {
        this.profile = response.user
        this.recipes = response.recipes
    }, (error: HttpErrorResponse) => {
        this.errorMsg = error.message
    })
})

this.route.params.subscribe(params => {
    this.profile = users.find(user => user._id === params['id'])
})
this.recipes = recipes
*/
