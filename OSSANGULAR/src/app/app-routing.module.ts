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
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './shared/calendar/calendar.component';
import { AuthGuard } from './login/guards/auth.guard';
import { AppComponent } from './app.component';
import { UpdateWorkOrderComponent } from './work-order/update-work-order/update-work-order.component';
import { InsertEmployeeComponent } from './employee/insert-employee/insert-employee.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { InsertEmployeeRoleComponent } from './employee-role/insert-employee-role/insert-employee-role.component';
import { UpdateEmployeeRoleComponent } from './employee-role/update-employee-role/update-employee-role.component';
import { InsertGroupClientComponent } from './group-client/insert-group-client/insert-group-client.component';
import { UpdateGroupClientComponent } from './group-client/update-group-client/update-group-client.component';
import { InsertWorkOrderDetailComponent } from './work-order-detail/insert-work-order-detail/insert-work-order-detail.component';
import { UpdateWorkOrderDetailComponent } from './work-order-detail/update-work-order-detail/update-work-order-detail.component';
import { UpdateInventoryCategoryComponent } from './inventory-category/update-inventory-category/update-inventory-category.component';
import { InventoryCategory } from 'src/model/inventorycategory.model';
import { InsertInventoryCategoryComponent } from './inventory-category/insert-inventory-category/insert-inventory-category.component';
import { SearchWorkOrderDetailComponent } from './work-order-detail/search-work-order-detail/search-work-order-detail.component';

import { InsertClientComponent } from './client/insert-client/insert-client.component';
import { InventoryOutputComponent } from './inventory-output/inventory-output.component';
import { InventoryOutputGeneralComponent } from './inventory-output/inventory-output-general/inventory-output-general.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
  {path:"",component:AppComponent, canActivate: [AuthGuard]},
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
  {path:"work-order",component:WorkOrderComponent, canActivate: [AuthGuard]},
  {path:"work-order-detail",component:WorkOrderDetailComponent, canActivate: [AuthGuard]},
  {path:"work-order-type",component:WorkOrderTypeComponent, canActivate: [AuthGuard]},
  {path:"login",component:LoginComponent},
  {path:"calendar",component:CalendarComponent, canActivate: [AuthGuard]},
  {path:"calendar",component:CalendarComponent},
  {path:"update-work-order",component:UpdateWorkOrderComponent},
  {path:"insert-employee",component:InsertEmployeeComponent},
  {path:"insert-employee-role",component:InsertEmployeeRoleComponent},
  {path:'update-employee-role',component:UpdateEmployeeRoleComponent},
  {path:'insert-group-client',component:InsertGroupClientComponent},
  {path:'update-group-client',component:UpdateGroupClientComponent},
  {path:'work-order-detail',component:WorkOrderDetailComponent},
  {path:'insert-work-order-detail',component:InsertWorkOrderDetailComponent},
  {path:'update-work-order-detail',component:UpdateWorkOrderDetailComponent},
  {path:'insert-inventory-category',component:InsertInventoryCategoryComponent},
  {path:'update-inventory-category',component:UpdateInventoryCategoryComponent},
  {path:'inventory-category',component:InventoryCategory},
  {path:'search-work-order-detail',component:SearchWorkOrderDetailComponent},
  {path:'insert-client',component:InsertClientComponent},
  {path:'inventory-output',component:InventoryOutputComponent},
  {path:'inventory-output-general',component:InventoryOutputGeneralComponent},
  {path:'delete',component:DeleteComponent}
  /*,

  {path:'measurement-unit',component:MeasurementUnitComponent},
  {path:'tool',component:ToolComponent},
  {path:'device',component:DeviceComponent},
  {path:'brand',component:BrandComponent},
  {path:'menu',component:MenuPrincipalComponent}
    /*,
  { path: '**', component: PageNotFoundComponent }*/
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
