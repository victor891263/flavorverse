import {Component, OnInit} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {VerifyService} from "../../services/verify.service"
import {HttpErrorResponse} from "@angular/common/http"
import getCurrentUser from '../../utilities/getCurrentUser'

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.css']
})

export class VerifyComponent implements OnInit {
    isEmail: boolean
    isLoading = true
    errorMsg: string
    currentUser = getCurrentUser()

    constructor(private verifyService: VerifyService, private route: ActivatedRoute) {}

    ngOnInit() {
        if (this.currentUser) {
            this.route.params.subscribe(params => {
                this.route.queryParams.subscribe(queryParams => {
                    this.isEmail = queryParams['email']
                    if (queryParams['email']) {
                        this.verifyService.verifyEmail(params['id']).subscribe(() => {
                            this.isLoading = false
                        }, (error: HttpErrorResponse) => {
                            this.errorMsg = error.message
                            this.isLoading = false
                        })
                    } else {
                        this.verifyService.verify(params['id']).subscribe(() => {
                            this.isLoading = false
                        }, (error: HttpErrorResponse) => {
                            this.errorMsg = error.message
                            this.isLoading = false
                        })
                    }
                })
            })
        } else {
            this.errorMsg = `You don't have permission to access this page. Only logged in users do.`
            this.isLoading = false
        }
    }
}
