import {Component, OnInit} from '@angular/core'
import {AuthService} from "../../services/auth.service"
import createObserverObject from "../../utilities/createObserverObject"
import {ActivatedRoute} from "@angular/router"

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    recoveryId: string

    password: string
    errorMsg: string
    successMsg: string

    submitPassword() {
        this.authService.updatePassword(this.recoveryId, this.password).subscribe(createObserverObject(() => {
            this.successMsg = 'Your password has been updated successfully'
            setTimeout(() => this.successMsg = '', 5000)
        }, msg => {
            this.errorMsg = msg
        }, undefined, true))
    }

    constructor(private authService: AuthService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.recoveryId = params['id']
        })
    }
}
