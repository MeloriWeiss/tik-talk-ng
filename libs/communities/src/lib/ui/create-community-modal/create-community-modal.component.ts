import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnDestroy,
  output, signal,
} from '@angular/core';
import {
  BadgesInputComponent,
  BaseModalComponent,
  DeleteConfirmationModalComponent,
  LabeledFormFieldWrapperComponent,
  MainTextareaComponent,
  ModalService,
  SvgIconComponent,
  TtFormInputComponent,
} from '@tt/common-ui';
import { MultiSelectComponent, MultiSelectOptionComponent } from '@tt/shared';
import { communitiesThemes } from '../../consts/index';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import {
  communitiesActions,
  CreateCommunityFormData,
  OptionalCreateCommunityFormData,
  selectCommunity,
} from '@tt/data-access/communities';
import { ModalClose } from '@tt/data-access/shared';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tt-create-community-modal',
  imports: [
    BaseModalComponent,
    LabeledFormFieldWrapperComponent,
    TtFormInputComponent,
    BadgesInputComponent,
    MainTextareaComponent,
    SvgIconComponent,
    ReactiveFormsModule,
    MultiSelectComponent,
    MultiSelectOptionComponent,
  ],
  templateUrl: './create-community-modal.component.html',
  styleUrl: './create-community-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCommunityModalComponent implements ModalClose, OnDestroy {
  #store = inject(Store);
  #modalService = inject(ModalService);

  initialFormValue = input<CreateCommunityFormData>();
  deletable = input<boolean>(false);

  closed = output<OptionalCreateCommunityFormData | false>();

  community = this.#store.selectSignal(selectCommunity);
  communitiesThemes = communitiesThemes;

  communityForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    themes: new FormControl([] as string[], [Validators.required]),
    tags: new FormControl([] as string[], [Validators.required]),
    description: new FormControl(''),
  });

  constructor() {
    effect(() => {
      const initialFormValue = this.initialFormValue();

      if (!initialFormValue) return;

      this.communityForm.patchValue(initialFormValue);
    });
  }

  submitForm() {
    this.communityForm.markAllAsTouched();
    this.communityForm.updateValueAndValidity();

    if (this.communityForm.invalid) {
      return;
    }

    const formValue = this.communityForm.value;

    this.closed.emit(formValue);

    this.closeModal();
  }

  async deleteCommunity() {
    const res = await firstValueFrom(
      this.#modalService.show<boolean>(DeleteConfirmationModalComponent)
    );

    if (!res) return;

    const community = this.community();

    if (!community) return;

    this.#store.dispatch(
      communitiesActions.deleteCommunity({ communityId: community.id })
    );

    this.closeModal();
  }

  closeModal() {
    this.#modalService.close();
  }

  ngOnDestroy() {
    this.closed.emit(false);
  }
}
