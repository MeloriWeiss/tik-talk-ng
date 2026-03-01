import {
  ChangeDetectionStrategy,
  Component,
  effect,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-form-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtFormInputComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TtFormInputComponent implements ControlValueAccessor {
  type = input('text');
  placeholder = input('Введите');
  disabled = signal(false);

  innerFormControl = new FormControl('');

  constructor() {
    this.innerFormControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.onChange(value);
      });

    effect(() => {
      if (this.disabled()) {
        this.innerFormControl.disable();
        return;
      }
      this.innerFormControl.enable();
    });
  }

  writeValue(value: string): void {
    this.innerFormControl.setValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onChange(value: string | null) {}

  onTouched() {}
}
