import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NameValue } from '@tt/data-access/shared';

@Component({
  selector: 'tt-radio-input',
  imports: [FormsModule],
  templateUrl: './radio-input.component.html',
  styleUrl: './radio-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RadioInputComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioInputComponent implements ControlValueAccessor {
  itemsConfig = input<NameValue[]>();
  disabled = signal(false);

  shareType = '';

  writeValue(value: string) {
    this.shareType = value;
  }

  registerOnChange(fn: (value: string | null) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled.set(isDisabled);
  }

  changeShareType(value: string) {
    this.onChange(value);
  }

  onChange(value: string | null) {}
  onTouched() {}
}
