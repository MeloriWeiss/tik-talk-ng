import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetSubscribersDto, httpConfig, Pageable } from '../../shared/index';
import {
  Community,
  OptionalCreateCommunityFormData,
} from '../interfaces/communities.interface';
import { Post, PostCreateDto } from '../../posts/index';
import { Profile } from '../../profile/index';

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

  createCommunity(data: Record<string, unknown>) {
    return this.#http.post<Community>(`${this.#baseApiUrl}community/`, data);
  }

  updateCommunity(communityId: number, data: OptionalCreateCommunityFormData) {
    return this.#http.patch<Community>(
      `${this.#baseApiUrl}community/${communityId}`,
      data
    );
  }

  getCommunity(communityId: number) {
    return this.#http.get<Community>(
      `${this.#baseApiUrl}community/${communityId}`
    );
  }

  deleteCommunity(communityId: number) {
    return this.#http.delete<void>(
      `${this.#baseApiUrl}community/${communityId}`
    );
  }

  fetchPosts(communityId: number) {
    return this.#http.get<Pageable<Post<Community>>>(
      `${this.#baseApiUrl}community/${communityId}/posts`
    );
  }

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post<Profile>>(`${this.#baseApiUrl}post/`, payload);
  }

  getSubscribers(params: GetSubscribersDto) {
    return this.#http.get<Pageable<Profile>>(
      `${this.#baseApiUrl}community/subscribers/${params.communityId}`,
      {
        params: {
          page: params.page ?? 1,
          size: params.size ?? 6,
        },
      }
    );
  }
}
