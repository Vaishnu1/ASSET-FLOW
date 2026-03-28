import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { PurchaseTermsTemplate } from 'src/app/Model/base/purchase-terms-template';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-po-tc-template-list',
  templateUrl: './po-tc-template-list.component.html',
  styleUrls: ['./po-tc-template-list.component.css']
})
export class PoTcTemplateListComponent implements OnInit {

  displayedColumns = ['select','sNo', 'processName', 'templateName', 'remarks'];
  poTCTemplateMainDataSource = [];

  getData: getData;
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  title = 'PO TC Template List';

  subloader: boolean = false;
  enableActionBtn: boolean = true;
  selectAllPO: boolean = false;

  selectedItem: any = 0;
  templateSelected: boolean = true;

  public purchaseTermsTemplate: PurchaseTermsTemplate;

  constructor(public dialogRef: MatDialogRef<PoTcTemplateListComponent>,
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
      this.purchaseTermsTemplate = new PurchaseTermsTemplate();
      this.getData = new getData();
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.purchaseTermsTemplate.direction = 'desc';
    this.purchaseTermsTemplate.columnName = 'updatedDt';
    this.fetchListofPOTCTemplates();
    this.enableActionBtn = true;
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofPOTCTemplates();
  }

  customSort(event) {
    this.purchaseTermsTemplate.pageNumber = 0;
    this.purchaseTermsTemplate.columnName = event.active;
    this.purchaseTermsTemplate.direction = event.direction;
    this.fetchListofPOTCTemplates();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  fetchListofPOTCTemplates() {
    this.purchaseTermsTemplate.pageNumber = Number(this.pageIndex);
    this.purchaseTermsTemplate.recordsPerPage = Number(this.pageSize);
    this.poTCTemplateMainDataSource = [];
    this.subloader = true;
    this.commonService.showSpinner();
    this.commonService.commonListService('fetchListOfAllPurchaseTemps.sams', this.purchaseTermsTemplate).subscribe(
      data => {
        if (data.success) {
          this.commonService.hideSpinner();
          this.subloader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.poTCTemplateMainDataSource = data.responseData.dataList;
        } else {
          this.subloader = false;
        }
      }
    );
  }

  closeModal() {
    this.dialogRef.close();
  }

  addSelectedTemplate () {
    console.log(" this.selectedItem " , this.selectedItem.tcTemplateHdrId);
    this.dialogRef.close(this.selectedItem);
  }

  selectPurchaseTermTemplate(element) {
    console.log("element " , element);
    if(this.selectedItem.tcTemplateHdrId == element.tcTemplateHdrId) {
      this.selectedItem = 0;
    } else {
      this.templateSelected = false;
      this.selectedItem = element;
    }
  }
}
