import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

export const storybookProviders = [
  provideAnimations(),
  provideHttpClient(),
  provideRouter([]),
  importProvidersFrom([BrowserAnimationsModule, ReactiveFormsModule]),
];
