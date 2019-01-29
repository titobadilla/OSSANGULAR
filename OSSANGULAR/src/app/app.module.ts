import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { DeviceComponent } from './device/device.component';
import { DeviceStateComponent } from './device-state/device-state.component';
import { EmployeeComponent } from './employee/employee.component';
import { InventoryCategoryComponent } from './inventory-category/inventory-category.component';
import { MeasurementUnitComponent } from './measurement-unit/measurement-unit.component';
import { ModelComponent } from './model/model.component';
import { BrandComponent } from './brand/brand.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { WorkOrderTypeComponent } from './work-order-type/work-order-type.component';
import { WorkOrderDetailComponent } from './work-order-detail/work-order-detail.component';
import { AddressComponent } from './address/address.component';
import { AddressDescriptionComponent } from './address-description/address-description.component';
import { EmployeeRoleComponent } from './employee-role/employee-role.component';
import { GroupClientComponent } from './group-client/group-client.component';
import { ListDeviceWorkOrderComponent } from './list-device-work-order/list-device-work-order.component';
import { ListWorkOrderComponent } from './list-work-order/list-work-order.component';
import { ListMaterialWorkOrderComponent } from './list-material-work-order/list-material-work-order.component';
import { ListToolWorkOrderComponent } from './list-tool-work-order/list-tool-work-order.component';
import { TelephoneClientComponent } from './telephone-client/telephone-client.component';
import { TelephoneEmployeeComponent } from './telephone-employee/telephone-employee.component';
import { AddressService } from './address/address.service';
import { AddressDescriptionService } from './address-description/address-description.service';
import { BrandService } from './brand/brand.service';
import { ClientService } from './client/client.service';
import { DeviceService } from './device/device.service';
import { DeviceStateService } from './device-state/device-state.service';
import { EmployeeService } from './employee/employee.service';
import { EmployeeRoleService } from './employee-role/employee-role.service';
import { GroupClientService } from './group-client/group-client.service';
import { InventoryCategoryService } from './inventory-category/inventory-category.service';
import { ListDeviceWorkOrderService } from './list-device-work-order/list-device-work-order.service';
import { ListMaterialWorkOrderService } from './list-material-work-order/list-material-work-order.service';
import { ListToolWorkOrderService } from './list-tool-work-order/list-tool-work-order.service';
import { ListWorkOrderService } from './list-work-order/list-work-order.service';
import { MeasurementUnitService } from './measurement-unit/measurement-unit.service';
import { ModelService } from './model/model.service';
import { TelephoneClientService } from './telephone-client/telephone-client.service';
import { TelephoneEmployeeService } from './telephone-employee/telephone-employee.service';
import { WorkOrderService } from './work-order/work-order.service';
import { WorkOrderDetailService } from './work-order-detail/work-order-detail.service';
import { WorkOrderTypeService } from './work-order-type/work-order-type.service';
import { MenuAdminComponent } from './shared/menu-admin/menu-admin.component';
import { MenuComponent } from './shared/menu/menu.component';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './shared/calendar/calendar.component';


import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SharedModule } from './shared/calendar/shared.module';
import { loadCldr,L10n } from '@syncfusion/ej2-base';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './login/guards/auth.guard';
import { JwtHelper } from './login/helper/jwt-helper';
import { TokenStorage } from './login/helper/token-storage';
import { ColorComponent } from './color/color.component';
import { UpdateWorkOrderComponent } from './work-order/update-work-order/update-work-order.component';


declare var require: any;

loadCldr(
  require('node_modules/cldr-data/supplemental/numberingSystems.json'),
  require('node_modules/cldr-data/main/es-CR/ca-gregorian.json'),
  require('node_modules/cldr-data/main/es-CR/numbers.json'),
  require('node_modules/cldr-data/main/es-CR/timeZoneNames.json'));


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    DeviceComponent,
    DeviceStateComponent,
    EmployeeComponent,
    InventoryCategoryComponent,
    MeasurementUnitComponent,
    ModelComponent,
    BrandComponent,
    WorkOrderComponent,
    WorkOrderTypeComponent,
    WorkOrderDetailComponent,
    AddressComponent,
    AddressDescriptionComponent,
    EmployeeRoleComponent,
    GroupClientComponent,
    ListDeviceWorkOrderComponent,
    ListWorkOrderComponent,
    ListMaterialWorkOrderComponent,
    ListToolWorkOrderComponent,
    TelephoneClientComponent,
    TelephoneEmployeeComponent,
    MenuAdminComponent,
    MenuComponent,
    LoginComponent,
    CalendarComponent,
    ColorComponent,
    UpdateWorkOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ScheduleAllModule, RecurrenceEditorAllModule, NumericTextBoxAllModule,
        DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule, CheckBoxAllModule, ToolbarAllModule, DropDownListAllModule, ContextMenuAllModule,
        MaskedTextBoxModule, MultiSelectAllModule,ReactiveFormsModule,NgSelectModule
  ],
  providers: [AddressService,AddressDescriptionService,BrandService,ClientService,DeviceService,
  DeviceStateService,EmployeeService,EmployeeRoleService,GroupClientService,InventoryCategoryService,
ListDeviceWorkOrderService,ListMaterialWorkOrderService,ListToolWorkOrderService,ListWorkOrderService,
MeasurementUnitService,ModelService,TelephoneClientService,TelephoneEmployeeService,WorkOrderService,
WorkOrderDetailService,WorkOrderTypeService,AuthService,AuthGuard,JwtHelper,TokenStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
