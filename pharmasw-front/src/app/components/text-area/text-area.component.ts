import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css'
})
export class TextAreaComponent implements ControlValueAccessor{
  @Input() placeHolder: string = "";
  @Input() label: string = "";
  @Input() name: string = "";
  @Input() style: string = "";
  @Input() styleLabel: string = "";
  @Input() maxLength: string = "2000";
  @Input() addLabel: boolean = false;
  @Input() disabled: boolean = false;

  value: string=''
  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.onChange(value)
  }

  writeValue(value: any): void {
      this.value = value;
  }

  registerOnChange(fn: any): void {
      this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
