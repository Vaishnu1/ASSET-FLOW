import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { subDepartmentModel } from 'src/app/Model/master/subDepartment';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { SubdepartmentCreateComponent } from '../subdepartment-create/subdepartment-create.component';

@Component({
  selector: 'app-subdepartment-list',
  templateUrl: './subdepartment-list.component.html',
  styleUrls: ['./subdepartment-list.component.css']
})
export class SubdepartmentListComponent implements OnInit {

  displayedColumns = ['select', 'sno', 'subDepartmentCode', 'subDepartmentName','departmentTO.departmentName','updatedBy','updatedDt'];
  subdepartmentdataSource = [];
  subloader: boolean = false;
  tempViewData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

   //For Pagination
   length: String = '0';     //set total record count here 
   pageIndex: String;  //set page number starts with zeroo
   pageSize: String;   // records per page

  public subdepartment: subDepartmentModel;
  
  subDepartmentPageNumber : number;
  departmentPageNumber :number;
  scrollsync :boolean = false;
  scrollsyncSubDepartment :boolean =false;
  limitCount: any;
  departmentList : any =[];
  subDepartmentList : any =[];

  @ViewChild('setFocus') setSearchFocus: ElementRef;
  
  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;
  getData: getData;

  selectedItem: any=0;


  constructor(private dialog: MatDialog,
    private commonService:CommonService,
    private assetOptimaServices:AssetOptimaServices,
    private userSession: UserSessionService) { 
      this.subdepartment = new subDepartmentModel();
      this.pageSize = '100';
      this.pageIndex = '0';
      this.modelAccessModule=new ModuleAccessModel();
      this.subDepartmentPageNumber = 1; 
      this.departmentPageNumber = 1;   
    }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_SUB_DEPARTMENT'];
    this.subdepartment.direction = 'asc';
    this.subdepartment.columnName = 'subDepartmentName';
    this.pageIndex='0';
    this.fetchSubDeptList();
  }

  ngAfterViewInit() {
    this.setSearchFocus.nativeElement.focus();
  }
  
  searchSubDepartment(searchValue: string){
  this.pageSize = '100';
  this.pageIndex = '0';
  this.fetchSubDeptList();
  this.selectedItem = 0;
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  dialogRef;
  openSubDeptCreateDialog(subDepartment,mode) {
   this.dialogRef = this.dialog.open(SubdepartmentCreateComponent, {
      height: 'auto',
      width: '500px',
      data:{
        'subDepartment' : subDepartment,
        'mode':mode
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        this.fetchSubDeptList();
     });
  }

  ngOnDestroy() {
    if(this.dialogRef!=null){
      this.dialogRef.close();
    }
  }
  opendepartmentviewDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);
  }

  fetchSubDeptList(){
  this.subloader = true;
  this.subdepartment.pageNumber = Number(this.pageIndex);
  this.subdepartment.recordsPerPage = Number(this.pageSize);
  this.subdepartmentdataSource = [];
  this.commonService.commonListService('fetchListOfAllSubDepartment.sams',this.subdepartment).subscribe(
    data => {
      if(data.success){
         this.length = data.responseData.dataTotalRecCount;
         this.subdepartmentdataSource = data.responseData.dataList; 
         this.subloader = false;      
         } else {
           this.subloader = false;
         }
    }, error => {
      this.subloader = false;
    }
  );
 }

getServerData(event) {
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.fetchSubDeptList();
}

customSort(event) {
  this.subdepartment.pageNumber = 0;
  this.subdepartment.columnName = event.active;
  this.subdepartment.direction = event.direction;
  this.fetchSubDeptList();
}

generateSubDeptReportExport(){
  this.subdepartment.recordsPerPage = 0;
  this.commonService.commonListService('generateSubDepartmentRequestReport.sams', this.subdepartment).subscribe(
    (data) => {
      this.downloadDocument(data.responseData);
      this.commonService.openToastSuccessMessage("Download Successful.");
    }, error => {
      this.commonService.openToastSuccessMessage("Failed to create Report.");
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
  this.getDepartmentNameComboValue(event);
  this.getSubDepartmentNameComboValue(event);
  this.subdepartment = new subDepartmentModel;
  this.ngOnInit();
  this.selectedItem = 0;
}

listOfDepartment(searchValue){
  this.scrollsync = true;
  this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
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

getDepartmentNameComboValue(event){
  if (event === undefined) {
    this.subdepartment.departmentId = 0;
    this.subdepartment.departmentName = null;
    this.subdepartment.subDepartmentId = 0;
    this.subdepartment.subDepartmentName = null;
    this.departmentPageNumber = 1;
    this.subDepartmentPageNumber = 1;
    this.departmentList = [];
    this.subDepartmentList = [];
  } else {
    this.subdepartment.departmentId = event.departmentId;
    this.subdepartment.departmentName = event.departmentName;
    this.subdepartment.subDepartmentName = null;
    this.subdepartment.subDepartmentId = 0;
    this.subDepartmentPageNumber = 1;
    this.subDepartmentList = [];
  }
}

listOfSubDepartment(searchValue){
  this.scrollsyncSubDepartment = true;
  this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults("listOfAllSubDeparment.sams",searchValue.term,this.subdepartment.departmentId != 0 ? this.subdepartment.departmentId : 0, '', this.limitCount, this.subDepartmentPageNumber,
  this.subdepartment.departmentName != '' ? this.subdepartment.departmentName : '',).subscribe(
    (data) =>{

      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchValue, this.subDepartmentPageNumber , this.subDepartmentList , data.responseData.comboList)
      this.subDepartmentPageNumber = this.getData.pageNumber;
      this.subDepartmentList = this.getData.dataList;
      this.scrollsyncSubDepartment = false;
    }
  );
}

getSubDepartmentNameComboValue(event){
  if (event != null) {
    this.subdepartment.subDepartmentName = event.subDepartmentName != null ? event.subDepartmentName : '';
    this.subdepartment.subDepartmentId = event.subDepartmentId != 0 ? event.subDepartmentId : 0;
    this.subdepartment.departmentName = event.departmentName != null ? event.departmentName : '';
    this.subdepartment.departmentId = event.departmentId != 0 ? event.departmentId : 0;
   // this.subDepartmentPageNumber = 1;
  }else{
    this.subdepartment.departmentId = 0;
    this.subdepartment.departmentName = null;
    this.departmentList = [];
    this.departmentPageNumber = 1;
    this.subDepartmentPageNumber = 1;
    this.subdepartment.subDepartmentName = null;
    this.subdepartment.subDepartmentId = 0;
    this.subDepartmentList = [];
  }
}

selectSubDepartment(element){
  if(this.selectedItem.subDepartmentId == element.subDepartmentId){
    this.selectedItem = 0;
  }
  else{
    this.selectedItem = element;
  }
} 

}
