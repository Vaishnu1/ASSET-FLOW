import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { PurchaseParameter } from 'src/app/Model/base/purchase-parameter';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ParameterCreateComponent } from '../parameter-create/parameter-create.component';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.css']
})
export class ParameterListComponent implements OnInit {

  displayedColumns = ['select', 'sNo', 'tcParameterName', 'tcParameterInputType', 'updatedBy', 'updatedDt'];
  purchaseParameterDataSource = [];

  selectedItem: any = 0;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;

  modelAccessModule: ModuleAccessModel;
  public purchaseParameter: PurchaseParameter;

  @ViewChild('purchaseParameterSearchFocus') searchFocusSet: ElementRef;

  //LOADER
  subloader: boolean = false;

  scrollPOParametersync: boolean = false;
  limitCount: any;
  poParameterPageNumber: number;

  getData: getData;

  poParameterCombo: any = [];
 

  constructor(private dialog: MatDialog, 
              public router: Router, 
              public commonService: CommonService,
              public assetOptimeMthnd: AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSession: UserSessionService,
              private assetOptimaServices: AssetOptimaServices,
              private samsService: AssetOptimaServices,) {

      this.purchaseParameter = new PurchaseParameter();
      this.pageSize = '100';
      this.pageIndex = '0';
      this.poParameterPageNumber = 1;
  }

  ngOnInit(): void {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_LEGAL_ENTITY'];
    this.purchaseParameter.direction = 'desc';
    this.purchaseParameter.columnName = 'updatedDt';
    this.poParameterPageNumber = 1;
    this.poParameterCombo = [];
    this.fetchList();
  }

  ngAfterViewInit() {
    this.searchFocusSet.nativeElement.focus();
  }
  onSearchChange(searchValue: string) {
    this.purchaseParameter.tcParameterName = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }

  searchPOParameter() { 
    
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
    this.purchaseParameter.pageNumber = 0;
    this.purchaseParameter.columnName = event.active;
    this.purchaseParameter.direction = event.direction;
    this.fetchList();
  }
  fetchList() {
    this.purchaseParameter.pageNumber = Number(this.pageIndex);
    this.purchaseParameter.recordsPerPage = Number(this.pageSize);
    this.purchaseParameterDataSource = [];
    this.subloader = true;
    this.commonService.showSpinner();
    this.commonService.commonListService('fetchListOfAllPurchaseParams.sams', this.purchaseParameter).subscribe(
      data => {
        if (data.success) {
          this.commonService.hideSpinner();
          this.subloader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.purchaseParameterDataSource = data.responseData.dataList;
        } else {
          this.subloader = false;
        }
      }
    );
  }

  selectPurchaseParameter(element){
    if(this.selectedItem.tcParameterId == element.tcParameterId){
      this.selectedItem = 0;
    } else{
      this.selectedItem = element;
    }
  }

  createPurchaseParameter (element, mode) {
    let dialogRef = this.dialog.open(ParameterCreateComponent, {
      width: '50%',
      data: {
        'purchaseParameter': element,
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

  listofPoParameter(searchTerms){
    this.scrollPOParametersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listPurchaseParameterCombo, searchTerms.term, '', '', this.limitCount, this.poParameterPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.poParameterPageNumber , this.poParameterCombo , data.responseData.comboList)
        this.poParameterPageNumber = this.getData.pageNumber;
        this.poParameterCombo = this.getData.dataList;
        this.scrollPOParametersync = false;
      }
    );
  }

  selectedPoParameter(event){
    if(event===undefined){
      this.purchaseParameter.tcParameterName=null;
      this.purchaseParameter.tcParameterId=0;
      this.poParameterPageNumber=1;
      this.poParameterCombo=[];
    }else{
      this.purchaseParameter.tcParameterName=event.tcParameterName;
      this.purchaseParameter.tcParameterId=event.tcParameterId;
    }
    
  }

  clear(){
    this.purchaseParameter=new PurchaseParameter;
    this.ngOnInit();
    this.selectedItem = 0;
  }

  generateReportForPoParameter(){
    this.commonService.commonListService(this.samsService.generatePOParameterReport, this.purchaseParameter).subscribe(
      (data) => {
        this.commonService.downloadDocument(data.responseData);
        this.commonService.openToastSuccessMessage('Download Successful.');
      }, error => {
        this.commonService.openToastWarningMessage('Failed To Generate Report.');
      }
    );
  }
  
}
