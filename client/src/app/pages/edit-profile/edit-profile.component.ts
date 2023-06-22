import {Component, OnInit} from '@angular/core'
import getCurrentUser from '../../utilities/getCurrentUser'
import {UsersService} from "../../services/users.service"
import {users} from "../../utilities/users"
import {User} from "../../types"
import handleAutoResize from "../../utilities/handleAutoResize"
import {HttpErrorResponse} from "@angular/common/http"
import { Router } from '@angular/router'
import {EditProfileSkeletonComponent} from '../../components/edit-profile-skeleton/edit-profile-skeleton.component'

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
    currentUser = getCurrentUser()
    profile: User

    newEmail: string

    password: string
    newPassword: string

    retrievalErrorMsg: string
    errorMsg: string
    successMsg: string

    skeleton = EditProfileSkeletonComponent

    handleAutoResize = handleAutoResize

    saveProfile() {
        this.usersService.updateProfile({
            username: this.profile.username,
            name: this.profile.name,
            about: this.profile.about,
            link: this.profile.link
        }).subscribe(() => {
            this.successMsg = 'Your profile has been updated successfully'
            setTimeout(() => this.successMsg = '', 5000) // make the success popup disappear after 5 seconds
        }, (error: HttpErrorResponse) => {
            this.errorMsg = error.message
            setTimeout(() => this.errorMsg = '', 5000) // make the error popup disappear after 5 seconds
        })
    }

    saveEmail() {
        this.usersService.updateEmail(this.newEmail).subscribe(() => {
            this.successMsg = 'Your email has been updated successfully'
            setTimeout(() => this.successMsg = '', 5000) // make the success popup disappear after 5 seconds
            this.profile.email = this.newEmail
        }, (error: HttpErrorResponse) => {
            this.errorMsg = error.message
            setTimeout(() => this.errorMsg = '', 5000) // make the error popup disappear after 5 seconds
        })
    }

    savePassword() {
        this.usersService.updatePassword(this.password, this.newPassword).subscribe(() => {
            this.successMsg = 'Your password has been updated successfully'
            setTimeout(() => this.successMsg = '', 5000) // make the success popup disappear after 5 seconds
        }, (error: HttpErrorResponse) => {
            this.errorMsg = error.message
            setTimeout(() => this.errorMsg = '', 5000) // make the error popup disappear after 5 seconds
        })
    }

    deleteProfile() {
        this.usersService.deleteProfile().subscribe(() => {
            // if profile is deleted successfully, log out the user and redirect to home page
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            this.router.navigate(['/'])
        }, (error: HttpErrorResponse) => {
            this.errorMsg = error.message
            setTimeout(() => this.errorMsg = '', 5000) // make the error popup disappear after 5 seconds
        })
    }

    constructor(private usersService: UsersService, private router: Router) {}

    ngOnInit() {
        this.usersService.getUser(this.currentUser._id).subscribe(response => {
            this.profile = response.user
        }, (error: HttpErrorResponse) => {
            this.retrievalErrorMsg = error.message
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
