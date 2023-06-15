import {Component, OnInit} from '@angular/core'
import { Location } from '@angular/common'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import {AuthService} from "../../services/auth.service"
import {HttpErrorResponse} from "@angular/common/http";

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
        if (this.url === '/login') {
            e.target.innerText = 'Signing in...'
            this.authService.login({
                email: this.email.value,
                password: this.password.value
            }).subscribe((token: string) => {
                if (this.remember) localStorage.setItem('token', token)
                else sessionStorage.setItem('token', token)
            }, (error: HttpErrorResponse) => {
                this.errorMsg = error.message
                setTimeout(() => this.errorMsg = '', 5000)
                e.target.innerText = 'Sign in'
            })
        }
        if (this.url === '/join') {
            e.target.innerText = 'Creating account...'
            this.authService.createAccount({
                email: this.email.value,
                password: this.password.value
            }).subscribe((token: string) => {
                if (this.remember) localStorage.setItem('token', token)
                else sessionStorage.setItem('token', token)
            }, (error: HttpErrorResponse) => {
                this.errorMsg = error.message
                setTimeout(() => this.errorMsg = '', 5000)
                e.target.innerText = 'Create account'
            })
        }
    }

    constructor(private authService: AuthService, private location: Location, private formBuilder: FormBuilder) {}

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
