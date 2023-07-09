import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core'
import getCurrentUser from '../../utilities/getCurrentUser'
import {UsersService} from "../../services/users.service"
import handleAutoResize from "../../utilities/handleAutoResize"
import { Router } from '@angular/router'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import {User} from "../../types";
import createObserverObject from "../../utilities/createObserverObject"

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
    @Input() user: User
    @Output() close = new EventEmitter()
    @Output() onDetailsUpdate = new EventEmitter()

    get currentUser() {
        return getCurrentUser()
    }

    newImg: File

    detailsForm: FormGroup
    emailForm: FormGroup
    passwordForm: FormGroup

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

    errorMsg: string
    successMsg: string

    handleAutoResize = handleAutoResize

    handleClose() {
        this.close.emit()
    }

    uploadImage(e) {
        const file = e.target.files[0]
        if (file.size > 1048576) {
            this.errorMsg = 'File must not be bigger than 1MB'
            setTimeout(() => this.errorMsg = '', 5000)
        } else {
            this.newImg = file
        }
    }

    saveProfile() {
        // convert the data into the form/multipart format, to successfully send files to the api
        const formData = new FormData()
        formData.append('data', JSON.stringify({
            username: this.username.value,
            name: this.name.value,
            about: this.about.value,
            link: this.link.value,
            img: this.user.img
        }))
        formData.append('newImg', this.newImg)

        this.usersService.updateProfile(formData).subscribe(createObserverObject(response => {
            if (response.img) this.user.img = response.img // if the response is not empty, which means that the new profile image has been uploaded successfully, set the image url sent back by the api to the src of the profile image
            this.newImg = undefined
            this.onDetailsUpdate.emit(response)
            this.successMsg = 'Your profile has been updated successfully'
            setTimeout(() => this.successMsg = '', 5000) // make the success popup disappear after 5 seconds
        }, msg => {
            this.errorMsg = msg
        }, undefined, true))
    }

    saveEmail() {
        this.usersService.updateEmail(this.newEmail.value).subscribe(createObserverObject(
        () => {
            this.user.newEmail.address = this.newEmail.value
        }, msg => {
            this.errorMsg = msg
        }, undefined, true))
    }

    stopUpdateEmail() {
        this.usersService.stopUpdateEmail().subscribe(createObserverObject(() => {
            this.successMsg = 'Your email is successfully reverted back to original'
            setTimeout(() => this.successMsg = '', 5000) // make the success popup disappear after 5 seconds
            this.user.newEmail.address = undefined
        }, msg => {
            this.errorMsg = msg
        }, undefined, true))
    }

    savePassword() {
        this.usersService.updatePassword(this.password.value, this.newPassword.value).subscribe(createObserverObject(() => {
            this.successMsg = 'Your password has been updated successfully'
            setTimeout(() => this.successMsg = '', 5000) // make the success popup disappear after 5 seconds
        }, msg => {
            this.errorMsg = msg
        }, undefined, true))
    }

    deleteProfile() {
        this.usersService.deleteProfile().subscribe(createObserverObject(() => {
            // if profile is deleted successfully, log out the user and redirect to home page
            localStorage.removeItem('token')
            this.router.navigate(['/'])
        }, msg => {
            this.errorMsg = msg
        }, undefined, true))
    }

    constructor(private usersService: UsersService, private router: Router, private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.detailsForm = this.formBuilder.group({
            username: new FormControl(this.user.username, [
                Validators.required,
                Validators.maxLength(30)
            ]),
            name: new FormControl(this.user.name || '', [
                Validators.maxLength(50)
            ]),
            about: new FormControl(this.user.about || '', [
                Validators.maxLength(1000)
            ]),
            link: new FormControl(this.user.link || '', [
                Validators.maxLength(100)
            ]),
        })
        this.emailForm = this.formBuilder.group({
            email: new FormControl({ value: this.user.email.address, disabled: true }),
            newEmail: new FormControl('', [
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
    }
}
