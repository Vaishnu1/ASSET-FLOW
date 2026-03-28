import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { DeviceCodeDialogComponent } from '../device-code-create/device-code-create.component';
import { Router } from '@angular/router';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { DeviceCodeModel } from 'src/app/Model/master/DeviceCode';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-device-code',
  templateUrl: './device-code-list.component.html',
  styleUrls: ['./device-code-list.component.css']
})
export class DeviceCodeComponent implements OnInit {
  displayedColumns = ['sno', 'deviceCode', 'deviceConcept'];
  listOfDeviceCode = new MatTableDataSource<DeviceCodeComponent>();
  
  searchvalue : any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;
  subLoaderAssetType: boolean = false;
  pageIndex: String;
  length: String = '0';
  pageSize: String;
  deviceCodeModel: DeviceCodeModel;

  @ViewChild('searchSet') searchSetFocus: ElementRef;

     //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  selectedItem: any = 0;

  constructor(private dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private assetOptimaServices:AssetOptimaServices,
    private userSession: UserSessionService) { 
    this.modelAccessModule=new ModuleAccessModel();
    this.deviceCodeModel = new DeviceCodeModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.deviceCodeModel.columnName = 'updatedDt';
    this.deviceCodeModel.direction = 'desc';
  }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_DEVICE_CODE'];
    this.pageIndex = '0';
    this.pageSize = '100';
    this.deviceCodeModel.columnName = 'updatedDt';
    this.deviceCodeModel.direction = 'desc';
    this.selectedItem = 0;
    this.fetchList();
  }

  deviceCodeDialog;
  openToCreateDeviceCode(element, mode) {
    this.deviceCodeDialog = this.dialog.open(DeviceCodeDialogComponent, {
      height: 'auto',
      width: '900px',
      data: {
        'deviceCodeModel': element,
        'mode': mode
      }
    });
    this.deviceCodeDialog.disableClose = true;
    this.deviceCodeDialog.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
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
  this.deviceCodeModel.pageNumber = 0;
  this.deviceCodeModel.columnName = event.active;
  this.deviceCodeModel.direction = event.direction;
  this.fetchList();
  }

  onSearchChange(searchValue : string ) {  
    this.deviceCodeModel.deviceCode = searchValue;
    this.pageSize= '100';
    this.pageIndex='0';
    this.fetchList();
  }

  fetchList(){
  this.subLoaderAssetType = true;
  this.listOfDeviceCode = null;
  this.deviceCodeModel.pageNumber = Number(this.pageIndex);
  this.deviceCodeModel.recordsPerPage = Number(this.pageSize);
  this.commonService.commonListService(this.assetOptimaServices.fetchListOfDeviceCode,this.deviceCodeModel).subscribe(
    data => {
      if(data.success){
         this.length = data.responseData.dataTotalRecCount;
         this.listOfDeviceCode = data.responseData.dataList;       
         this.subLoaderAssetType = false;
      }else{
        this.subLoaderAssetType = false;
      }
    }
  );
 
 }

 selectDeviceCode(element){
  if(this.selectedItem.deviceCodeId == element.deviceCodeId){
    this.selectedItem = 0;
  }
  else{
    this.selectedItem = element;
  }
}
}
