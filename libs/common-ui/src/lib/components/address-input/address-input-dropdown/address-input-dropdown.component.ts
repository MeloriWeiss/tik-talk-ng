import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { DadataSuggestion } from '../../../data';
import { ClickOutDirective } from '../../../directives/index';

@Component({
  selector: 'tt-address-input-dropdown',
  imports: [],
  templateUrl: './address-input-dropdown.component.html',
  styleUrl: './address-input-dropdown.component.scss',
  hostDirectives: [
    {
      directive: ClickOutDirective,
      outputs: ['ttClickOut'],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInputDropdownComponent {
  suggestions = input<DadataSuggestion[]>();

  suggestionPick = output<DadataSuggestion>();

  onSuggestionPick(suggest: DadataSuggestion) {
    this.suggestionPick.emit(suggest);
  }
}
