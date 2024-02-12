import { Component, Input, OnInit } from '@angular/core'

import { Task } from '../task/task'

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
