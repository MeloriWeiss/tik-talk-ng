import { NameValue } from '@tt/data-access/shared';

export enum ToggleActions {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export interface ToggleActionEvent {
  option: NameValue;
  action: ToggleActions;
}
