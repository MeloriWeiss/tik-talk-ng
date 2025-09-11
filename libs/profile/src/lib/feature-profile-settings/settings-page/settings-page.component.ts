import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  AddressInputComponent,
  BadgesInputComponent,
  MainTextareaComponent,
  SvgIconComponent,
} from '@tt/common-ui';
import { AvatarUploadComponent, ProfileHeaderComponent } from '../../ui/index';
import {
  profileActions,
  ProfileService,
  selectMe,
} from '@tt/data-access/profile';
import { AuthService } from '@tt/data-access/auth';
import { Store } from '@ngrx/store';
import { HasChanges } from '@tt/data-access/shared';

@Component({
  selector: 'tt-settings-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SvgIconComponent,
    RouterLink,
    MainTextareaComponent,
    BadgesInputComponent,
    AddressInputComponent,
    AvatarUploadComponent,
    ProfileHeaderComponent,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent implements HasChanges {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  router = inject(Router);
  authService = inject(AuthService);
  store = inject(Store);

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [[] as string[]],
    city: [''],
  });

  get hasChanges() {
    return false;
  }

  constructor() {
    const me = this.store.selectSignal(selectMe);

    effect(() => {
      const myProfile = me();
      if (!myProfile) {
        return;
      }
      this.form.patchValue(myProfile);
    });
  }

  onSave() {
    this.form.markAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUploader.avatar)
      ).then();
    }

    this.store.dispatch(
      profileActions.patchProfile({
        profile: {
          firstName: this.form.value.firstName ?? '',
          lastName: this.form.value.lastName ?? '',
          username: this.form.value.username ?? '',
          description: this.form.value.description ?? '',
          stack: this.form.value.stack ?? [],
          city: this.form.value.city ?? '',
        },
      })
    );

    this.router.navigate(['/profile/me']).then();
  }

  logout() {
    this.authService.logout();
  }
}
