import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { MatDialog} from '@angular/material/dialog';
import { departmentModel } from 'src/app/Model/master/department';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { DepartmentCreateComponent } from '../department-create/department-create.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  displayedColumns = ['select', 'sno', 'departmentCode', 'departmentName', 'updatedBy','updatedDt'];
  deptdataSource = [];

  searchvalue : any = '';
  tempViewData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  subLoader: boolean = false;

  departmentPageNumber :number;
  scrollsync :boolean = false;
  limitCount: any;
  departmentList : any =[];

  public departmentModel : departmentModel;

    //PERMISSIONS 
    modelAccessModule: ModuleAccessModel;

  //Focus on search field

  @ViewChild('setFocus') setSearchFocus: ElementRef;
  getData: getData;

  selectedItem: any = 0;

  @Input() isFromAssetCreate : string;
 
  constructor(private dialog: MatDialog,
    private commonService:CommonService,
    private assetOptimaServices:AssetOptimaServices,
    private userSession: UserSessionService) { 
          this.departmentModel = new departmentModel();
          this.pageSize = '100';
          this.pageIndex = '0';
          this.modelAccessModule=new ModuleAccessModel();
          this.departmentPageNumber = 1;
         
}

  ngOnInit() {
    localStorage.setItem('helpManual','settings/master?id=department');

    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_DEPARTMENT'];
    this.departmentModel.direction = 'asc';
    this.departmentModel.columnName = 'departmentName';
    this.pageIndex='0';
    this.fetchDeptList();
    if(this.isFromAssetCreate == 'fromAssetCreate'){
      this.openDeptCreateDialog(0,'add');
    }
  }

  ngAfterViewInit() {
    this.setSearchFocus.nativeElement.focus();
  }

  //Search Department list

  onSearchChange(searchValue : string ) {  
    //this.departmentModel.departmentName=searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchDeptList();
    this.selectedItem = 0;
  }
  dialogRef;
  //Open department craete component
  openDeptCreateDialog(department,mode) {
     this.dialogRef = this.dialog.open(DepartmentCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'department': department,
        'mode':mode
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        this.fetchDeptList();
      });
  }

  ngOnDestroy(): void {
    if(this.dialogRef!=null){
      this.dialogRef.close();
    }
  }
  // Open Department view component
  opendepartmentviewDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);
  }

  //Fetch Deaprtment list 
  fetchDeptList(){
    this.subLoader = true;
    this.departmentModel.pageNumber = Number(this.pageIndex);
    this.departmentModel.recordsPerPage = Number(this.pageSize);
    this.deptdataSource = [];
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllDepartment,this.departmentModel).subscribe(
      data => {
        if(data.success){
          this.subLoader = false;
            this.length = data.responseData.dataTotalRecCount;
            this.deptdataSource = data.responseData.dataList;  
            } else {
              this.subLoader = false;
            }
      },error =>{
        this.subLoader =false;
      }

    );
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchDeptList();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.departmentModel.pageNumber = 0;
    this.departmentModel.columnName = event.active;
    this.departmentModel.direction = event.direction;
    this.fetchDeptList();
  }

  generateReportOfDepartment() {
    this.departmentModel.recordsPerPage = 0;
    this.commonService.commonListService('generateDepartmentRequestReport.sams', this.departmentModel).subscribe(
      (data) => {
        this.downloadDocument(data.responseData);
        this.commonService.openToastSuccessMessage("Download Successful.");
      }, error => {
        // alert('error');
      }
    );
    
  }

  downloadDocument(filePath: string) {  
    let fileName = filePath.split('.')[0];
    this.commonService.downloadExcelFile(filePath).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  clearSearch(){
    this.departmentModel.departmentName = '';
    this.fetchDeptList();
    this.selectedItem = 0;
  }

  searchDepartment(){
    this.pageSize = '100';
  this.pageIndex = '0';
  this.fetchDeptList();
  }
  

  listOfDepartment(searchValue){
    this.scrollsync = true;
    this.limitCount = '10';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllDeparment,searchValue.term,'', '', this.limitCount, this.departmentPageNumber).subscribe(
      (data) =>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.departmentPageNumber , this.departmentList , data.responseData.comboList)
        this.departmentPageNumber = this.getData.pageNumber;
        this.departmentList = this.getData.dataList;
        this.scrollsync = false;  
      }
    );
  }

  selectDepartment(element){
    if(this.selectedItem.departmentId == element.departmentId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element;
    }
  } 
  getSubDepartmentNameComboValue(event){
    if (event != null) {
      this.departmentModel.departmentName = event.departmentName != null ? event.departmentName : '';
      this.departmentModel.departmentId = event.departmentId != 0 ? event.departmentId : 0;
     // this.subDepartmentPageNumber = 1;
    }else{
      this.departmentPageNumber = 1;
      this.departmentModel.departmentName  = '';
      this.departmentModel.departmentId = 0;
      this.departmentList = [];
    }
  } 
    
}
