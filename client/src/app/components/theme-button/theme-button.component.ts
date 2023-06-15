import { Component } from '@angular/core';

@Component({
    selector: 'app-theme-button',
    templateUrl: './theme-button.component.html',
    styleUrls: ['./theme-button.component.css']
})
export class ThemeButtonComponent {
    toggleTheme() {
        if (localStorage.getItem('theme') === 'dark') localStorage.setItem('theme', 'light');
        else localStorage.setItem('theme', 'dark');
        window.dispatchEvent(new Event('storage'));
    }
}
