import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-sr-pdf-confirmation-dialog',
  templateUrl: './sr-pdf-confirmation-dialog.component.html',
  styleUrls: ['./sr-pdf-confirmation-dialog.component.css']
})
export class SrPdfConfirmationDialogComponent implements OnInit {

  reportType: String = "CONSOLIDATED";
  srId: number;

  constructor(
    private commonService: CommonService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<SrPdfConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private assetOptimaConstants: AssetOptimaConstants,
    private userSessionService:UserSessionService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.srId = this.data.srId;
  }

  closeModel() {
    this.dialogRef.close();
  }

  downloadDocument(filePath: string, contentType) {
    this.commonService.showSpinner();
    var fileName = filePath.split('.')[0];
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        this.commonService.showDownloadPopUpPDF(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
    this.commonService.hideSpinner();
  }

  downloadSRPdfReport() {
    this.commonService.commonGetService('generateSRPdf.sams', this.srId, this.reportType).subscribe(
      data => {
        if (data.success) {
          this.dialogRef.close();
          this.downloadDocument(data.responseData, 'application/pdf');
          this.commonService.openToastSuccessMessage("Report is Generated Successfully");
        } else {
        }
      }, error => {
        this.commonService.openToastErrorMessage("Failed to generate report.");
      } 
    );
  }

}
