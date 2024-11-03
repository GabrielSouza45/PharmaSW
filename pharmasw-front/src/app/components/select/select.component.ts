import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectOptions } from '../../modelo/SelectOpcoes';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  selectedOption: string = '';
  @Input() options: SelectOptions[] = [];
  @Input() label: string = '';
  @Input() selectName: string = '';
  @Input() style: string = '';
  @Input() styleLabel: string = '';
  @Output() valueChange = new EventEmitter<String>();


  ngOnInit() {
    this.selectedOption = this.options[0].value;
    this.onSelectChange({ target: { value: this.selectedOption } });
  }


  onSelectChange(event: any): void {
    const selectElement = event.target as HTMLSelectElement;

    this.valueChange.emit(selectElement.value);
  }
}

