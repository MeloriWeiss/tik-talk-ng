import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';
import { NameValue } from '@tt/data-access/shared';
import {
  ClickOutsideDirective,
  PortalComponent,
  SvgIconComponent,
} from '@tt/common-ui';
import { ToggleActionEvent, ToggleActions } from './toggle-actions';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tt-multi-select',
  imports: [
    MultiSelectDropdownComponent,
    SvgIconComponent,
    ClickOutsideDirective,
    PortalComponent,
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
  implements AfterViewInit, ControlValueAccessor
{
  #elementRef = inject(ElementRef);

  options = input.required<NameValue[]>();

  isDropdownOpened = signal(false);
  value = signal<NameValue[]>([]);
  disabled = signal(false);
  elementWidth = signal(0);

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

    this.value.set(newValue);
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

  toggleDropdown() {
    this.isDropdownOpened.set(!this.isDropdownOpened());
    this.onTouched();
  }

  onToggleOption(event: ToggleActionEvent) {
    event.option.selected = true;
    this.closeDropdown();

    if (event.action === ToggleActions.ADD) {
      this.value.update((value) => [...value, event.option]);
    } else {
      const newValue = this.value().filter((option) => {
        if (option.value === event.option.value) {
          event.option.selected = false;
          return false;
        }
        return true;
      });

      this.value.set(newValue);
    }
    this.onChange(this.value().map((option) => option.value));
  }

  onOptionDelete(event: MouseEvent, index: number) {
    event.stopPropagation();
    this.closeDropdown();

    const value = this.value();
    const [deletedOption] = value.splice(index, 1);
    deletedOption.selected = false;

    this.value.set(value);
    this.onChange(value.map((option) => option.value));
  }

  closeDropdown() {
    this.isDropdownOpened.set(false);
  }

  onChange(value: string | string[] | null) {}

  onTouched() {};
}
