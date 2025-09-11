import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DadataSuggestion } from '../../../data';
import { PopupWrapperComponent } from '../../popup-wrapper/popup-wrapper.component';

@Component({
  selector: 'tt-address-input-dropdown',
  imports: [PopupWrapperComponent],
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
