import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {  MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Model } from 'src/app/Model/master/model';
import { Title } from '@angular/platform-browser';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModelHistoryComponent } from '../model-history/model-history.component';
import { getData } from 'src/app/Model/common/fetchListData';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';


@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
  displayedColumns = ['select', 'sno', 'modelName','modelNo','businessPartnerTO.businessPartnerName','assetGroupTO.assetGroupName', 'active','updatedBy','updatedDt'];
  modelMainDataSource = [];
  limitCount:any;

  //Set Page Title
  title = 'Asset Optima - Model';

  //For Pagination
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('modelSearch') focusModelSearch: ElementRef;
  public model: Model;
  searchvalue : any = '';
  panelOpenState = false;
  showFiller = false;
  mode = new FormControl('over');

  manufacturerPageNumber : number;
  modelComboPageNumber : number;
  assetCategoryPageNumber : number;
  assetSubCategorPageNumber : number;
  manufactuer: any[] =[];
  modelCombo : any[] =[];
  assetCategoryName : any[] = [];
  subCategoryName : any[] = [];
  modelNumber : any[] = [];

   //LOADER
   subloaderModel: boolean =false;
   subScrollsync: boolean = false;

   //FOR VIEW
   viewData : any;

   moduleAccessModel:ModuleAccessModel;
   manufacturerScrollsync : boolean = false;
   scrollsyncModel :boolean = false;
   categoryScrollsync :boolean = false;

   modelNumberScrollsync :boolean = false;
   modelNumberPageNumber : number;

   assetGroupPageNumber : number;
   assetGroup : any = [];
   assetGroupScrollsync : boolean = false;
  getData: getData;
  selectedItem: any = 0;

  modelActiveList = [
    { id: 1, name: 'ACTIVE' },
    { id: 2, name: 'INACTIVE' }
  ];

  constructor(private router: Router,
              private dialog: MatDialog,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private titleService: Title,
              private userSessionService: UserSessionService) {
      this.moduleAccessModel=new ModuleAccessModel();
      this.pageSize = '100';
      this.pageIndex = '0';
      this.model = new Model();
      this.manufacturerPageNumber = 1;
      this.modelComboPageNumber = 1;
      this.assetCategoryPageNumber = 1;
      this.assetSubCategorPageNumber = 1;
      this.assetGroupPageNumber = 1;
      this.modelNumberPageNumber = 1;
  }

  ngOnInit() {
  //  document.getElementById('commonFooter').style.display='block';
    this.titleService.setTitle(this.title);
    this.model.direction = 'asc';
    this.model.columnName = 'modelName';
    this.model.activeDisplay = 'ACTIVE';
    this.model.active = true;
    this.fetchListofModel();
    //this.focusModelSearch.nativeElement.focus();
    this.moduleAccessModel=this.userSessionService.getUserGroupAccess()['GROUPACCESS_ASSET_MODEL'];
    this.manufacturerPageNumber = 1;
    this.modelComboPageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetSubCategorPageNumber = 1;
  }

  ngOnDestroy() {
    if(this.modelHistroryPopUp!=null){
      this.modelHistroryPopUp.close();
    }
  }

  createModel(modelId ?: number,mode ?: string){
    this.router.navigate(['home/assetmaster/modelCreate/'+modelId + '/' + mode + '/model_basic_info']);
  }

  viewModel(modelId ?: number){
    this.router.navigate(['/modelView/'+modelId]);
  }

  onSearchChange(searchValue : string ) {
    this.searchvalue = searchValue;
    this.model.modelName = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListofModel();
  }

  fetchListofModel(){
    this.model.pageNumber = Number(this.pageIndex);
    this.model.recordsPerPage = Number(this.pageSize);
    this.subloaderModel = true;
    this.modelMainDataSource=[];
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllModel,this.model).subscribe(
      data => {
        if(data.success){
           this.subloaderModel=false;
           this.length = data.responseData.dataTotalRecCount;
           this.modelMainDataSource = data.responseData.dataList;
        }else{
          this.subloaderModel=false;
        }
      }, error =>{
        this.subloaderModel=false;
      }
    );

  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofModel();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.model.pageNumber = 0;
    this.model.columnName = event.active;
    this.model.direction = event.direction;
    this.fetchListofModel();
  }

  //VIEW Page
  openViewdialog(dialogView, element){
      this.viewData = element;
      this.dialog.open(dialogView);
  }

  searchModel() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListofModel();
    this.selectedItem = 0;
  }

  clear(){
    this.model=new Model;
    this.ngOnInit();
    this.selectedItem = 0;
  }

  listOfManufacturer(searchValue) {
    this.manufacturerScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.MANUFACTURER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '',this.limitCount, this.manufacturerPageNumber,'',partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerPageNumber , this.manufactuer , data.responseData.comboList)
        this.manufacturerPageNumber = this.getData.pageNumber;
        this.manufactuer = this.getData.dataList;
        this.manufacturerScrollsync = false;
     }
    );
  }

  getManfacturerComboValue(event) {
    if(event === undefined){
      this.manufacturerPageNumber=1;
      this.manufactuer=[];
    }else{
      this.model.businessPartnerId = event.businessPartnerId;
    }
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel=true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllModelCombo, searchKey.term, '', '', this.limitCount, this.modelComboPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
      this.modelComboPageNumber = this.getData.pageNumber;
      this.modelCombo = this.getData.dataList;
      this.scrollsyncModel=false;
    });
  }

  getModelComboValue(event) {
    if (event === undefined) {
      this.modelComboPageNumber=1;
      this.modelCombo=[];
      this.model.modelId=0;
    }else{
      this.modelComboPageNumber=1;
      this.model.modelId=event.modelId;
    }
  }

