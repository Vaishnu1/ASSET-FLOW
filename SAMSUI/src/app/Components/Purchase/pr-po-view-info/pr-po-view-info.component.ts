import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SrSubStatusInfoComponent } from '../../service/sr-sub-status-info/sr-sub-status-info.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-pr-po-view-info',
  templateUrl: './pr-po-view-info.component.html',
  styleUrls: ['./pr-po-view-info.component.css']
})
export class PrPoViewInfoComponent implements OnInit {


  poReqId : Number = 0;
  length : Number = 0;
  prType : String = ''


  srItemRequestPRData = [];
  displayedPRColumns = ['poLineNo', 'itemDesc', 'supplierInfo', 'purchaseCurCode', 'unitPrice', 'reqQty', 'uom', 'basicAmt', 'texInfo', 'totalTax', 'totalAmount', 'remarks'];


  srItemRequestPOData = [];
  displayedPOColumns = [ 'sNo', 'locationName', 'poNO', 'poRevNo', 'poDtDisp', 'businessPartnerName', 'poStatus', 'poType', 'poApprovalStatus', 'compFlgDisp', 'grandTotal', 'updatedBy', 'updatedDtDisp', 'remarks'];



  constructor(public dialogRef: MatDialogRef<PrPoViewInfoComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private userSession: UserSessionService) { }

  ngOnInit(): void {
  
    this.poReqId = this.data.selectedItem.poReqId;
    console.log("poreqId"+this.poReqId);
    this.fetchPRList();
    
    if (this.prType === 'MATERIAL') {
      this.displayedPRColumns.push('newItem');
      this.displayedPRColumns.push('itemName')
      
      const index = this.displayedPRColumns.indexOf('itemDesc');
      if (index !== -1) {
        this.displayedPRColumns.splice(index, 1);
      }

    } 

    this.fetchPOList();
  }

  fetchPRList() {
  this.commonService.commonGetService('fetchPurchaseRequestInfo.sams', this.poReqId).subscribe(
    data => {
      if (data.success) {
        this.prType = data.responseData.prType;
        this.poReqId = data.responseData.poReqId;
        this.srItemRequestPRData = data.responseData.poItemList;
        this.length = this.srItemRequestPRData.length;

        this.adjustDisplayedColumns();
      } else {
        this.commonService.openToastSuccessMessage(data.message);
      }
    },
    error => {
      // Handle error
    }
  );
}

adjustDisplayedColumns() {
  if (this.prType === 'MATERIAL') {

    const firstColumnIndex = this.displayedPRColumns.indexOf('poLineNo');

    if (firstColumnIndex !== -1) {
      this.displayedPRColumns.splice(firstColumnIndex + 1, 0, 'newItem', 'itemName');
    } 

    const index = this.displayedPRColumns.indexOf('itemDesc');
    if (index !== -1) {
      this.displayedPRColumns.splice(index, 1);
    }
  }
}

fetchPOList() {
  this.commonService.commonGetService('fetchPurchaseOrderDetails.sams', this.poReqId).subscribe(
    data => {
      if (data.success) {
        
        this.srItemRequestPOData = data.responseData.dataList;

        console.log(data.responseData)
      } else {
        this.commonService.openToastSuccessMessage(data.message);
      }
    },
    error => {
      // Handle error
    }
  );
}

  close(){
    this.dialogRef.close({ status: true });
  }

}