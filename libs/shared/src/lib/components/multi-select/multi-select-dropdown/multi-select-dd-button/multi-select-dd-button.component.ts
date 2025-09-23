import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NameValue } from '@tt/data-access/shared';
import { SvgIconComponent } from '@tt/common-ui';
import { ToggleActionEvent, ToggleActions } from '../../toggle-actions';

@Component({
  selector: 'tt-multi-select-dd-button',
  imports: [SvgIconComponent],
  templateUrl: './multi-select-dd-button.component.html',
  styleUrl: './multi-select-dd-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectDdButtonComponent {
  option = input.required<NameValue>();

  addOption = output<ToggleActionEvent>();

  onToggleOption(option: NameValue) {
    this.addOption.emit({
      option,
      action: option.selected ? ToggleActions.REMOVE : ToggleActions.ADD,
    });
  }
}
