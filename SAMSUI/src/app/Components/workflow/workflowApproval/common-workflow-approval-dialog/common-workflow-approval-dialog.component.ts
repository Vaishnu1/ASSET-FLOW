import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-common-workflow-approval-dialog',
  templateUrl: './common-workflow-approval-dialog.component.html',
  styleUrls: ['./common-workflow-approval-dialog.component.css']
})
export class CommonWorkflowApprovalDialogComponent implements OnInit {

  transactionId: number = 0;
  transactionSource: any;

  approvebuttonEnable: boolean = false;
  employeeId = '0';
  approvalId = '0';

  constructor(
    public dialogRef: MatDialogRef<CommonWorkflowApprovalDialogComponent>,
    private commonService: CommonService,
    private userSessionService: UserSessionService,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {
    this.transactionId = this.data.assetCodeChangeReqInfo.assetCodeChangeReqId;
    this.transactionSource = allWorkflowStatus[allWorkflowStatus.ASSET_CODE_CHANGE];
  }

  ngOnInit(): void {
    this.transactionId = this.data.assetCodeChangeReqInfo.assetCodeChangeReqId;
    this.transactionSource = allWorkflowStatus[allWorkflowStatus.ASSET_CODE_CHANGE];
    this.getWorkflowApprovalForAsset();
  }

  getWorkflowApprovalForAsset() {
    this.commonService.commonGetService('getWorkflowForId.sams', this.transactionId,
    this.userSessionService.getUserEmpId(), this.transactionSource, this.userSessionService.getUserOrgId()).subscribe(
        data => {
          if (data.success) {
            this.employeeId = this.userSessionService.getUserEmpId();
            this.approvebuttonEnable = data.responseData.approvalFlag;
            this.approvalId = data.responseData.workflowApprovalId;
            
          } else {
            this.commonService.openToastWarningMessage(data.message);
          }
        }, error => {
        }
      );
  }

  assetWorkflowApproval(status){
    let result;
    let selectedAssetList = [];    
    selectedAssetList.push({...this.data.assetCodeChangeReqInfo ,approvalId: this.approvalId});

    if(status){
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.ASSET_CODE_CHANGE], selectedAssetList," Asset Code Change ");
    }
    else{
      result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.ASSET_CODE_CHANGE], selectedAssetList," Asset Code Change ");
    }

    result.then(data=>{
      if(data) {
        this.close('approveOrReject');
      }
    })
  }

  close(action) {
    this.dialogRef.close(action);
  }

}
