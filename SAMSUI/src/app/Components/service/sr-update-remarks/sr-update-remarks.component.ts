import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ServiceRequestViewIndividalComponent } from '../service-request-view-individal/service-request-view-individal.component';

@Component({
  selector: 'app-sr-update-remarks',
  templateUrl: './sr-update-remarks.component.html',
  styleUrls: ['./sr-update-remarks.component.css']
})
export class SrUpdateRemarksComponent implements OnInit {

  remarks: string = '';

  constructor(public dialogRef: MatDialogRef<ServiceRequestViewIndividalComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService) {}

  ngOnInit(): void {
    this.remarks = this.data.srRemarks;
  }

  closeModal(value) {
    if(value == 'close'){
      this.remarks = '';
    }
    this.dialogRef.close({remarks: this.remarks });
  }

  clear() {

    this.remarks = '';
    this.ngOnInit();
  }
}

