import {Component, OnInit} from '@angular/core';
import initTheme from "./utilities/initTheme";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    ngOnInit() {
        initTheme()
    }
}
