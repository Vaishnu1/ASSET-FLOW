import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-workflow-hierarchy-level-create',
  templateUrl: './workflow-hierarchy-level-create.component.html',
  styleUrls: ['./workflow-hierarchy-level-create.component.css']
})
export class WorkflowHierarchyLevelCreateComponent implements OnInit {

  workflowHierarchyDtlForm: FormGroup;

  isAddMode: boolean = false;
  isEditMode: boolean = false;
  isViewMode: boolean = false;

  level = [
    { id: 1, name: 'LEVEL 1' },
    { id: 2, name: 'LEVEL 2'},
    { id: 3, name: 'LEVEL 3' },
    { id: 4, name: 'LEVEL 4' },
    { id: 5, name: 'LEVEL 5' },
  ];

  recordsPerPageForCombo: string;

  empDesignationCombo1: any = [];
  scrollSyncEmpDesignation1: boolean = false;
  empDesignationPageNumber1: number;

  empDesignationCombo2: any = [];
  scrollSyncEmpDesignation2: boolean = false;
  empDesignationPageNumber2: number;

  empDesignationCombo3: any = [];
  scrollSyncEmpDesignation3: boolean = false;
  empDesignationPageNumber3: number;

  employeeCombo1: any = [];
  scrollSyncEmployeeCombo1: boolean = false;
  employeePageNumber1: number;

  employeeCombo2: any = [];
  scrollSyncEmployeeCombo2: boolean = false;
  employeePageNumber2: number;

  employeeCombo3: any = [];
  scrollSyncEmployeeCombo3: boolean = false;
  employeePageNumber3: number;

  conditionCombo1: any = [];
  scrollSyncConditionCombo1: boolean = false;
  conditionPageNumber1: number;

  conditionCombo2: any = [];
  scrollSyncConditionCombo2: boolean = false;
  conditionPageNumber2: number;

  processStatusCombo1: any = [];
  scrollSyncProcessStatus: boolean = false;
  processStatusPageNumber1: number;

  employee2Mandatory: String = "";
  employee3Mandatory: String = "";

  displayButton: string;
  getData: getData;

  CommonhintMsg = new CommonHint();
  
  constructor(private router: Router,
              private matDialogRef: MatDialogRef<WorkflowHierarchyLevelCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private assetOptimaConstants: AssetOptimaConstants,
              private samsServices: AssetOptimaServices,
              private commonService: CommonService,
              private changeDetectorRefs: ChangeDetectorRef,
              private dialog: MatDialog) {

      this.empDesignationPageNumber1 = 1;
      this.empDesignationPageNumber2 = 1;
      this.empDesignationPageNumber3 = 1;
      this.employeePageNumber1 = 1;
      this.employeePageNumber2 = 1;
      this.employeePageNumber3 = 1;
      this.conditionPageNumber1 = 1;
      this.conditionPageNumber2 = 1;
      this.processStatusPageNumber1 = 1;
      this.getData = new getData();

  }

  ngOnInit() {
    this.workflowHierarchyDtlForm = new FormGroup({
      workflowHierarchyDtlId: new FormControl(0),
      workflowHierarchyHdrId: new FormControl(this.data.workflowHierarchyHdrId),
      levelName: new FormControl('',[Validators.required]),
      levelSeqNo: new FormControl(0),

      empDesignationId1: new FormControl(0),
      empDesignationName1: new FormControl(null),
      employeeId1: new FormControl(0),
      employeeName1: new FormControl(null,[Validators.required]),

      empDesignationId2: new FormControl(0),
      empDesignationName2: new FormControl(null),
      employeeId2: new FormControl(0),
      employeeName2: new FormControl(null),

      empDesignationId3: new FormControl(0),
      empDesignationName3: new FormControl(null),
      employeeId3: new FormControl(0),
      employeeName3: new FormControl(null),

      condition1: new FormControl(''),
      condition2: new FormControl(''),

      active: new FormControl('true'),
      createdBy: new FormControl(''),
      updatedBy: new FormControl(''),
      createdDt: new FormControl(Date),
      updatedDt: new FormControl(Date),
      createdDtDisp: new FormControl(''),
      UpdatedDtDisp: new FormControl(''),
      processStatus: new FormControl(''),
      workflowProcessId: new FormControl(0),

      prWithoutUnitPrice: new FormControl('false'),
      prWithoutSupplier: new FormControl('false'),
    });

    this.workflowHierarchyDtlForm.controls.empDesignationName2.disable();
    this.workflowHierarchyDtlForm.controls.employeeName2.disable();
    this.workflowHierarchyDtlForm.controls.empDesignationName3.disable();
    this.workflowHierarchyDtlForm.controls.employeeName3.disable();
    this.workflowHierarchyDtlForm.controls.condition2.disable();
  }

