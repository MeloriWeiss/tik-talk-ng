import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'tt-labeled-text',
  imports: [],
  templateUrl: './labeled-text.component.html',
  styleUrl: './labeled-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabeledTextComponent {
  title = input<string>('О себе');
  text = input.required<string>();
}
