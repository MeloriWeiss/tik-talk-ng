import { NameValue } from '@tt/data-access/shared';

export enum ShareTypes {
  POST = 'POST',
  MESSAGE = 'MESSAGE',
}

export const communityShareTypes: NameValue[] = [
  {
    name: 'На своей странице',
    value: ShareTypes.POST,
  },
  {
    name: 'В личном сообщении',
    value: ShareTypes.MESSAGE,
  },
];
