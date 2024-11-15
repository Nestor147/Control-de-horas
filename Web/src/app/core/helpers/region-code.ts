import { TranslateService } from '@aasinet/ngx-controls/translate';

export class RegionCode {
  static setRegionAndCodes(regionCode: string, languageCode: string, translator$: TranslateService): void {
    const regionSpan = document.getElementById('header-region-code');
    const languageSpan = document.getElementById('header-language-code');
    const i18n = {
      region: translator$.getDirectTranslation('COMMON_LAYOUT.REGION_LABEL', 'Region'),
      language: translator$.getDirectTranslation('COMMON_LAYOUT.LANGUAGE_LABEL', 'Language'),
    };

    if (regionSpan !== null) {
      regionSpan.dataset.name = i18n.region;
      regionSpan.dataset.value = regionCode;
      languageSpan.dataset.name = i18n.language;
      languageSpan.dataset.value = languageCode;
    }
  }
}
