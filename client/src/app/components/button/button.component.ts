import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css']
})

export class ButtonComponent {
    @Output() btnClick = new EventEmitter()
    @Input() isClickable: boolean
    isLoading = false

    private _isOperationEnded: boolean

    @Input() set isOperationEnded(value: boolean) {
        this._isOperationEnded = value
        this.isLoading = false
    }

    get isOperationEnded() {
        return this._isOperationEnded
    }

    onClick() {
        this.isLoading = true
        this.btnClick.emit()
    }
}
