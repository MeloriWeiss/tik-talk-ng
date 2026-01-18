import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ModalService } from './modal.service';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ClickOutDirective } from '../../directives/index';
import {
  outputToObservable,
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-base-modal',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.scss',
  hostDirectives: [
    {
      directive: ClickOutDirective,
      outputs: ['ttClickOut'],
      inputs: ['emitEvent']
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseModalComponent {
  #clickOutDirective = inject(ClickOutDirective, { self: true });
  #modalService = inject(ModalService);

  title = input('');

  // @HostListener('click', ['$event'])
  // hideModal(event: MouseEvent) {
  //   if (event.target === event.currentTarget) {
  //     this.closeModal();
  //   }
  // }

  constructor() {
    outputToObservable(this.#clickOutDirective.ttClickOut)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.closeModal();
      });
  }

  closeModal() {
    this.#modalService.close();
  }
}
