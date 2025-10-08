import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../modal-wrapper/modal.service';

@Component({
  selector: 'tt-modal-host',
  imports: [],
  templateUrl: './modal-host.component.html',
  styleUrl: './modal-host.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHostComponent {
  #modalService = inject(ModalService);

  @ViewChild('modalHost', { read: ViewContainerRef })
  set modalHost(modalHost: ViewContainerRef) {
    if (!modalHost) {
      return;
    }

    this.#modalService.registerContainer(modalHost);
  }
}
