import {Component, OnInit} from '@angular/core'
import initTheme from "./utilities/initTheme"
import {NavigationStart, Router} from "@angular/router"
import getCurrentUser from "./utilities/getCurrentUser"
import {Location} from "@angular/common"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    get url() {
        return this.location.path()
    }

    constructor(private router: Router, private location: Location) {}

    ngOnInit() {
        initTheme()
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                const currentUser = getCurrentUser()
                if (event.id === 1 && !currentUser.isVerified) this.router.navigate(['/unverified'])
            }
        })
    }
}