listOfCategory(searchValue) {
  this.categoryScrollsync = true;
  this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listAllAssetCategoryCombo, searchValue.term, '', '', this.limitCount, this.assetCategoryPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchValue, this.assetCategoryPageNumber , this.assetCategoryName , data.responseData.comboList)
      this.assetCategoryPageNumber = this.getData.pageNumber;
      this.assetCategoryName = this.getData.dataList;
      this.categoryScrollsync = false;
    }
  );

}
getCategoryComboValue(event) {
  if (event === undefined) {
    this.assetCategoryPageNumber = 1;
    this.assetCategoryName = [];
    this.model.assetCategoryId = 0;
  } else {
    this.model.assetCategoryId = event.assetCategoryId;
  }

  this.assetSubCategorPageNumber = 1;
  this.subCategoryName = [];
  this.model.subCategoryName = null;
  this.model.subCategoryId = 0;

}

//fetch list of asset sub category

listOfSubCategory(searchValue) {
  this.subScrollsync = true;
  this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listAllAssetSubCategoryCombo, searchValue.term, this.model.assetCategoryId, '', this.limitCount, this.assetSubCategorPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetSubCategorPageNumber , this.subCategoryName , data.responseData.comboList)
        this.assetSubCategorPageNumber = this.getData.pageNumber;
        this.subCategoryName = this.getData.dataList;
        this.subScrollsync = false;
      }
    );
}
getSubCategoryComboValue(event) {
  if (event === undefined) {
    this.assetSubCategorPageNumber = 1;
    this.subCategoryName = [];
    this.model.subCategoryName = null;
    this.model.subCategoryId = 0;
  } else {
    this.model.subCategoryId = event.subCategoryId;
  }

}

step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  modelHistroryPopUp;
  showHistory(modelId){
    //open model add popup
    this.modelHistroryPopUp = this.dialog.open(ModelHistoryComponent, {
      height: '600px',
      width: '1200px',
      data: { 'modelId': modelId }
    });
    this.modelHistroryPopUp.disableClose = true;
    this.modelHistroryPopUp.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });

  }

  generateModelReportExport(){
    console.log("Asset Model report");

    this.model.recordsPerPage = 0;
    this.commonService.commonListService(this.assetOptimaServices.generateSimpleAssetModelReport, this.model).subscribe(
      (data) => {
        this.downloadDocument(data.responseData);
        this.commonService.openToastSuccessMessage('Download Successful.');
      }, error => {
        this.commonService.openToastWarningMessage('Failed to generate report.');
      }
    );
  }


  listOfModelNumber(searchValue) {
    this.modelNumberScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllModelNumberCombo, searchValue.term, '', '', this.limitCount, this.modelNumberPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.modelNumberPageNumber , this.modelNumber , data.responseData.comboList)
        this.modelNumberPageNumber = this.getData.pageNumber;
        this.modelNumber = this.getData.dataList;
        this.modelNumberScrollsync = false;
      }
    );
  }
  getModelNumberComboValue(event) {
    if (event === undefined) {
      this.modelNumberPageNumber = 1;
      this.modelNumber = [];
    } else {
      this.model.modelId = event.modelId;
    }
  }

  listOfAllAssetGroup(searchKey) {
    this.assetGroupScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term,'', '',this.limitCount, this.assetGroupPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroup , data.responseData.comboList)
      this.assetGroupPageNumber = this.getData.pageNumber;
      this.assetGroup = this.getData.dataList;
      this.assetGroupScrollsync = false;
    });
  }

  getAssetGroupComboValue(event) {
    if (event === undefined) {
      this.assetGroupPageNumber = 1;
      this.assetGroup = [];
    } else {
      this.model.assetGroupId = event.assetGroupId;
      this.model.assetGroupName = event.assetGroupName;
    }
  }

  downloadDocument(filePath: string) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadExcelFile(filePath).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  selectAssetGroup(element){
    if(this.selectedItem == element.modelId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element.modelId;
    }
  }

  selectedModelActiveList(event){
    if(event != undefined){
      if(event.id==1){
        this.model.activeDisplay = event.name;
        this.model.active = true;
      }else if(event.id==2){
        this.model.activeDisplay = event.name;
        this.model.active = false;
      }
    }else{
      this.model.active = false;
    }
  }

}
