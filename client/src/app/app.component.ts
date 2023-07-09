import {Component, OnInit} from '@angular/core'
import {NavigationStart, Router} from "@angular/router"
import getCurrentUser from "./utilities/getCurrentUser"
import sysend from "sysend"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    get currentUser() {
        return getCurrentUser()
    }

    constructor(private router: Router) {}

    ngOnInit() {
        // if the user is logged in but hasn't verified their email yet, notify them that and don't let them use the app
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if ((event.url !== '/unverified') && (!event.url.includes('/verify/')) && this.currentUser && (!this.currentUser.isVerified)) {
                    this.router.navigate(['/unverified'])
                }
            }
        })

        // if the user has closed all tabs and if they didnt select "remember me" when they logged in, log them out
        sysend.track('close', data => {
            if ((data.count === 0) && (!localStorage.getItem('rememberMe'))) {
                localStorage.removeItem('token')
            }
        })

        // if theme variable has no value yet, give it a value based on user's system theme
        if (!localStorage.getItem('theme')) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) localStorage.setItem('theme', 'dark');
            else localStorage.setItem('theme', 'light');
        }

        toggleThemeClass(); // once value has been given to theme variable, change class of <html> tag accordingly
        window.addEventListener('storage', toggleThemeClass); // whenever theme variable is modified, change class of <html> tag accordingly

        // function to change class of <html> tag accordingly based on value of theme variable
        function toggleThemeClass() {
            if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
        }
    }
}
