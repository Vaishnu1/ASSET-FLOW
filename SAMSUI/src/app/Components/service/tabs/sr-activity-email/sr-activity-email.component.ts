import { Component, OnInit, Inject, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-sr-activity-email',
  templateUrl: './sr-activity-email.component.html',
  styleUrls: ['./sr-activity-email.component.css']
})
export class SrActivityEmailComponent implements OnInit {

  sendActivityEmailForm: FormGroup;
  @Input() srId; 

  //DISABLE BUTTON AFTER A SINGLE CLICK
  uploadFlag: boolean = false;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  constructor(public dialogRef: MatDialogRef<SrActivityEmailComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private dialog: MatDialog,
              private change: ChangeDetectorRef,
              private commonService: CommonService,
              private validationService: AssetOptimaConstants,
              private detectorRefs: ChangeDetectorRef,
              private userSessionService: UserSessionService) { 


  }

  ngOnInit() {
    this.sendActivityEmailForm = new FormGroup({
      messageFromEmail: new FormControl(''),
      messageTo: new FormControl('',[Validators.required,Validators.maxLength(300),Validators.pattern(this.validationService.emailValidation)]),
      msgDestinationCcEmailId: new FormControl('',[Validators.maxLength(300),Validators.pattern(this.validationService.multipleEmailValidation)]),
      emailSubject: new FormControl('',[Validators.required,Validators.maxLength(250)]),
      emailBody: new FormControl('',[Validators.maxLength(50000)])
    });
  }

  close(){
    this.dialogRef.close();
  }

  sendSrActivityEmail(){ 
    var obj = {
      'srId': this.data.srId,
      'srNo': this.data.srNo,
      'emailObj': this.sendActivityEmailForm.value
    }                    
    this.commonService.commonInsertService('sendSrActivityEmail.sams', obj).subscribe(
      data => { 
      if(data.success){  
       this.commonService.openToastSuccessMessage('Email Queued Successfully.');   
       this.uploadFlag=false;
       this.close();         
      }else{
        this.commonService.openToastErrorMessage(data.message);
      }
      }, error => {
      }
    );
  }

}
