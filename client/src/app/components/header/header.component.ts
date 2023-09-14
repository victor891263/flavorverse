import {Component, OnInit} from '@angular/core'
import getCurrentUser from "../../utilities/getCurrentUser"
import {Router, NavigationEnd} from "@angular/router"

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    currentUrl: string
    isMenuOpen = false
    get currentUser() {
        return getCurrentUser()
    }

    links = ['/login', '/join', '/recover', '/reset']

    isIncludeKeywords() {
        if (this.currentUrl) {
            const matchedLink = this.links.find(l => this.currentUrl.includes(l))
            return !!matchedLink
        }
        return false
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('rememberMe')
        this.router.navigate(['/'])
    }

    constructor(private router: Router) {}

    ngOnInit() {
        // Subscribe to the NavigationEnd event
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // get the current URL when navigation is complete
                this.currentUrl = event.url
            }
        })
    }
}
