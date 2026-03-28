import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Router } from '@angular/router';
import { ModelOfItemModule } from 'src/app/Model/inventory/itemModule';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
  
  displayedColumns = ['select', 'sno', 'itemModuleName', 'active','updatedBy', 'updatedDt'];
  length: string='0';
  moduleDataSourceList: any = [];
  searchvalue : any = '';
  pageSize: string;
  pageIndex: string;
  direction: any;
  columnName: any;
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //LOADER
  subLoaderItemModule: boolean = false;

  @ViewChild('searchSet') searchSetFocus: ElementRef;

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  itemModule: ModelOfItemModule;

  selectedItem:any = 0;

  scrollItemModulesync : boolean = false;
  limitCount: any;
  itemModulePageNumber : number ;

  getData: getData;
  itemModuleList : any = [];
  
  constructor(private commonService: CommonService,
              private router: Router,
              private userSession: UserSessionService,
              private assetOptimaServices: AssetOptimaServices,
              private samsService: AssetOptimaServices,) {                 
                this.pageSize = '100';
                this.pageIndex = '0';
                this.itemModulePageNumber = 1;
                this.itemModule = new ModelOfItemModule();
                this.modelAccessModule=new ModuleAccessModel();
                this.getData = new getData();
              }

  ngOnInit() {

    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_MODULE'];
    this.itemModule.direction = 'asc';
    this.itemModule.columnName = 'itemModuleName';
    this.itemModulePageNumber = 1;
    this.fetchList();
  }

  // onSearchChange(searchValue : string ) { 
  //   this.itemModule.itemModuleName =  searchValue;
  //   this.pageSize = '100';
  //   this.pageIndex = '0';
  //   this.fetchList();
  // }

  searchItemModule() { 
    
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }

  clear(){
    this.itemModule=new ModelOfItemModule;
    this.ngOnInit();
    this.selectedItem = 0;
    this.itemModuleList = [];
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
    this.itemModule.pageNumber = 0;
    this.itemModule.columnName = event.active;
    this.itemModule.direction = event.direction;
    this.fetchList();
  }

  fetchList(){
    this.itemModule.pageNumber = Number(this.pageIndex);
    this.itemModule.recordsPerPage = Number(this.pageSize);
    this.moduleDataSourceList = [];
    this.subLoaderItemModule=true;
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllItemModule, this.itemModule)
    .subscribe(
      data => {
        if(data.success){
          this.subLoaderItemModule=false;
          this.length = data.responseData.dataTotalRecCount;
          this.moduleDataSourceList = data.responseData.dataList;       
        }else{
          this.subLoaderItemModule=false;
        }
      },error =>{
        this.commonService.openToastErrorMessage("Failed To Fetch List")
      }
    );
  }

  createOrEditOrViewModule(itemModuleId, mode: String) {
    this.router.navigate(['/home/settingsmaster/moduleCreate/' + itemModuleId + '/' + mode])
  }

  selectModule(element){    
    if(this.selectedItem.itemModuleId == element.itemModuleId){
      this.selectedItem = 0;
    }else{
      this.selectedItem = element;
    }
  }

  generateReportForModule(){
    this.commonService.commonListService(this.assetOptimaServices.generateModuleReport, this.itemModule).subscribe(
      (data) => {
        this.commonService.downloadDocument(data.responseData);
        this.commonService.openToastSuccessMessage('Download Successful.');
      }, error => {
        this.commonService.openToastWarningMessage('Failed To Generate Report.');
      }
    );
  }

  
  listofItemModule(searchTerms) {
    this.scrollItemModulesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfItemModuleCombo, searchTerms.term, '', '', this.limitCount, this.itemModulePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemModulePageNumber , this.itemModuleList , data.responseData.comboList)
        this.itemModulePageNumber = this.getData.pageNumber;
        this.itemModuleList = this.getData.dataList;
        this.scrollItemModulesync = false;
      }
    );
  }

  getItemModuleComboValue(event) {
    if (event === undefined) {
      this.itemModuleList = [];
      this.itemModule.itemModuleName = '';
      this.itemModule.itemModuleId = 0;

      this.itemModulePageNumber=1;
     
    } else {
      this.itemModule.itemModuleName = event.itemModuleName;
      this.itemModule.itemModuleId = event.itemModuleId;
    }
  }

}
