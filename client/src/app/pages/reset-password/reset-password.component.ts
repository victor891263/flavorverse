import {Component, OnInit} from '@angular/core'
import {AuthService} from "../../services/auth.service"
import createObserverObject from "../../utilities/createObserverObject"
import {ActivatedRoute} from "@angular/router"
import {Meta, Title} from "@angular/platform-browser";

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

    constructor(private authService: AuthService, private route: ActivatedRoute, private titleService: Title, private metaService: Meta) {}

    ngOnInit() {
        // set metadata
        this.titleService.setTitle('Flavorverse - Reset password')
        this.metaService.addTag({ name: 'description', content: 'Change your password and restore access to your account' })

        this.route.params.subscribe(params => {
            this.recoveryId = params['id']
        })
    }
}
