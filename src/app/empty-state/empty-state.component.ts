import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'empty-state',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.less',
})
export class EmptyStateComponent {
  text = 'no data';
}
