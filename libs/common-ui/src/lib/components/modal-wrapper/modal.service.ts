import { Injectable, Type, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  #container?: ViewContainerRef;

  registerContainer(vcr: ViewContainerRef) {
    this.#container = vcr;
  }

  show(modalComponent: Type<unknown>) {
    if (!this.#container) {
      return;
    }

    this.#container.clear();
    this.#container.createComponent(modalComponent);
  }

  close() {
    this.#container?.clear();
  }
}
