import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import {  MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { ParameterGroupModel } from 'src/app/Model/master/parameterGroup';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ParameterGroupCreateComponent } from '../parameter-group-create/parameter-group-create.component';

@Component({
  selector: 'app-parameter-group-list',
  templateUrl: './parameter-group-list.component.html',
  styleUrls: ['./parameter-group-list.component.css']
})
export class ParameterGroupListComponent implements OnInit {
  displayedColumns = ['select', 'sno', 'parameterGroupName', 'updatedBy','updatedDt'];
  parameterGroupdataSource = [];

  searchvalue : any = '';
  subLoaderParameterGroup: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;

  public ParameterGroupModel : ParameterGroupModel;

  @ViewChild('searchSet') searchFocusSet : ElementRef;

    //PERMISSIONS
    modelAccessModule: ModuleAccessModel;


   //For Pagination
   length: String = '0';     //set total record count here
   pageIndex: String;  //set page number starts with zeroo
   pageSizeParameterGroup: String;   // records per page
   selectedItem: any=0;


  constructor(private dialog: MatDialog,
    private commonService:CommonService,
    private assetOptimaServices:AssetOptimaServices,
    private userSession: UserSessionService) { 
      this.ParameterGroupModel = new ParameterGroupModel();
      this.pageSizeParameterGroup = '100';
      this.pageIndex = '0';
      this.modelAccessModule=new ModuleAccessModel();
      console.log('modelAccessModule', this.modelAccessModule);
    }

  ngOnInit(): void {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_PARAMETER_TYPE'];
    this.ParameterGroupModel.direction = 'asc';
    this.ParameterGroupModel.columnName = 'parameterGroupName';
    this.pageIndex='0';
    this.fetchParameterGroupList();
  }
  

  ngAfterViewInit() {
    this.searchFocusSet.nativeElement.focus();
  }

  onSearchChange(searchValue : string ) {
    this.ParameterGroupModel.parameterGroupName = searchValue;
    this.pageSizeParameterGroup = '100';
    this.pageIndex = '0';
    this.fetchParameterGroupList();
  }
  dialogRef;
  openParameterGroupCreate(element, mode) {
    this.dialogRef = this.dialog.open(ParameterGroupCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'ParameterGroupModel' : element,
        'mode' : mode
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
          this.ngOnInit();
      });
  }

  fetchParameterGroupList(){
    this.ParameterGroupModel.pageNumber = Number(this.pageIndex);
    this.ParameterGroupModel.recordsPerPage = Number(this.pageSizeParameterGroup);
    this.parameterGroupdataSource=[];
    this.subLoaderParameterGroup = true;
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllParameterGroup,this.ParameterGroupModel).subscribe(
      data => {
        console.log('API Response:', data);
        if(data.success) {
          this.subLoaderParameterGroup = false;
           this.length = data.responseData.dataTotalRecCount;
           this.parameterGroupdataSource = data.responseData.dataList;
           } else {
             this.subLoaderParameterGroup = false;
           }
      }, error => {
        this.subLoaderParameterGroup = false;
      }
  
    );
   }

   getServerData(event) {
    this.pageSizeParameterGroup = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchParameterGroupList();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSizeParameterGroup) * Number(this.pageIndex) + index;
    return index;
  }
  
  customSort(event) {
    this.ParameterGroupModel.pageNumber = 0;
    this.ParameterGroupModel.columnName = event.active;
    this.ParameterGroupModel.direction = event.direction;
    this.fetchParameterGroupList();
  }
  
  selectParameterGroup(element){
    if(this.selectedItem.parameterGroupId == element.parameterGroupId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element;
    }
  }

}
