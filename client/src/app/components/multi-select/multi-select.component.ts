import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
    selector: 'app-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent {
    @Input() keyword: string
    @Input() items: any[]
    @Input() selected: any[]
    @Output() addItem = new EventEmitter()
    @Output() removeItem = new EventEmitter()
    @Output() changeInput = new EventEmitter()

    handleInput(e) {
        this.changeInput.emit(e)
        e.target.style.width = ''
        e.target.style.width = e.target.scrollWidth + 'px'
    }
}
