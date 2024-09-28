import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type InputTypes = "text" | "email" | "password" | "number" | "text-box" | "file"

@Component({
  selector: 'app-input-primario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPrimarioComponent),
      multi: true
    }
  ],
  templateUrl: './input-primario.component.html',
  styleUrl: './input-primario.component.css'
})
export class InputPrimarioComponent implements ControlValueAccessor{

  @Input() type: InputTypes = "text";
  @Input() placeHolder: string = "";
  @Input() label: string = "";
  @Input() inputName: string = "";
  @Input() style: string = "";
  @Input() styleLabel: string = "";
  @Input() maxLength: string = "9999";
  @Input() max: string = "9999";
  @Input() min: string = "0";
  @Input() step: string = "";
  @Input() addLabel: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  
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
