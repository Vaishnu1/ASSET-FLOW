import {Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import {  MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ItemTypeCreateComponent } from 'src/app/Components/settings/Organization/item-master-organization/item-type-create/item-type-create.component';
import { ItemTypeModel } from 'src/app/Model/master/item-type';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Title } from '@angular/platform-browser';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-item-type',
  templateUrl: './item-type.component.html',
  styleUrls: ['./item-type.component.css']
})
export class ItemTypeComponent implements OnInit {
  //Set PAge Title
  title = 'Asset Optima - Inventory Master'
  Active_Tab = 'item_type';
  displayedColumns = ['select', 'sno', 'itemTypeName','itemCategoryName', 'updatedBy','updatedDt'];
  length: string='0';
  ItemTypedataSource: any;
  searchvalue : any = '';
  itemType: any;
  pageSize: string;
  pageIndex: string;
  direction: any;
  columnName: any;
  public ItemTypeModel: ItemTypeModel;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //LOADER
  subLoaderItemType: boolean = false;

  @ViewChild('searchSet') searchSetFocus: ElementRef;

    //PERMISSIONS 
    modelAccessModule: ModuleAccessModel;

  selectedItem:any = 0;

  scrollItemTypesync: boolean = false;
  limitCount: any;
  itemTypePageNumber: number;

  getData: getData;

  itemTypeCombo: any = [];
  
  constructor(private dialog: MatDialog,
              private commonService: CommonService,
              private samsService: AssetOptimaServices,
              private titleService: Title,
              private userSession: UserSessionService,
              private assetOptimaServices: AssetOptimaServices,) {                 
                this.pageSize = '100';
                this.pageIndex = '0';
                this.ItemTypeModel = new ItemTypeModel();
                this.modelAccessModule=new ModuleAccessModel();
                this.itemTypePageNumber = 1;
              }

  ngOnInit() {
    this.routerLinkActiveTab();
    this.selectedItem = 0;
    this.itemTypePageNumber = 1;
    this.itemTypeCombo = [];

    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ITEM_TYPE'];
    this.ItemTypeModel.direction = 'asc';
    this.ItemTypeModel.columnName = 'itemTypeName';
    this.pageSize = '100';
    this.pageIndex = '0';
    this.titleService.setTitle(this.title);
    this.fetchList();
  }

  ngAfterViewInit(){
    this.searchSetFocus.nativeElement.focus();
  }

    searchItemType() { 
    // this.ItemTypeModel.itemTypeName =  searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }

  routerLinkActiveTab(){
    if(localStorage.getItem('previousRoute')!= null){      
      if(localStorage.getItem('previousRoute').startsWith('/home/inventory/itemMasterCreate')){
        this.Active_Tab_Change('item_master_list');
        localStorage.setItem('previousRoute','');
      }else if(localStorage.getItem('previousRoute').startsWith('/home/inventory/moduleCreate')){
        this.Active_Tab_Change('module_list');
        localStorage.setItem('previousRoute','');
      }
    }
  }
  
  Active_Tab_Change(name) {
    this.Active_Tab = name; 
  }

  itemTypeModel;
  
  openItemTypeCreate(mode,itemTypeModel) {
    this.itemTypeModel = this.dialog.open(ItemTypeCreateComponent, {
      height: 'auto',
      width: '450px',
      data:{
        'mode':mode,
        'itemType' : itemTypeModel
      }
    });
    this.itemTypeModel.disableClose = true;
    this.itemTypeModel.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  ngOnDestroy() {
   if(this.itemTypeModel!=null){
      this.itemTypeModel.close();
   }
  }

  nextPage(pageNuber: number) {

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
  
  fetchList(){
    this.ItemTypeModel.pageNumber = Number(this.pageIndex);
    this.ItemTypeModel.recordsPerPage = Number(this.pageSize);
    this.ItemTypedataSource=[];
    this.subLoaderItemType=true;
    this.commonService.commonListService(this.samsService.listOfAllItemType,this.ItemTypeModel).subscribe(
      data => {
        if(data.success){
             this.subLoaderItemType=false;
             this.length = data.responseData.dataTotalRecCount;
             this.ItemTypedataSource = data.responseData.dataList;       
           }else{
             this.subLoaderItemType=false;
           }
      },error =>{
            this.subLoaderItemType=false;
       }
  
    );
   }
   
  
  customSort(event) {
    this.ItemTypeModel.pageNumber = 0;
    this.ItemTypeModel.columnName = event.active;
    this.ItemTypeModel.direction = event.direction;
    this.fetchList();
  }

  cancel() {
    this.dialog.closeAll();
  }

  selectItemType(element){
    if(this.selectedItem.itemTypeId == element.itemTypeId){
      this.selectedItem = 0;
    }else{
      this.selectedItem = element;
    }
  }

  generateReportForItemType(){
    this.commonService.commonListService(this.samsService.generateItemTypeReport, this.ItemTypeModel).subscribe(
      (data) => {
        this.commonService.downloadDocument(data.responseData);
        this.commonService.openToastSuccessMessage('Download Successful.');
      }, error => {
        this.commonService.openToastWarningMessage('Failed To Generate Report.');
      }
    );
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
      this.ItemTypeModel.itemTypeName=null;
      this.ItemTypeModel.itemTypeId=0;
      this.itemTypePageNumber=1;
      this.itemTypeCombo=[];
    }else{
      this.ItemTypeModel.itemTypeName=event.itemTypeName;
      this.ItemTypeModel.itemTypeId=event.itemTypeId;
    }
    
  }

  clear(){
    this.ItemTypeModel=new ItemTypeModel;
    this.ngOnInit();
    this.selectedItem = 0;
  }

}
