import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { PurchaseTermsTemplate } from 'src/app/Model/base/purchase-terms-template';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { TemplateCreateComponent } from '../template-create/template-create.component';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {

  displayedColumns = ['select', 'sNo', 'processName', 'templateName', 'updatedBy', 'updatedDt'];
  purchaseTemplateHdrDataSource = [];

  selectedItem: any = 0;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;

  modelAccessModule: ModuleAccessModel;
  public purchaseTermsTemplate: PurchaseTermsTemplate;

  @ViewChild('purchaseTermTemplateSearchFocus') searchFocusSet: ElementRef;

  //LOADER
  subloader: boolean = false;

  scrollPOTermTemplatesync: boolean = false;
  limitCount: any;
  poTermTemplatePageNumber: number;

  getData: getData;

  poTermTemplateCombo: any = [];

  constructor(private dialog: MatDialog, 
              public router: Router, 
              public commonService: CommonService,
              public assetOptimeMthnd: AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSession: UserSessionService,
              private assetOptimaServices: AssetOptimaServices,
              private samsService: AssetOptimaServices,) { 
                
      this.purchaseTermsTemplate = new PurchaseTermsTemplate();
      this.pageSize = '100';
      this.pageIndex = '0';
      this.poTermTemplatePageNumber = 1;
  }

  ngOnInit(): void {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_LEGAL_ENTITY'];
    this.purchaseTermsTemplate.direction = 'desc';
    this.purchaseTermsTemplate.columnName = 'updatedDt';
    this.poTermTemplateCombo = [];
    this.fetchList();
  }

  ngAfterViewInit() {
    this.searchFocusSet.nativeElement.focus();
  }

  clear(){
    this.purchaseTermsTemplate=new PurchaseTermsTemplate;
    this.ngOnInit();
    this.selectedItem = 0;
  }
  onSearchChange(searchValue: string) {
    this.purchaseTermsTemplate.templateName = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }

  searchPOTermsTemplate() { 
    
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchList();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.purchaseTermsTemplate.pageNumber = 0;
    this.purchaseTermsTemplate.columnName = event.active;
    this.purchaseTermsTemplate.direction = event.direction;
    this.fetchList();
  }

  fetchList() {
    this.purchaseTermsTemplate.pageNumber = Number(this.pageIndex);
    this.purchaseTermsTemplate.recordsPerPage = Number(this.pageSize);
    this.purchaseTemplateHdrDataSource = [];
    this.subloader = true;
    this.commonService.showSpinner();
    this.commonService.commonListService('fetchListOfAllPurchaseTemps.sams', this.purchaseTermsTemplate).subscribe(
      data => {
        if (data.success) {
          this.commonService.hideSpinner();
          this.subloader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.purchaseTemplateHdrDataSource = data.responseData.dataList;
        } else {
          this.subloader = false;
        }
      }
    );
  }

  selectPurchaseTermTemplate(element){
    if(this.selectedItem.tcTemplateHdrId == element.tcTemplateHdrId){
      this.selectedItem = 0;
    } else{
      this.selectedItem = element;
    }
  }

  createPurchaseTermTemplate(element, mode) {
    let dialogRef = this.dialog.open(TemplateCreateComponent, {
      width: '90%',
      height: '95%',
      data: {
        'purchaseTermTemplate': element,
        'mode': mode
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.ngOnInit();
        this.selectedItem = [];
      });
  }

  listofPoTermTemplate(searchTerms){
    this.scrollPOTermTemplatesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listPoTermTemplateCombo, searchTerms.term, '', '', this.limitCount, this.poTermTemplatePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.poTermTemplatePageNumber , this.poTermTemplateCombo , data.responseData.comboList)
        this.poTermTemplatePageNumber = this.getData.pageNumber;
        this.poTermTemplateCombo = this.getData.dataList;
        this.scrollPOTermTemplatesync = false;
      }
    );
  }

  selectedPoTermTemplate(event){
    if(event===undefined){
      this.purchaseTermsTemplate.templateName=null;
      this.purchaseTermsTemplate.tcTemplateHdrId=0;
      this.poTermTemplatePageNumber=1;
      this.poTermTemplateCombo=[];
    }else{
      this.purchaseTermsTemplate.templateName=event.templateName;
      this.purchaseTermsTemplate.tcTemplateHdrId=event.tcTemplateHdrId;
    }
    
  }

  generateReportForPOTermsTemplate(){
    this.commonService.commonListService(this.samsService.generatePOTermsTemplateReport, this.purchaseTermsTemplate).subscribe(
      (data) => {
        this.commonService.downloadDocument(data.responseData);
        this.commonService.openToastSuccessMessage('Download Successful.');
      }, error => {
        this.commonService.openToastWarningMessage('Failed To Generate Report.');
      }
    );
  }

}
