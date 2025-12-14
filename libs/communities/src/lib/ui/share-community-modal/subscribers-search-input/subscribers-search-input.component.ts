import {
  ChangeDetectionStrategy,
  Component,
  effect,
  forwardRef,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  LabeledFormFieldWrapperComponent,
  SvgIconComponent,
  TtFormInputComponent,
} from '@tt/common-ui';
import { prepareSearchFormValue, SubscriberCircleComponent } from '@tt/shared';
import { Profile, ProfileService, selectMe } from '@tt/data-access/profile';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CollapsibleService } from '@tt/common-ui';

@Component({
  selector: 'tt-subscribers-search-input',
  imports: [
    LabeledFormFieldWrapperComponent,
    ReactiveFormsModule,
    SubscriberCircleComponent,
    SvgIconComponent,
    TtFormInputComponent,
    FormsModule,
  ],
  templateUrl: './subscribers-search-input.component.html',
  styleUrl: './subscribers-search-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SubscribersSearchInputComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribersSearchInputComponent implements ControlValueAccessor {
  #profileService = inject(ProfileService);
  #store = inject(Store);
  #collapsibleService = inject(CollapsibleService);

  me = this.#store.selectSignal(selectMe);

  subscribers = signal<Profile[] | null>(null);
  disabled = signal(false);

  subscribersElements = viewChildren(SubscriberCircleComponent);

  searchInput = new FormControl('');

  constructor() {
    const me = this.me();

    if (!me) return;

    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        map((value) =>
          prepareSearchFormValue({
            firstLastName: value,
          })
        ),
        switchMap((value) => {
          return this.#profileService.getSubscribers({
            account_id: me.id,
            size: 8,
            ...value,
          });
        }),
        takeUntilDestroyed()
      )
      .subscribe((res) => {
        this.subscribers.set(res.items);
      });
  }

  selectSubscriber(subscriberId: number | null) {
    this.onChange(subscriberId);

    this.subscribersElements().forEach((subscriber) => {
      if (subscriber.subscriber().id === subscriberId) return;

      subscriber.selected.set(false);
    });

    setTimeout(() => {
      this.#collapsibleService.collapsibleTrigger.next();
    });
  }

  writeValue(val: number | null): void {}

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onChange(value: number | null) {}
  onTouched() {}
}
