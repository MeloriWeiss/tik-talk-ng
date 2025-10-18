import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DadataSuggestion } from '../../../data';

@Component({
  selector: 'tt-address-input-dropdown',
  imports: [],
  templateUrl: './address-input-dropdown.component.html',
  styleUrl: './address-input-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInputDropdownComponent {
  suggestions = input<DadataSuggestion[]>();

  suggestionPick = output<DadataSuggestion>();

  onSuggestionPick(suggest: DadataSuggestion) {
    this.suggestionPick.emit(suggest);
  }
}
