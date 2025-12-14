export interface GetCommunitySubscribersDto {
  communityId: number;
  page?: number;
  size?: number;
}

export type GetProfileSubscribersDto = {
  account_id: number;
  stack?: string[];
  firstLastName?: string;
  city?: string;
  orderBy?: string;
  page?: number;
  size?: number;
}


