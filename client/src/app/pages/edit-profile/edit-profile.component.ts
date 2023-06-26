import {Component, OnInit} from '@angular/core'
import getCurrentUser from '../../utilities/getCurrentUser'
import {UsersService} from "../../services/users.service"
import {users} from "../../utilities/users"
import {User} from "../../types"
import handleAutoResize from "../../utilities/handleAutoResize"
import {HttpErrorResponse} from "@angular/common/http"
import { Router } from '@angular/router'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import {EditProfileSkeletonComponent} from '../../components/edit-profile-skeleton/edit-profile-skeleton.component'

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
    currentUser = getCurrentUser()

    img: string
    newImg: File

    detailsForm: FormGroup
    emailForm: FormGroup
    passwordForm: FormGroup

    isDataLoaded = false

    get username() {
        return this.detailsForm.get('username')
    }
    get name() {
        return this.detailsForm.get('name')
    }
    get about() {
        return this.detailsForm.get('about')
    }
    get link() {
        return this.detailsForm.get('link')
    }
    get email() {
        return this.emailForm.get('email')
    }
    get newEmail() {
        return this.emailForm.get('newEmail')
    }
    get password() {
        return this.passwordForm.get('password')
    }
    get newPassword() {
        return this.passwordForm.get('newPassword')
    }

    retrievalErrorMsg: string
    errorMsg: string
    successMsg: string

    skeleton = EditProfileSkeletonComponent

    handleAutoResize = handleAutoResize

    uploadImage(e) {
        const file = e.target.files[0]
        if (file.size > 1048576) {
            this.errorMsg = 'File must not be bigger than 1MB'
            setTimeout(() => this.errorMsg = '', 5000)
        }
        else this.newImg = file
    }

    saveProfile(e) {
        e.target.innerText = 'Saving...'
        e.target.disabled = true

        // convert the image into a send-able format
        const formData = new FormData()
        formData.append('username', this.username.value)
        formData.append('name', this.name.value)
        formData.append('about', this.about.value)
        formData.append('link', this.link.value)
        formData.append('newImg', this.newImg)

        this.usersService.updateProfile(formData).subscribe((response: string | null) => {
            if (response) this.img = response // if upload succeeded, set the image url sent back by the api to the src of the profile image
            this.newImg = undefined
            this.successMsg = 'Your profile has been updated successfully'
            setTimeout(() => this.successMsg = '', 5000) // make the success popup disappear after 5 seconds
            e.target.innerText = 'Save'
            e.target.disabled = false
        }, (error: HttpErrorResponse) => {
            this.errorMsg = error.message
            setTimeout(() => this.errorMsg = '', 5000) // make the error popup disappear after 5 seconds
            e.target.innerText = 'Save'
            e.target.disabled = false
        })
    }

    saveEmail(e) {
        e.target.innerText = 'Saving...'
        e.target.disabled = true
        this.usersService.updateEmail(this.newEmail.value).subscribe(() => {
            this.successMsg = 'Your email has been updated successfully'
            setTimeout(() => this.successMsg = '', 5000) // make the success popup disappear after 5 seconds
        }, (error: HttpErrorResponse) => {
            this.errorMsg = error.message
            setTimeout(() => this.errorMsg = '', 5000) // make the error popup disappear after 5 seconds
            e.target.innerText = 'Save'
            e.target.disabled = false
        })
    }

    savePassword(e) {
        e.target.innerText = 'Saving...'
        e.target.disabled = true
        this.usersService.updatePassword(this.password.value, this.newPassword.value).subscribe(() => {
            this.successMsg = 'Your password has been updated successfully'
            setTimeout(() => this.successMsg = '', 5000) // make the success popup disappear after 5 seconds
        }, (error: HttpErrorResponse) => {
            this.errorMsg = error.message
            setTimeout(() => this.errorMsg = '', 5000) // make the error popup disappear after 5 seconds
            e.target.innerText = 'Save'
            e.target.disabled = false
        })
    }

    deleteProfile(e) {
        e.target.innerText = 'Deleting...'
        e.target.disabled = true
        this.usersService.deleteProfile().subscribe(() => {
            // if profile is deleted successfully, log out the user and redirect to home page
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            this.router.navigate(['/'])
        }, (error: HttpErrorResponse) => {
            this.errorMsg = error.message
            setTimeout(() => this.errorMsg = '', 5000) // make the error popup disappear after 5 seconds
            e.target.innerText = 'Delete account'
            e.target.disabled = false
        })
    }

    constructor(private usersService: UsersService, private router: Router, private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.usersService.getUser(this.currentUser._id).subscribe(response => {
            this.isDataLoaded = true
            const profile = response.user
            this.img = profile.img
            this.detailsForm = this.formBuilder.group({
                username: new FormControl(profile.username, [
                    Validators.required,
                    Validators.maxLength(30)
                ]),
                name: new FormControl(profile.name, [
                    Validators.maxLength(50)
                ]),
                about: new FormControl(profile.about, [
                    Validators.maxLength(1000)
                ]),
                link: new FormControl(profile.link, [
                    Validators.maxLength(100)
                ]),
            })
            this.emailForm = this.formBuilder.group({
                email: new FormControl({ value: profile.email, disabled: true }),
                newEmail: new FormControl(profile.email, [
                    Validators.required,
                    Validators.email,
                    Validators.maxLength(30)
                ]),
            })
            this.passwordForm = this.formBuilder.group({
                password: new FormControl('', [
                    Validators.required,
                    Validators.maxLength(20)
                ]),
                newPassword: new FormControl('', [
                    Validators.required,
                    Validators.maxLength(20)
                ]),
            })
        }, (error: HttpErrorResponse) => {
            this.retrievalErrorMsg = error.message
        })
    }
}

/*
this.usersService.getUser(this.currentUser._id).subscribe(response => {
    this.isDataLoaded = true
    const profile = response.user
    this.img = profile.img
    this.detailsForm = this.formBuilder.group({
        username: new FormControl(profile.username, [
            Validators.required,
            Validators.maxLength(30)
        ]),
        name: new FormControl(profile.name, [
            Validators.maxLength(50)
        ]),
        about: new FormControl(profile.about, [
            Validators.maxLength(1000)
        ]),
        link: new FormControl(profile.link, [
            Validators.maxLength(100)
        ]),
    })
    this.emailForm = this.formBuilder.group({
        email: new FormControl({ value: profile.email, disabled: true }),
        newEmail: new FormControl(profile.email, [
            Validators.required,
            Validators.email,
            Validators.maxLength(30)
        ]),
    })
    this.passwordForm = this.formBuilder.group({
        password: new FormControl('', [
            Validators.required,
            Validators.maxLength(20)
        ]),
        newPassword: new FormControl('', [
            Validators.required,
            Validators.maxLength(20)
        ]),
    })
}, (error: HttpErrorResponse) => {
    this.retrievalErrorMsg = error.message
})

this.profile = users.find(user => user._id === this.currentUser._id)
*/
