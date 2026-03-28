import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GroupAddComponent } from '../group-add/group-add.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserModel } from 'src/app/Model/base/user';
import { UserCreateEditComponent } from '../user-create-edit/user-create-edit.component';
import { UserGroupMappingComponent } from '../user-group-mapping/user-group-mapping.component';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { CategoryDepartmentMappingComponent } from '../../category-department-mapping/category-department-mapping.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['select', 'userName','loginId','updatedBy','updatedDt','createdBy','createdDt'];
  userTypeCombo: any = [{id:2,userTypeName:'CUSTOMER'},{id:1,userTypeName:'EMPLOYEE'},{id:3,userTypeName:'SUPPLIER'}];

  dataSource :any=[];
  userComboData: any =[];
  searchvalue : any = '';

  groupPageNumber: number;
  groupListData: any= [];
  scrollsync:boolean = false;

  userLocationPageNumber: number;
  recordsPerPageForCombo: string;

  locationCombo: any = [];
  recordsPerPageForComboForLocation:string;
  locationPageNumber:number;
  userPageNumber:number;
  scrollsyncForLocation:boolean=false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;
  userModel: UserModel;
  userModelFormGroup: FormGroup;
  

  //LOADER
  subLoaderUser: boolean=false;

  //FOR VIEW
  viewData : any;

  modelAccessModule: ModuleAccessModel;

  @ViewChild('setfocuse') setfocusSearch: ElementRef;

  length: String = '0';     //set total record count here 
   pageIndex: String;  //set page number starts with zeroo
   pageSize: String;   // records per page
  getData: getData;
  scrollusercomboSync: boolean = false;
  selectedItem: any = 0;

  constructor(private dialog: MatDialog,
              private commonService: CommonService,
              private samsServices: AssetOptimaServices,
              private userSession: UserSessionService,
              private router: Router) {
                this.userModel = new UserModel();
                this.modelAccessModule = new ModuleAccessModel();
                this.pageSize = '100';
                this.pageIndex = '0';
                this.locationPageNumber=1;
                this.userPageNumber=1;
                this.userLocationPageNumber=1;
                this.groupPageNumber=1;
               }

  ngOnInit() {
   this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_USER'];
    this.userModel.direction='desc';
    this.userModel.columnName='updatedDt';
    this.loadUserList();
    this.groupPageNumber=1;
    this.groupListData = [];
  }

  ngAfterViewInit(){
    this.commonService.setFormFocus(this.setfocusSearch);
  }

  onSearchChange(searchValue : string ) {  
    this.userModel.userName = searchValue;
    this.pageSize ='100';
    this.pageIndex='0';
    this.loadUserList();
  }

  dialogRef;

  openUserCreateEditDialog1(): void {
    this.dialogRef = this.dialog.open(UserCreateEditComponent, {
      height: '550px',
      width: '650px',
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
         this.loadUserList();
      });
  }

  openUserCreateEditDialog(pId,mode) {
    this.router.navigate(['home/settings/userCreate/' + pId + '/' + mode]);
  }

  ngOnDestroy() {
    if(this.dialogRef!=null){
      this.dialogRef.close();
    }
  }
  openentityGroupviewDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);
  }

  openEditDialog(value,type) {
    let initialData = value;
    let viewData={
      value:value,
      mode:type
    }
    let editDialog = this.dialog.open(UserCreateEditComponent, 
      Object.assign({initialData}, 
        { height: '550px',
          width: '650px',
          data:viewData}));
      editDialog.disableClose = true;
      editDialog.afterClosed().subscribe(
        data => {
             this.ngOnInit();
           });
 }

 loadUserList() {
   this.userModel.pageNumber = Number(this.pageIndex);
   this.userModel.recordsPerPage = Number(this.pageSize);
   this.dataSource=[];
   this.subLoaderUser=true;
   this.commonService.commonListService(this.samsServices.listOfAllUser,this.userModel).subscribe(
     data => {
       if(data.success){
        this.subLoaderUser=false;
        this.length = data.responseData.dataTotalRecCount;
        this.dataSource = data.responseData.dataList;
       }else{
        this.subLoaderUser=false;
        this.length = '0';
       }
     }, error =>{
      this.subLoaderUser=false;
      this.length = '0';
     }
   );

 }

 openGroupMappingDialog(element) {
  let dialogRef = this.dialog.open(UserGroupMappingComponent, {
    height: '575px',
    width: '550px',
    data: element
  });
   dialogRef.disableClose = true;
   dialogRef.afterClosed().subscribe(
    data => {
      this.ngOnInit();
    });
}

