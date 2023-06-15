import {Component, ElementRef, Input, Output, EventEmitter} from '@angular/core'

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})

export class RatingComponent {
    @Output() onRatingChange = new EventEmitter()
    @Input() rating = 0
    @Input() isClickable = false
    get array() {
        return [
            Array(Math.floor(this.rating)),
            Array(5 - Math.ceil(this.rating))
        ]
    }

    setRating(e) {
        if (this.isClickable) {
            const index = e.currentTarget.getAttribute('data-index')
            this.onRatingChange.emit(Number(index))
        }
    }

    setIndices() {
        const currentElement = this.elementRef.nativeElement.children[0]
        const stars: HTMLCollection = currentElement.children
        for (let i = 0; i < stars.length; i++) {
            stars[i].setAttribute('data-index', `${i + 1}`)
        }
    }

    constructor(private elementRef: ElementRef) {}

    ngAfterViewInit() {
        this.setIndices()
    }

    ngAfterViewChecked() {
        this.setIndices()
    }
}
