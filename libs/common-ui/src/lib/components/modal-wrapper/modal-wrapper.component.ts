import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { ModalService } from './modal.service';
import { PopupWrapperComponent } from '../popup-wrapper/popup-wrapper.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'tt-modal-wrapper',
  imports: [PopupWrapperComponent, SvgIconComponent],
  templateUrl: './modal-wrapper.component.html',
  styleUrl: './modal-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalWrapperComponent {
  #modalService = inject(ModalService);

  title = input('');

  @HostListener('click')
  hideModal() {
    this.closeModal();
  }

  clickOnModal(event: MouseEvent) {
    event.stopPropagation();
  }

  closeModal() {
    this.#modalService.close();
  }
}
