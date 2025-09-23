import { ChangeDetectionStrategy, Component } from '@angular/core';
import {SvgIconComponent} from "@tt/common-ui";

@Component({
  selector: 'tt-communities-header',
  imports: [SvgIconComponent],
  templateUrl: './communities-header.component.html',
  styleUrl: './communities-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesHeaderComponent {}
