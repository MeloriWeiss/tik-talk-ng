import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  input,
  signal,
  untracked,
} from '@angular/core';
import {
  ClickOutsideDirective,
  PortalComponent,
  SvgIconComponent,
} from '@tt/common-ui';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NameValue } from '@tt/data-access/shared';
import { MultiSelectOptionComponent } from './multi-select-option/multi-select-option.component';
import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';

@Component({
  selector: 'tt-multi-select',
  imports: [
    PortalComponent,
    ClickOutsideDirective,
    SvgIconComponent,
    MultiSelectDropdownComponent,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MultiSelectComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComponent
  implements AfterContentInit, AfterViewInit, ControlValueAccessor
{
  #elementRef = inject(ElementRef);
  #injector = inject(Injector);

  options = input.required<NameValue[]>();

  value = signal<NameValue[]>([]);
  startValue = signal<NameValue[]>([]);
  elementWidth = signal(0);
  isDropdownOpened = signal(false);
  disabled = signal(false);

  optionElements = contentChildren(MultiSelectOptionComponent);

  constructor() {
    effect(() => {
      const newValue: NameValue[] = [];

      this.optionElements().forEach((option) => {
        if (option.selected()) {
          newValue.push({
            name: untracked(() => option.name()),
            value: untracked(() => option.value()),
          });
        }
      });

      this.value.set(newValue);
      this.onChange(newValue.map((item) => item.value));
    });
  }

  ngAfterContentInit() {
    const optionElements = this.optionElements();

    effect(
      () => {
        optionElements.forEach((optionElement) => {
          const selectedOption = this.startValue().find(option => untracked(() => option.value === optionElement.value()));

          optionElement.selected.set(Boolean(selectedOption));
        });
      },
      { injector: this.#injector }
    );
  }

  ngAfterViewInit() {
    const { width } = (
      this.#elementRef.nativeElement as HTMLElement
    ).getBoundingClientRect();

    this.elementWidth.set(width);
  }

  writeValue(value: string[]): void {
    const newValue: NameValue[] = [];
    const options = this.options();

    value.forEach((item) => {
      const option = options.find((option) => option.value === item);

      if (!option) {
        return;
      }

      newValue.push(option);
    });

    this.startValue.set(newValue);
  }
  registerOnChange(fn: (value: string | string[] | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  toggleDropdown() {
    const isDropdownOpened = this.isDropdownOpened();

    if (isDropdownOpened) {
      this.onTouched();
    }

    this.isDropdownOpened.set(!isDropdownOpened);
  }

  closeDropdown() {
    this.isDropdownOpened.set(false);
  }

  deleteOption(event: MouseEvent, optionValue: string) {
    event.stopPropagation();

    this.onTouched();

    const option = this.optionElements().find(
      (optionElement) => optionElement.value() === optionValue
    );

    if (option) {
      option.selected.set(false);
    }
  }

  onChange(value: string | string[] | null) {}

  onTouched() {}
}
