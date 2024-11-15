import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScreenResolutionService {
  messages: BehaviorSubject<ScreenResolution>;

  constructor() {
    this.messages = new BehaviorSubject<ScreenResolution>(null);
  }

  // private _messages = <Array<ScreenResolution>>[];
  //
  // getMessages(): Array<ScreenResolution> {
  //   const result = this._messages.slice(0);
  //   this._messages = <Array<ScreenResolution>>[];
  //
  //   return result;
  // }
  //
  // setMessage(value: ScreenResolution) {
  //   this._messages.push(value);
  // }
}

export class ScreenResolution {
  type: LowResolutionEnum;
  title: string;
  message: string;

  constructor(data: ScreenResolution) {
    this.type = data.type;
    this.title = data.title;
    this.message = data.message;
  }
}

export enum LowResolutionEnum {
  ZoomSupported,
  ZoomUnsupported
}
