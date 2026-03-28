import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceRequestListComponent } from '../service-request-list/service-request-list.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sr-feedback',
  templateUrl: './sr-feedback.component.html',
  styleUrls: ['./sr-feedback.component.css']
})
export class SrFeedbackComponent implements OnInit {

  feedback: string = '';
  remarks: string = '';

  srScreen : string = '';

  constructor(public dialogRef: MatDialogRef<ServiceRequestListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService) {}

  ngOnInit(): void {
    this.srScreen = this.data.srScreen;
  }

  closeModal(value) {
    if(value == 'close'){
      this.feedback = '';
    }
    this.dialogRef.close({ feedback: this.feedback, remarks: this.remarks });
  }

  changeAllowEditItem(value) {
    this.feedback = value;
  }

  clear() {
    this.feedback = '';
    this.remarks = '';
    this.ngOnInit();
  }
}
