import {Component, OnInit} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {Recipe, RecipeBrief, User} from "../../types"
import getTimeLabel from '../../utilities/getTimeLabel'
import {UsersService} from "../../services/users.service"
import getCurrentUser from '../../utilities/getCurrentUser'
import createObserverObject from "../../utilities/createObserverObject"
import {Meta, Title} from "@angular/platform-browser";

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
        this.profile = response
    }

    constructor(private route: ActivatedRoute, private usersService: UsersService, private titleService: Title, private metaService: Meta) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.usersService.getUser(params['id']).subscribe(createObserverObject(response => {
                this.profile = response.user
                this.recipes = response.recipes
                // set metadata
                this.titleService.setTitle(`Flavorverse - ${response.user.username}`)
                this.metaService.addTag({ name: 'description', content: response.user.about || "This user hasn't added an introduction yet" })
            }, msg => {
                this.errorMsg = msg
            }))
        })
    }
}