  ngAfterViewInit() {
    this.setLevelNameAndSeq(this.data.index);
    if(this.data.workflowDtlInfo != 0){
      if(this.data.mode == 'view'){
        this.isViewMode = true;
        this.workflowHierarchyDtlForm.disable();
      }else{
        this.displayButton="Update";
      }
      this.workflowHierarchyDtlForm.patchValue(this.data.workflowDtlInfo);
    }else{
      if(this.data.mode == 'add'){
        this.displayButton="Submit";
        // this.workflowHierarchyDtlForm.controls.employeeName1.disable();
        // this.workflowHierarchyDtlForm.controls.employeeName2.disable();
        // this.workflowHierarchyDtlForm.controls.employeeName3.disable();
      }
    }
  }

  setLevelNameAndSeq(i){
    if(i==1){
      // this.workflowHierarchyDtlForm.controls.levelName.setValue('LEVEL 1');
      // this.workflowHierarchyDtlForm.controls.levelName.disable();
      this.workflowHierarchyDtlForm.controls.levelSeqNo.setValue(i);
    }else if(i==2){
      // this.workflowHierarchyDtlForm.controls.levelName.setValue('LEVEL 2');
      // this.workflowHierarchyDtlForm.controls.levelName.disable();
      this.workflowHierarchyDtlForm.controls.levelSeqNo.setValue(i);
    }else if(i==3){
      // this.workflowHierarchyDtlForm.controls.levelName.setValue('LEVEL 3');
      // this.workflowHierarchyDtlForm.controls.levelName.disable();
      this.workflowHierarchyDtlForm.controls.levelSeqNo.setValue(i);
    }else if(i==4){
      // this.workflowHierarchyDtlForm.controls.levelName.setValue('LEVEL 4');
      // this.workflowHierarchyDtlForm.controls.levelName.disable();
      this.workflowHierarchyDtlForm.controls.levelSeqNo.setValue(i);
    }else if(i==5){
      // this.workflowHierarchyDtlForm.controls.levelName.setValue('LEVEL 5');
      // this.workflowHierarchyDtlForm.controls.levelName.disable();
      this.workflowHierarchyDtlForm.controls.levelSeqNo.setValue(i);
    }
  }

  exit() {
    this.matDialogRef.close();
  }

  saveWorkflowHierarchyDtl(){    
    this.matDialogRef.close(this.workflowHierarchyDtlForm.getRawValue());
  }

