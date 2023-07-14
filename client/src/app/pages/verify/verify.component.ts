import {Component, OnInit} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {VerifyService} from "../../services/verify.service"
import getCurrentUser from '../../utilities/getCurrentUser'
import createObserverObject from "../../utilities/createObserverObject"
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.css']
})

export class VerifyComponent implements OnInit {
    isEmail: boolean
    isLoading = true
    errorMsg: string
    get currentUser() {
        return getCurrentUser()
    }

    handleVerify(isEmail: any, id: string) {
        if (isEmail) return this.verifyService.verifyEmail(id)
        return this.verifyService.verify(id)
    }

    constructor(private verifyService: VerifyService, private route: ActivatedRoute, private titleService: Title, private metaService: Meta) {}

    ngOnInit() {
        // set metadata
        this.titleService.setTitle('Flavorverse - Verification')
        this.metaService.addTag({ name: 'description', content: 'Account verification' })

        if (this.currentUser) {
            this.route.params.subscribe(params => {
                this.route.queryParams.subscribe(queryParams => {
                    this.isEmail = queryParams['email']
                    this.handleVerify(queryParams['email'], params['id']).subscribe(createObserverObject(response => {
                        if (response && (response.length > 5)) localStorage.setItem('token', response)
                    }, (msg: string) => {
                        this.errorMsg = msg
                    }, () => {
                        this.isLoading = false
                    }))
                })
            })
        } else {
            this.errorMsg = `You must be logged in to access this page.`
            this.isLoading = false
        }
    }
}
