import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { httpConfig, Pageable } from '../../shared/index';
import { Profile } from '../interfaces/profile.interface';
import { GetProfileSubscribersDto } from '../../shared/interfaces/get-subscribers.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  #http = inject(HttpClient);

  baseApiUrl = httpConfig.baseApiUrl;

  getTestAccounts() {
    return this.#http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.#http.get<Profile>(`${this.baseApiUrl}account/me`);
  }

  getAccount(id: number) {
    return this.#http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.#http
      .get<Pageable<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  getSubscribers(params: GetProfileSubscribersDto) {
    return this.#http.get<Pageable<Profile>>(
      `${this.baseApiUrl}account/subscribers/${params.account_id}`, {
        params: params
      }
    );
  }

  patchProfile(profile: Partial<Profile>) {
    return this.#http.patch<Profile>(`${this.baseApiUrl}account/me`, profile);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);

    return this.#http.post(`${this.baseApiUrl}account/upload_image`, fd);
  }

  filterProfiles(params: Record<string, any>) {
    return this.#http.get<Pageable<Profile>>(
      `${this.baseApiUrl}account/accounts`,
      { params }
    );
  }
}
