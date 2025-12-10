import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  output,
} from '@angular/core';
import { ModalService } from '../base-modal/modal.service';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ModalClose } from '@tt/data-access/shared';

@Component({
  selector: 'tt-delete-confirmation-modal',
  imports: [BaseModalComponent],
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrl: './delete-confirmation-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmationModalComponent implements ModalClose, OnDestroy {
  #modalService = inject(ModalService);

  closed = output<boolean>();

  confirm(result: boolean) {
    this.closed.emit(result);
    this.#modalService.close();
  }

  ngOnDestroy() {
    this.closed.emit(false);
  }
}
