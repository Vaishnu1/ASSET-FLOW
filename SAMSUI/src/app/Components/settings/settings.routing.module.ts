import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NumberControlListComponent } from './number-control/number-control-list/number-control-list.component';
import { ImportMainComponent } from './import/import-main/import-main.component';
import { PrinterCreateComponent } from './printer/printer/printer-create/printer-create.component';
import { PrinterListComponent } from './printer/printer/printer-list/printer-list.component';
import { LabelListComponent } from './label-list/label-list.component';
import { UserMainComponent } from './user/user-main/user-main.component';
import { UserManagementCreateComponent } from './user/user-management-create/user-management-create.component';
import { EmailReminderScheduleListComponent } from './EmailReminderSchedule/email-reminder-schedule-list/email-reminder-schedule-list.component';
import { EmailConfigurationComponent } from './email-configuration/email-configuration.component';
import { EmailConfigListComponent } from './email-config-list/email-config-list.component';
import { EmailConfigEditComponent } from './email-config-edit/email-config-edit.component';
import { EmailConfigViewComponent } from './email-config-view/email-config-view.component';
const routes: Routes = [
    {
      path: 'import',
      component: ImportMainComponent,
    },
    { path: 'printer',
      component:PrinterListComponent
    },
    { 
      path: 'printerCreate/:pId/:mode', 
      component:PrinterCreateComponent
    },
    {
       path: 'numberControl',
       component: NumberControlListComponent
    },
    { 
      path: 'labelConfig', 
      component: LabelListComponent
    },{ 
      path: 'user', 
      component: UserMainComponent
    },{ 
      path: 'userCreate/:pId/:mode', 
      component: UserManagementCreateComponent
    },
    {
      path: 'reminder',
      component: EmailReminderScheduleListComponent,
    },
    
    {
      path: 'EmailConfigList',
      component: EmailConfigListComponent
    },
    {
      path: 'emailConfig',
      component: EmailConfigurationComponent,
    },
    {
      path: 'EmailConfigEdit/:id',
      component: EmailConfigEditComponent
    },
    {
      path: 'EmailConfigView/:id',
      component: EmailConfigViewComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
