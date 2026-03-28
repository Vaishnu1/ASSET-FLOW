import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { ModelListComponent } from '../../asset/Asset-Master/Model/model-list/model-list.component';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-cancel-confirmation-without-reason',
  templateUrl: './cancel-confirmation-without-reason.component.html',
  styleUrls: ['./cancel-confirmation-without-reason.component.css']
})
export class CancelConfirmationWithoutReasonComponent implements OnInit {

  cancelForm: FormGroup;
  Text: string;
  titleName: string;
  confirmHeading : string;

  CommonhintMsg = new CommonHint();
  constructor(public dialogRef: MatDialogRef<ModelListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.titleName = this.data.Text;
    this.confirmHeading = this.data.confirmTitle ? this.data.confirmTitle : '';
    console.log("titleName",this.data.Text);
    console.log("confirmHeading",this.data.confirmTitle);
  }

  Cancel() {
    this.dialogRef.close({status: false});
  }
  Proceed() {
    this.dialogRef.close({status: true});
  }

}
