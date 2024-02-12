import { Component, Input } from '@angular/core'

@Component({
  selector: 'estimate-counter',
  standalone: true,
  imports: [],
  templateUrl: './estimate-counter.component.html',
  styleUrl: './estimate-counter.component.less'
})
export class EstimateCounterComponent {
  @Input() count!: number

  constructor() {}
}
