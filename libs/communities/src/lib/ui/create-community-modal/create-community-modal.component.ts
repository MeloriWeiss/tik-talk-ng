import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  BadgesInputComponent,
  BaseModalComponent,
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
import { Store } from '@ngrx/store';
import { communitiesActions } from '@tt/data-access/communities/store';

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
export class CreateCommunityModalComponent {
  #modalService = inject(ModalService);
  #store = inject(Store);

  communitiesThemes = communitiesThemes;

  createCommunityForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    themes: new FormControl([] as string[], [Validators.required]),
    tags: new FormControl([] as string[], [Validators.required]),
    description: new FormControl(''),
  });

  createCommunity() {
    this.createCommunityForm.markAllAsTouched();
    this.createCommunityForm.updateValueAndValidity();

    if (this.createCommunityForm.invalid) {
      return;
    }

    const formValue = this.createCommunityForm.value;

    this.#store.dispatch(
      communitiesActions.createCommunity({
        params: {
          name: formValue.name,
          themes: formValue.themes,
          tags: formValue.tags,
          description: formValue.description
        },
      })
    );

    this.closeModal();
  }

  closeModal() {
    this.#modalService.close();
  }

  resetForm() {
    this.createCommunityForm.reset({
      name: '',
      themes: [],
      tags: [],
      description: '',
    });
  }
}
