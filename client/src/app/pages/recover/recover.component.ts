import {Component, OnInit} from '@angular/core'
import {AuthService} from "../../services/auth.service"
import createObserverObject from "../../utilities/createObserverObject";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.css']
})

export class RecoverComponent implements OnInit {
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

    constructor(private authService: AuthService, private titleService: Title, private metaService: Meta) {}

    ngOnInit() {
        // set metadata
        this.titleService.setTitle('Flavorverse - Recover your account')
        this.metaService.addTag({ name: 'description', content: 'Get instructions on how to restore access to your account' })
    }
}
