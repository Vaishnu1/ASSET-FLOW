import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import {  MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { ParameterTypeModel } from 'src/app/Model/master/parameterType';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ParameterTypeCreateComponent } from '../parameter-type-create/parameter-type-create.component';

@Component({
  selector: 'app-parameter-type-list',
  templateUrl: './parameter-type-list.component.html',
  styleUrls: ['./parameter-type-list.component.css']
})
export class ParameterTypeListComponent implements OnInit {
  displayedColumns = ['select', 'sno', 'parameterTypeName', 'updatedBy','updatedDt'];
  parameterTypedataSource = [];

  searchvalue : any = '';
  subLoaderParameterType: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;

  public ParameterTypeModel : ParameterTypeModel;

  @ViewChild('searchSet') searchFocusSet : ElementRef;

    //PERMISSIONS
    modelAccessModule: ModuleAccessModel;


   //For Pagination
   length: String = '0';     //set total record count here
   pageIndex: String;  //set page number starts with zeroo
   pageSizeParameterType: String;   // records per page
  selectedItem: any=0;

  constructor(private dialog: MatDialog,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private userSession: UserSessionService) {
        this.ParameterTypeModel = new ParameterTypeModel();
        this.pageSizeParameterType = '100';
        this.pageIndex = '0';
        this.modelAccessModule=new ModuleAccessModel();
               }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_PARAMETER_TYPE'];
    this.ParameterTypeModel.direction = 'asc';
    this.ParameterTypeModel.columnName = 'parameterTypeName';
    this.pageIndex='0';
    this.fetchParameterTypeList();
  }

  ngAfterViewInit() {
    this.searchFocusSet.nativeElement.focus();
  }

  onSearchChange(searchValue : string ) {
    this.ParameterTypeModel.parameterTypeName = searchValue;
    this.pageSizeParameterType = '100';
    this.pageIndex = '0';
    this.fetchParameterTypeList();
  }
  dialogRef;
  openParameterTypeCreate(element, mode) {
    this.dialogRef = this.dialog.open(ParameterTypeCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'ParameterTypeModel' : element,
        'mode' : mode
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
          this.ngOnInit();
      });
  }

  // ngOnDestroy() {
  //   if(this.dialogRef!==null){
  //       this.dialogRef.close();
  //   }
  // }

  fetchParameterTypeList(){
  this.ParameterTypeModel.pageNumber = Number(this.pageIndex);
  this.ParameterTypeModel.recordsPerPage = Number(this.pageSizeParameterType);
  this.parameterTypedataSource=[];
  this.subLoaderParameterType = true;
  this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllParameterType,this.ParameterTypeModel).subscribe(
    data => {
      if(data.success) {
        this.subLoaderParameterType = false;
         this.length = data.responseData.dataTotalRecCount;
         this.parameterTypedataSource = data.responseData.dataList;
         } else {
           this.subLoaderParameterType = false;
         }
    }, error => {
      this.subLoaderParameterType = false;
    }

  );
 }


getServerData(event) {
  this.pageSizeParameterType = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.fetchParameterTypeList();
}
getIndexValue(index: number): number {
  index = Number(this.pageSizeParameterType) * Number(this.pageIndex) + index;
  return index;
}

customSort(event) {
  this.ParameterTypeModel.pageNumber = 0;
  this.ParameterTypeModel.columnName = event.active;
  this.ParameterTypeModel.direction = event.direction;
  this.fetchParameterTypeList();
}

selectParameterType(element){
  if(this.selectedItem.parameterTypeId == element.parameterTypeId){
    this.selectedItem = 0;
  }
  else{
    this.selectedItem = element;
  }
}

}
