import { Component } from '@angular/core';
import getCurrentUser from "../../utilities/getCurrentUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    get currentUser() {
        return getCurrentUser()
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('rememberMe')
        this.router.navigate(['/'])
    }

    constructor(private router: Router) {}
}
