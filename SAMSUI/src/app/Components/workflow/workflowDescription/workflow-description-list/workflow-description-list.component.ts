import { Component, OnInit } from '@angular/core';
import { WorkflowDescriptionModel } from 'src/app/Model/workflow/workflowDescription';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { WorkflowDescriptionCreateComponent } from '../workflow-description-create/workflow-description-create.component';
import { getData } from 'src/app/Model/common/fetchListData';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-workflow-description-list',
  templateUrl: './workflow-description-list.component.html',
  styleUrls: ['./workflow-description-list.component.css']
})
export class WorkflowDescriptionListComponent implements OnInit {
   //Set Page Title
   title = 'Asset Optima - Workflow'; 
   
   workflowDescriptionModel : WorkflowDescriptionModel;
  
   pageIndex: String;//set page number starts with zero
   pageSize: String;// records per page
   length: String;//set total record count here 
  
   subLoader : boolean = false;   
  
   workflowDescriptionDataSource = [];
   workflowDescriptionDispColumns = ['select','workflowName','workflowProcessTO.workflowProcessName','active','createdBy',
                                    'createdDt','updatedBy','updatedDt']         
   
   //COMBO
   processCombo: any = [];
   processListPageNumber: number;
   scrollProcessSync: boolean = false;
  
   recordsPerPageForCombo: string;
  
   modelAccessModule: ModuleAccessModel;
  getData: getData;
   
  selectedItem:any = 0;

   constructor( private assetOptimaServices : AssetOptimaServices,
                 private commonService:CommonService,
                 private router: Router,
                 private translateService: TranslateService,
                 private titleService: Title,
                 private dialog: MatDialog,
                 private userSessionService: UserSessionService,
                 private assetOptimaConstants: AssetOptimaConstants) { 
                   
       this.modelAccessModule = new ModuleAccessModel();
       this.workflowDescriptionModel = new WorkflowDescriptionModel();
       this.processListPageNumber = 1;
       this.getData = new getData();
     }
  
   ngOnInit() {
     this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_WORKFLOW_DESCRIPTION'];
     this.titleService.setTitle(this.title);
     this.pageSize = '100';
     this.pageIndex = '0';
     this.workflowDescriptionModel.direction = 'desc';
     this.workflowDescriptionModel.columnName = 'updatedDt';
     this.loadWorkDescriptionList();
   }
  
   getServerData(event) {
     this.pageSize = event.pageSize;
     this.pageIndex = event.pageIndex;
     this.loadWorkDescriptionList();
   }
  
   getIndexValue(index: number): number {
     index = Number(this.pageSize) * Number(this.pageIndex) + index;
     return index;
   }
  
   customSort(event) {
     this.workflowDescriptionModel.pageNumber = 0;
     this.workflowDescriptionModel.columnName = event.active;
     this.workflowDescriptionModel.direction = event.direction;
     this.loadWorkDescriptionList();
   }
  
   searchWorkflowDescription() {
     this.pageSize = '100';
     this.pageIndex = '0';
     this.loadWorkDescriptionList();
     this.selectedItem = 0;
   }
  
   clear(){
     this.workflowDescriptionModel = new WorkflowDescriptionModel();
     this.ngOnInit();
     this.selectedItem = 0;
   }
  
   loadWorkDescriptionList() {
      this.workflowDescriptionModel.pageNumber = Number(this.pageIndex);
      this.workflowDescriptionModel.recordsPerPage = Number(this.pageSize);
  
      this.subLoader = true;
      this.workflowDescriptionDataSource = [];
  
       this.commonService.commonListService("fetchListOfAllWorkflowDescription.sams", this.workflowDescriptionModel).subscribe(
       data => {
           if(data.success){
             this.workflowDescriptionDataSource = data.responseData.dataList;
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
      this.workflowDescriptionModel.workflowProcessName = '';
      this.workflowDescriptionModel.workflowProcessId = 0;
      this.processListPageNumber = 1;
      this.processCombo = [];
    } else {
      this.translateService.get([event.workflowProcessName])
      .subscribe((val) => {
        const status = Object.values(val)
        this.workflowDescriptionModel.workflowProcessName=status[0].toString();
      });
      this.workflowDescriptionModel.workflowProcessId = event.workflowProcessId;
    }
  }

  workflowCreate;
  workflowDescriptionAddEdit(element,mode) {
    this.workflowCreate = this.dialog.open(WorkflowDescriptionCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'workflowDescriptionData' : element,
        'mode':mode
      }
    });
    this.workflowCreate.disableClose = true;
    this.workflowCreate.afterClosed().subscribe(
      data => {
        this.ngOnInit(); 
      });
  }

  selectWorkflowDescription(element){
    if(this.selectedItem.workflowDescriptionId == element.workflowDescriptionId){
      this.selectedItem = 0;
    }else{
      this.selectedItem = element;
    }
  }
  
  }
  