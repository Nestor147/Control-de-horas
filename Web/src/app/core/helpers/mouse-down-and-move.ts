export class MouseDownAndMove {
  static typeEvent: string;

  static mouseGridHack(): void {
    const moveEl = document.getElementsByClassName('to-move')[0];
    let evt;
    if (moveEl) {
      setTimeout(() => {
        evt = MouseDownAndMove.mouseEvent('mousedown', 0, 0, 0, 0);
        MouseDownAndMove.dispatchCustomEvent(moveEl, evt);
      }, 100);
      setTimeout(() => {
        evt = MouseDownAndMove.mouseEvent('mousemove', 0, 0, 0, 0);
        MouseDownAndMove.dispatchCustomEvent(moveEl, evt);
      }, 110);
      setTimeout(() => {
        evt = MouseDownAndMove.mouseEvent('mouseup', 0, 0, 0, 0);
        MouseDownAndMove.dispatchCustomEvent(moveEl, evt);
      }, 120);
    }
  }

  private static mouseEvent(type: string, sx: number, sy: number, cx: number, cy: number): void {
    MouseDownAndMove.typeEvent = type;
    let evt;
    const e = {
      bubbles: true,
      cancelable: (type !== 'mousemove'),
      view: window,
      detail: 0,
      screenX: sx,
      screenY: sy,
      clientX: cx,
      clientY: cy,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      button: 0,
      relatedTarget: undefined
    };
    if (typeof (document.createEvent) === 'function') {
      evt = document.createEvent('MouseEvents');
      evt.initMouseEvent(type,
        e.bubbles, e.cancelable, e.view, e.detail,
        e.screenX, e.screenY, e.clientX, e.clientY,
        e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
        e.button, document.body.parentNode);
    }
    // else if ((<any>document).createEventObject) {
    //   evt = (<any>document).createEventObject();
    //   for (prop in (<any>e)) {
    //     evt[prop] = e[prop];
    //   }
    //   evt.button = { 0: 1, 1: 4, 2: 2 }[evt.button] || evt.button;
    // }
    return evt;
  }

  private static dispatchCustomEvent(el: any, evt: any): any {
    if (el.dispatchEvent) {
      el.dispatchEvent(evt);
    } else if (el.fireEvent) {
      el.fireEvent('on' + MouseDownAndMove.typeEvent, evt);
    }
    return evt;
  }
}
