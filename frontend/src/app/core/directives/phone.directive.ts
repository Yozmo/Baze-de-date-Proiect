import {Directive, ElementRef, forwardRef, HostListener, Input} from "@angular/core";
import {MAT_INPUT_VALUE_ACCESSOR} from "@angular/material/input";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Directive({
  selector: 'input[phone]',
  providers: [
    {provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: PhoneDirective},
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhoneDirective), multi: true}
  ]
})
export class PhoneDirective {

  private _value: string | null;

  constructor(
    private elementRef: ElementRef<HTMLInputElement>
  ) {
  }

  get value(): string | null {
    return this._value;
  }

  @Input('value')
  set value(value: string | null) {
    this._value = value;
    if (value) {
      this.formatValue(value);
    }
  }

  private formatValue(value: string | null) {
    if (value !== null) {
      this.elementRef.nativeElement.value = this.transform(value);
    } else {
      this.elementRef.nativeElement.value = '';
    }
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value) {
    this._value = value;
  }

  @HostListener('blur')
  _onBlur(value) {
    this.formatValue(this._value);
  }

  _onChange(value: any): void {
  }

  writeValue(value: any) {
    this._value = value;
    this.formatValue(this._value);
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn;
  }

  registerOnTouched() {
  }


  private transform(value: string): string {
    let phoneFormat: string = '';
    let count: number = 0;
    let splitPhase: number = 4;

    for (let i = 0; i < value.length; ++i) {
      if (count == splitPhase) {
        phoneFormat += ' ';
        phoneFormat += value.charAt(i);
        count = 0;
        splitPhase = 2;
      } else {
        phoneFormat += value.charAt(i);
        count++;
      }
    }
    return phoneFormat;
  }
}
