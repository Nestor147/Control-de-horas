import { ThemePalette } from '@aasinet/ngx-controls/interfaces/theme';
import { ConfigService } from '../../common/services/config.service';
import { ColorsPalette } from '@aasinet/ngx-controls/utils/theme';

export class SetMyPalette {
  static addEntityToSVGInCSS(color: ThemePalette, config$: ConfigService, isDarkMode: boolean): void {
    const light = color.light.substr(1, color.light.length);
    const base = isDarkMode ? color.baseDark.substr(1, color.baseDark.length) : color.base.substr(1, color.base.length);
    let dark = color.dark.substr(1, color.dark.length);
    if (isDarkMode) {
      dark = 'cccccc';
    }
    const root = document.documentElement.style;
    // config$.getSVGImagesList().forEach((item) => {
    //   root.setProperty(`--url-sprite-${item}`, `url("${config$.get('apiUrl')}/Images/sprite-${item}.svg?l=${light}&b=${base}&d=${dark}")`);
    // });
  }

  static setFullPaletteAndImages(visualIdentity: string, config$: ConfigService, isInDarkMode: boolean): void {
    const entityColor = visualIdentity ?
      ColorsPalette.getMyPalette(visualIdentity) :
      ColorsPalette.getMyPalette('#000000');
    SetMyPalette.addEntityToSVGInCSS(entityColor, config$, isInDarkMode);
    const styles = document.documentElement.style;
    styles.setProperty('--aasi-color-base', (!isInDarkMode) ? entityColor.base : entityColor.baseDark);
    styles.setProperty('--aasi-color-light-base', entityColor.light);
    styles.setProperty('--aasi-color-dark-base', entityColor.dark);
    styles.setProperty('--aasi-color-rgb-base', entityColor.baseRGB);
  }
}
