export class InAppNotification {
  Id: number;
  Title: string;
  Description: string;
  Enabled: boolean;
  Owner: string;
  AvailableFrom: Date;

  constructor(obj: InAppNotification) {
    Object.assign(this, obj);
  }
}
