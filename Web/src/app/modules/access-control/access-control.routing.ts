import { Routes } from '@angular/router';
import { NoAuthGuard } from '../../services/no-auth.guard';

import { SearchRoleComponent } from './role/search-role.component';
import { RoleComponent } from './role/role.component';
import { SearchAssetTypeComponent } from './asset-type/search-asset-type.component';
import { AssetTypeComponent } from './asset-type/asset-type.component';
import { SearchAssetComponent } from './asset/search-asset.component';
import { AssetComponent } from './asset/asset.component';
import { SearchEmployeeComponent } from './employee/search-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { AssetPermissionComponent } from './asset-permission/asset-permission.component';

export const ACCESS_CONTROL_ROUTES: Routes = [
  { path: 'search-role', component: SearchRoleComponent, canActivate: [NoAuthGuard], data: { permission: 'fmRole' } },
  { path: 'role/:Id', component: RoleComponent, canActivate: [NoAuthGuard], data: { permission: 'fmRole' } },
  { path: 'search-asset-type', component: SearchAssetTypeComponent, canActivate: [NoAuthGuard], data: { permission: 'fmAssetType' } },
  { path: 'asset-type/:Id', component: AssetTypeComponent, canActivate: [NoAuthGuard], data: { permission: 'fmAssetType' } },
  { path: 'search-asset', component: SearchAssetComponent, canActivate: [NoAuthGuard], data: { permission: 'fmAsset' } },
  { path: 'asset/:Id', component: AssetComponent, canActivate: [NoAuthGuard], data: { permission: 'fmAsset' } },
  { path: 'search-employee', component: EmployeeComponent, canActivate: [NoAuthGuard], data: { permission: 'fmEmployee' } },
  { path: 'employee/:Id', component: EmployeeComponent, canActivate: [NoAuthGuard], data: { permission: 'fmEmployee' } },
  { path: 'asset-permission', component: AssetPermissionComponent, canActivate: [NoAuthGuard], data: { permission: 'fmAssetPermission' } },
];
