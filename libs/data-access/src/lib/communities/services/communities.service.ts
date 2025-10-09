import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpConfig, Pageable } from '../../shared/index';
import { Community } from '../interfaces/communities.interface';

@Injectable({
  providedIn: 'root',
})
export class CommunitiesService {
  #http = inject(HttpClient);

  #baseApiUrl = httpConfig.baseApiUrl;

  filterCommunities(params: Record<string, any>) {
    return this.#http.get<Pageable<Community>>(
      `${this.#baseApiUrl}community/`,
      { params }
    );
  }

  joinCommunity(communityId: number) {
    return this.#http.post<{ message: string }>(
      `${this.#baseApiUrl}community/${communityId}/join`,
      {}
    );
  }

  leaveCommunity(communityId: number) {
    return this.#http.delete<{ message: string }>(
      `${this.#baseApiUrl}community/${communityId}/join`,
      {}
    );
  }

  createCommunity(params: Record<string, unknown>) {
    return this.#http.post<Community>(`${this.#baseApiUrl}community/`, params)
  }
}
