import { HasChanges } from '@tt/data-access/shared';
import { inject } from '@angular/core';
import { ConfirmationModalComponent, ModalService } from '@tt/common-ui';
import { firstValueFrom } from 'rxjs';

export const canDeactivateWithConfirm = async (component: HasChanges) => {
  const modalService = inject(ModalService);

  if (!component.hasChanges) return true;

  return await firstValueFrom(
    modalService.show<boolean>(ConfirmationModalComponent, {
      title: 'Кажется, вы не дописали пост',
      agreeBtnText: 'Уйти',
      rejectBtnText: 'Вернуться',
    })
  ).then();
};
