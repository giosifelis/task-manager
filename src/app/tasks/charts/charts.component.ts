import { Chart, registerables } from 'chart.js'
import { Component, Input, OnChanges, OnInit } from '@angular/core'

Chart.register(...registerables)

@Component({
  selector: 'tasks-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.less'
})
export class ChartsComponent implements OnInit {
  @Input() chartData!: any

  counts: any[] = []

  ngOnInit(): void {
    this.counts = [...this.chartData.counts]
    this.renderChart()
  }

  renderChart() {
    new Chart('charts', {
      type: 'bar',
      data: {
        labels: ['Planned', 'In Progress', 'Completed'],
        datasets: [
          {
            label: '# of Tasks',
            data: this.counts,
            backgroundColor: ['Red', 'Blue', 'Green'],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
}