import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { ModalClose } from '@tt/data-access/shared';
import {
  BaseModalComponent,
  CollapsibleDirective,
  ModalService,
  RadioInputComponent,
} from '@tt/common-ui';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { communityShareTypes, ShareTypes } from '../../consts';
import { MessageInputComponent } from '@tt/shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { SubscribersSearchInputComponent } from './subscribers-search-input/subscribers-search-input.component';
import { CollapsibleService } from '@tt/common-ui';
import { postsActions } from '@tt/data-access/posts';
import { Store } from '@ngrx/store';
import { selectMe } from '@tt/data-access/profile';
import { Router } from '@angular/router';
import { selectCommunity } from '@tt/data-access/communities';
import { chatsActions } from '@tt/data-access/chats';

@Component({
  selector: 'tt-share-community-modal-component',
  imports: [
    BaseModalComponent,
    RadioInputComponent,
    ReactiveFormsModule,
    MessageInputComponent,
    CollapsibleDirective,
    SubscribersSearchInputComponent,
  ],
  templateUrl: './share-community-modal.component.html',
  styleUrl: './share-community-modal.component.scss',
  providers: [CollapsibleService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareCommunityModalComponent implements ModalClose, OnDestroy {
  #router = inject(Router);
  #store = inject(Store);
  #modalService = inject(ModalService);
  #collapsibleService = inject(CollapsibleService);

  me = this.#store.selectSignal(selectMe);
  community = this.#store.selectSignal(selectCommunity);
  isFullForm = signal<boolean>(true);

  communityShareTypes = communityShareTypes;

  closed = output<void>();

  shareForm = new FormGroup({
    shareType: new FormControl<ShareTypes>(ShareTypes.MESSAGE, [
      Validators.required,
    ]),
    selectedSubscriberId: new FormControl<number | null>(null, [
      Validators.required,
    ]),
    comment: new FormControl<string>(''),
  });

  constructor() {
    this.shareForm.controls.shareType.valueChanges
      .pipe(
        tap((value) => {
          this.isFullForm.set(value === ShareTypes.MESSAGE);

          this.shareForm.controls.selectedSubscriberId.clearValidators();
          this.shareForm.controls.selectedSubscriberId.updateValueAndValidity();

          if (value === ShareTypes.MESSAGE) {
            this.shareForm.controls.selectedSubscriberId.setValidators([
              Validators.required,
            ]);
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  share() {
    this.shareForm.markAllAsTouched();
    this.shareForm.updateValueAndValidity();

    setTimeout(() => {
      this.#collapsibleService.collapsibleTrigger.next();
    });

    if (!this.shareForm.valid) return;

    this.closeModal();

    if (this.shareForm.controls.shareType.value === ShareTypes.MESSAGE) {
      this.shareInMessage();
    }
    if (this.shareForm.controls.shareType.value === ShareTypes.POST) {
      this.shareInPost();
    }
  }

  shareInMessage() {
    const userId = this.shareForm.controls.selectedSubscriberId.value;

    if (!userId) return;

    this.#store.dispatch(chatsActions.createChat({ userId, firstMessage: this.createShareText() }));
  }

  shareInPost() {
    const me = this.me();

    if (!me) return;

    this.#store.dispatch(
      postsActions.createPost({
        payload: {
          title: '',
          content: this.createShareText(),
          authorId: me.id,
        },
      })
    );

    this.#router.navigate(['profile', 'me']).then();
  }

  createShareText() {
    const commentFormValue = this.shareForm.controls.comment.value;

    return `
      ${commentFormValue}
      ${commentFormValue ? '<br><br>' : ''}
      <a data-href="${this.#router.url}">${window.location.href}</a>
    `;
  }

  closeModal() {
    this.#modalService.close();
  }

  ngOnDestroy() {
    this.closed.emit();
  }
}
