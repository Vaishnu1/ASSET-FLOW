import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { WorkflowHierarchyLevelCreateComponent } from '../workflow-hierarchy-level-create/workflow-hierarchy-level-create.component';
import { Location } from '@angular/common';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { Title } from '@angular/platform-browser';
import { getData } from 'src/app/Model/common/fetchListData';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-workflow-hierarchy-create',
  templateUrl: './workflow-hierarchy-create.component.html',
  styleUrls: ['./workflow-hierarchy-create.component.css']
})
export class WorkflowHierarchyCreateComponent implements OnInit {
  //Set Page Title
  title = 'Asset Optima - Workflow'; 

  workflowHierarchyHdrForm: FormGroup;

  headingDisplay: string;
  displayButton: string;
  disableClear: boolean=false;
  uploadFlag: boolean= false;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint(); 

  recordsPerPageForCombo: string;  

  workHierarchyDtlTempPush: any = [];
  workHierarchyDtlDataSource = new MatTableDataSource<any>();
  @ViewChild('matWorkflow') workflowTable: MatTable<any>; 
  dispColWorkHierarchyDtl= ['sNo','levelName','levelSeqNo','employeeName1','condition1','employeeName2','condition2',
                           'employeeName3','active','action'];
  workflowDtlLength: number = 0;

  isAddMode: boolean = false;
  isEditMode: boolean = false;
  isViewMode: boolean = false;

  locationCombo: any = [];
  scrollLocationNameSync: boolean = false;
  locationNamePageNumber: number;

  processCombo: any = [];
  scrollProcessSync: boolean = false;
  processListPageNumber: number;

  workflowDescriptionCombo: any = [];
  scrollWorkflowDescriptionSync: boolean = false;
  workflowDescriptionListPageNumber: number;

  modelAccessModule: ModuleAccessModel;
  getData: getData;

  constructor(private commonService: CommonService,
              private changeDetectorRefs: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private assetOptimaConstants: AssetOptimaConstants,
              private dialog: MatDialog,
              private userSessionService: UserSessionService,
              private translateService: TranslateService,
              private location: Location,
              private router: Router) { 

        this.modelAccessModule = new ModuleAccessModel();
        this.locationNamePageNumber = 1;
        this.processListPageNumber = 1;
        this.workflowDescriptionListPageNumber = 1;
        this.getData = new getData();

  }

  ngOnInit() {
   this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_WORKFLOW_HIERARCHY'];
   this.titleService.setTitle(this.title);

   this.workHierarchyDtlDataSource.data = []; 
   this.workflowHierarchyHdrForm = new FormGroup({
    workflowHierarchyHdrId   : new FormControl(0),  
    locationId               : new FormControl(0),
    locationName             : new FormControl('',[Validators.required,Validators.maxLength(100)]),
    workflowProcessId        : new FormControl(0),
    workflowProcessName      : new FormControl(''),
    workflowDescriptionId    : new FormControl(0),
    workflowName             : new FormControl(''),

    workflowHierarchyDtl     : new FormControl([]),
    //COMMON FIELDS
    orgId                    : new FormControl(''),
    createdBy                : new FormControl(''),
    createdDt                : new FormControl(''),
    updatedBy                : new FormControl(''),
    updatedDt                : new FormControl(''),
    active                   : new FormControl('true')
    });
  
    this.validateEditMode(); 
  }

  validateEditMode(){
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId =Number(primaryId);
        var mode = params.mode;
        if(primaryId <= 0){
          this.displayButton="Submit";
          this.disableClear=false;
          this.headingDisplay = "Create";
          this.isAddMode=true;
          this.workflowHierarchyHdrForm.controls.locationName.setValue(this.userSessionService.getUserLocationName());
          this.workflowHierarchyHdrForm.controls.locationId.setValue(this.userSessionService.getUserLocationId());
        }else{
          this.commonService.commonGetService('loadWorkflowHierarchyInfo.sams',primaryId).subscribe(
            data => {
              if(mode=='view'){
                this.workflowHierarchyHdrForm.disable();
                this.headingDisplay = "View";  
                this.isViewMode=true;  
              }else{
                // button and heading names for edit
                this.workflowHierarchyHdrForm.controls.workflowProcessName.disable();
                this.workflowHierarchyHdrForm.controls.workflowName.disable();  
                this.workflowHierarchyHdrForm.controls.locationName.disable();
                this.headingDisplay = "Edit";
                this.displayButton = "Update";
                this.disableClear = true;
                this.isEditMode=true;
              } 

              this.translateService.get(data.responseData.workflowProcessName)
              .subscribe(val => { 
                this.workflowHierarchyHdrForm.patchValue(data.responseData); 
                this.workflowHierarchyHdrForm.controls.workflowProcessName.setValue(val);  
              }); 
  
              this.workHierarchyDtlDataSource.data=data.responseData.workflowHierarchyDtl;
              this.workflowDtlLength=this.workHierarchyDtlDataSource.data.length;
            }
          );
        }
      }
    );
  }

  saveWorkflowHierarchy(){ 
    this.workflowHierarchyHdrForm.controls.workflowHierarchyDtl.setValue(this.workHierarchyDtlDataSource.data)
    this.commonService.showSpinner();
    this.commonService.commonInsertService('saveOrUpdateWorkflowHierarchyHdr.sams',this.workflowHierarchyHdrForm.getRawValue()).subscribe(
    data => {
      if(data.success){
        this.commonService.openToastSuccessMessage(data.message);
        this.commonService.hideSpinner();
        this.back();
      } else {
        this.commonService.openToastErrorMessage(data.message);
        this.commonService.hideSpinner();
      } 
    });   
  }

