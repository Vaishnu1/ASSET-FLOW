import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';

@Component({
  selector: 'app-ai-automated-reports',
  templateUrl: './ai-automated-reports.component.html',
  styleUrls: ['./ai-automated-reports.component.css']
})
export class AiAutomatedReportsComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    public dialogRef: MatDialogRef<AiAutomatedReportsComponent>,
    public userSession: UserSessionService
  ) { }

  aiAssetSummaryAccessModule: ModuleAccessModel;

  ngOnInit() {
    this.aiAssetSummaryAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_AI_AUTOMATED_ASSET_SUMMARY_REPORT'];
  }

  downloadAssetSummary() {
    this.commonService.showSpinner();
    this.commonService.commonGetServiceForn8n('webhook/getAiAssetSummaryReport', this.userSession.getUserId())
      .subscribe({
        next: (res) => {
          if (res?.success) {
            this.commonService.hideSpinner();
            this.commonService.openToastSuccessMessage('Report request sent! Please check your email.');
          } else {
            this.commonService.hideSpinner();
            this.commonService.openToastErrorMessage('Failed to generate report. Please try again later or contact admin.');
          }
          this.dialogRef.close();
        },
        error: (err) => {
          this.commonService.hideSpinner();
          console.error('N8N Report Request Error:', err);
          this.commonService.openToastErrorMessage('Server error occurred. Kindly contact system admin.');
          this.dialogRef.close();
        }
      });
  }

  close() {
    this.dialogRef.close();
  }

}