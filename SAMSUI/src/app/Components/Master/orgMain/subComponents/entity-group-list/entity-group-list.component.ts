import {Component, OnInit, TemplateRef, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { MatSort} from '@angular/material/sort';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EntityGroupCreateComponent } from 'src/app/Components/Dialog-Components/Master/entity-group-create/entity-group-create.component';
import { EntityGroup } from 'src/app/Model/base/entity-group';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-entity-group-list',
  templateUrl: './entity-group-list.component.html',
  styleUrls: ['./entity-group-list.component.css']
})
export class EntityGroupListComponent implements OnInit,OnDestroy {
  displayedColumns = ['sno', 'entityGroupName', 'entityGroupDesc','updatedBy','updatedDt','createdBy','createdDt','action'];
  entityGroupdataSource = [];

  searchvalue : any = '';
  @ViewChild(MatPaginatorModule) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;
  @ViewChild('searchFocus') searchFocusSet : ElementRef;

  public entityGroup : EntityGroup;

   //For Pagination
   length: String = '0';     //set total record count here 
   pageIndex: String;  //set page number starts with zeroo
   pageSize: String;   // records per page

   //LOADER
   subloader: boolean =false;

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  constructor(private dialog: MatDialog, private router: Router,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private assetOptimaConstant: AssetOptimaConstants,
              private userSession: UserSessionService) {
        this.entityGroup = new EntityGroup();
        this.modelAccessModule=new ModuleAccessModel();
        this.pageSize = '100';
        this.pageIndex = '0';
               }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['Entity Group'];
    this.entityGroup.direction = 'desc';
    this.entityGroup.columnName = 'updatedDt';
    this.pageIndex='0';
    this.fetchEntityGroupList();
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.searchFocusSet);
  }

  onSearchChange(searchValue : string ) {  
    this.entityGroup.entityGroupName = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchEntityGroupList();
  }

  dialogRef;

  openentityGroupDialog(element,mode) {
     this.dialogRef = this.dialog.open(EntityGroupCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'entityGroup' : element,
        'mode': mode
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
          this.ngOnInit();
      });
  }

   ngOnDestroy(){ 
     if(this.dialogRef!=null){
      this.dialogRef.close();
     }
   }

  openentityGroupviewDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);
  }  

 fetchEntityGroupList(){
  this.entityGroup.pageNumber = Number(this.pageIndex);
  this.entityGroup.recordsPerPage = Number(this.pageSize);
  this.subloader=true;
  this.entityGroupdataSource = [];
  this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllEntityGroup,this.entityGroup).subscribe(
    data => {
      if(data.success){
        this.subloader=false;
         this.length = data.responseData.dataTotalRecCount;
         this.entityGroupdataSource = data.responseData.dataList;       
         }else{
          this.subloader=false;
         }
    }, error =>{
      this.subloader=false;
    }

  );
 }

getServerData(event) {
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.fetchEntityGroupList();
}
getIndexValue(index: number): number {
  index = Number(this.pageSize) * Number(this.pageIndex) + index;
  return index;
}

customSort(event) {
  this.entityGroup.pageNumber = 0;
  this.entityGroup.columnName = event.active;
  this.entityGroup.direction = event.direction;
  this.fetchEntityGroupList();
}

}
