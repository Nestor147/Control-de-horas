import { ReleaseNote } from './release-note';
import { ReleaseNoteGrouped } from './release-note-grouped';
import { ReleaseNoteItem } from './release-note-item';

export class ReleaseNoteDetail {
  ReleaseNote: ReleaseNote;
  Items: Array<ReleaseNoteItem>;
  ItemsGrouped: Array<ReleaseNoteGrouped>;
}
