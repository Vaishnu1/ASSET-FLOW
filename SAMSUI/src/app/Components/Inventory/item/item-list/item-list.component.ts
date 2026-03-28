import { Component, OnInit, ViewChild } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {  MatSort} from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ItemModel } from 'src/app/Model/master/item';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';
import { ItemsHistoryComponent } from '../items-history/items-history.component';
import { ModelOfItemMaster } from 'src/app/Model/inventory/ItemMaster';
import { allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {  
  //Set PAge Title
  title = 'Asset Optima - Item'

  displayedColumns = ['select','sno', 'locationName', 'itemMasterTO.itemMasterName', 'itemMasterTO.itemMasterDesc', 'itemStatus', 'itemApprovalStatus', 'itemMasterTO.itemTypeTO.itemTypeName', 'itemMasterTO.masterUOMName', 'active', 'createdBy', 'createdDt', 'updatedBy', 'updatedDt'];
  itemMainDataSource = new MatTableDataSource<ItemListComponent>();

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public itemModel: ItemModel;
  public itemMasterModel:ModelOfItemMaster;
  searchvalue: any = '';
  subLoaderItem: boolean = false;
  mode = new FormControl('over');

  scrollItemNamesync: boolean = false;
  scrollItemTypesync:boolean = false;
  scrollItemDescriptionsync:boolean=false;

  itemActiveList = [
    { id: 1, name: 'ACTIVE' },
    { id: 2, name: 'INACTIVE' }
  ];

  limitCount: any;
  itemPageNumber: number;
  itemTypePageNumber: number;
  itemDescPageNumber:number;

  locationCombo: any = [];
  locationPageNumber: number;
  scrollsyncLocation: boolean = false;

  itemCombo: any = [];
  itemTypeCombo: any = [];
  itemDescCombo:any=[];
  itemStatusCombo:any=[
    {id:1, itemStatusLabel:"APPROVED",itemStatusValue:"MATCHED"},
    {id:2, itemStatusLabel:"UNAPPROVED",itemStatusValue:"UNMATCHED"}
  ];

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  scrollStoreNamesync:boolean =false;
  storePageNumber :number=0;
  storeList:any=[];

  getData: getData;

  enableActionBtn: boolean = true;
  selectAllItem: boolean = false;

  constructor(private router: Router,
    private dialog: MatDialog,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private userSession: UserSessionService,
    private titleService: Title) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.itemPageNumber = 1;
    this.itemModel = new ItemModel();
    this.itemMasterModel = new ModelOfItemMaster();
    this.modelAccessModule = new ModuleAccessModel();
    this.itemDescPageNumber=1;
    this.itemTypePageNumber=1;
    this.storePageNumber = 1;
    this.locationPageNumber = 1;
    this.getData = new getData();
  }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ITEM'];
    this.itemModel.direction = 'desc';
    this.itemModel.columnName = 'updatedDt';
    this.itemModel.activeDisplay = 'ACTIVE';
    this.itemModel.active = true;
    this.itemDescPageNumber=1;
    this.itemTypePageNumber=1;
    this.itemPageNumber = 1;
    this.locationPageNumber = 1;
    this.itemDescCombo=[];
    this.itemTypeCombo=[];
    this.locationCombo=[];
    this.itemCombo=[];
    this.selectedItemList = [];
    this.enableActionBtn = true;
    this.titleService.setTitle(this.title);
    this.fetchListofItem();
  }

  createItem(mode?: String) {
    if (mode === 'create') {
      this.router.navigate(['home/inventory/itemCreate/'+ 0 + '/' + mode]);
    }else{
      this.router.navigate(['home/inventory/itemCreate/'+ this.selectedItemList[0].itemLocId +'/'+mode]);
    }
  }

  fetchListofItem() {
    this.subLoaderItem = true;
    this.itemMainDataSource.data = [];
    this.itemModel.pageNumber = Number(this.pageIndex);
    this.itemModel.recordsPerPage = Number(this.pageSize);
    
    this.itemModel.itemMasterTO = this.itemMasterModel;  

    this.commonService.commonListService(this.assetOptimaServices.listOfItem, this.itemModel).subscribe(
      data => {
        if (data.success) {
          this.length = data.responseData.dataTotalRecCount;
          this.itemMainDataSource.data = data.responseData.dataList;
          this.subLoaderItem = false;
        } else {
          this.subLoaderItem = false;
        }
      }
    );
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofItem();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.itemModel.pageNumber = 0;
    this.itemModel.columnName = event.active;
    this.itemModel.direction = event.direction;
    this.fetchListofItem();
  }

  listOfItem(searchTerms) {
    let locationId;
    if (this.itemModel.locationId > 0) {
      locationId = this.itemModel.locationId;
    }
    let itemTypeId;
    if (this.itemModel.itemMasterTO.itemTypeId > 0) {
      itemTypeId = this.itemModel.itemMasterTO.itemTypeId;
    }
    this.scrollItemNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllItemCombo, searchTerms.term, locationId, itemTypeId, this.limitCount, this.itemPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemPageNumber , this.itemCombo , data.responseData.comboList)
        this.itemPageNumber = this.getData.pageNumber;
        this.itemCombo = this.getData.dataList;
        this.scrollItemNamesync = false;
      }
    );
  }


  selectedItemName(event) {    
    if (event === undefined) {
      this.itemMasterModel.itemMasterName = null;
      this.itemMasterModel.itemMasterId = 0;
      this.itemPageNumber = 1;
      this.itemCombo = [];
    } else {
      this.itemMasterModel.itemMasterName = event.itemMasterName;
      this.itemMasterModel.itemMasterId = event.itemMasterId;      
    }
    this.selecetedItemDesc(undefined);
  }

  listofItemType(searchTerms) {
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
      this.itemMasterModel.itemTypeName=null;
      this.itemMasterModel.itemTypeId=0;
      this.itemTypePageNumber=1;
      this.itemTypeCombo=[];
    }else{
      this.itemMasterModel.itemTypeName=event.itemTypeName;
      this.itemMasterModel.itemTypeId=event.itemTypeId;
    }
    this.selectedItemName(undefined)
  }

  clear(){
    this.itemModel=new ItemModel;
    this.itemMasterModel=new ModelOfItemMaster;    
    this.ngOnInit();
  }

  searchItem(){
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListofItem();
  }


  listOfItemDescription(searchTerms) {
    let itemMasterId;
    if (this.itemMasterModel.itemMasterId > 0) {
      itemMasterId = this.itemMasterModel.itemMasterId;
    }
    let locationId;
    if (this.itemModel.locationId > 0) {
      locationId = this.itemModel.locationId;
    }
    this.scrollItemDescriptionsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfItemDescCombo, searchTerms.term, itemMasterId, locationId, this.limitCount, this.itemDescPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemDescPageNumber , this.itemDescCombo , data.responseData.comboList)
        this.itemDescPageNumber = this.getData.pageNumber;
        this.itemDescCombo = this.getData.dataList;
        this.scrollItemDescriptionsync = false;
      }
    );
  }

  selecetedItemDesc(event){    
    if(event===undefined){
      this.itemMasterModel.itemMasterDesc=null;
      this.itemDescPageNumber=1;
      this.itemDescCombo=[];
    }else{
      this.itemMasterModel.itemMasterDesc=event.itemMasterDesc;
    }
  }

  generateReportForItem() {
    this.itemModel.recordsPerPage = 0;
    this.commonService.commonListService('generateItemReport.sams', this.itemModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
      }
    );
  }

  selectItemStatus(event) {

  }

  listOfStore(searchTerms){ 
    this.scrollStoreNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllStoreCombo.sams', searchTerms.term, '', '', this.limitCount, this.storePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.storePageNumber , this.storeList , data.responseData.comboList)
        this.storePageNumber = this.getData.pageNumber;
        this.storeList = this.getData.dataList;
        this.scrollStoreNamesync = false;
      }
    ); 
  }

  getStoreValue(event){
    if(event != undefined){
      this.itemModel.storeId=event.storeId;
      this.itemModel.storeName=event.storeName;
    }else{
      this.itemModel.storeId=0;
      this.itemModel.storeName=null;
    }
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
      this.limitCount, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsyncLocation = false;
        }
      );
  }

  selectedLocationData(event) {    
    if (event === undefined) {
      this.itemModel.locationName = null;
      this.itemModel.locationId = 0;
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.itemModel.locationName = event.locDisplayField;
      this.itemModel.locationId = event.locationId;
    }
    this.selecetedItemDesc(undefined);
    this.selectedItemName(undefined);
  }

  itemHistroryPopUp;
  getHistory() {    
    this.itemHistroryPopUp = this.dialog.open(ItemsHistoryComponent, {
      height: '480px',
      width: '90%',
      data: { 'itemId': this.selectedItemList[0].itemLocId }
    });
  this.itemHistroryPopUp.disableClose = true;
    this.itemHistroryPopUp.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  selectedItemList = [];
  selectItemForApproval(element){
    const itemLocId = this.selectedItemList.findIndex(data => data.itemLocId === element.itemLocId);    

      this.enableActionBtn = false;
      if(itemLocId === -1){
        this.selectedItemList.push(element);  
      }else{ 
        this.selectedItemList.splice(itemLocId,1);   
      }
  
      if(this.selectedItemList.length === 1){
        this.enableActionBtn = false;
      }
      else{
        this.enableActionBtn = true;
      }
  }

  compareValue(element: any): boolean{ 
    if(this.selectedItemList.length > 0){
      return this.selectedItemList.findIndex(data => data.itemLocId === element.itemLocId) !== -1;
    }
    else{
      return false;
    }
  }

  checkApprovalValid(){
    if(this.selectedItemList.length>0){
      return !(this.selectedItemList.findIndex(data => data.itemStatus !== "UNMATCHED" || data.approvalId == 0) === -1);
    }
    else
      return true;
  }

  selectAllItems(event){
    this.selectAllItem = event.checked;
    this.enableActionBtn = false;

    if(event.checked){
      this.selectedItemList = this.itemMainDataSource.data;
    }
    else{
      this.selectedItemList = [];
    }

    if(this.selectedItemList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  itemWorkflowApproval(status){    
    let result;
    if(status){
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.ITEM_APPROVAL], this.selectedItemList,"");
    }
    else{
      result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.ITEM_APPROVAL],this.selectedItemList,"");
    }

    result.then(data=>{
      if(data){        
         this.ngOnInit();
      }
    })
  }

  selectedItemActiveList(event){
    if(event != undefined){
      if(event.id==1){
        this.itemModel.activeDisplay = event.name;
        this.itemModel.active = true;
      }else if(event.id==2){
        this.itemModel.activeDisplay = event.name;
        this.itemModel.active = false;
      }
    }else{
      this.itemModel.active = false;
    }
  }

}
