import {Component, OnInit} from '@angular/core'
import { Location } from '@angular/common'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import {AuthService} from "../../services/auth.service"
import {HttpErrorResponse} from "@angular/common/http"
import { Router } from '@angular/router'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
    form: FormGroup
    get email() {
        return this.form.get('email')
    }
    get password() {
        return this.form.get('password')
    }
    remember = false
    errorMsg: string

    get url() {
        return this.location.path()
    }

    submitData(e) {
        // disable button
        e.target.innerText = ((this.url === '/login') && 'Signing in...') || ((this.url === '/join') && 'Creating account...')
        e.target.disabled = true
        this.authService[((this.url === '/login') && 'login') || ((this.url === '/join') && 'createAccount')]({ // select method depending on if the user is signing in or creating new account
            email: this.email.value,
            password: this.password.value
        }).subscribe((token: string) => {
            // session storage is cleared when all windows are closed while local storage remains until token expires or it is removed
            if (this.remember) localStorage.setItem('token', token)
            else sessionStorage.setItem('token', token)
            this.router.navigate(['/']) // redirect user to home page if succeeded
        }, (error: HttpErrorResponse) => {
            this.errorMsg = error.message
            setTimeout(() => this.errorMsg = '', 5000) // make the error popup disappear after 5 seconds
            // restore the button's functionality
            e.target.innerText = ((this.url === '/login') && 'Sign in') || ((this.url === '/join') && 'Create account')
            e.target.disabled = false
        })
    }

    constructor(private authService: AuthService, private location: Location, private formBuilder: FormBuilder, private router: Router) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: new FormControl('', [
                Validators.required,
                Validators.email,
                Validators.maxLength(30)
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.maxLength(20)
            ]),
        })
    }
}
