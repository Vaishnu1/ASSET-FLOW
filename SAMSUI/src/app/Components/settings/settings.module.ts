import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings.routing.module';
import { ImportMainComponent } from './import/import-main/import-main.component';
import { ImportPopupComponent } from './import/import-popup/import-popup.component';
import { PrinterCreateComponent } from './printer/printer/printer-create/printer-create.component';
import { PrinterListComponent } from './printer/printer/printer-list/printer-list.component';
import { PrinterLabelSizeCreateComponent } from './printer/printerLabelSize/printer-label-size-create/printer-label-size-create.component';
import { PrinterLabelSizeListComponent } from './printer/printerLabelSize/printer-label-size-list/printer-label-size-list.component';
import { PrinterTemplateCreateComponent } from './printer/printerTemplate/printer-template-create/printer-template-create.component';
import { PrinterTemplateListComponent } from './printer/printerTemplate/printer-template-list/printer-template-list.component';
import { NumberControlCreateComponent } from './number-control/number-control-create/number-control-create.component';
import { NumberControlListComponent } from './number-control/number-control-list/number-control-list.component';
import { LabelListComponent } from './label-list/label-list.component';
import { UserMainComponent } from './user/user-main/user-main.component';
import { GroupListComponent } from './user/user-subcomponents/group-list/group-list.component';
import { GroupAccessComponent } from './user/user-subcomponents/group-access/group-access.component';
import { UserListComponent } from './user/user-subcomponents/user-list/user-list.component';
import { UserLocationListComponent } from './user/user-subcomponents/user-location-list/user-location-list.component';
import { UserGroupMappingComponent } from './user/user-subcomponents/user-group-mapping/user-group-mapping.component';
import { GroupAddComponent } from './user/user-subcomponents/group-add/group-add.component';
import { UserCreateEditComponent } from './user/user-subcomponents/user-create-edit/user-create-edit.component';
import { UserManagementCreateComponent } from './user/user-management-create/user-management-create.component';
import { CategoryDepartmentMappingComponent } from './user/category-department-mapping/category-department-mapping.component';
import { EmailReminderScheduleListComponent } from './EmailReminderSchedule/email-reminder-schedule-list/email-reminder-schedule-list.component';
import { EmailReminderScheduleCreateComponent } from './EmailReminderSchedule/email-reminder-schedule-create/email-reminder-schedule-create.component';
import { EmailConfigurationComponent } from './email-configuration/email-configuration.component';
import { EmailConfigListComponent, ManageColumnsDialog } from './email-config-list/email-config-list.component';
import { EmailConfigEditComponent } from './email-config-edit/email-config-edit.component';
import { EmailConfigViewComponent } from './email-config-view/email-config-view.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ImportMainComponent,
    ImportPopupComponent,
    PrinterCreateComponent,
    PrinterListComponent,
    PrinterLabelSizeCreateComponent,
    PrinterLabelSizeListComponent,
    PrinterTemplateCreateComponent,
    PrinterTemplateListComponent,
    NumberControlListComponent,
    NumberControlCreateComponent,
    LabelListComponent,
    UserMainComponent,
    GroupListComponent,
    GroupAccessComponent,
    UserListComponent,
    UserLocationListComponent,
    UserGroupMappingComponent,
    GroupAddComponent,
    UserCreateEditComponent,
    UserManagementCreateComponent,
    CategoryDepartmentMappingComponent,
    EmailReminderScheduleListComponent,
    EmailReminderScheduleCreateComponent,
    EmailConfigurationComponent,
    EmailConfigListComponent,
    EmailConfigEditComponent,
    EmailConfigViewComponent,
    ManageColumnsDialog
  ],
  imports: [
    SettingsRoutingModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  exports: [
    EmailReminderScheduleCreateComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule { }
