import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule, } from '@angular/common/http';
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
import { EmployeeRoleComponent } from "./employee-role/employee-role.component";
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
import { UpdateEmployeeRoleComponent } from './employee-role/update-employee-role/update-employee-role.component';
import { InsertGroupClientComponent } from './group-client/insert-group-client/insert-group-client.component';
import { UpdateGroupClientComponent } from './group-client/update-group-client/update-group-client.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';

import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SharedModule } from './shared/calendar/shared.module';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './login/guards/auth.guard';
import { JwtHelper } from './login/helper/jwt-helper';
import { TokenStorage } from './login/helper/token-storage';
import { Interceptor } from './login/interceptor/app.interceptor';
import { ColorComponent } from './color/color.component';
import { UpdateWorkOrderComponent } from './work-order/update-work-order/update-work-order.component';
import { InsertEmployeeComponent } from './employee/insert-employee/insert-employee.component';
import { InsertEmployeeRoleComponent } from './employee-role/insert-employee-role/insert-employee-role.component';

import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';

import { CommonModule } from '@angular/common';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { UpdateWorkOrderDetailComponent } from './work-order-detail/update-work-order-detail/update-work-order-detail.component';
import { InsertWorkOrderDetailComponent } from './work-order-detail/insert-work-order-detail/insert-work-order-detail.component';
import { InsertInventoryCategoryComponent } from './inventory-category/insert-inventory-category/insert-inventory-category.component';
import { UpdateInventoryCategoryComponent } from './inventory-category/update-inventory-category/update-inventory-category.component';
import { SearchWorkOrderDetailComponent } from './work-order-detail/search-work-order-detail/search-work-order-detail.component';


import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
<<<<<<< HEAD
import { InsertClientComponent } from './client/insert-client/insert-client.component';
import { UpdateClientComponent } from './client/update-client/update-client.component';
=======
import { InsertMeasurementUnitComponent } from './measurement-unit/insert-measurement-unit/insert-measurement-unit.component';
import { UpdateMeasurementUnitComponent } from './measurement-unit/update-measurement-unit/update-measurement-unit.component';
import { ToolComponent } from './tool/tool.component';
import { InsertToolComponent } from './tool/insert-tool/insert-tool.component';
import { UpdateToolComponent } from './tool/update-tool/update-tool.component';
import { InsertDeviceComponent } from './device/insert-device/insert-device.component';
import { UpdateDeviceComponent } from './device/update-device/update-device.component';
>>>>>>> 8b659ece1dfa93e574a8e9c605f2afe91b148646

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
    UpdateWorkOrderComponent,
    InsertEmployeeComponent,
    InsertEmployeeRoleComponent,
    UpdateEmployeeRoleComponent,
    InsertGroupClientComponent,
    UpdateGroupClientComponent,
    UpdateEmployeeComponent,
    UpdateWorkOrderDetailComponent,
    InsertWorkOrderDetailComponent,
    InsertInventoryCategoryComponent,
    UpdateInventoryCategoryComponent,
    SearchWorkOrderDetailComponent,
<<<<<<< HEAD
    InsertClientComponent,
    UpdateClientComponent
=======
    InsertMeasurementUnitComponent,
    UpdateMeasurementUnitComponent,
    ToolComponent,
    InsertToolComponent,
    UpdateToolComponent,
    InsertDeviceComponent,
    UpdateDeviceComponent,
>>>>>>> 8b659ece1dfa93e574a8e9c605f2afe91b148646
  ],
  imports: [

    //dropdowns
    MultiSelectAllModule, CheckBoxModule, NumericTextBoxModule,

    //basic
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    //form ejs
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    ScheduleAllModule, RecurrenceEditorAllModule, NumericTextBoxAllModule,
    DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule, CheckBoxAllModule, ToolbarAllModule,
    DropDownListAllModule, ContextMenuAllModule, MaskedTextBoxModule, MultiSelectAllModule, 
    NgSelectModule, ComboBoxModule,

    //table 
   CommonModule, ToolbarModule, GridAllModule, DialogModule,

   //date range
   DateRangePickerModule
    
  ],
  providers: [
    AddressService,
    AddressDescriptionService,
    BrandService,
    ClientService,
    DeviceService,
    DeviceStateService,
    EmployeeService,
    EmployeeRoleService,
    GroupClientService,
    InventoryCategoryService,
    ListDeviceWorkOrderService,
    ListMaterialWorkOrderService,
    ListToolWorkOrderService,
    ListWorkOrderService,
    MeasurementUnitService,
    ModelService,
    TelephoneClientService,
    TelephoneEmployeeService,
    WorkOrderService,
    WorkOrderDetailService,
    WorkOrderTypeService,
    AuthService, AuthGuard, JwtHelper, TokenStorage, {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
