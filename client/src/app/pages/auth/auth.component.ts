import {Component, OnInit} from '@angular/core'
import { Location } from '@angular/common'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import {AuthService} from "../../services/auth.service"
import { Router } from '@angular/router'
import createObserverObject from "../../utilities/createObserverObject"
import {Meta, Title} from "@angular/platform-browser";

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

    handleSubmitData(data) {
        // select method depending on if the user is signing in or creating new account
        if (this.url === '/login') return this.authService.login(data)
        if (this.url === '/join') return this.authService.createAccount(data)
        return null
    }

    submitData() {
        this.handleSubmitData({
            email: this.email.value,
            password: this.password.value
        }).subscribe(createObserverObject((token: string) => {
            if (this.remember) localStorage.setItem('rememberMe', 'yes')
            localStorage.setItem('token', token)
            this.router.navigate(['/']) // redirect user to home page if succeeded
        }, (msg: string) => {
            this.errorMsg = msg
        }, undefined, true))
    }

    constructor(private authService: AuthService, private location: Location, private formBuilder: FormBuilder, private router: Router, private titleService: Title, private metaService: Meta) {}

    ngOnInit() {
        // set metadata
        this.titleService.setTitle((this.url === '/login') ? 'Flavorverse - Login' : 'Flavorverse - Join')
        this.metaService.addTag({ name: 'description', content: (this.url === '/login') ? 'Welcome back to Flavorverse' : 'Join Flavorverse now to browse recipes' })

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
