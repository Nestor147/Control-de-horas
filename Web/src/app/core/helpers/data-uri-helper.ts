import { CustomDocumentInfo } from '../../models/dochost/custom-document-info';
import { MediaTypeInfo } from '../../models/dochost/media-type-info';

export class DataUriHelper {
  static dataURItoBlob(dataURI: string | CustomDocumentInfo): Blob {
    switch (dataURI.constructor) {
      case String:
        return this.fromFullURIString(dataURI as string);
      case CustomDocumentInfo:
        const du = dataURI as CustomDocumentInfo;
        const mt = MediaTypeInfo.ConvertMediaType(du.DocumentInfo.SourceFileName);
        return this.fromDirectString((du.FileStream || du.Source), mt.ContentType);
      default:
        return this.fromFullURIString(dataURI as string);
    }
  }

  private static fromFullURIString(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeType = dataURI.split(',')[0].split(':')[1].split(';')[0];
    return this.byteStringToBlob(byteString, mimeType);
  }

  private static fromDirectString(dataURI: string, mimeType: string): Blob {
    const byteString = atob(dataURI);
    return this.byteStringToBlob(byteString, mimeType);
  }

  private static byteStringToBlob(bytes: string, mimeType: string): Blob {
    const buffer = new ArrayBuffer(bytes.length);
    const mainArray = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      mainArray[i] = bytes.charCodeAt(i);
    }
    return new Blob([mainArray], { type: mimeType });
  }
}
