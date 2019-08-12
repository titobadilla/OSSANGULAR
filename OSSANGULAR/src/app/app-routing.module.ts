import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import { BrandComponent } from './brand/brand.component';
import { ClientComponent } from './client/client.component';
import { DeviceStateComponent } from './device-state/device-state.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeRoleComponent } from "./employee-role/employee-role.component";
import { GroupClientComponent } from './group-client/group-client.component';
import { InventoryCategoryComponent } from './inventory-category/inventory-category.component';
import { MeasurementUnitComponent } from './measurement-unit/measurement-unit.component';
import { ModelComponent } from './model/model.component';
import { TelephoneClientComponent } from './telephone-client/telephone-client.component';
import { TelephoneEmployeeComponent } from './telephone-employee/telephone-employee.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { WorkOrderDetailComponent } from './work-order-detail/work-order-detail.component';
import { WorkOrderTypeComponent } from './work-order-type/work-order-type.component';
import { CalendarComponent } from './shared/calendar/calendar.component';
import { AuthGuard } from './login/guards/auth.guard';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { InventoryOutputGeneralComponent } from './inventory-output-general/inventory-output-general.component';
import { ToolComponent } from './tool/tool.component';
import { MaterialComponent } from './material/material.component';
import { RoleGuard } from './login/guards/role-guard.service';
import { ChangePasswordAdminComponent } from './change-password-admin/change-password-admin.component';
import { ChangePasswordTechnicalComponent } from './change-password-technical/change-password-technical.component';
import { UpdateWorkOrderComponent } from './work-order/update-work-order/update-work-order.component';
import {KitWorkOrderComponent} from './kit-work-order/kit-work-order.component';
import { InsertKitWorkOrderComponent } from './kit-work-order/insert-kit-work-order/insert-kit-work-order.component';
import { WorkOrderDetailGeneralComponent } from './work-order/work-order-detail-general/work-order-detail-general.component';
import { ReportByTypeComponent } from './reports/report-by-type/report-by-type.component';
import { ReportByClientComponent } from './reports/report-by-client/report-by-client.component';

const routes: Routes = [
  {path: "device",component:DeviceComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"brand",component:BrandComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"client",component:ClientComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"device-state",component:DeviceStateComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"employee",component:EmployeeComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"employee-role",component:EmployeeRoleComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"group-client",component:GroupClientComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"inventory-category",component:InventoryCategoryComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"measurement-unit",component:MeasurementUnitComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"model",component:ModelComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"telephone-client",component:TelephoneClientComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"telephone-employee",component:TelephoneEmployeeComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"work-order",component:WorkOrderComponent,canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"update-work-order",component:UpdateWorkOrderComponent,canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"work-order-detail-general",component:WorkOrderDetailGeneralComponent,canActivate: [AuthGuard,RoleGuard], data: {role:  ['ROLE_ADMIN','ROLE_TECNICO']}},
  {path:"work-order-detail",component:WorkOrderDetailComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN','ROLE_TECNICO']}},
  {path:"work-order-type",component:WorkOrderTypeComponent, canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:"calendar",component:CalendarComponent, canActivate: [AuthGuard,RoleGuard],data: {role: ['ROLE_ADMIN','ROLE_TECNICO']}},
  {path:'work-order-type',component:WorkOrderTypeComponent,canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:'inventory-output-general',component:InventoryOutputGeneralComponent,canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:'tool',component:ToolComponent,canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:'brand',component:BrandComponent,canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:'device-state',component:DeviceStateComponent,canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:'material',component:MaterialComponent,canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:'change-password',component:ChangePasswordTechnicalComponent,canActivate: [AuthGuard,RoleGuard], data: {role: ['ROLE_TECNICO','ROLE_ADMIN']}},
  {path:'kit',component:KitWorkOrderComponent, canActivate : [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:'insert-kit-work-order',component:InsertKitWorkOrderComponent, canActivate : [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:'report-work-order-by-type',component:ReportByTypeComponent, canActivate : [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:'report-work-order-by-client',component:ReportByClientComponent, canActivate : [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path:'kit-work-order',component:KitWorkOrderComponent, canActivate : [AuthGuard,RoleGuard], data: {role: ['ROLE_ADMIN']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),  
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
