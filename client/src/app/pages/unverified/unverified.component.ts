import {Component, OnInit} from '@angular/core'
import {Router} from "@angular/router"
import {Meta, Title} from "@angular/platform-browser"

@Component({
    selector: 'app-unverified',
    templateUrl: './unverified.component.html',
    styleUrls: ['./unverified.component.css']
})

export class UnverifiedComponent implements OnInit {
    logout() {
        // remove all jwts and redirect to home page
        localStorage.removeItem('token')
        localStorage.removeItem('rememberMe')
        this.router.navigate(['/'])
    }

    constructor(private router: Router, private titleService: Title, private metaService: Meta) {}

    ngOnInit() {
        // set metadata
        this.titleService.setTitle('Flavorverse - Unverified')
        this.metaService.addTag({ name: 'description', content: 'You need to verify your account to use Flavorverse' })
    }
}
