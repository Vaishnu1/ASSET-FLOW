import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { PurchaseParameter } from 'src/app/Model/base/purchase-parameter';
import { PurchaseTermsTemplate } from 'src/app/Model/base/purchase-terms-template';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-po-tc-parameter-list',
  templateUrl: './po-tc-parameter-list.component.html',
  styleUrls: ['./po-tc-parameter-list.component.css']
})
export class PoTcParameterListComponent implements OnInit {

  displayedColumns = ['select','sNo', 'parameterName','parameterInputType','parameterInputValue'];
  poTCParameterMainDataSource = [];

  getData: getData;
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  title = 'PO TC Parameter List';

  subloader: boolean = false;
  enableActionBtn: boolean = true;
  selectAllPO: boolean = false;

  // selectedItem: any = 0;
  // templateSelected: boolean = true;

  selectedItems: any[] = []; // Array to hold multiple selected items
  templateSelected: boolean = true;

  public purchaseParameter: PurchaseParameter;

  constructor(public dialogRef: MatDialogRef<PoTcParameterListComponent>,
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
      this.purchaseParameter = new PurchaseParameter();
      this.getData = new getData();
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.purchaseParameter.direction = 'desc';
    this.purchaseParameter.columnName = 'updatedDt';

    this.selectedItems = Array.isArray(this.data.items) ? [...this.data.items] : [];

    if(this.data.isForChilsParam){

    }

    this.fetchListofPOTCParameters();
    this.enableActionBtn = true;

  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofPOTCParameters();
  }

  customSort(event) {
    this.purchaseParameter.pageNumber = 0;
    this.purchaseParameter.columnName = event.active;
    this.purchaseParameter.direction = event.direction;
    this.fetchListofPOTCParameters();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  fetchListofPOTCParameters() {
    this.purchaseParameter.pageNumber = Number(this.pageIndex);
    this.purchaseParameter.recordsPerPage = Number(this.pageSize);
    this.poTCParameterMainDataSource = [];
    this.subloader = true;

    // Fetch parameter list
    this.commonService.commonListService('fetchListOfAllPurchaseParams.sams', this.purchaseParameter).subscribe(
      data => {
        if (data.success) {
          this.subloader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.poTCParameterMainDataSource = data.responseData.dataList;

          // Automatically mark previously selected items as checked
          this.poTCParameterMainDataSource.forEach((param) => {
            if (this.isSelected(param)) {
              param.checked = true;
            }
          });
        } else {
          this.subloader = false;
        }
      }
    );
  }

 // Toggle selection of an item
 toggleSelection(element) {
   if (this.data.isForChildParam) {
    // Clear the selected items array and only add the new selection when isForChilsParam is true
    this.selectedItems = [element];
  } else {
    // Handle multi-selection for normal scenario
    const index = this.selectedItems.findIndex(item => item.tcParameterId === element.tcParameterId);
    if (index > -1) {
      this.selectedItems.splice(index, 1); // If the item is already selected, remove it
    } else {
      this.selectedItems.push(element); // Otherwise, add it to the selected items array
    }
  }
}

// Check if an item is already selected
isSelected(element) {
  return this.selectedItems.some(item => item.tcParameterId === element.tcParameterId);
}

// Add selected items and close the dialog
addSelectedParameter() {
  this.dialogRef.close(this.selectedItems); // Return all selected items (new + old)
}

// Close the dialog without saving
closeModal() {
  this.dialogRef.close();
}
}

