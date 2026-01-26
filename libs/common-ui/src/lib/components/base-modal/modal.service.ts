import {
  Injectable,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { ModalClose } from '@tt/data-access/shared';

export type ModalComponentType = Type<ModalClose>;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  #container?: ViewContainerRef;

  registerContainer(vcr: ViewContainerRef) {
    this.#container = vcr;
  }

  show<T>(
    modalComponent: ModalComponentType,
    inputs?: Record<string, unknown>
  ): Observable<T | undefined> {
    if (!this.#container) {
      return of();
    }

    const componentRef = this.#container.createComponent(modalComponent);
    const instance = componentRef.instance;

    if (inputs) {
      Object.entries(inputs).forEach(([name, value]) => {
        componentRef.setInput(name, value);
      });
    }

    return outputToObservable(instance.closed) as Observable<T | undefined>;
  }

  close() {
    const container = this.#container;
    const containerLength = container?.length;

    if (!container || !containerLength) return;

    container.remove(containerLength - 1);
  }
}
