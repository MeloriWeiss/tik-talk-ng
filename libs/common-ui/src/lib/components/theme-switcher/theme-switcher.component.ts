import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { SwitcherComponent } from '../switcher/switcher.component';

enum themeSchemes {
  LIGHT = 'light',
  DARK = 'dark'
}

@Component({
  selector: 'tt-theme-switcher',
  imports: [ReactiveFormsModule, SwitcherComponent],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  themeStorageKey = 'theme';

  themeSwitcherInput = new FormControl(false);

  constructor() {
    const existingTheme = localStorage.getItem(this.themeStorageKey);

    if (existingTheme && existingTheme === themeSchemes.LIGHT) {
      document.body.classList.add(themeSchemes.LIGHT);
      this.themeSwitcherInput.setValue(true);
    } else {
      const userColorScheme = window.matchMedia('(prefers-color-scheme: light)').matches;

      if (userColorScheme) {
        document.body.classList.add(themeSchemes.LIGHT);
        this.themeSwitcherInput.setValue(true);
      }
    }

    this.themeSwitcherInput.valueChanges
      .pipe(
        takeUntilDestroyed(),
        tap((checked) => {
          if (checked) {
            document.body.classList.add(themeSchemes.LIGHT);
            localStorage.setItem(this.themeStorageKey, themeSchemes.LIGHT);
          } else {
            document.body.classList.remove(themeSchemes.LIGHT);
            localStorage.setItem(this.themeStorageKey, themeSchemes.DARK);
          }
        })
      )
      .subscribe();
  }
}
