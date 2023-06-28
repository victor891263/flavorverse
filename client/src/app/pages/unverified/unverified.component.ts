import { Component } from '@angular/core'
import {Router} from "@angular/router"

@Component({
    selector: 'app-unverified',
    templateUrl: './unverified.component.html',
    styleUrls: ['./unverified.component.css']
})

export class UnverifiedComponent {
    constructor(private router: Router) {}

    logout() {
        // remove all jwts and redirect to home page
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        this.router.navigate(['/'])
    }
}
