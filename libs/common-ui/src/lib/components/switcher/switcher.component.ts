import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'tt-switcher',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SwitcherComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitcherComponent implements ControlValueAccessor {
  value = false;

  disabled = signal(false);

  valueChange(checked: boolean) {
    this.onChange(checked);
  }

  writeValue(checked: boolean) {
    this.value = checked;
  }
  registerOnChange(fn: (value: boolean) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean) {
    this.disabled.set(isDisabled);
  }

  onChange(value: boolean) {}
  onTouched() {}
}
