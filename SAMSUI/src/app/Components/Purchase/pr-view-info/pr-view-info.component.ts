import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-pr-view-info',
  templateUrl: './pr-view-info.component.html',
  styleUrls: ['./pr-view-info.component.css']
})
export class PrViewInfoComponent implements OnInit {

  poId : Number = 0;
  poNo : String ='';
  length : Number = 0;
  prType : String = '';

  poType : String = '';

  isContract : Boolean = false;
  isNotContract : Boolean = false;

  srItemRequestPRData = [];
  displayedPRColumns = ['poLineNo','prNo', 'itemDesc','itemTypeName', 'supplierInfo', 'purchaseCurCode', 'unitPrice', 'reqQty', 'basicAmt', 'totalTax', 'totalAmount','remarks','createdBy'];

  contractDataList = [];
  contractTable = ['contractNo','coverageType','contractType','contractStatus','woApprovalStatus','contractingPartyType','contractPartyName', 'daysElapsed','contractStartDt','contractEndDt','active','netContractValue','updatedBy','updatedDt']

  constructor(public dialogRef: MatDialogRef<PrViewInfoComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private userSession: UserSessionService) { }

  ngOnInit(): void {
  
    this.poId = this.data.selectedItem.poId;
    this.poNo = this.data.selectedItem.poNO;
    this.poType = this.data.selectedItem.poType;

  
    // console.log("poId"+this.poId);
    // console.log("poNo"+this.poNo);
    // console.log("poType : "+this.poType);

    if(this.poType != 'CONTRACT'){
      this.fetchPoReqId();
    }else if(this.poType == 'CONTRACT'){
      this.fetchContractList(this.poNo);
    }
    
    
    this.isContract = this.poType === 'CONTRACT';
    this.isNotContract = this.poType != 'CONTRACT';

    if (this.prType === 'MATERIAL') {
      this.displayedPRColumns.push('newItem');
      this.displayedPRColumns.push('itemName')
      
      const index = this.displayedPRColumns.indexOf('itemDesc');
      if (index !== -1) {
        this.displayedPRColumns.splice(index, 1);
      }

    } 

  }

  fetchPoReqId() {
    this.commonService.commonGetService('fetchPurchaseOrderInfo.sams', this.poId).subscribe(
      data => {
        if (data.success) {
          console.log("poReqId : "+data.responseData.poDtlList[0].prHdrId);
          this.fetchPRList(data.responseData.poDtlList[0].prHdrId,this.poNo);
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      },
      error => {
        // Handle error
      }
    );
  }

  fetchPRList(poReqId,itemId) {
  this.commonService.commonGetService('fetchPurchaseRequestDetails.sams', poReqId,itemId).subscribe(
    data => {
      if (data.success) {
        this.prType = data.responseData.prType;
        
        this.srItemRequestPRData = data.responseData.poItemList;
        this.length = this.srItemRequestPRData.length;

        this.adjustDisplayedColumns();
      } else {
        this.commonService.openToastWarningMessage(data.message);
      }
    },
    error => {
      // Handle error
    }
  );
}

adjustDisplayedColumns() {
  if (this.prType === 'MATERIAL') {

    const firstColumnIndex = this.displayedPRColumns.indexOf('prNo');

    if (firstColumnIndex !== -1) {
      this.displayedPRColumns.splice(firstColumnIndex + 1, 0, 'newItem', 'itemName');
    } 

    const index = this.displayedPRColumns.indexOf('itemDesc');
    if (index !== -1) {
      this.displayedPRColumns.splice(index, 1);
    }
  }
}

fetchContractList(poNo) {
  this.commonService.commonGetService('loadContractDetails.sams', poNo).subscribe(
    data => {
      if (data.success) {

        this.contractDataList = data.responseData.dataList;
        this.length = this.contractDataList.length;

        const startDate = new Date();
              const endDate = new Date(this.commonService.convertSstringdd_mm_yyyy_To_yyyy_mm_dd(this.contractDataList[0].contractEndDtDisp));
              if (!isNaN(endDate.getTime())) {
                const timeDiff = endDate.getTime() - startDate.getTime();
                this.contractDataList[0].daysElapsed =(Math.ceil(timeDiff / (1000 * 3600 * 24))) >= 0 ? (Math.ceil(timeDiff / (1000 * 3600 * 24))): 0;
              } else {
                this.contractDataList[0].daysElapsed = 0;
              }

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

  close(){
    this.dialogRef.close({ status: true });
  }


}
