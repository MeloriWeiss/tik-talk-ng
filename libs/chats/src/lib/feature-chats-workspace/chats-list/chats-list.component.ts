import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { startWith, switchMap, tap } from 'rxjs';
import {
  ScrollBlockDirective,
  SvgIconComponent,
  TtFormInputComponent,
} from '@tt/common-ui';
import {
  chatsActions,
  ChatsService,
  selectChats,
  selectFilteredChats,
} from '@tt/data-access/chats';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tt-chats-list',
  standalone: true,
  imports: [
    ChatsBtnComponent,
    FormsModule,
    ReactiveFormsModule,
    SvgIconComponent,
    RouterLink,
    RouterLinkActive,
    ScrollBlockDirective,
    TtFormInputComponent,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsListComponent {
  chatsService = inject(ChatsService);
  store = inject(Store);

  filteredChats = this.store.selectSignal(selectFilteredChats);

  filterChatsControl = new FormControl('');

  constructor() {
    this.chatsService.messages$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.store.dispatch(chatsActions.getMyChats());
    });

    this.store
      .select(selectChats)
      .pipe(
        tap(() => {
          this.filterChatsControl.setValue('');
        }),
        switchMap(() => {
          return this.filterChatsControl.valueChanges.pipe(startWith(''));
        }),
        takeUntilDestroyed()
      )
      .subscribe((inputValue) => {
        this.store.dispatch(chatsActions.filterChats({ value: inputValue }));
      });
  }

  // chats$ = this.chatsService.messages$.pipe(
  //   switchMap(() => {
  //     return this.chatsService.getMyChats().pipe(
  //       switchMap((chats) => {
  //         return this.filterChatsControl.valueChanges.pipe(
  //           startWith(''),
  //           map((inputValue) => {
  //             return chats.filter((chat) => {
  //               return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
  //                 .toLowerCase()
  //                 .includes(inputValue?.toLowerCase() ?? '');
  //             });
  //           })
  //         );
  //       })
  //     );
  //   })
  // );
}
