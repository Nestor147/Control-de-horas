import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalDirectivesModule } from '@aasinet/ngx-controls/directives/global';
import { ComponentDirectivesModule } from '@aasinet/ngx-controls/directives/with-components';

export const NGX_DIRECTIVES = [
  GlobalDirectivesModule,
  ComponentDirectivesModule
];

@NgModule({
  imports: [
    CommonModule,
    NGX_DIRECTIVES
  ],
  declarations: [
  ],
  exports: [
    NGX_DIRECTIVES,
  ],
  providers: [],
})
export class CoreDirectivesModule {
}

