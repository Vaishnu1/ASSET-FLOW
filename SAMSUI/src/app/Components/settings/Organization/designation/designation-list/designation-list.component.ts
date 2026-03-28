import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import {  MatTableDataSource } from '@angular/material/table';
import {  MatSort } from '@angular/material/sort';
import {  MatDialog} from '@angular/material/dialog';
import { DesignationModel } from 'src/app/Model/master/designation';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { DesignationCreateComponent } from '../designation-create/designation-create.component';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.css']
})
export class DesignationListComponent implements OnInit {

  displayedColumns = ['select' , 'sno', 'designationName', 'updatedBy','updatedDt'];
  designationdataSource = [];
  subLoader: boolean = false;

  searchvalue : any = '';
  tempViewData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  public designation : DesignationModel;

  @ViewChild('setFocus') setSearchFocus: ElementRef;

    //PERMISSIONS 
    modelAccessModule: ModuleAccessModel;
  selectedItem: any=0;

  constructor(private dialog: MatDialog,
    private commonService:CommonService,
    private assetOptimaServices:AssetOptimaServices,
    private userSession: UserSessionService) { 
          this.designation = new DesignationModel();
          this.pageSize = '100';
          this.pageIndex = '0';
          this.modelAccessModule=new ModuleAccessModel();
}

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_DESIGNATION'];
    this.designation.direction = 'asc';
    this.designation.columnName = 'designationName';
    this.pageIndex='0';
    this.fetchDesignationList();
  }

  
  onSearchChange(searchValue : string ) {  
    this.designation.designationName = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchDesignationList();
  }

  ngAfterViewInit() {
    this.setSearchFocus.nativeElement.focus();
  }



  opendesignationviewDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);
  }

  dialogRef;
  openDesignationCreateDialog(designation,mode) {
    this.dialogRef = this.dialog.open(DesignationCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'designation' : designation,
        'mode':mode
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
           this.ngOnInit(); 
      });
  }

  ngOnDestroy(): void {
    if(this.dialogRef!=null){
      this.dialogRef.close();
    }
  }

  fetchDesignationList(){
    this.subLoader = true;
    this.designation.pageNumber = Number(this.pageIndex);
    this.designation.recordsPerPage = Number(this.pageSize);
    this.designationdataSource = [];
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllDesignation,this.designation).subscribe(
      data => {
        if(data.success){
          this.subLoader = false;
           this.length = data.responseData.dataTotalRecCount;
           this.designationdataSource = data.responseData.dataList;       
           } else {
             this.subLoader = false;
           }
      }, error => {
        this.subLoader = false;
      }
    );
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchDesignationList();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.designation.pageNumber = 0;
    this.designation.columnName = event.active;
    this.designation.direction = event.direction;
    this.fetchDesignationList();
  }

  selectDesignation(element){
    if(this.selectedItem.designationId == element.designationId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element;
    }
  }

}
