import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ImgUrlPipe,
  SidebarPortalService,
  SvgIconComponent,
} from '@tt/common-ui';
import { AsyncPipe } from '@angular/common';
import {
  profileActions,
  ProfileService,
  selectMe,
} from '@tt/data-access/profile';
import { Store } from '@ngrx/store';
import {
  ChatsService,
  isErrorMessage,
  selectUnreadMessagesCount,
} from '@tt/data-access/chats';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom, Subscription, timer } from 'rxjs';

enum menuLinks {
  ME = 'profile/me',
  CHATS = 'chats',
  SEARCH = 'search',
  COMMUNITIES = 'communities',
}

@Component({
  selector: 'tt-sidebar',
  standalone: true,
  imports: [
    SubscriberCardComponent,
    RouterLink,
    SvgIconComponent,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  #profileService = inject(ProfileService);
  #chatsService = inject(ChatsService);
  #store = inject(Store);
  #destroyRef = inject(DestroyRef);
  #sidebarPortalService = inject(SidebarPortalService);

  sidebarContainer = viewChild('sidebarContainer', {
    read: ViewContainerRef,
  });

  unreadMessagesCount = this.#store.selectSignal(selectUnreadMessagesCount);
  me = this.#store.selectSignal(selectMe);

  subscribers$ = this.#profileService.getSubscribersShortList(3);
  menuLinks = menuLinks;
  #connectWSSubscription!: Subscription;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: this.menuLinks.ME,
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: this.menuLinks.CHATS,
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: this.menuLinks.SEARCH,
    },
    {
      label: 'Сообщества',
      icon: 'communities',
      link: this.menuLinks.COMMUNITIES,
    },
  ];

  constructor() {
    this.connectWs();
  }

  connectWs() {
    this.#connectWSSubscription?.unsubscribe();
    this.#connectWSSubscription = this.#chatsService
      .connectWs()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((message) => {
        if (isErrorMessage(message)) {
          // this.reconnect().then();
        }
      });
  }

  async reconnect() {
    console.log('reconnecting');
    await firstValueFrom(this.#profileService.getMe());
    await firstValueFrom(timer(2000));
    this.connectWs();
  }

  ngOnInit() {
    this.#store.dispatch(profileActions.getMe());
  }

  ngAfterViewInit() {
    const sidebarContainer = this.sidebarContainer();

    if (!sidebarContainer) {
      return;
    }

    this.#sidebarPortalService.registerContainer(sidebarContainer);
  }

  ngOnDestroy() {
    this.#chatsService.disconnectWs();
  }
}
