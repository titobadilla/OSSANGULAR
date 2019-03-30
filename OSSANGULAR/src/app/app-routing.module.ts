import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import { AddressComponent } from './address/address.component';
import { AddressDescriptionComponent } from './address-description/address-description.component';
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
import { InventoryOutputComponent } from './inventory-output/inventory-output.component';
import { InventoryOutputGeneralComponent } from './inventory-output/inventory-output-general/inventory-output-general.component';
import { ToolComponent } from './tool/tool.component';
import { MaterialComponent } from './material/material.component';

const routes: Routes = [
  {path:"address",component:AddressComponent, canActivate: [AuthGuard]},
  {path: "device",component:DeviceComponent, canActivate: [AuthGuard]},
  {path:"address-description",component:AddressDescriptionComponent, canActivate: [AuthGuard]},
  {path:"brand",component:BrandComponent, canActivate: [AuthGuard]},
  {path:"client",component:ClientComponent, canActivate: [AuthGuard]},
  {path:"device-state",component:DeviceStateComponent, canActivate: [AuthGuard]},
  {path:"employee",component:EmployeeComponent, canActivate: [AuthGuard]},
  {path:"employee-role",component:EmployeeRoleComponent, canActivate: [AuthGuard]},
  {path:"group-client",component:GroupClientComponent, canActivate: [AuthGuard]},
  {path:"inventory-category",component:InventoryCategoryComponent, canActivate: [AuthGuard]},
  {path:"measurement-unit",component:MeasurementUnitComponent, canActivate: [AuthGuard]},
  {path:"model",component:ModelComponent, canActivate: [AuthGuard]},
  {path:"telephone-client",component:TelephoneClientComponent, canActivate: [AuthGuard]},
  {path:"telephone-employee",component:TelephoneEmployeeComponent, canActivate: [AuthGuard]},
  {path:"work-order",component:WorkOrderComponent},
  {path:"work-order-detail",component:WorkOrderDetailComponent, canActivate: [AuthGuard]},
  {path:"work-order-type",component:WorkOrderTypeComponent, canActivate: [AuthGuard]},
  {path:"calendar",component:CalendarComponent, canActivate: [AuthGuard]},
  {path:'work-order-detail',component:WorkOrderDetailComponent},
  {path:'work-order-type',component:WorkOrderTypeComponent},
  {path:'inventory-output',component:InventoryOutputComponent},
  {path:'inventory-output-general',component:InventoryOutputGeneralComponent},
  {path:'tool',component:ToolComponent},
  {path:'brand',component:BrandComponent},
  {path:'device-state',component:DeviceStateComponent},
  {path:'material',component:MaterialComponent}
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
