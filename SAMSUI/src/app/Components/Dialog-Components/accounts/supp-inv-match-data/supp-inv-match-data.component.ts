import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-supp-inv-match-data',
  templateUrl: './supp-inv-match-data.component.html',
  styleUrls: ['./supp-inv-match-data.component.css']
})
export class SuppInvMatchDataComponent implements OnInit {

  displayedColumns = ['poNo','receiptNo', 'itemName', 'unitPrice','invoiceQty','poUnitPrice','poAcceptQty','matchStatus'];
  matchDataSource = [];

  //For Pagination
  length: String = '0'; 

  subLoaderMatch:boolean = false;
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  getData: getData;

  title = 'PO / GRN Match Details';

  enableActionBtn: boolean=true;

  supplierInvoiceHdrId : Number = 0;

  constructor(public dialogRef: MatDialogRef<SuppInvMatchDataComponent>,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService: CommonService,
              public assetOptimaServices: AssetOptimaServices,
              private titleService: Title,
              private readonly dialog: MatDialog,
              private userSession: UserSessionService) { 
          this.getData = new getData();
}
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.supplierInvoiceHdrId = this.data.supplierInvoiceHdrId;
    this.fetchListOfMatch();
  }

  fetchListOfMatch(){
    this.subLoaderMatch = true;
    this.commonService.commonListService('fetchMatchDataList.sams',this.supplierInvoiceHdrId).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.matchDataSource = data.responseData.dataList;
        }
      }
    );
    this.subLoaderMatch = false;
  }

  closeModal() {
    this.dialogRef.close('close');
  }

  proceedValidate() {
    this.dialogRef.close('proceed');
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListOfMatch();
  }

  customSort(event) {
    this.fetchListOfMatch();
  }

}