  listOfEmployeeDesignation1(searchValue) {
    this.scrollSyncEmpDesignation1 = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDesignationCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.empDesignationPageNumber1).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.empDesignationPageNumber1 , this.empDesignationCombo1 , data.responseData.comboList)
          this.empDesignationPageNumber1 = this.getData.pageNumber;
          this.empDesignationCombo1 = this.getData.dataList;
          this.scrollSyncEmpDesignation1 = false;
        }
      );
  }
 
  setEmployeeDesignation1(event) {
    
    this.workflowHierarchyDtlForm.controls.employeeName1.setValue("");
    this.workflowHierarchyDtlForm.controls.employeeId1.setValue(0); 
    this.workflowHierarchyDtlForm.controls.condition1.setValue(""); 
    this.employeePageNumber1 == 1;
    this.employeeCombo1 = [];

    if (event === undefined) {
      this.workflowHierarchyDtlForm.controls.empDesignationId1.setValue(0);
      this.workflowHierarchyDtlForm.controls.empDesignationName1.setValue('');
      this.empDesignationPageNumber1 = 1;
      this.workflowHierarchyDtlForm.controls.employeeId1.setValue(0);
      this.workflowHierarchyDtlForm.controls.employeeName1.setValue('');  

    } else {
      this.workflowHierarchyDtlForm.controls.empDesignationId1.setValue(event.designationId);
      this.workflowHierarchyDtlForm.controls.empDesignationName1.setValue(event.designationName); 
    }
  }

  listOfEmployeeName1(searchValue) {
    const empDesignationId1 = this.workflowHierarchyDtlForm.controls.empDesignationId1.value;
    const locationId = this.data.locationId; 
    this.scrollSyncEmployeeCombo1 = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllWorkflowEmployeeCombo.sams', searchValue.term, 
    empDesignationId1, locationId, this.recordsPerPageForCombo, this.employeePageNumber1).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.employeePageNumber1 , this.employeeCombo1 , data.responseData.comboList)
          this.employeePageNumber1 = this.getData.pageNumber;
          this.employeeCombo1 = this.getData.dataList;
          this.scrollSyncEmployeeCombo1 = false;
        }
      );
  }
 
  setEmployeeNameCombo1(event) {
    if (event === undefined) {
      this.workflowHierarchyDtlForm.controls.employeeId1.setValue(0);
      this.workflowHierarchyDtlForm.controls.employeeName1.setValue('');
      this.employeePageNumber1 = 1;
      this.workflowHierarchyDtlForm.controls.empDesignationId1.setValue(0);
      this.workflowHierarchyDtlForm.controls.empDesignationName1.setValue(''); 
    } else {
      this.workflowHierarchyDtlForm.controls.employeeId1.setValue(event.employeeId);
      this.workflowHierarchyDtlForm.controls.employeeName1.setValue(event.employeeFirstName);

      let employeeId1 = this.workflowHierarchyDtlForm.controls.employeeId1.value;
      let employeeId2 = this.workflowHierarchyDtlForm.controls.employeeId2.value;
      let employeeId3 = this.workflowHierarchyDtlForm.controls.employeeId3.value;

      if (employeeId1 == employeeId2) {
        this.commonService.openToastWarningMessage("Employee 1 and Employee 2 should not be same");
        this.workflowHierarchyDtlForm.controls.employeeId1.setValue(0);
        this.workflowHierarchyDtlForm.controls.employeeName1.setValue('');
      }

      if (employeeId1 == employeeId3) {
        this.commonService.openToastWarningMessage("Employee 1 and Employee 3 should not be same");
        this.workflowHierarchyDtlForm.controls.employeeId1.setValue(0);
        this.workflowHierarchyDtlForm.controls.employeeName1.setValue('');
      }

      this.workflowHierarchyDtlForm.controls.empDesignationId1.setValue(event.designationId);
      this.workflowHierarchyDtlForm.controls.empDesignationName1.setValue(event.designationName); 

    }
  }

  listOfEmployeeDesignation2(searchValue) {
    this.scrollSyncEmpDesignation2 = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDesignationCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.empDesignationPageNumber2).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.empDesignationPageNumber2 , this.empDesignationCombo2 , data.responseData.comboList)
          this.empDesignationPageNumber2 = this.getData.pageNumber;
          this.empDesignationCombo2 = this.getData.dataList;
          this.scrollSyncEmpDesignation2 = false;
        }
      );
  }
 
  setEmployeeDesignation2(event) {

    this.workflowHierarchyDtlForm.controls.employeeName2.setValue("");
    this.workflowHierarchyDtlForm.controls.employeeId2.setValue(0); 
    this.workflowHierarchyDtlForm.controls.condition2.setValue(""); 
    this.employeePageNumber2 == 1;
    this.employeeCombo2 = [];

    if (event === undefined) {
      this.workflowHierarchyDtlForm.controls.empDesignationId2.setValue(0);
      this.workflowHierarchyDtlForm.controls.empDesignationName2.setValue('');
      this.empDesignationPageNumber2 = 1;
      this.workflowHierarchyDtlForm.controls.employeeId2.setValue(0);
      this.workflowHierarchyDtlForm.controls.employeeName2.setValue('');
      this.employeePageNumber2 = 1;
      this.employeeCombo2 = [];

    } else {
      this.workflowHierarchyDtlForm.controls.empDesignationId2.setValue(event.designationId);
      this.workflowHierarchyDtlForm.controls.empDesignationName2.setValue(event.designationName); 
    }
  }

  listOfEmployeeName2(searchValue) {
    const empdesId2 = this.workflowHierarchyDtlForm.controls.empDesignationId2.value;
    const locationId = this.data.locationId;
    if(!(this.commonService.fetchSearchValue(searchValue))){
      this.employeeCombo2 = [];
      this.employeePageNumber2 = 1;
    }

    this.scrollSyncEmployeeCombo2 = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllWorkflowEmployeeCombo.sams', searchValue.term,
    empdesId2 > 0 ? empdesId2 : 0, locationId,
      this.recordsPerPageForCombo, this.employeePageNumber2).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.employeePageNumber2 , this.employeeCombo2 , data.responseData.comboList)
          this.employeePageNumber2 = this.getData.pageNumber;
          this.employeeCombo2 = this.getData.dataList;
          this.scrollSyncEmployeeCombo2 = false;
        }
      );
  }
 
  setEmployeeNameCombo2(event) {
    if (event === undefined) {
      this.workflowHierarchyDtlForm.controls.employeeId2.setValue(0);
      this.workflowHierarchyDtlForm.controls.employeeName2.setValue('');
      this.employeePageNumber2 = 1;
    } else {
      this.workflowHierarchyDtlForm.controls.employeeId2.setValue(event.employeeId);
      this.workflowHierarchyDtlForm.controls.employeeName2.setValue(event.employeeFirstName);

      let employeeId1 = this.workflowHierarchyDtlForm.controls.employeeId1.value;
      let employeeId2 = this.workflowHierarchyDtlForm.controls.employeeId2.value;
      let employeeId3 = this.workflowHierarchyDtlForm.controls.employeeId3.value;

      if (employeeId2 == employeeId1) {
        this.commonService.openToastWarningMessage("Employee 2 and Employee 1 should not be same");
        this.workflowHierarchyDtlForm.controls.employeeId2.setValue(0);
        this.workflowHierarchyDtlForm.controls.employeeName2.setValue('');
      }

      if (employeeId2 == employeeId3) {
        this.commonService.openToastWarningMessage("Employee 2 and Employee 3 should not be same");
        this.workflowHierarchyDtlForm.controls.employeeId2.setValue(0);
        this.workflowHierarchyDtlForm.controls.employeeName2.setValue('');
      }
      this.workflowHierarchyDtlForm.controls.empDesignationId2.setValue(event.designationId);
      this.workflowHierarchyDtlForm.controls.empDesignationName2.setValue(event.designationName); 
    }
  }

  listOfEmployeeDesignation3(searchValue) {
    this.scrollSyncEmpDesignation3 = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDesignationCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.empDesignationPageNumber3).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.empDesignationPageNumber3 , this.empDesignationCombo3 , data.responseData.comboList)
          this.empDesignationPageNumber3 = this.getData.pageNumber;
          this.empDesignationCombo3 = this.getData.dataList;
          this.scrollSyncEmpDesignation3 = false;
        }
      );
  }
 
  setEmployeeDesignation3(event) {
    if (event === undefined) {
      this.workflowHierarchyDtlForm.controls.empDesignationId3.setValue(0);
      this.workflowHierarchyDtlForm.controls.empDesignationName3.setValue('');
      this.empDesignationPageNumber3 = 1;
      this.workflowHierarchyDtlForm.controls.employeeId3.setValue(0);
      this.workflowHierarchyDtlForm.controls.employeeName3.setValue('');
      this.employeePageNumber3 = 1;
      this.employeeCombo3 = [];

    } else {
      this.workflowHierarchyDtlForm.controls.empDesignationId3.setValue(event.designationId);
      this.workflowHierarchyDtlForm.controls.empDesignationName3.setValue(event.designationName);

      //this.workflowHierarchyDtlForm.controls.employeeName3.enable();
    }
  }

  listOfEmployeeName3(searchValue) {
    const empDesignationId3 = this.workflowHierarchyDtlForm.controls.empDesignationId3.value;
    const locationId = this.data.locationId;
    this.scrollSyncEmployeeCombo3 = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllWorkflowEmployeeCombo.sams', searchValue.term, 
    empDesignationId3 > 0 ? empDesignationId3 : 0, locationId,
      this.recordsPerPageForCombo, this.employeePageNumber3).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.employeePageNumber3 , this.employeeCombo3 , data.responseData.comboList)
          this.employeePageNumber3 = this.getData.pageNumber;
          this.employeeCombo3 = this.getData.dataList;
          this.scrollSyncEmployeeCombo3 = false;
        }
      );
  }
 
  setEmployeeNameCombo3(event) {
    if (event === undefined) {
      this.workflowHierarchyDtlForm.controls.employeeId3.setValue(0);
      this.workflowHierarchyDtlForm.controls.employeeName3.setValue('');
      this.employeePageNumber3 = 1;
    } else {
      this.workflowHierarchyDtlForm.controls.employeeId3.setValue(event.employeeId);
      this.workflowHierarchyDtlForm.controls.employeeName3.setValue(event.employeeFirstName);

      let employeeId1 = this.workflowHierarchyDtlForm.controls.employeeId1.value;
      let employeeId2 = this.workflowHierarchyDtlForm.controls.employeeId2.value;
      let employeeId3 = this.workflowHierarchyDtlForm.controls.employeeId3.value;

      if (employeeId3 == employeeId2) {
        this.commonService.openToastWarningMessage("Employee 3 and Employee 2 should not be same");
        this.workflowHierarchyDtlForm.controls.employeeId3.setValue(0);
        this.workflowHierarchyDtlForm.controls.employeeName3.setValue('');
      }

      if (employeeId3 == employeeId1) {
        this.commonService.openToastWarningMessage("Employee 3 and Employee 1 should not be same");
        this.workflowHierarchyDtlForm.controls.employeeId3.setValue(0);
        this.workflowHierarchyDtlForm.controls.employeeName3.setValue('');
      }
      this.workflowHierarchyDtlForm.controls.empDesignationId3.setValue(event.designationId);
      this.workflowHierarchyDtlForm.controls.empDesignationName3.setValue(event.designationName); 

    }
  }

  listOfConditionCombo1(searchValue) {
    this.scrollSyncConditionCombo1 = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllWorkflowConditionCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.conditionPageNumber1).subscribe(
        (data) => {

          this.getData = new getData(); 
          this.getData = this.commonService.fetchDataList(searchValue, this.conditionPageNumber1 , this.conditionCombo1, data.responseData.comboList) 
          this.conditionPageNumber1 = this.getData.pageNumber;
          this.conditionCombo1 = this.getData.dataList;  
          this.scrollSyncConditionCombo1 = false;
        }
      );
  }
 
  setConditionCombo1(event) {
    if (event === undefined) {
      this.workflowHierarchyDtlForm.controls.condition1.setValue('');
      this.conditionPageNumber1 = 1;

      //Combo Mandatory Changes
      this.employee2Mandatory = "";  
      this.workflowHierarchyDtlForm.controls["employeeName2"].setValidators([]);
      this.workflowHierarchyDtlForm.controls["employeeName2"].updateValueAndValidity();

      this.workflowHierarchyDtlForm.controls.empDesignationId2.setValue(0);
      this.workflowHierarchyDtlForm.controls.empDesignationName2.setValue('');
      this.workflowHierarchyDtlForm.controls.empDesignationName2.disable();

      this.workflowHierarchyDtlForm.controls.employeeId2.setValue(0);
      this.workflowHierarchyDtlForm.controls.employeeName2.setValue('');
      this.workflowHierarchyDtlForm.controls.employeeName2.disable();

      this.workflowHierarchyDtlForm.controls.condition2.setValue('');
      this.workflowHierarchyDtlForm.controls.condition2.disable();


      this.workflowHierarchyDtlForm.controls.empDesignationId3.setValue(0);
      this.workflowHierarchyDtlForm.controls.empDesignationName3.setValue('');
      this.workflowHierarchyDtlForm.controls.empDesignationName3.disable();

      this.workflowHierarchyDtlForm.controls.employeeId3.setValue(0);
      this.workflowHierarchyDtlForm.controls.employeeName3.setValue('');
      this.workflowHierarchyDtlForm.controls.employeeName3.disable();

    } else {
      this.workflowHierarchyDtlForm.controls.condition1.setValue(event.workflowConditionName);

      //Combo Mandatory Changes
      this.employee2Mandatory = "*";    
      this.workflowHierarchyDtlForm.controls["employeeName2"].setValidators(Validators.required);
      this.workflowHierarchyDtlForm.controls["employeeName2"].updateValueAndValidity();
      this.workflowHierarchyDtlForm.controls.empDesignationName2.enable();
      this.workflowHierarchyDtlForm.controls.employeeName2.enable();
      this.workflowHierarchyDtlForm.controls.condition2.enable();

    }
  }

  listOfConditionCombo2(searchValue) {
    this.scrollSyncConditionCombo2 = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllWorkflowConditionCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.conditionPageNumber2).subscribe(
        (data) => {

          this.getData = new getData(); 
          this.getData = this.commonService.fetchDataList(searchValue, this.conditionPageNumber2 , this.conditionCombo2, data.responseData.comboList) 
          this.conditionPageNumber2 = this.getData.pageNumber;
          this.conditionCombo2 = this.getData.dataList; 
          this.scrollSyncConditionCombo2 = false; 
        }
      );
  }
 
  setConditionCombo2(event) {
    if (event === undefined) {
      this.workflowHierarchyDtlForm.controls.condition2.setValue('');
      this.conditionPageNumber2 = 1;
      //Combo Mandatory Changes
      this.employee3Mandatory = "";  
      this.workflowHierarchyDtlForm.controls["employeeName3"].setValidators([]);
      this.workflowHierarchyDtlForm.controls["employeeName3"].updateValueAndValidity();

      this.workflowHierarchyDtlForm.controls.empDesignationId3.setValue(0);
      this.workflowHierarchyDtlForm.controls.empDesignationName3.setValue('');
      this.workflowHierarchyDtlForm.controls.empDesignationName3.disable();

      this.workflowHierarchyDtlForm.controls.employeeId3.setValue(0);
      this.workflowHierarchyDtlForm.controls.employeeName3.setValue('');
      this.workflowHierarchyDtlForm.controls.employeeName3.disable();

    } else {
      this.workflowHierarchyDtlForm.controls.condition2.setValue(event.workflowConditionName);

      //Combo Mandatory Changes
      this.employee3Mandatory = "*";  
      this.workflowHierarchyDtlForm.controls["employeeName3"].setValidators(Validators.required);
      this.workflowHierarchyDtlForm.controls["employeeName3"].updateValueAndValidity();
      
      this.workflowHierarchyDtlForm.controls.empDesignationName3.enable();
      this.workflowHierarchyDtlForm.controls.employeeName3.enable();

    }
  }

  listOfProcessStatus(searchValue) {
    this.scrollSyncProcessStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllWorkflowProcessStatusCombo.sams', searchValue.term, this.data.workflowProcessId, '',
      this.recordsPerPageForCombo, this.processStatusPageNumber1).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.processStatusPageNumber1 , this.processStatusCombo1 , data.responseData.comboList)
          this.processStatusPageNumber1 = this.getData.pageNumber;
          this.processStatusCombo1 = this.getData.dataList;
          this.scrollSyncProcessStatus = false;
        }
      );
  }
 
  setProcessStatus(event) {
    
    if (event === undefined) {
      this.workflowHierarchyDtlForm.controls.processStatus.setValue('');
      this.workflowHierarchyDtlForm.controls.workflowProcessId.setValue(0);
      this.processStatusPageNumber1 = 1;
      this.processStatusCombo1 = [];
    } else {
      this.workflowHierarchyDtlForm.controls.processStatus.setValue(event.processName);
      this.workflowHierarchyDtlForm.controls.workflowProcessId.setValue(event.workflowProcessId);
    }
  }


}
