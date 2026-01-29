import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TrackChangesService } from '@tt/data-access/shared';
import { Directive, inject, OnDestroy } from '@angular/core';
import { MessageInputComponent } from '../components/index';

@Directive({
  selector: '[ttTrackMessage]',
  standalone: true
})
export class TrackMessageDirective implements OnDestroy {
  #trackChangesService = inject(TrackChangesService);
  #messageInput = inject(MessageInputComponent);

  constructor() {
    this.#messageInput.textareaControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value: string | null) => {
        this.#trackChangesService.hasChanges = !!value;
      });
  }

  ngOnDestroy() {
    this.#trackChangesService.hasChanges = false;
  }
}
