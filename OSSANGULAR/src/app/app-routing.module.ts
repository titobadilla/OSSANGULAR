import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import { AddressComponent } from './address/address.component';
import { AddressDescriptionComponent } from './address-description/address-description.component';
import { BrandComponent } from './brand/brand.component';
import { ClientComponent } from './client/client.component';
import { DeviceStateComponent } from './device-state/device-state.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeRoleComponent } from './employee-role/employee-role.component';
import { GroupClientComponent } from './group-client/group-client.component';
import { InventoryCategoryComponent } from './inventory-category/inventory-category.component';
import { ListDeviceWorkOrderComponent } from './list-device-work-order/list-device-work-order.component';
import { ListMaterialWorkOrderComponent } from './list-material-work-order/list-material-work-order.component';
import { ListToolWorkOrderComponent } from './list-tool-work-order/list-tool-work-order.component';
import { ListWorkOrderComponent } from './list-work-order/list-work-order.component';
import { MeasurementUnitComponent } from './measurement-unit/measurement-unit.component';
import { ModelComponent } from './model/model.component';
import { TelephoneClientComponent } from './telephone-client/telephone-client.component';
import { TelephoneEmployeeComponent } from './telephone-employee/telephone-employee.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { WorkOrderDetailComponent } from './work-order-detail/work-order-detail.component';
import { WorkOrderTypeComponent } from './work-order-type/work-order-type.component';
import { CalendarComponent } from './shared/calendar/calendar.component';

const routes: Routes = [
  {path:"app-address",component:AddressComponent},
  {path: "app-device",component:DeviceComponent},
  {path:"app-address-description",component:AddressDescriptionComponent},
  {path:"app-brand",component:BrandComponent},
  {path:"app-client",component:ClientComponent},
  {path:"app-device-state",component:DeviceStateComponent},
  {path:"app-employee",component:EmployeeComponent},
  {path:"app-employee-role",component:EmployeeRoleComponent},
  {path:"app-group-client",component:GroupClientComponent},
  {path:"app-inventory-category",component:InventoryCategoryComponent},
  {path:"app-list-device-work-order",component:ListDeviceWorkOrderComponent},
  {path:"app-list-material-work-oder",component:ListMaterialWorkOrderComponent},
  {path:"app-list-tool-work-order",component:ListToolWorkOrderComponent},
  {path:"app-list-work-order",component:ListWorkOrderComponent},
  {path:"app-measurement-unit",component:MeasurementUnitComponent},
  {path:"app-model",component:ModelComponent},
  {path:"app-telephone-client",component:TelephoneClientComponent},
  {path:"app-telephone-employee",component:TelephoneEmployeeComponent},
  {path:"app-work-order",component:WorkOrderComponent},
  {path:"app-work-order-detail",component:WorkOrderDetailComponent},
  {path:"app-work-order-type",component:WorkOrderTypeComponent},
  {path:"calendar",component:CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
