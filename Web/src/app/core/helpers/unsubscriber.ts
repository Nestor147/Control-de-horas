import { Directive, OnDestroy } from '@angular/core';
import { Unsubscribable } from 'rxjs';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class Unsubscriber implements OnDestroy {
  private subscriptions: Unsubscribable[];

  set subscriptionManager(sub: Unsubscribable) {
    this.subscriptions.push(sub);
  }

  constructor() {
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(d => d.unsubscribe());
  }
}
