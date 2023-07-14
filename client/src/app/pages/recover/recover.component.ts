import { Component } from '@angular/core'
import {AuthService} from "../../services/auth.service"
import createObserverObject from "../../utilities/createObserverObject";

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.css']
})

export class RecoverComponent {
    email: string
    errorMsg: string
    successMsg: string

    submitEmail() {
        this.authService.recoverPassword(this.email).subscribe(createObserverObject(() => {
            this.successMsg = 'The instructions has been sent to your email'
            setTimeout(() => this.successMsg = '', 5000)
        }, msg => {
            this.errorMsg = msg
        }, undefined, true))
    }

    constructor(private authService: AuthService) {}
}
