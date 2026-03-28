import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmailNotificationModel } from 'src/app/Model/notification/emailNotificationModel';

@Component({
  selector: 'app-notification-explanation-dialog',
  templateUrl: './notification-explanation-dialog.component.html',
  styleUrls: ['./notification-explanation-dialog.component.css']
})
export class NotificationExplanationDialogComponent implements OnInit {

  emailMessageModel: EmailNotificationModel;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<NotificationExplanationDialogComponent>,
  ) { }

  ngOnInit() {
    // this.dialogRef.updatePosition({ top: `24%`,
    //    right: `15%`});
    this.emailMessageModel = new EmailNotificationModel();
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.emailMessageModel = this.data.emailNotificationModel;
  }

  closeModel() {
    this.dialogRef.close();
  }

}
