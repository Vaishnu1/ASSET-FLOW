import { Component, OnInit } from '@angular/core';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { WorkflowHierarchyHdrModel } from 'src/app/Model/workflow/workflowHierarchyHdr';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { getData } from 'src/app/Model/common/fetchListData';
import { WorkflowHierarchyDefaultCreateComponent } from '../workflow-hierarchy-default-create/workflow-hierarchy-default-create.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-workflow-hierarchy-list',
  templateUrl: './workflow-hierarchy-list.component.html',
  styleUrls: ['./workflow-hierarchy-list.component.css']
})
export class WorkflowHierarchyListComponent implements OnInit {
  //Set Page Title
  title = 'Asset Optima - Workflow'; 
 
  workflowHierarchyHdrModel : WorkflowHierarchyHdrModel;
 
  pageIndex: String;//set page number starts with zero
  pageSize: String;// records per page
  length: String;//set total record count here 
 
  subLoader : boolean = false;   
 
  workflowHierarchyDataSource = [];
  workflowHierarchyDispColumns = ['select','locationTO.locationName','workflowProcessName','workflowName','active','createdBy',
                                   'createdDt','updatedBy','updatedDt']         
  
  //COMBO
  locationCombo: any = [];
  locationPageNumber: number;
  scrollsyncLocation: boolean = false;
   
  processCombo: any = [];
  processListPageNumber: number;
  scrollProcessSync: boolean = false;

  workflowDescriptionCombo: any = [];
  scrollWorkflowDescriptionSync: boolean = false;
  workflowDescriptionListPageNumber: number;
 
  recordsPerPageForCombo: string;
 
  modelAccessModule: ModuleAccessModel;
  getData: getData;
  selectedItem: number=0;
  
  constructor( private assetOptimaServices : AssetOptimaServices,
                private commonService:CommonService,
                private router: Router,
                private titleService: Title,
                private dialog: MatDialog,
                private translateService: TranslateService,
                private userSessionService: UserSessionService,
                private assetOptimaConstants: AssetOptimaConstants) { 
                  
      this.modelAccessModule = new ModuleAccessModel();
      this.workflowHierarchyHdrModel = new WorkflowHierarchyHdrModel();
      this.locationPageNumber = 1;
      this.processListPageNumber = 1;
      this.workflowDescriptionListPageNumber = 1;
      this.getData = new getData();
    }
 
