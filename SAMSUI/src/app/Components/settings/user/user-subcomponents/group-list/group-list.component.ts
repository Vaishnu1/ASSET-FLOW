import {Component, OnInit, TemplateRef, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupAddComponent } from '../group-add/group-add.component';
import { GroupModel } from 'src/app/Model/base/group';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  displayedColumns = ['select', 'groupName', 'superAdmin',  'updatedBy', 'updatedDt','createdBy', 'createdDt'];
  searchvalue : any = '';
  groupModel: GroupModel;
  groupModelList =  [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;
  dialogRef;
  @ViewChild('searchSet') searchSetFocus: ElementRef;

  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  //LOADER
  subLoader: boolean=false;

  //PERMISSIONS
  modelAccessModule: ModuleAccessModel;
  selectedItem: any=0;

  constructor(private dialog: MatDialog,
              private commonService: CommonService,
              private samsServices: AssetOptimaServices,
              private userSession: UserSessionService) {
    this.groupModel = new GroupModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule = new ModuleAccessModel();
   }

   ngAfterViewInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_GROUP'];
     this.commonService.setFormFocus(this.searchSetFocus);
   }

  ngOnInit() {
    this.groupModel.direction = "desc";
    this.groupModel.columnName = "updatedDt";
     this.getGroupListData();
  }
  onSearchChange(searchValue : string ) {
    this.groupModel.groupName = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.getGroupListData();
  }

  openentityGroupDialog(): void {
    this.dialogRef = this.dialog.open(GroupAddComponent, {
      height: '600px',
      width: '650px',
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
  openentityGroupviewDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);
}

 getGroupListData() {
   this.groupModel.pageNumber = Number(this.pageIndex);
   this.groupModel.recordsPerPage = Number(this.pageSize);
   this.groupModelList=[];
   this.subLoader =true;
  this.commonService.commonInsertService(this.samsServices.fetchListOfAllGroup,this.groupModel).subscribe(
  data =>{
    if(data.success){
      this.subLoader=false;
      this.length = data.responseData.dataTotalRecCount;
      this.groupModelList = data.responseData.dataList;
    }else{
      this.subLoader=false;
    }
  },error =>{
     this.subLoader =false;
  }
  );
 }

 getServerData(event) {
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.getGroupListData();
}

 editGroupName(groupId: number, groupName: string, mode) {
 this.dialogRef = this.dialog.open(GroupAddComponent,{
      height: '650px',
      width: '650px',
      data:{'groupId':groupId,
            'groupName':groupName,
            'mode': mode
          }
  });    
  this.dialogRef.disableClose = true;
  this.dialogRef.afterClosed().subscribe(
   data => {
     this.ngOnInit();
   });
 }

   customSort(event){
    this.groupModel.pageNumber = 0;
    this.groupModel.columnName = event.active;
    this.groupModel.direction = event.direction;
    this.getGroupListData();
   }

   getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  selectGroup(element){
    if(this.selectedItem.groupId == element.groupId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element;
    }
  }
}
