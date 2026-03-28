import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ModelListComponent } from '../../asset/Asset-Master/Model/model-list/model-list.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirm-confirmation',
  templateUrl: './confirm-confirmation.component.html',
  styleUrls: ['./confirm-confirmation.component.css']
})
export class ConfirmConfirmationComponent implements OnInit {

  confirmForm: FormGroup;
  Text: string;
  titleName: string;
  confirmHeading: string;
  confirmMsg: String;
  isDisabled: boolean = false;
  note : string;

  constructor(public dialogRef: MatDialogRef<ModelListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService) { }

  ngOnInit() {
    this.confirmHeading = this.data.confirmHeading;
    this.confirmMsg = this.data.confirmMsg;
    this.note = this.data.note;
    
    if(this.data.selectedElementListLength >=0){
      this.isDisabled = this.data.selectedElementListLength == 0;
    }

    console.log("note : ",this.note)
    console.log("selectedElementListLength : ",this.data.selectedElementListLength)
  }


  Cancel() {
    this.dialogRef.close({ status: false });
  }

  Proceed() {
    this.dialogRef.close({ status: true });
  }
}
