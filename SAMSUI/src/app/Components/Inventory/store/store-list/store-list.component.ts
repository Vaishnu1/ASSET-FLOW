import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import {  MatDialog} from '@angular/material/dialog';
import { StoreModel } from 'src/app/Model/master/store';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { StoreCreateComponent } from '../store-create/store-create.component';
import { StoreDialogCreateComponent } from '../store-dialog-create/store-dialog-create.component';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {
  displayedColumns= ['sno', 'select', 'storeName', 'locationName', 'storeTypeTO.storeTypeName', 'storeDescription', 'blockName', 'floorName', 'segmentName', 'roomName', 'defaultStore' ];
  displayedColumnsLoc= ['sNo', 'locationName'];

  storeMainDataSource = new MatTableDataSource<StoreListComponent>();
  
  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchField') searchFieldSet: ElementRef;

  public store: StoreModel;

  //FOR VIEW
  viewData : any;
  viewDataLocation: any;
  subLoaderStore: boolean = false;

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  selectedItem: any = 0;

  constructor(private router: Router,
              private dialog: MatDialog,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private userSession: UserSessionService) {
                this.pageSize = '100';
                this.pageIndex = '0';
                this.store = new StoreModel();
                this.modelAccessModule = new ModuleAccessModel();
               }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_STORE'];
    this.store.direction = 'desc';
    this.store.columnName = 'updatedDt';
    this.fetchListOfStore();
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.searchFieldSet);
  }

  createStore(storeId){
    this.router.navigate(['home/storeCreate/'+storeId]);
  }

  onSearchChange(searchValue : string ) {  
    this.store.storeName = searchValue;
    this.pageSize='100';
    this.pageIndex='0';
    this.fetchListOfStore();
  }

  fetchListOfStore(){
    this.subLoaderStore = true;
    this.storeMainDataSource = null;
    this.store.pageNumber = Number(this.pageIndex);
    this.store.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService('fetchListOfAllStore.sams',this.store).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.storeMainDataSource = data.responseData.dataList;
           this.subLoaderStore = false;
        }else{
          this.subLoaderStore = false;
        }

      }
    );
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListOfStore();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.store.pageNumber = 0;
    this.store.columnName = event.active;
    this.store.direction = event.direction;
    this.fetchListOfStore();
  }

    //VIEW Page
    openViewdialog(dialogView, element){
      this.viewData = element;
      this.viewDataLocation=element.storeLocDtl;
      this.dialog.open(dialogView);
  }

  cancel(){

  }

  storeDialog;
  createOrEditOrViewStore(element, mode:String) {
    this.storeDialog = this.dialog.open( StoreDialogCreateComponent, {
      height: 'auto',
      width: '750px',
      data: {
        'storeModel': element,
        'mode' : mode
      }
    });
    this.storeDialog.disableClose = true;
    this.storeDialog.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });

  }

  selectStore(element){
    if(this.selectedItem.storeId == element.storeId){
      this.selectedItem = 0;
    }else{
      this.selectedItem = element;
    }
  }

}
