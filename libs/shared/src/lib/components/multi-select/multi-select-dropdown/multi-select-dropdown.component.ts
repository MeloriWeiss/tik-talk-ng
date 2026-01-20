import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClickOutDirective } from '@tt/common-ui';

@Component({
  selector: 'tt-multi-select-dropdown',
  imports: [],
  templateUrl: './multi-select-dropdown.component.html',
  styleUrl: './multi-select-dropdown.component.scss',
  hostDirectives: [
    {
      directive: ClickOutDirective,
      outputs: ['ttClickOut'],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectDropdownComponent {}
