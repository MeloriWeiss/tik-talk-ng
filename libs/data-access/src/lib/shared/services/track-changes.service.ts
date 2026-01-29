import { Injectable } from '@angular/core';
import { HasChanges } from '../interfaces/has-changes.interface';

@Injectable({
  providedIn: 'root'
})
export class TrackChangesService implements HasChanges {
  hasChanges = false;
}
