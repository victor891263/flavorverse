import {Component, OnInit} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {Recipe, RecipeBrief, User} from "../../types"
import getTimeLabel from '../../utilities/getTimeLabel'
import {UsersService} from "../../services/users.service"
import {HttpErrorResponse} from "@angular/common/http"
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

    isBoxOpen = false

    get currentUser() {
        return getCurrentUser()
    }

    getTimeLabel = getTimeLabel

    toggleBox(isOpen: boolean) {
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden'
            this.isBoxOpen = true
        } else {
            document.documentElement.style.overflow = 'auto'
            this.isBoxOpen = false
        }
    }

    handleDetailsUpdate(response: User) {
        console.log(response)
        this.profile = response
    }

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
