import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'tt-labeled-tags',
  imports: [],
  templateUrl: './labeled-tags.component.html',
  styleUrl: './labeled-tags.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabeledTagsComponent {
  title = input('Навыки');
  tags = input.required<string[]>();
}