back(){
  this.location.back();
}

  clearWorkflowHierarchy() {
    this.workflowHierarchyHdrForm.reset();
    this.workflowHierarchyHdrForm.updateValueAndValidity();
    this.workHierarchyDtlDataSource.data = []; 
    this.ngOnInit(); 
  }

  listOfLocationName(searchValue) {
    this.scrollLocationNameSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.locationNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationNamePageNumber , this.locationCombo , data.responseData.comboList)
        this.locationNamePageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollLocationNameSync = false;
      }
    );
  }

  setLocationNameComboValue(event) {
    if (event === undefined) {
      this.workflowHierarchyHdrForm.controls.locationId.setValue(0);
      this.workflowHierarchyHdrForm.controls.locationName.setValue('');
      this.locationNamePageNumber = 1;
    } else {
      this.workflowHierarchyHdrForm.controls.locationId.setValue(event.locationId);
      this.workflowHierarchyHdrForm.controls.locationName.setValue(event.locationName);
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
    
    if(event == undefined){
      this.workflowHierarchyHdrForm.controls.workflowProcessId.setValue(0);
      this.workflowHierarchyHdrForm.controls.workflowProcessName.setValue('');
      this.workflowHierarchyHdrForm.controls.workflowDescriptionId.setValue(0);
      this.workflowHierarchyHdrForm.controls.workflowName.setValue('');
      this.workflowDescriptionListPageNumber = 1;
      this.workflowDescriptionCombo = [];

      return;
    }
    
    const searchData = {
      workflowProcessId : event.workflowProcessId,
      locationId : this.workflowHierarchyHdrForm.controls.locationId.value
    }

    this.commonService.commonListService("fetchListOfAllWorkflowHierarchy.sams", searchData).subscribe(
      data => {
          if(data.responseData.dataTotalRecCount === 0){
            this.workflowHierarchyHdrForm.controls.workflowProcessId.setValue(event.workflowProcessId);
            this.translateService.get([event.workflowProcessName])
            .subscribe((val) => {
              const status = Object.values(val)
              this.workflowHierarchyHdrForm.controls.workflowProcessName.setValue(status[0].toString());
            });
            this.workflowHierarchyHdrForm.controls.workflowDescriptionId.setValue(0);
            this.workflowHierarchyHdrForm.controls.workflowName.setValue('');
            this.workflowDescriptionListPageNumber = 1;
            this.workflowDescriptionCombo = [];
            this.processListPageNumber = 1;
            this.processCombo = [];
          }
          else{

            this.commonService.openToastWarningMessage("In workflow hierarchy list the process name already exist !");
            this.workflowHierarchyHdrForm.controls.workflowProcessId.setValue(0);
            this.workflowHierarchyHdrForm.controls.workflowProcessName.setValue('');
            this.workflowHierarchyHdrForm.controls.workflowDescriptionId.setValue(0);
            this.workflowHierarchyHdrForm.controls.workflowName.setValue('');
            this.workflowDescriptionListPageNumber = 1;
            this.workflowDescriptionCombo = [];
            this.processListPageNumber = 1;
            this.processCombo = [];
          }
        })
  }

  listOfWorkflowDescription(searchValue) {
    this.scrollWorkflowDescriptionSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllWorkflowDescriptionCombo.sams', searchValue.term, 
      this.workflowHierarchyHdrForm.controls.workflowProcessId.value > 0 ? this.workflowHierarchyHdrForm.controls.workflowProcessId.value : '', '',
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
      this.workflowHierarchyHdrForm.controls.workflowDescriptionId.setValue(0);
      this.workflowHierarchyHdrForm.controls.workflowName.setValue('');
      this.workflowDescriptionListPageNumber = 1;
      this.workflowDescriptionCombo = [];
    } else {
      this.workflowHierarchyHdrForm.controls.workflowDescriptionId.setValue(event.workflowDescriptionId);
      this.workflowHierarchyHdrForm.controls.workflowName.setValue(event.workflowName);
      this.workflowDescriptionListPageNumber = 1;
      this.workflowDescriptionCombo = [];
    }
  }

  addLevelInfo(element,mode,index) {
    let dialogRef = this.dialog.open(WorkflowHierarchyLevelCreateComponent, {
      data: { 
        'workflowDtlInfo': element,
        'mode': mode,
        'index': this.workHierarchyDtlDataSource.data.length <= 0 ? 1 : this.workHierarchyDtlDataSource.data.length + 1,  
        'workflowHierarchyHdrId':this.workflowHierarchyHdrForm.controls.workflowHierarchyHdrId.value,
 		    'locationId': this.workflowHierarchyHdrForm.controls.locationId.value,
        'workflowProcessId': this.workflowHierarchyHdrForm.controls.workflowProcessId.value
      },
       width: "80%", height: "500px"      
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          console.log(data);
                         
          if(index === 0 && mode === 'add'){
            this.workHierarchyDtlDataSource.data = this.workHierarchyDtlDataSource.data.concat([data]);
            this.commonService.openToastSuccessMessage('Record Added Successfully.');
          }else {
            this.workHierarchyDtlDataSource.data.splice(index,1,data);
            this.workHierarchyDtlDataSource._updateChangeSubscription();
            this.commonService.openToastSuccessMessage('Record Updated Successfully.');
          }                
        }
      });
  } 


}
