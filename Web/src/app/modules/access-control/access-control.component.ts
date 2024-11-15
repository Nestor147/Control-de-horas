import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';

import { CoreComponentsModule } from '../../core/components/core-components.module';
import { CoreDirectivesModule } from '../../core/directives/core-directives.module';

import { RoleService } from '../../services/access-control/role.service';
import { AssetTypeService } from '../../services/access-control/asset-type.service';
import { AssetService } from '../../services/access-control/asset.service';
import { AssetPermissionService } from '../../services/access-control/asset-permission.service';

import { SearchRoleComponent } from './role/search-role.component';
import { RoleComponent } from './role/role.component';
import { SearchAssetTypeComponent } from './asset-type/search-asset-type.component';
import { AssetTypeComponent } from './asset-type/asset-type.component';
import { AssetComponent } from './asset/asset.component';
import { SearchAssetComponent } from './asset/search-asset.component';
import { SearchEmployeeComponent } from './employee/search-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { AssetPermissionComponent } from './asset-permission/asset-permission.component';

@Component({
  selector: 'app-access-control',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreComponentsModule,
    CoreDirectivesModule,
    SearchRoleComponent,
    RoleComponent,
    SearchAssetTypeComponent,
    AssetTypeComponent,
    AssetComponent,
    SearchAssetComponent,
    SearchEmployeeComponent,
    EmployeeComponent,
    AssetPermissionComponent
],
  providers: [
    RoleService,
    AssetTypeService,
    AssetService,
    AssetPermissionService,
    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'required field ',
          minlength: ({ requiredLength, actualLength }) =>
            `Was expected ${requiredLength} caracteres  and exists ${actualLength}`,
        }
      }
    }),
  ],
  template: '<router-outlet></router-outlet>'
})
export class AccessControlComponent { }
