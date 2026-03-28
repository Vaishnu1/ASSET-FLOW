import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Router } from '@angular/router';
import { ModelOfItemMaster } from 'src/app/Model/inventory/ItemMaster';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { MatDialog } from '@angular/material/dialog';
import { ItemBranchMappingComponent } from '../item-branch-mapping/item-branch-mapping.component';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-item-master-list',
  templateUrl: './item-master-list.component.html',
  styleUrls: ['./item-master-list.component.css']
})
export class ItemMasterListComponent implements OnInit {
  displayedColumns = ['select', 'sno', 'itemMasterName', 'itemDesc', 'itemTypeTO.itemTypeName', 'masterUOMName', 'active', 'updatedBy', 'updatedDt'];
  length: string='0';
  itemMasterDataSourceList: any = [];
  searchvalue : any = '';
  itemType: any;
  pageSize: string;
  pageIndex: string;
  direction: any;
  columnName: any;
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;

  //LOADER
  subLoaderItemMaster: boolean = false;

  @ViewChild('searchSet') searchSetFocus: ElementRef;

  //PERMISSIONS 
  modelAccessItemMaster: ModuleAccessModel;

  itemMaster: ModelOfItemMaster;

  selectedItem:any = 0;
  enableActionBtn: boolean;
  selectedItemList: any[];
  selectAllItem: boolean = false;;


  scrollItemMasterNameSync: boolean = false;
  scrollItemMasterDescSync: boolean = false;
  scrollItemTypesync: boolean = false;
  scrollUomSync: boolean = false;

  limitCount: any;

  itemMasterNamePageNumber: number;
  itemMasterDescPageNumber: number;
  itemTypePageNumber: number;
  uomPageNumber: number;

  itemMasterNameCombo: any = [];
  itemMasterDescCombo: any = [];
  itemTypeCombo: any = [];
  UOMCombo: any = [];

  getData: getData;

  itemActiveList = [
    { id: 1, name: 'ACTIVE' },
    { id: 2, name: 'INACTIVE' }
  ];

