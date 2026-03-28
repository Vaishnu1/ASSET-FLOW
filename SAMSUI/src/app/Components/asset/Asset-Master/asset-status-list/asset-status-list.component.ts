import {Component, OnInit, TemplateRef, ViewChild, ElementRef} from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import {  MatTableDataSource } from '@angular/material/table';
import {  MatSort } from '@angular/material/sort';import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AssetStatusModel } from 'src/app/Model/master/asset-status';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetstatusCreateComponent } from '../assetstatus-create/assetstatus-create.component';



@Component({
  selector: 'app-asset-status-list',
  templateUrl: './asset-status-list.component.html',
  styleUrls: ['./asset-status-list.component.css']
})
export class AssetStatusListComponent implements OnInit {
  displayedColumns = ['sno', 'assetStatusName','updatedBy','updatedDt','createdBy', 'createdDt','action'];
  assetStatusdataSource = new MatTableDataSource<AssetStatusListComponent>(); ;
  searchvalue : any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;
  public AssetStatusModel : AssetStatusModel;
  subLoaderAssetStatus : boolean = false;

  @ViewChild('searchSet') searchCategorySet: ElementRef;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  constructor(private dialog: MatDialog, private router: Router,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSession: UserSessionService) {
              this.AssetStatusModel = new AssetStatusModel();
              this.pageSize = '100';
              this.modelAccessModule=new ModuleAccessModel();
              this.pageIndex = '0';
              }

 ngOnInit() {
  // this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_STATUS'];
   this.AssetStatusModel.direction = 'desc';
   this.AssetStatusModel.columnName = 'updatedDt';
   this.pageSize = '100';
   this.pageIndex = '0';
   this.fetchList();
 }

 ngAfterViewInit() {
  this.searchCategorySet.nativeElement.focus();
  }

 onSearchChange(searchValue : string ) {  
   this.AssetStatusModel.assetStatusName = searchValue;
   this.pageSize = '100';
   this.pageIndex = '0';
   this.fetchList();
 }
 dialogRef;
 openAssetStatusDialog(element) {
  this.dialogRef = this.dialog.open(AssetstatusCreateComponent, {
     height: 'auto',
     width: '500px',
     data: {
       'AssetStatusModel' : element
     }
   });
   this.dialogRef.disableClose = true;
   this.dialogRef.afterClosed().subscribe(
     data => {
         this.ngOnInit();
     });
 }

 ngOnDestroy() {
  if(this.dialogRef!=null){
    this.dialogRef.close();
  }
}

  fetchList(){
  this.subLoaderAssetStatus = true;
  this.assetStatusdataSource = null;
  this.AssetStatusModel.pageNumber = Number(this.pageIndex);
  this.AssetStatusModel.recordsPerPage = Number(this.pageSize);
  this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllAssetStatus,this.AssetStatusModel).subscribe(
    data => {
      if(data.success){
          this.length = data.responseData.dataTotalRecCount;
          this.assetStatusdataSource = data.responseData.dataList;   
          this.subLoaderAssetStatus = false;    
          }else{
            this.subLoaderAssetStatus = false;
          }
    });
  }

  nextPage(pageNuber: number) {}

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
    this.AssetStatusModel.pageNumber = 0;
    this.AssetStatusModel.columnName = event.active;
    this.AssetStatusModel.direction = event.direction;
    this.fetchList();
  }
}
