import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type InputTypes = "text" | "email" | "password" | "number" | "date" | "file"

@Component({
  selector: 'app-input-secundario',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSecundarioComponent),
      multi: true
    }
  ],
  templateUrl: './input-secundario.component.html',
  styleUrl: './input-secundario.component.css'
})
export class InputSecundarioComponent implements ControlValueAccessor{
  @Input() type: InputTypes = "text";
  @Input() id: string;
  @Input() name: string;
  @Input() required: boolean = true;
  @Input() disabled: boolean = false;
  @Input() placeholder: string;
  @Input() value: string;
  @Input() txtLabel: string;


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