  purchasableStockableItemList = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' }
  ];

  
  constructor(private commonService: CommonService,
              private dialog: MatDialog,
              private router: Router,
              private assetOptimaServices: AssetOptimaServices,
              private userSession: UserSessionService) {                 
                this.pageSize = '100';
                this.pageIndex = '0';
                this.itemMaster = new ModelOfItemMaster();
                this.modelAccessItemMaster=new ModuleAccessModel();
                this.itemMasterNamePageNumber = 1;
                this.itemMasterDescPageNumber = 1;
                this.itemTypePageNumber = 1;
                this.uomPageNumber = 1;
              }


  ngOnInit() {
    this.selectAllItem = false;
    this.modelAccessItemMaster = this.userSession.getUserGroupAccess()['GROUPACCESS_ITEM_MASTER'];
    this.itemMaster.direction = 'asc';
    this.itemMaster.columnName = 'itemMasterName';
    this.itemMaster.activeDisplay = 'ACTIVE';
    this.itemMaster.active = true;
    this.enableActionBtn = true;
    this.selectedItemList=[];
    this.itemMasterNamePageNumber = 1;
    this.itemMasterDescPageNumber = 1;
    this.itemTypePageNumber = 1;
    this.uomPageNumber = 1;
    this.itemMasterNameCombo = [];
    this.itemMasterDescCombo = [];
    this.itemTypeCombo = [];
    this.UOMCombo = [];
    this.fetchList();
  }

  onSearchChange(searchValue : string ) { 
    this.itemMaster.itemMasterName =  searchValue;
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
    this.itemMaster.pageNumber = 0;
    this.itemMaster.columnName = event.active;
    this.itemMaster.direction = event.direction;
    this.fetchList();
  }

  fetchList(){
    this.itemMaster.pageNumber = Number(this.pageIndex);
    this.itemMaster.recordsPerPage = Number(this.pageSize);
    this.itemMasterDataSourceList = [];
    this.subLoaderItemMaster=true;    
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllItemMaster, this.itemMaster)
    .subscribe(
      data => {
        if(data.success){
          this.subLoaderItemMaster=false;
          this.length = data.responseData.dataTotalRecCount;
          this.itemMasterDataSourceList = data.responseData.dataList;       
        }else{
          this.subLoaderItemMaster=false;
        }
      },error =>{
        this.commonService.openToastErrorMessage("Failed To Fetch List")
      }
    );
  }

  createOrEditOrViewItemMaster(itemMasterId, mode: String) {
    this.router.navigate(['home/settingsmaster/itemMasterCreate/' + itemMasterId + '/' + mode])
  }

  itemBrachMapping() {
    let itemIdList =[]
    for(let i=0; i<= this.selectedItemList.length-1 ; i++){
      itemIdList.push(this.selectedItemList[i].itemMasterId);
    }

    let dialogRef = this.dialog.open(ItemBranchMappingComponent, {
      height: '80%',
      width: '50%',
      data: {
        'itemIdList':itemIdList
      }
    });
     dialogRef.disableClose = true;
     dialogRef.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  
  selectItemMaster(element){

    const itemMasterId = this.selectedItemList.findIndex(data => data.itemMasterId === element.itemMasterId);

    this.enableActionBtn = false;
    if(itemMasterId === -1){
      this.selectedItemList.push(element);
    }else{
      this.selectedItemList.splice(itemMasterId,1);
    }

    if(this.selectedItemList.length === 1){
      this.enableActionBtn = false;
    }else{
      this.enableActionBtn = true;
    }

  }

  selectAllItems(event){
    this.selectAllItem = event.checked;
    this.enableActionBtn = false;

    if(event.checked){
      this.selectedItemList = this.itemMasterDataSourceList;
    }
    else{
      this.selectedItemList = [];
    }

    if(this.selectedItemList.length === 1){
      this.enableActionBtn = false;
    }else{
      this.enableActionBtn = true;
    }
  }

  checkApprovalValid(){
    if(this.selectedItemList.length > 0 && this.checkSelectedItemActive()){
      return false
    }else
      return true;
  }

  checkSelectedItemActive(){
    for (let index = 0; index < this.selectedItemList.length; index++) {
      const element = this.selectedItemList[index];
      if(element.active == false){
        return false;
      }
    }
    return true;
  }

  compareValue(element: any): boolean{
    return this.selectedItemList.findIndex(data => data.itemMasterId === element.itemMasterId) !== -1;
  }

  searchItemMaster(){
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
    this.selectedItem = 0;
  }

  clear(){
    this.itemMaster=new ModelOfItemMaster;
    this.ngOnInit();
    this.selectedItem = 0;
  }

  generateReportForItemMaster(){
    // this.itemMaster.recordsPerPage = 0;
    this.commonService.commonListService(this.assetOptimaServices.generateItemMasterReport, this.itemMaster).subscribe(
      (data) => {
        this.commonService.downloadDocument(data.responseData);
        this.commonService.openToastSuccessMessage('Download Successful.');
      }, error => {
        this.commonService.openToastWarningMessage('Failed To Generate Report.');
      }
    );
  }

  listOfItemMaster(searchTerms) {
    let itemTypeId=0;
    if(this.itemMaster.itemTypeId > 0){
      itemTypeId = this.itemMaster.itemTypeId;
    }    
    this.scrollItemMasterNameSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';    
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemMasterNameCombo, searchTerms.term, itemTypeId, '', this.limitCount, this.itemMasterNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemMasterNamePageNumber , this.itemMasterNameCombo , data.responseData.comboList)        
        this.itemMasterNamePageNumber = this.getData.pageNumber;
        this.itemMasterNameCombo = this.getData.dataList;
        this.scrollItemMasterNameSync = false;
      }
    );
  }

  selectedItemMasterName(event){
    if (event === undefined) {
      this.itemMaster.itemMasterName = null;
      this.itemMaster.itemMasterId = 0;
      this.itemMasterNamePageNumber = 1;
      this.itemMasterNameCombo = [];
    } else {
      this.itemMaster.itemMasterName = event.itemMasterName;
      this.itemMaster.itemMasterId = event.itemMasterId;
    }
    this.selecetedItemMasterDesc(undefined);
  }

  listOfItemMasterDescription(searchTerms){
    let itemMasterId=0;
    if(this.itemMaster.itemMasterId > 0){
      itemMasterId = this.itemMaster.itemMasterId;
    }
    let itemTypeId=0;
    if(this.itemMaster.itemTypeId > 0){
      itemTypeId = this.itemMaster.itemTypeId;
    }   
    this.scrollItemMasterDescSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : ''; 
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemMasterDescCombo, searchTerms.term, itemMasterId, itemTypeId, this.limitCount, this.itemMasterDescPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemMasterDescPageNumber , this.itemMasterDescCombo , data.responseData.comboList)
        this.itemMasterDescPageNumber = this.getData.pageNumber;
        this.itemMasterDescCombo = this.getData.dataList;
        this.scrollItemMasterDescSync = false;
      }
    );
  }

  selecetedItemMasterDesc(event){
    if (event === undefined) {
      this.itemMaster.itemMasterDesc = null;
      this.itemMasterDescPageNumber = 1;
      this.itemMasterDescCombo = [];
    } else {
      this.itemMaster.itemMasterDesc = event.itemMasterDesc;
    }
  }

  listofItemType(searchTerms){
    this.scrollItemTypesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemTypeCombo, searchTerms.term, '', '', this.limitCount, this.itemTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemTypePageNumber , this.itemTypeCombo , data.responseData.comboList)
        this.itemTypePageNumber = this.getData.pageNumber;
        this.itemTypeCombo = this.getData.dataList;
        this.scrollItemTypesync = false;
      }
    );
  }

  selectedItemType(event){
    if(event===undefined){
      this.itemMaster.itemTypeName=null;
      this.itemMaster.itemTypeId=0;
      this.itemTypePageNumber=1;
      this.itemTypeCombo=[];
    }else{
      this.itemMaster.itemTypeName=event.itemTypeName;
      this.itemMaster.itemTypeId=event.itemTypeId;
    }
    this.selectedItemMasterName(undefined);
  }

  listOfUOM(searchTerms){
    this.scrollUomSync = true;
    this.limitCount = (!(this.commonService.fetchSearchValue(searchTerms))) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfUOMCombo, searchTerms.term, '', '', this.limitCount, this.uomPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.uomPageNumber , this.UOMCombo , data.responseData.comboList)        
        this.uomPageNumber = this.getData.pageNumber;
        this.UOMCombo = this.getData.dataList;        
        this.scrollUomSync = false;
      }
    );
  }

  selectedUOM(event){
    if(event===undefined){
      this.itemMaster.masterUOMId=0;
      this.itemMaster.masterUOMName=null;
      this.uomPageNumber=1;
      this.UOMCombo=[];
    }else{
      this.itemMaster.masterUOMId=event.uomId;
      this.itemMaster.masterUOMName=event.uomCode;
    }
  }

  selectedItemActiveList(event){
    if(event != undefined){
      if(event.id==1){
        this.itemMaster.activeDisplay = event.name;
        this.itemMaster.active = true;
      }else if(event.id==2){
        this.itemMaster.activeDisplay = event.name;
        this.itemMaster.active = false;
      }
    }else{
      this.itemMaster.active = false;
    }
  }

  selectedPurchasableItemList(event){
    if(event != undefined){
      if(event.id==1){
        this.itemMaster.purchasableDisplay = 'Yes';
        this.itemMaster.purchasable = true;
      }else if(event.id==2){
        this.itemMaster.purchasableDisplay = 'No';
        this.itemMaster.purchasable = false;
      }
    }else{
      this.itemMaster.purchasable = false;
    }

  }

  selectedStockableItemList(event){    
    if(event != undefined){
      if(event.id==1){
        this.itemMaster.stockableDisplay = 'Yes';
        this.itemMaster.stockable = true;
      }else if(event.id==2){
        this.itemMaster.stockableDisplay = 'No';
        this.itemMaster.stockable = false;
      }
    }else{
      this.itemMaster.stockable = false;
    }
  }
 
}
