import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-update-approve-confirmation',
  templateUrl: './update-approve-confirmation.component.html',
  styleUrls: ['./update-approve-confirmation.component.css']
})
export class UpdateApproveConfirmationComponent implements OnInit {

  approvalButtonFlag: boolean = false;
  confirmHeading : string;

  CommonhintMsg = new CommonHint();
  constructor(public dialogRef: MatDialogRef<UpdateApproveConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.approvalButtonFlag = this.data.approvalButtonFlag;
    this.confirmHeading = this.data.confirmTitle ? this.data.confirmTitle : '';
  }


  buttonValue(value) {
    this.dialogRef.close({status: value});
  }

  exit(){
    this.dialogRef.close();
  }


}
