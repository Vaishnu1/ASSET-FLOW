import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailNotificationListComponent } from './EmailNotification/email-notification-list/email-notification-list.component';
import { EmailnotificationCreateComponent } from './EmailNotification/emailnotification-create/emailnotification-create.component';
import { EmailnotificationTypeComponent } from './EmailNotification/emailnotification-type/emailnotification-type.component';
import {EmailnotificationSchedulerComponent} from './EmailNotification/emailnotification-scheduler/emailnotification-scheduler.component';
//import { EmailConfigurationComponent } from './EmailNotification/email-configuration/email-configuration.component';
const routes: Routes = [
  { path: 'emailList', component: EmailNotificationListComponent },
  { path: 'emailCreate', component: EmailnotificationCreateComponent },
  { path: 'emailNotificationType', component: EmailnotificationTypeComponent },
  { path: 'emailscheduler/:id', component: EmailnotificationSchedulerComponent },
  { path: 'emailEdit/:id', component: EmailnotificationCreateComponent },
  { path: 'emailSchedulerEdit/:id', component: EmailnotificationSchedulerComponent },
  { path: 'notificationTypeEdit/:id', component: EmailnotificationTypeComponent },
  { path: 'emailView/:id', component: EmailnotificationCreateComponent },
  { path: 'notificationTypeView/:id', component: EmailnotificationTypeComponent },
  { path: 'emailSchedulerView/:id', component: EmailnotificationSchedulerComponent },
  //{ path: 'emailConfig', component: EmailConfigurationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
