import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import {SvgIconComponent} from "@tt/common-ui";

@Component({
  selector: 'tt-multi-select-option',
  imports: [SvgIconComponent],
  templateUrl: './multi-select-option.component.html',
  styleUrl: './multi-select-option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectOptionComponent {
  name = input.required<string>();
  value = input.required<string>();

  selected = signal(false);

  toggleSelected() {
    this.selected.set(!this.selected());
  }
}
