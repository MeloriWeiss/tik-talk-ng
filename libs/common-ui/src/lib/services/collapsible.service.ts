import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CollapsibleService {
  collapsibleTrigger = new Subject<void>();
}
