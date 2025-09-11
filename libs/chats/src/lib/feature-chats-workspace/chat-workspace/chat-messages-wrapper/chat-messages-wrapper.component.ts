import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  viewChild,
  linkedSignal,
  Injector,
  effect,
  Renderer2,
} from '@angular/core';
import { ChatMessagesGroupComponent } from './chat-messages-group/chat-messages-group.component';
import { ScrollBlockDirective } from '@tt/common-ui';
import { MessageInputComponent } from '@tt/shared';
import {
  ChatsService,
  PatchedChat,
  selectActiveChatMessages,
} from '@tt/data-access/chats';
import { Store } from '@ngrx/store';
import { untracked } from '@angular/core/primitives/signals';

@Component({
  selector: 'tt-chat-messages-wrapper',
  standalone: true,
  imports: [
    MessageInputComponent,
    ScrollBlockDirective,
    ChatMessagesGroupComponent,
  ],
  templateUrl: './chat-messages-wrapper.component.html',
  styleUrl: './chat-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessagesWrapperComponent implements AfterViewInit, OnDestroy {
  #chatsService = inject(ChatsService);
  #store = inject(Store);
  #injector = inject(Injector);
  #r2 = inject(Renderer2);

  chat = input.required<PatchedChat>();

  messagesContainer = viewChild.required<ElementRef>('messagesContainer');

  messagesGroups = this.#store.selectSignal(selectActiveChatMessages);

  currentMessagesGroupDate = linkedSignal(() => {
    const messagesGroups = this.messagesGroups();
    return messagesGroups[messagesGroups.length - 1]?.date ?? '';
  });

  observer: IntersectionObserver | null = null;

  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.currentMessagesGroupDate.set(entry.target.innerHTML);
        }
      });
    });
  }

  ngAfterViewInit() {
    effect(
      () => {
        this.messagesGroups();

        requestAnimationFrame(() => {
          const messagesContainer = untracked(() => this.messagesContainer());
          messagesContainer.nativeElement.scrollTop =
            messagesContainer.nativeElement.scrollHeight;
          this.#r2.setStyle(messagesContainer.nativeElement, 'scrollBehavior', 'auto');
        });
      },
      { injector: this.#injector }
    );
  }

  async onSendMessage(messageText: string) {
    this.#r2.setStyle(this.messagesContainer().nativeElement, 'scrollBehavior', 'smooth');
    this.#chatsService.wsAdaptor.sendMessage(messageText, this.chat().id);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
