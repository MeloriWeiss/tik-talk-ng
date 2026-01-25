import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommunitiesService } from './communities.service';
import { tap } from 'rxjs';
import { communitiesActions } from '../store';
import { UploadImageDto } from '../interfaces';

@Injectable()
export class CommunitiesStoreFacade {
  #store = inject(Store);
  #communitiesService = inject(CommunitiesService);

  uploadImage(payload: UploadImageDto) {
    return this.#communitiesService
      .uploadImage({
        community_id: payload.community_id,
        image_type: payload.image_type,
        image_file: payload.image_file,
      })
      .pipe(
        tap((community) => {
          this.#store.dispatch(
            communitiesActions.communityLoaded({ community })
          );
          this.#store.dispatch(
            communitiesActions.postsLoaded({ posts: community.posts })
          );
        })
      )
  }
}
