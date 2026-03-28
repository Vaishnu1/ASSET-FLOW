import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-physical-audit-create-confirmation-v1',
  templateUrl: './physical-audit-create-confirmation-v1.component.html',
  styleUrls: ['./physical-audit-create-confirmation-v1.component.css']
})
export class PhysicalAuditCreateConfirmationV1Component implements OnInit {


  displayedColumns: string[] = ['assetCode', 'newAssetCode', 'reason'];
  dataSource = [];
  ceidDecision: 'include' | 'exclude' | null = null;

  constructor(
    public dialogRef: MatDialogRef<PhysicalAuditCreateConfirmationV1Component>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.dataSource = this.data.pendingCeidAssets || [];
  }

  proceedWithDecision() {
    this.dialogRef.close(this.ceidDecision);
  }

  close(): void {
    this.dialogRef.close();
  }
}