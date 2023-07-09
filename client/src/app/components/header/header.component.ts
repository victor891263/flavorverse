import { Component } from '@angular/core'
import getCurrentUser from "../../utilities/getCurrentUser"
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isMenuOpen = false
    get currentUser() {
        return getCurrentUser()
    }

    logout() {
        localStorage.removeItem('token')
        this.router.navigate(['/'])
    }

    constructor(private router: Router) {}
}
