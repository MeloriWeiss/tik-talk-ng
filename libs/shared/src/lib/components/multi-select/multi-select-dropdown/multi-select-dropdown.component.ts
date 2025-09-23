import {
  ChangeDetectionStrategy,
  Component,
  input, output,
} from '@angular/core';
import { NameValue } from '@tt/data-access/shared';
import { PopupWrapperComponent } from '@tt/common-ui';
import {MultiSelectDdButtonComponent} from "./multi-select-dd-button/multi-select-dd-button.component";
import {ToggleActionEvent} from "../toggle-actions";

@Component({
  selector: 'tt-multi-select-dropdown',
  imports: [PopupWrapperComponent, MultiSelectDdButtonComponent],
  templateUrl: './multi-select-dropdown.component.html',
  styleUrl: './multi-select-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectDropdownComponent {
  options = input.required<NameValue[]>();

  addOption = output<ToggleActionEvent>();

  onToggleOption(event: ToggleActionEvent) {
    this.addOption.emit(event);
  }
}
