import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { ModalService } from './modal.service';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'tt-base-modal',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseModalComponent {
  #modalService = inject(ModalService);

  title = input('');

  @HostListener('click', ['$event'])
  hideModal(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  closeModal() {
    this.#modalService.close();
  }
}
