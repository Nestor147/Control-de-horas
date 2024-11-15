import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'app-master-detail',
  templateUrl: 'master-detail.component.html',
  styles: [`
    .row-header {
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      height: 35px;
    }

    .row-header h6, button, label {
      margin-bottom: 0;
    }
  `]
})
/**
 * @deprecated No use this component, use access based on urls
 */
export class MasterDetailComponent {
  @Output() MasterViewShowed: EventEmitter<string> = new EventEmitter<string>();
  @Output() MasterTypeChanged: EventEmitter<string> = new EventEmitter();
  @Output() ItemDetailChanged: EventEmitter<any> = new EventEmitter();
  @Input() isDetailLoading: boolean;
  @Input() masterTitle: string;
  @Input() detailTitle: string;
  @Input() showModeView: boolean = true;
  @Output() currentIndexChange: EventEmitter<number> = new EventEmitter<number>();
  totalRows: number;
  masterType: string;
  currentView: string;
  showMaster: boolean = true;
  showDetail: boolean = false;

  get itemsSource(): any[] {
    return this._itemsSource;
  }

  @Input() set itemsSource(items: Array<any>) {
    this._itemsSource = items;
    if (this._itemsSource?.length > 0) {
      this.totalRows = this._itemsSource.length;
    }
  }

  @Input() get currentIndex(): number {
    return this._currentIndex;
  }

  set currentIndex(value: number) {
    this._currentIndex = value;
    this.currentIndexChange.emit(this._currentIndex);
  }

  get realCurrentIndex(): number {
    return this.currentIndex + 1;
  }

  private _itemsSource: Array<any>;

  private _currentIndex: number;

  constructor() {
    this.masterType = 'MASTER_DETAIL';
    this.currentView = 'MASTER';
    // this.currentIndex = 0;
    this.totalRows = 0;
  }

  changeMasterType(type: string): void {
    if (this.masterType !== type) {
      this.MasterTypeChanged.emit(this.masterType);
    }

    this.masterType = type;
    this.updateLayout();
  }

  updateLayout(): void {
    if (this.masterType === 'SIDE_BY_SIDE') {
      this.showDetail = true;
      this.showMaster = true;
    } else {
      this.showDetail = false;
      this.showMaster = true;
    }
  }


  showMasterView(): void {
    this.currentView = 'MASTER';
    this.showMaster = true;
    this.showDetail = false;
    this.MasterViewShowed.emit('');
  }

  showDetailView(): void {
    if (this.masterType === 'MASTER_DETAIL') {
      this.currentView = 'DETAIL';
      this.showDetail = true;
      this.showMaster = false;
    }
  }

  prevDetail(): void {
    const prevIndex = this.currentIndex - 1;
    if (this.itemsSource?.length > 0) {
      if (prevIndex >= 0 && prevIndex < this.itemsSource.length) {
        const prevItem = this.itemsSource[prevIndex];
        this.ItemDetailChanged.emit(prevItem);
        this.currentIndex = prevIndex;
      }
    }
  }

  nextDetail(): void {
    const nextIndex = this.currentIndex + 1;
    if (this.itemsSource?.length > 0) {
      if (nextIndex >= 0 && nextIndex < this.itemsSource.length) {
        const nextItem = this.itemsSource[nextIndex];
        this.ItemDetailChanged.emit(nextItem);
        this.currentIndex = nextIndex;
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'ArrowUp') {
      event.preventDefault();
      this.prevDetail();
    }

    if (event.ctrlKey && event.key === 'ArrowDown') {
      event.preventDefault();
      this.nextDetail();
    }
  }
}
