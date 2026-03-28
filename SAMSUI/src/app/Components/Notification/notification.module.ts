import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { MaterialModule } from '../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { NotificationRoutingModule } from './notification.routing.module';
import { EmailNotificationListComponent } from './EmailNotification/email-notification-list/email-notification-list.component';
import { EmailnotificationCreateComponent } from './EmailNotification/emailnotification-create/emailnotification-create.component';
import { EmailnotificationTypeComponent } from './EmailNotification/emailnotification-type/emailnotification-type.component';
import { EmailnotificationSchedulerComponent } from './EmailNotification/emailnotification-scheduler/emailnotification-scheduler.component';
//import { EmailConfigurationComponent } from './EmailNotification/email-configuration/email-configuration.component';


@NgModule({
  declarations: [
    EmailNotificationListComponent,
    EmailnotificationCreateComponent,
    EmailnotificationTypeComponent,
    EmailnotificationSchedulerComponent,
    //EmailConfigurationComponent
],
  imports: [
    NotificationRoutingModule,
    MaterialModule,
    CommonModule,
    AngularEditorModule, AngularEditorModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationModule { }
