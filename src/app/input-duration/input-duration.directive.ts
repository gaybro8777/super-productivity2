import {Attribute, Directive, ElementRef, forwardRef, Renderer2} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import {ParseDurationService} from '../parse-duration.service';

const noop = () => {
};

export const INPUT_DURATION_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputDurationDirective),
  multi: true
};

export const INPUT_DURATION_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => InputDurationDirective),
  multi: true
};


@Directive({
  selector: 'input[supInputDuration][ngModel]',
  providers: [
    ParseDurationService,
    INPUT_DURATION_VALUE_ACCESSOR,
    INPUT_DURATION_VALIDATORS,
  ],
  host: {
    '(input)': '_onInput($event.target.value)',
    '(change)': '_onChange($event)',
    '(blur)': '_onTouched()',
  },
})


export class InputDurationDirective<D> implements ControlValueAccessor,
  Validator {

  constructor(@Attribute('supInputDuration') public supInputDuration,
              private _elementRef: ElementRef,
              private _parseDuration: ParseDurationService,
              private _renderer: Renderer2) {
  }

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private _onTouchedCallback: () => void = noop;
  private _validatorOnChange: (_: any) => void = noop;
  private _onChangeCallback: (_: any) => void = noop;


  // @Input('value') value: string = '';

  private _value;

  get value() {
    return this._value;
  }

  set value(value) {
    if (value !== this._value) {
      this._value = value;
      this._onChangeCallback(this._value);
      this._renderer.setProperty(this._elementRef.nativeElement, 'value', value ? value : '');
    }
  }


  // Validations
  // -----------
  private _parseValidator: ValidatorFn = (): ValidationErrors | null => {
    return this._value ?
      null : {'inputDurationParse': {'text': this._elementRef.nativeElement.value}};
  }

  /* tslint:disable */
  private _validator: ValidatorFn | null =
    Validators.compose(
      [this._parseValidator]);
  /* tslint:enable */

  // ControlValueAccessor interface
  registerOnValidatorChange(fn: () => void): void {
    this._validatorOnChange = fn;
  }

  // ControlValueAccessor interface
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  // ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  // ControlValueAccessor: Validator
  validate(c: AbstractControl): ValidationErrors | null {
    return this._validator ? this._validator(c) : null;
  }

  // ControlValueAccessor: Formatter
  writeValue(value): void {
    const string = value ? this._parseDuration.toString(value) : '';
    this.value = string;
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', this.value);
  }

  // host event handler
  // ------------------
  _onInput(value: string) {
    this._value = this._parseDuration.fromString(value);
    this._onChangeCallback(this.value);
  }

  _onChange(ev) {
    this._onChangeCallback(this.value);
  }

  _onTouched(ev) {
    this._onTouchedCallback();
  }
}
