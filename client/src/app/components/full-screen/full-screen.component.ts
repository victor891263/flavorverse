import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-full-screen',
    templateUrl: './full-screen.component.html',
    styleUrls: ['./full-screen.component.css']
})
export class FullScreenComponent {
    @Input() isVisible: boolean
    @Input() small: boolean
}
