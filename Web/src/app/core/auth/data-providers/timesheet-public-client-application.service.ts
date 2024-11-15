import { Injectable } from '@angular/core';
import { PublicClientApplication } from '@azure/msal-browser';
import { AzureConfigData } from './azure-config-data.service';

@Injectable()
export class TimesheetPublicClientApplicationService extends PublicClientApplication {

  constructor(private azureConfig$: AzureConfigData) {
    super(azureConfig$);
  }
}