  ngOnInit() {
    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_WORKFLOW_HIERARCHY'];
    this.titleService.setTitle(this.title);
    this.pageSize = '100';
    this.pageIndex = '0';
    this.workflowHierarchyHdrModel.locationName = '';
    this.workflowHierarchyHdrModel.locationId = 0;
    this.workflowHierarchyHdrModel.direction = 'desc';
    this.workflowHierarchyHdrModel.columnName = 'updatedDt';
    this.loadWorkHierarchyList();
  }
 
  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadWorkHierarchyList();
  }
 
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }
 
  customSort(event) {
    this.workflowHierarchyHdrModel.pageNumber = 0;
    this.workflowHierarchyHdrModel.columnName = event.active;
    this.workflowHierarchyHdrModel.direction = event.direction;
    this.loadWorkHierarchyList();
  }
 
  searchWorkflowHierarchy() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.loadWorkHierarchyList();
    this.selectedItem = 0;
  }
 
  clear(){
    this.workflowHierarchyHdrModel = new WorkflowHierarchyHdrModel();
    this.ngOnInit();
    this.selectedItem = 0;
  }

  workflowHierarchyAddEdit(workflowHierarchyHdrId,mode){
    this.router.navigate(['home/workflow/workflowHierarchyCreate/'+workflowHierarchyHdrId+'/'+mode]);  
  }
 
  loadWorkHierarchyList() {
     this.workflowHierarchyHdrModel.pageNumber = Number(this.pageIndex);
     this.workflowHierarchyHdrModel.recordsPerPage = Number(this.pageSize);
 
     this.subLoader = true;
     this.workflowHierarchyDataSource = [];
 
      this.commonService.commonListService("fetchListOfAllWorkflowHierarchy.sams", this.workflowHierarchyHdrModel).subscribe(
      data => {
          if(data.success){
            this.workflowHierarchyDataSource = data.responseData.dataList;
            this.length = data.responseData.dataTotalRecCount;
            this.subLoader =false;
          }else{
            this.subLoader =false;
          }
        },error =>{
          this.subLoader =false;
        }        
    );
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsyncLocation = false;
        }
      );
  }
 
  selectedLocationData(event) {
    if (event === undefined) {
      this.workflowHierarchyHdrModel.locationName = '';
      this.workflowHierarchyHdrModel.locationId = 0;
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.workflowHierarchyHdrModel.locationName = event.locDisplayField;
      this.workflowHierarchyHdrModel.locationId = event.locationId;
    }
  }
 
  listOfWorkflowProcess(searchValue) {
   this.scrollProcessSync = true;
   this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
   this.commonService.getComboResults('listOfAllWorkflowProcessCombo.sams', searchValue.term, '', '',
     this.recordsPerPageForCombo, this.processListPageNumber).subscribe(
       (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.processListPageNumber , this.processCombo , data.responseData.comboList)
        this.processListPageNumber = this.getData.pageNumber;
        this.processCombo = this.getData.dataList;
        this.scrollProcessSync = false;
       }
     );
 }

 setWorkflowProcess(event) {
   if (event === undefined) {
     this.workflowHierarchyHdrModel.workflowProcessName = '';
     this.workflowHierarchyHdrModel.workflowProcessId = 0;
    this.workflowHierarchyHdrModel.workflowDescriptionId=0;
    this.workflowHierarchyHdrModel.workflowName='';
     this.processListPageNumber = 1;
     this.processCombo = [];
     this.workflowDescriptionListPageNumber = 1;
     this.workflowDescriptionCombo = [];
   } else {
    this.translateService.get([event.workflowProcessName])
    .subscribe((val) => {
      const status = Object.values(val)
      this.workflowHierarchyHdrModel.workflowProcessName=status[0].toString();
    });
     this.workflowHierarchyHdrModel.workflowProcessId = event.workflowProcessId;
    this.workflowHierarchyHdrModel.workflowDescriptionId=0;
    this.workflowHierarchyHdrModel.workflowName='';
    this.workflowDescriptionListPageNumber = 1;
    this.workflowDescriptionCombo = [];
   }
 }

 listOfWorkflowDescription(searchValue) {
  this.scrollWorkflowDescriptionSync = true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults('listOfAllWorkflowDescriptionCombo.sams', searchValue.term, 
    this.workflowHierarchyHdrModel.workflowProcessId > 0 ? this.workflowHierarchyHdrModel.workflowProcessId : '', '',
    this.recordsPerPageForCombo, this.workflowDescriptionListPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.workflowDescriptionListPageNumber , this.workflowDescriptionCombo , data.responseData.comboList)
        this.workflowDescriptionListPageNumber = this.getData.pageNumber;
        this.workflowDescriptionCombo = this.getData.dataList;
        this.scrollWorkflowDescriptionSync = false;
      }
    );
}

setWorkflowDescription(event) {
  if (event === undefined) {
    this.workflowHierarchyHdrModel.workflowDescriptionId=0;
    this.workflowHierarchyHdrModel.workflowName='';
    this.workflowDescriptionListPageNumber = 1;
    this.workflowHierarchyHdrModel.workflowProcessId = 0;
    this.workflowHierarchyHdrModel.workflowProcessName = '';
    this.workflowDescriptionListPageNumber = 1;
  } else {
    this.workflowHierarchyHdrModel.workflowDescriptionId=event.workflowDescriptionId;
    this.workflowHierarchyHdrModel.workflowName=event.workflowName;
     this.workflowHierarchyHdrModel.workflowProcessId = event.workflowProcessId;
     this.translateService.get([event.workflowProcessName])
     .subscribe((val) => {
       const status = Object.values(val)
       this.workflowHierarchyHdrModel.workflowProcessName=status[0].toString();
     });
  }
}

workflowHierarchyCreate;
createDefaultHieararchy(element,mode) {
  this.workflowHierarchyCreate = this.dialog.open(WorkflowHierarchyDefaultCreateComponent, {
    height: '320px',
    width: '500px',
    data: {
      'workflowDescriptionData' : element,
      'mode':mode
    }
  });
  this.workflowHierarchyCreate.disableClose = true;
  this.workflowHierarchyCreate.afterClosed().subscribe(
    data => {
      this.ngOnInit(); 
    });
}

selectworkflowHierarchy(element){
  if(this.selectedItem == element.workflowHierarchyHdrId){
    this.selectedItem = 0;
  }else{
    this.selectedItem = element.workflowHierarchyHdrId;
  }
}

}