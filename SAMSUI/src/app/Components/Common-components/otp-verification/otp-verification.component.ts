import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { ServiceRequestModel } from 'src/app/Model/serviceRequest/serviceRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {

  otpForm: FormGroup;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  //DISABLE BUTTON AFTER A SINGLE CLICK
  uploadFlag: boolean = false;
  serviceRequestModel: ServiceRequestModel; 

  constructor(public dialogRef: MatDialogRef<OtpVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService,
    private validationService: AssetOptimaConstants) {

    this.serviceRequestModel = new ServiceRequestModel();
  }

  ngOnInit() {
    this.otpForm = new FormGroup({
      srId: new FormControl(this.data.srId),
      otp: new FormControl('',[Validators.required,Validators.maxLength(6),Validators.minLength(6),Validators.pattern(this.validationService.numericValidation)]),
    });
    this.serviceRequestModel=this.data.serviceRequestModel;
    this.sendOtpForSRClose();
  }

  sendOtpForSRClose() {   
    this.commonService.commonGetService('sendOtpForClosingSr.sams', this.otpForm.controls.srId.value).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
             
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {

      }
    );
   }

  Proceed() {
    this.uploadFlag=true;
      this.commonService.commonInsertService('validateOtpForClosingSr.sams', this.otpForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            this.uploadFlag=false;
            this.approvalSR('COMPLETED');       
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFlag=false;
          }
        }, error => {
          this.uploadFlag=false;
        }
      );
  }

  approvalSR(srStatus:string) {
    this.serviceRequestModel.srStatus = srStatus;                       
    var statusToDisplay = this.commonService.toTitleCase(srStatus);               
    this.commonService.commonInsertService('saveUpdateApprovalsServiceRequest.sams', this.serviceRequestModel).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage('Service Request ' + statusToDisplay + ' successfully.');
          this.dialogRef.close({ status: true });                    
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }
  
  Cancel() {
    this.dialogRef.close({ status: false });
  }

}
