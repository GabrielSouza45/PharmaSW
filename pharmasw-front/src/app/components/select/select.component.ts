import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  selectedOption: string = '';
  @Input() options: Opcoes[] = [];
  @Input() label: string = '';
  @Input() selectName: string = '';
  @Output() valueChange = new EventEmitter<String>();

  onSelectChange(event: Event): void {
    const selectElement =  event.target as HTMLSelectElement;

    this.valueChange.emit(selectElement.value);
  }
}

class Opcoes {
  text: string;
  value: string;
}
