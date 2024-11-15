import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import {
  EntityModel,
  InternalMenuItemModel,
  ItemEventInterface,
  MenuItemModel,
  MenuRootComponent,
  NotificationModel,
  SystemInfo,
} from '@aasinet/ngx-layout';
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        EntityModel,
        InternalMenuItemModel,
        MenuItemModel,
        MenuRootComponent,
        NotificationModel
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Timesheet-WebApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Timesheet-WebApp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain(
      'Timesheet-WebApp app is running!'
    );
  });
});
