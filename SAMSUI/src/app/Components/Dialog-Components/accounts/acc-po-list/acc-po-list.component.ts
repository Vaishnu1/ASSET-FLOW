import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { PurchaseOrderHdr } from 'src/app/Model/purchase/poHdr';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-acc-po-list',
  templateUrl: './acc-po-list.component.html',
  styleUrls: ['./acc-po-list.component.css']
})
export class AccPoListComponent implements OnInit {

  displayedColumns = ['select', 'locationName', 'poNO', 'poRevNo', 'poDtDisp', 'poStatus', 'compFlgDisp', 'netTaxAmt', 'grandTotal', 'srNo', 'supplierName', 'updatedBy'];
  poMainDataSource = [];

  poHdr: PurchaseOrderHdr;
  getData: getData;
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  title = 'Purchase Order List';

  subloaderPO: boolean = false;
  enableActionBtn: boolean = true;
  selectAllPO: boolean = false;


  constructor(public dialogRef: MatDialogRef<AccPoListComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data,
    private titleService: Title,
    private readonly userSession: UserSessionService,
    private commonService: CommonService,
    private assetOptimaConstants: AssetOptimaConstants,
    private assetOptimaServices: AssetOptimaServices,
    private dialog: MatDialog) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.poHdr = new PurchaseOrderHdr();
    this.getData = new getData();
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.poHdr.direction = 'desc';
    this.poHdr.columnName = 'updatedDt';
    this.poHdr.businessPartnerId = this.data.supplierInvoiceHdr.supplierId;
    this.poHdr.poStatus = 'APPROVED';
    this.fetchListofPO();
    this.selectedPOList = [];
    this.enableActionBtn = true;
  }

  fetchListofPO() {
    this.poHdr.pageNumber = Number(this.pageIndex);
    this.poHdr.recordsPerPage = Number(this.pageSize);
    this.subloaderPO = true;
    this.poMainDataSource = null;
    this.commonService.commonListService('fetchListOfAllPurchaseOrder.sams', this.poHdr).subscribe(
      data => {
        if (data.success) {
          this.subloaderPO = false;
          this.length = data.responseData.dataTotalRecCount;
          this.poMainDataSource = data.responseData.dataList;

        } else {
          this.subloaderPO = false;
        }
      }, error => {
        this.subloaderPO = false;
      }
    );
  }

  selectedPOList = [];
  selectPO(element) {
    const indentId = this.selectedPOList.findIndex(data => data.poId === element.poId);

    this.enableActionBtn = false;
    if (indentId === -1) {
      this.selectedPOList.push(element);
    } else {
      this.selectedPOList.splice(indentId, 1);
    }

    if (this.selectedPOList.length === 1) {
      this.enableActionBtn = false;
    }
    else {
      this.enableActionBtn = true;
    }
  }

  selectAllPoLists(event) {
    this.selectAllPO = event.checked;
    this.enableActionBtn = false;

    if (event.checked) {
      this.selectedPOList = this.poMainDataSource;
    }
    else {
      this.selectedPOList = [];
    }

    if (this.selectedPOList.length === 1) {
      this.enableActionBtn = false;
    }
    else {
      this.enableActionBtn = true;
    }
  }

  compareValue(element: any): boolean {
    return this.selectedPOList.findIndex(data => data.poId === element.poId) !== -1;
  }

  closeModal() {
    this.dialogRef.close();
  }

  addSelectedPO () {
    this.dialogRef.close(this.selectedPOList);
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofPO();
  }

  customSort(event) {
    this.poHdr.pageNumber = 0;
    this.poHdr.columnName = event.active;
    this.poHdr.direction = event.direction;
    this.fetchListofPO();
  }

}
