import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModelListComponent } from 'src/app/Components/asset/Asset-Master/Model/model-list/model-list.component';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-cancel-confirmation',
  templateUrl: './cancel-confirmation.component.html',
  styleUrls: ['./cancel-confirmation.component.css']
})
export class CancelConfirmationComponent implements OnInit {

  cancelForm: FormGroup;
  Text: string;
  titleName: string;
  confirmHeading : string;
  isDisabled: boolean = false;
  note : string;

  CommonhintMsg = new CommonHint();

  constructor(public dialogRef: MatDialogRef<ModelListComponent>,
             @Inject(MAT_DIALOG_DATA) private data,
             private commonService: CommonService) { 

    }

  ngOnInit(): void {
    this.titleName = this.data.Text;
    this.confirmHeading = this.data.confirmTitle ? this.data.confirmTitle : '';
    this.note = this.data.note;
    this.cancelForm = new FormGroup({
      cancelReason : new FormControl('',[Validators.required, Validators.maxLength(500)])
    });

    if(this.data.selectedElementListLength >=0){
      this.isDisabled = this.data.selectedElementListLength == 0;
    }
    // console.log('Test'+this.confirmHeading);
  }

  Cancel() {
    this.dialogRef.close({status: false});
  }
  Proceed() {
    // this.commonService.openToastSuccessMessage('Record Deleted Successfully.');
    this.dialogRef.close({status: true,cancelReason : this.cancelForm.controls.cancelReason.value});
  }

}
