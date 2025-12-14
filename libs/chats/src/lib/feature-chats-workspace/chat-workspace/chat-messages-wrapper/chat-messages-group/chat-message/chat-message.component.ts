import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { AvatarCircleComponent, HtmlLinkClickDirective, LocalTimePipe, SanitizePipe } from '@tt/common-ui';
import { Message } from '@tt/data-access/chats';

@Component({
  selector: 'tt-chat-message',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    LocalTimePipe,
    SanitizePipe,
    HtmlLinkClickDirective,
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
