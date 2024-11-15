import { StaticInjector } from '@aasinet/ngx-controls/utils/app';

const getExternalTranslate = (key: string) => {
  return StaticInjector.instance?.get('')?.getValue('MODULE_' + key) || key;
};

export const MODULE_NAME = {
  RECORDS: () => getExternalTranslate('RECORDS'),
  ACCESS_CONTROL: () => getExternalTranslate('ACCESS_CONTROL'),
  RELEASE_NOTE: () => getExternalTranslate('RELEASE_NOTE'),
};
