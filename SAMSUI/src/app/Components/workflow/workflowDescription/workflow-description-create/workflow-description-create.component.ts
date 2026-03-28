import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { getData } from 'src/app/Model/common/fetchListData';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-workflow-description-create',
  templateUrl: './workflow-description-create.component.html',
  styleUrls: ['./workflow-description-create.component.css']
})
export class WorkflowDescriptionCreateComponent implements OnInit {

  workflowDescriptionForm: FormGroup;

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  displayButton: string;

  uploadFlagWorkflowDescription: boolean = false;

  recordsPerPageForCombo:string;

  processCombo: any = [];
  scrollProcessSync: boolean = false;
  processListPageNumber: number;
  getData: getData;

  constructor(public dialogRef: MatDialogRef<WorkflowDescriptionCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              public commonService: CommonService,
              public assetOptimeMthnd: AssetOptimaServices ,
              private translateService: TranslateService,
              private cdr: ChangeDetectorRef) { 
     
      this.processListPageNumber = 1;
      this.getData = new getData();
    }

  ngOnInit() {
    this.workflowDescriptionForm = new FormGroup({
      workflowDescriptionId    : new FormControl(''),
      orgId                    : new FormControl(0),
      workflowName             : new FormControl('',[Validators.required,Validators.maxLength(100)]),
      workflowProcessId         : new FormControl(0),
      workflowProcessName       : new FormControl(null,[Validators.required,Validators.maxLength(100)]),
      //COMMON OBJECTS
      createdBy                : new FormControl(''),
      createdDt                : new FormControl(''),
      updatedDt                : new FormControl(''),
      createdDtDisp            : new FormControl(''),
      updatedBy                : new FormControl(''),
      updatedDtDisp            : new FormControl(''),
      pageNumber               : new FormControl(''),
      recordsPerPage           : new FormControl(''),
      active                   : new FormControl(true),
    });
  }

  ngAfterViewInit() {
    if(this.data.workflowDescriptionData !=0 ){
      this.translateService.get(this.data.workflowDescriptionData.workflowProcessName)
      .subscribe(val => { 
    this.workflowDescriptionForm.patchValue(this.data.workflowDescriptionData); 
        this.workflowDescriptionForm.controls.workflowProcessName.setValue(val);  
      });
      if(this.data.mode == 'view'){
        this.headingDisplay = "View";
        this.workflowDescriptionForm.disable();
      }else if(this.data.mode == 'edit'){
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      }}else{
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
    }
    this.cdr.detectChanges();
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit(){ 
    
    this.uploadFlagWorkflowDescription = true;
    this.commonService.commonInsertService('saveOrUpdateWorkflowDescription.sams',this.workflowDescriptionForm.value).subscribe(
      data => {
        if(data.success){
          this.uploadFlagWorkflowDescription = false;
          this.commonService.openToastSuccessMessage(data.message);
          this.dialogRef.close();
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadFlagWorkflowDescription = false;
        }
      });
  }

  listOfWorkflowProcess(searchValue) {
    this.scrollProcessSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '30' : '';
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
    const searchData = {
      workflowProcessId : event,
    }
    
    this.processListPageNumber = 1;
    
     this.commonService.commonListService("fetchListOfAllWorkflowDescription.sams", searchData).subscribe(
              data => {
                if(data.responseData.dataTotalRecCount === 0){
                  this.workflowDescriptionForm.controls.workflowProcessId.setValue(event);
                }
                else{
      
                  this.commonService.openToastWarningMessage("In workflow description list the process name already exist !");
                  this.workflowDescriptionForm.controls.workflowProcessId.setValue(0);
                  this.workflowDescriptionForm.controls.workflowProcessName.setValue('');
                }
              })
  }

}

