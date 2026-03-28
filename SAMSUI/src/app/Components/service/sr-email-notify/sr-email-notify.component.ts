import { Component, OnInit, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-sr-email-notify',
  templateUrl: './sr-email-notify.component.html',
  styleUrls: ['./sr-email-notify.component.css']
})
export class SrEmailNotifyComponent implements OnInit {

  sendServiceRequestEmailForm: FormGroup;
  @Input() srId;
  
  //DISABLE BUTTON AFTER A SINGLE CLICK
  uploadFlag: boolean = false;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  attachPDFFor = [
    { id: 1, name: 'CONSOLIDATED' },
    { id: 2, name: 'DETAILED' },
  ];

  constructor(public dialogRef: MatDialogRef<SrEmailNotifyComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private dialog: MatDialog,
    private change: ChangeDetectorRef,
    private commonService: CommonService,
    private validationService: AssetOptimaConstants,
    private detectorRefs: ChangeDetectorRef,
    private userSessionService: UserSessionService) { }

  ngOnInit() {
    this.sendServiceRequestEmailForm = new FormGroup({
      messageFromEmail: new FormControl(''),
      messageTo: new FormControl('', [Validators.required, Validators.maxLength(300), Validators.pattern(this.validationService.emailValidation)]),
      msgDestinationCcEmailId: new FormControl('', [Validators.maxLength(300), Validators.pattern(this.validationService.multipleEmailValidation)]),
      emailSubject: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      emailBody: new FormControl('', [Validators.maxLength(50000)]),
      attachPDF : new FormControl('CONSOLIDATED'),
      srLocId : new FormControl(this.data.locationId)
    });

    this.sendServiceRequestEmailForm.controls.emailSubject.setValue('Work Order Detail Report for : ' + this.data.srNo);
    this.sendServiceRequestEmailForm.controls.emailSubject.disable();
  }

  close() {
    this.dialogRef.close();
  }

  sendServiceRequestEmail() {

    this.sendServiceRequestEmailForm.controls.emailSubject.setValue('Work Order Detail Report for : ' + this.data.srNo);
    var obj = {
      'srId': this.data.srId,
      'emailSubject' : 'Work Order Detail Report for : ' + this.data.srNo,
      'emailObj': this.sendServiceRequestEmailForm.value
    }
    
    this.commonService.commonInsertService('sendServiceRequestEmail.sams', obj).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage('Email Queued Successfully.');
          this.uploadFlag = false;
          this.close();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }

}
