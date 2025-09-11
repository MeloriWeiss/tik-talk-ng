import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@tt/data-access/auth';
import { SvgIconComponent, TtInputComponent } from '@tt/common-ui';

@Component({
  selector: 'tt-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, SvgIconComponent, TtInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  #authService = inject(AuthService);
  #router = inject(Router);

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.#authService
      .login({
        username: this.form.value.username ?? '',
        password: this.form.value.password ?? '',
      })
      .subscribe((res) => {
        this.#router.navigate(['/']).then();
      });
  }
}
