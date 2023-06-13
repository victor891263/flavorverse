import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-retrieval-wrapper',
  templateUrl: './retrieval-wrapper.component.html',
  styleUrls: ['./retrieval-wrapper.component.css']
})

export class RetrievalWrapperComponent {
    @Input() data: any
    @Input() errorMsg: string
}
