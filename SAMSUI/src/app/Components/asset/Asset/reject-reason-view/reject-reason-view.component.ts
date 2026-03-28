import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reject-reason-view',
  templateUrl: './reject-reason-view.component.html',
  styleUrls: ['./reject-reason-view.component.css']
})
export class RejectReasonViewComponent implements OnInit {

  rejectReason : String = null;

  constructor(public dialogRef: MatDialogRef<RejectReasonViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService) { }

  ngOnInit() {

    this.rejectReason = this.data.rejectReason;

  }


  closeModal() {
    this.dialogRef.close({ status: false });
  }

}

