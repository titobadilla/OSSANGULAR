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

import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { InsertClientComponent } from './client/insert-client/insert-client.component';
import { UpdateClientComponent } from './client/update-client/update-client.component';
import { InsertMeasurementUnitComponent } from './measurement-unit/insert-measurement-unit/insert-measurement-unit.component';
import { UpdateMeasurementUnitComponent } from './measurement-unit/update-measurement-unit/update-measurement-unit.component';
import { ToolComponent } from './tool/tool.component';
import { InsertToolComponent } from './tool/insert-tool/insert-tool.component';
import { UpdateToolComponent } from './tool/update-tool/update-tool.component';
import { InsertDeviceComponent } from './device/insert-device/insert-device.component';
import { UpdateDeviceComponent } from './device/update-device/update-device.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { InventoryOutputComponent } from './inventory-output/inventory-output.component';
import { InventoryOutputSpecificComponent } from './inventory-output/inventory-output-specific/inventory-output-specific.component';
import { InventoryOutputGeneralComponent } from './inventory-output/inventory-output-general/inventory-output-general.component';
import { MaterialComponent } from './material/material.component';
import { DeleteComponent } from './delete/delete.component';
import { InsertDeviceStateComponent } from './device-state/insert-device-state/insert-device-state.component';
import { UpdateDeviceStateComponent } from './device-state/update-device-state/update-device-state.component';
import { InsertBrandComponent } from './brand/insert-brand/insert-brand.component';
import { UpdateBrandComponent } from './brand/update-brand/update-brand.component';
import { InsertModelComponent } from './model/insert-model/insert-model.component';
import { UpdateModelComponent } from './model/update-model/update-model.component';
import { InsertMaterialComponent } from './material/insert-material/insert-material.component';
import { UpdateMaterialComponent } from './material/update-material/update-material.component';
import { InsertInventoryWorkOrderComponent } from './work-order/insert-inventory-work-order/insert-inventory-work-order.component';
import { InsertWorkOrderTypeComponent} from './work-order-type/insert-work-order-type/insert-work-order-type.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './@theme/theme.module';
import { CoreModule } from './@core/core.module';
import { NbContextMenuModule } from '@nebular/theme';
import { InsertAdicionalMaterialWorkOrderComponent } from './work-order/insert-adicional-material-work-order/insert-adicional-material-work-order.component';
import { InsertAdicionalToolWorkOrderComponent } from './work-order/insert-adicional-tool-work-order/insert-adicional-tool-work-order.component';
import { InsertAdicionalDeviceWorkOrderComponent } from './work-order/insert-adicional-device-work-order/insert-adicional-device-work-order.component';
import { KitWorkOrderComponent } from './kit-work-order/kit-work-order.component';
import { SeeWorkOrderDetailComponent } from './work-order-detail/see-work-order-detail/see-work-order-detail.component';
import { UpdateWorkOrderTypeComponent } from './work-order-type/update-work-order-type/update-work-order-type.component';
import { RoleGuard } from './login/guards/role-guard.service';
import { ChangePasswordAdminComponent } from './change-password-admin/change-password-admin.component';
import { ChangePasswordTechnicalComponent } from './change-password-technical/change-password-technical.component';
import { NotificationComponent } from './notification/notification.component';
import { LoginRefreshComponent } from './login/login-refresh/login-refresh.component';
import { ModalSesionRefreshComponent } from './@theme/components/header/modal-sesion-refresh/modal-sesion-refresh.component';


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
    TelephoneClientComponent,
    TelephoneEmployeeComponent,
    MenuAdminComponent,
    MenuComponent,
    LoginComponent,
    CalendarComponent,
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
    InsertClientComponent,
    UpdateClientComponent,
    InsertMeasurementUnitComponent,
    UpdateMeasurementUnitComponent,
    ToolComponent,
    InsertToolComponent,
    UpdateToolComponent,
    InsertDeviceComponent,
    UpdateDeviceComponent,
    MenuPrincipalComponent,
    InventoryOutputSpecificComponent,
    InventoryOutputComponent,
    InventoryOutputGeneralComponent,
    MaterialComponent,
    DeleteComponent,
    InsertDeviceStateComponent,
    UpdateDeviceStateComponent,
    InsertBrandComponent,
    UpdateBrandComponent,
    InsertModelComponent,
    UpdateModelComponent,
    InsertMaterialComponent,
    UpdateMaterialComponent,
    InsertInventoryWorkOrderComponent,
    InsertAdicionalMaterialWorkOrderComponent,
    InsertAdicionalToolWorkOrderComponent,
    InsertAdicionalDeviceWorkOrderComponent,
    KitWorkOrderComponent,
    SeeWorkOrderDetailComponent,
    InsertWorkOrderTypeComponent,
    UpdateWorkOrderTypeComponent,
    ChangePasswordAdminComponent,
    ChangePasswordTechnicalComponent,
    NotificationComponent
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
   DateRangePickerModule,

   //modal
   ModalModule.forRoot(),

   //Menu
   BrowserAnimationsModule,
   NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbContextMenuModule
    

    
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
    MeasurementUnitService,
    ModelService,
    TelephoneClientService,
    TelephoneEmployeeService,
    WorkOrderService,
    WorkOrderDetailService,
    WorkOrderTypeService,
    AuthService, AuthGuard, RoleGuard,JwtHelper, TokenStorage, {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }],
  bootstrap: [AppComponent],entryComponents:[InventoryOutputSpecificComponent,DeleteComponent]
})
export class AppModule { }
