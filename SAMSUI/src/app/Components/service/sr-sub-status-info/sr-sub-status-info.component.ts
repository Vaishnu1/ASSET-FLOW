import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-sr-sub-status-info',
  templateUrl: './sr-sub-status-info.component.html',
  styleUrls: ['./sr-sub-status-info.component.css']
})
export class SrSubStatusInfoComponent implements OnInit {

  status : string;
  srId : Number = 0;
  length : Number = 0;
  moduleRef : string;
  title : string;

  srItemRequestPRData = [];
  displayedPRColumns = ['transNo', 'transStatus','approvalStatus','transType','itemName', 'itemDesc', 'itemTypeName',
                        'reqQty','unitPrice','totalAmt','supplierName','supplierSiteName','childTransNo'];

  srItemRequestPOData = [];
  displayedPOColumns = ['transNo','transType','transStatus','approvalStatus', 'totalAmt', 
                        'supplierName','supplierSiteName','action'];

  srItemRequestStockIndentData = [];
  displayedStockIndentColumns = ['transNo','requestedBy','transStatus', 'approvalStatus', 'storeName', 'itemName', 'itemDesc',
                                 'itemTypeName','reqQty'];

  constructor(public dialogRef: MatDialogRef<SrSubStatusInfoComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private userSession: UserSessionService,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.status = this.data.status;
    this.srId = this.data.srId;
    this.fetchList();
  }

  fetchList() {
    this.commonService.commonGetService('listServiceRequestItemRequestInfo.sams', this.srId, this.status).subscribe(
      data => {
        if (data.success) {
          this.moduleRef = data.responseData.MODULE_REF;
          this.title = this.moduleRef + " " + "Info";
          if(this.moduleRef == 'PR') {
            this.srItemRequestPRData = data.responseData.SR_ITEM_REQUEST_LIST;
            this.length = this.srItemRequestPRData.length;
          } else if (this.moduleRef == 'PO') {
            this.srItemRequestPOData = data.responseData.SR_ITEM_REQUEST_LIST;
            this.length = this.srItemRequestPOData.length;
          } else if (this.moduleRef == 'STOCK INDENT') {
            this.srItemRequestStockIndentData = data.responseData.SR_ITEM_REQUEST_LIST;
            this.length = this.srItemRequestStockIndentData.length;
          }
        } else {
          this.commonService.openToastSuccessMessage(data.message);
        }
      }, error => {

      }
    );
  }

  close(){
    this.dialogRef.close({ status: true });
  }

  raiseGRN (element) {
    console.log(" raise grn ", element.transNo);
    console.log(" raise grn ", element.transId);

    this.dialogRef.close({ status: true });

    this.router.navigate(['home/inventory/grnCreate/'+ 0 + '/' + 'add']);
    localStorage.setItem('transNo', element.transNo);
    localStorage.setItem('transId', element.transId);
    localStorage.setItem('fromScreen', 'serviceRequestList');
  }

}
