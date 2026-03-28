import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-physical-audit-create-confirmation',
  templateUrl: './physical-audit-create-confirmation.component.html',
  styleUrls: ['./physical-audit-create-confirmation.component.css']
})
export class PhysicalAuditCreateConfirmationComponent implements OnInit {


  totalAssetCount : Number = 0;
  auditedAssetCount : Number = 0;
  availableToProcessAssetCount : Number = 0;
  cnlAssetData = [];
  dataSource = [];

  displayedColumns = ['totalAssetCount', 'auditedAssetCount', 'cnlAssetCount', 'unAvailableAssetAuditNames'];
  cnlDisplayedColumns = ['assetCode', 'verificationStatus', 'notFoundRemarks'];
  cnlDecision: 'WITHCNL' | 'WITHOUTCNL' | null = null;

  constructor(public dialogRef: MatDialogRef<PhysicalAuditCreateConfirmationComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private userSession: UserSessionService) { }

  ngOnInit(): void {
  
    this.totalAssetCount = this.data.totalAssetCount;
    this.auditedAssetCount = this.data.auditedAssetCount;
    this.availableToProcessAssetCount = this.data.availableToProcessAssetCount;
    this.cnlAssetData = this.data.cnlAssetData.flat();

    this.dataSource = [
      {
        totalAssetCount: this.data.totalAssetCount,
        auditedAssetCount: this.data.auditedAssetCount,
        availableToProcessAssetCount: this.data.availableToProcessAssetCount,
        unAvailableAssetAuditNames : this.data.unAvailableAssetAuditNames,
        cnlAssetData: this.cnlAssetData
      }
    ];

    // console.log(this.data.cnlAssetData[0]);
    
  }


  close(){
    this.dialogRef.close({ status: true });
  }

  Cancel() {
    this.dialogRef.close({ status: false });
  }

  Proceed() {
    this.dialogRef.close({ 
      status: true,
      cnlDecision: this.cnlDecision
     });
  }
}
