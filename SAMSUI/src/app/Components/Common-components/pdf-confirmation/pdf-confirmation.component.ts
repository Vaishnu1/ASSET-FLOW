import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-pdf-confirmation',
  templateUrl: './pdf-confirmation.component.html',
  styleUrls: ['./pdf-confirmation.component.css']
})
export class PdfConfirmationComponent implements OnInit {

  confirmHeading: string;
  confirmMsg: String;
  radioButtonName1: string;
  radioButtonName2: string;
  reportType: string = '';

  constructor(private commonService: CommonService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<PdfConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit(): void {
    this.confirmHeading = this.data.confirmHeading;
    this.confirmMsg = this.data.confirmMsg;
    this.radioButtonName1 = this.data.radioButtonName1;
    this.radioButtonName2 = this.data.radioButtonName2;
  }

  closeModel() {
    this.dialogRef.close();
  }

  Proceed() {
    this.dialogRef.close({ reportType: this.reportType });
  }

  
}
