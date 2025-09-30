import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-main-textarea',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './main-textarea.component.html',
  styleUrl: './main-textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MainTextareaComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTextareaComponent
  implements ControlValueAccessor, AfterViewInit
{
  r2 = inject(Renderer2);
  destroyRef = inject(DestroyRef);

  placeholder = input('Напишите что-нибудь');
  rows = input('1');

  field = viewChild<ElementRef>('field');

  disabled = signal(false);

  innerFormControl = new FormControl('');

  constructor() {
    effect(() => {
      if (this.disabled()) {
        this.innerFormControl.disable();
        return;
      }
      this.innerFormControl.enable();
    });
  }

  ngAfterViewInit() {
    this.innerFormControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((val) => {
        this.onChange(val);

        const field = this.field()?.nativeElement;
        if (!field) {
          return;
        }
        this.r2.setStyle(field, 'height', 'auto');
        this.r2.setStyle(field, 'height', field.scrollHeight + 'px');
      });
  }

  writeValue(val: string | null): void {
    this.innerFormControl.setValue(val);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onChange(value: string | null) {}

  onTouched() {};
}
