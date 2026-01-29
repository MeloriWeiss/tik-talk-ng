import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  HostBinding,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  AvatarCircleComponent,
  MainTextareaComponent,
  SvgIconComponent,
} from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { selectMe } from '@tt/data-access/profile';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-message-input',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    FormsModule,
    MainTextareaComponent,
    ReactiveFormsModule,
    SvgIconComponent,
  ],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MessageInputComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent implements ControlValueAccessor {
  #store = inject(Store);

  readonly hasAvatar = input(true);
  readonly hasSendBtn = input(true);
  readonly avatarUrl = input<string | null>();
  readonly defaultAvatarUrl = input<string | null>();
  readonly placeholder = input('');
  readonly disabled = signal(false);

  messageAvatarUrl = computed(() => {
    if (!this.hasAvatar()) return;

    const avatarUrl = this.avatarUrl();

    if (avatarUrl) {
      return avatarUrl;
    }
    if (avatarUrl === null) {
      return null;
    }

    return this.#store.selectSignal(selectMe)()?.avatarUrl;
  });

  isEmojiOpened = false;
  textareaControl = new FormControl('');

  created = output<string>();

  @HostBinding('class.has-not-avatar')
  get hasNotAvatar() {
    return !this.hasAvatar();
  }

  @HostBinding('class.has-not-send-btn')
  get hasNotSendBtn() {
    return !this.hasSendBtn();
  }

  constructor() {
    this.textareaControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => this.onChange(value));
  }

  writeValue(val: string | null): void {
    this.textareaControl.setValue(val);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onCreate() {
    const value = this.textareaControl.value?.trim();

    if (!value) return;

    this.created.emit(value);
    this.textareaControl.setValue('');
  }

  onOpenEmojiList() {
    this.isEmojiOpened = !this.isEmojiOpened;
  }

  onClickSmile(event: Event) {
    const smile = (event.target as HTMLElement).innerHTML;
    if (smile.length !== 2) {
      return;
    }
    this.textareaControl.patchValue(this.textareaControl.value + smile);
    this.isEmojiOpened = false;
  }

  onChange(value: string | null) {}
  onTouched() {}
}
