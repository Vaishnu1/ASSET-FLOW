import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetAssignmentListComponent } from '../../service/Asset-Assignment/asset-assignment-list/asset-assignment-list.component';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-reject-confirmation',
  templateUrl: './reject-confirmation.component.html',
  styleUrls: ['./reject-confirmation.component.css']
})
export class RejectConfirmationComponent implements OnInit {

  rejectForm: FormGroup;
  Text: string;
  titleName: string;
  confirmHeading: string;
  confirmMsg : string;
  isDisabled: boolean = false;
  note : string;

  CommonhintMsg = new CommonHint();

  constructor(public dialogRef: MatDialogRef<AssetAssignmentListComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.confirmHeading = this.data.confirmHeading;
    this.confirmMsg = this.data.confirmMsg;
    this.note = this.data.note;

    this.rejectForm = new FormGroup({
      rejectReason : new FormControl('',[Validators.required, Validators.maxLength(500)])
    });
    
    if(this.data.selectedElementListLength >=0){
      this.isDisabled = this.data.selectedElementListLength == 0;
    }

  }


  Cancel() {
    this.dialogRef.close({ 'status': false,'reason':'' });
  }
  Proceed() {
    this.dialogRef.close({ 'status': true, 'reason': this.rejectForm.controls.rejectReason.value });
  }

}