openCategoryDepartmentMappingDialog(element) {
  let dialogRef = this.dialog.open(CategoryDepartmentMappingComponent, {
    height: '80%',
    width: '70%',
    data: element
  });
   dialogRef.disableClose = true;
   dialogRef.afterClosed().subscribe(
    data => {
      this.ngOnInit();
    });
}

 getServerData(event) {
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.loadUserList();
}

customSort(event){
  this.userModel.pageNumber = 0;
  this.userModel.columnName = event.active;
  this.userModel.direction = event.direction;
  this.loadUserList();
 }

 getIndexValue(index: number): number {
  index = Number(this.pageSize) * Number(this.pageIndex) + index;
  return index;
}

 cancel(){
   
 }

 userComboSearch(searchValue) {
  this.scrollusercomboSync = true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults(this.samsServices.listOfAllUserNameCombo,searchValue.term,'','',
  this.recordsPerPageForCombo,this.userLocationPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchValue, this.userLocationPageNumber , this.userComboData , data.responseData.comboList)
      this.userLocationPageNumber = this.getData.pageNumber;
      this.userComboData = this.getData.dataList;
      this.scrollusercomboSync = false;
    }
  );
}

loadLocationComboData(searchValue) {
  this.scrollsyncForLocation=true;
  this.recordsPerPageForComboForLocation = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults(this.samsServices.listAllUserLocForCombo,searchValue.term,'','',
          this.recordsPerPageForComboForLocation,this.locationPageNumber).subscribe(
    (data)=>{
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
      this.locationPageNumber = this.getData.pageNumber;
      this.locationCombo = this.getData.dataList;
      this.scrollsyncForLocation = false; 
   }
  );
}

clear() {
  this.userModel.userName = null||'';
  this.userModel = new UserModel();
  this.ngOnInit();
  this.selectedItem = 0;
}

selectedLocationData(event) {
  if(event==undefined){
    this.userModel.locDisplayField = '';
    this.userModel.locationName = '';
    this.userModel.locationCode = '';
    this.userModel.locationId = 0;
    this.locationPageNumber = 1;
    this.locationCombo = [];
  }
  else{
    this.userModel.locDisplayField = event.locDisplayField;
    this.userModel.locationName = event.locationName;
    this.userModel.locationCode = event.locationCode;
    this.userModel.locationId = event.locationId;
  }
}

userComboSelectValue(event) {
  if(event!=null){
    this.userModel.userId=event.userId;
    this.userModel.userName=event.userName;
}else{
    this.userModel.userId=0;
    this.userModel.userName='';
    this.userModel.locationId=0;
    this.userModel.loginId='';
    this.userModel.locationName='';
    this.userLocationPageNumber=1;
    this.userComboData = [];
}
}

selectUserType(event) {
  
}

searchUser(){
  if(this.userModel.validFromDtDisp != null){
    this.userModel.validFromDtDisp=this.commonService.convertToDateStringyyyy_mm_dd(this.userModel.validFromDtDisp);
  }
  if(this.userModel.validToDtDisp != null){
    this.userModel.validToDtDisp=this.commonService.convertToDateStringyyyy_mm_dd(this.userModel.validToDtDisp);
  }
  this.loadUserList();
  this.selectedItem = 0;
}

generateReport() {
  this.userModel.recordsPerPage = 0;
  this.commonService.commonListService('generateUserReport.sams', this.userModel).subscribe(
    (data) => {
      this.downloadDocument(data.responseData);
      this.commonService.openToastSuccessMessage("Download Successful.");
    }, error => {
      
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

selectUser(element){
  if(this.selectedItem.userId == element.userId){
    this.selectedItem = 0;
  }
  else{
    this.selectedItem = element;
  }
}

getgroupList(searchValue) {
  this.scrollsync=true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsServices.listOfAllGroupNameCombo,searchValue != null ? searchValue.term : '', '', '',
    this.recordsPerPageForCombo, this.groupPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.groupPageNumber , this.groupListData , data.responseData.comboList)
        this.groupPageNumber = this.getData.pageNumber;
        this.groupListData = this.getData.dataList;
        this.scrollsync = false;
      }
    );
}

selectedGroupName(event) {
  if(event != null){
    this.userModel.userGroupId[0]= event.groupId;
    this.userModel.groupName=event.groupName;
  }else{
    this.userModel.userGroupId= [];
    this.userModel.groupName='';
    this.groupPageNumber=1;
    this.groupListData = [];
  }
}

}
