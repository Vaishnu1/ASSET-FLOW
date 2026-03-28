import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModelListComponent } from 'src/app/Components/asset/Asset-Master/Model/model-list/model-list.component';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-sr-re-open-confirmation',
  templateUrl: './sr-re-open-confirmation.component.html',
  styleUrls: ['./sr-re-open-confirmation.component.css']
})
export class SrReOpenConfirmationComponent implements OnInit {

  titleName: string;

  CommonhintMsg = new CommonHint();

  constructor(public dialogRef: MatDialogRef<ModelListComponent>,
             @Inject(MAT_DIALOG_DATA) private data,
             private commonService: CommonService) { 

    }

  ngOnInit(): void {
    this.titleName = this.data.Text;
   
  }

  Cancel() {
    this.dialogRef.close({status: false});
  }
  Proceed() {
    // this.commonService.openToastSuccessMessage('Record Deleted Successfully.');
    this.dialogRef.close({status: true});
  }

}



 



