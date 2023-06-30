import {Component, OnInit} from '@angular/core'
import initTheme from "./utilities/initTheme"
import {NavigationStart, Router} from "@angular/router"
import getCurrentUser from "./utilities/getCurrentUser"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    currentUser = getCurrentUser()

    constructor(private router: Router) {}

    ngOnInit() {
        initTheme()
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if ((event.url !== '/unverified') && !this.currentUser.isVerified) this.router.navigate(['/unverified'])
            }
        })
    }
}
