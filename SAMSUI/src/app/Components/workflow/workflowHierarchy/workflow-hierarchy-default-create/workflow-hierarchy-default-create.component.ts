import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getData } from 'src/app/Model/common/fetchListData';
import { WorkflowDescriptionCreateComponent } from '../../workflowDescription/workflow-description-create/workflow-description-create.component';

@Component({
  selector: 'app-workflow-hierarchy-default-create',
  templateUrl: './workflow-hierarchy-default-create.component.html',
  styleUrls: ['./workflow-hierarchy-default-create.component.css']
})
export class WorkflowHierarchyDefaultCreateComponent implements OnInit {

  workflowHierarchyHdrForm: FormGroup;

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  displayButton: string;

  uploadFlagWorkflowDescription: boolean = false;

  recordsPerPageForCombo:string;

  processCombo: any = [];
  scrollProcessSync: boolean = false;
  processListPageNumber: number;
  getData: getData;

  scrollLocationNameSync: boolean;
  locationNamePageNumber: number;
  locationCombo: any = [];

  scrollSyncEmployeeCombo: boolean;
  employeePageNumber: number;
  employeeCombo: any = [];

  constructor(public dialogRef: MatDialogRef<WorkflowDescriptionCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              public commonService: CommonService,
              public assetOptimeMthnd: AssetOptimaServices ) { 
           this.getData = new getData();
           this.locationNamePageNumber = 1;
           this.employeePageNumber = 1;
    }

  ngOnInit() {
    this.workflowHierarchyHdrForm = new FormGroup({
      workflowHierarchyHdrId   : new FormControl(0),  
      locationId               : new FormControl(0),
      locationName             : new FormControl('',[Validators.required,Validators.maxLength(100)]),
      employeeName             : new FormControl('',[Validators.required]),
      employeeId               : new FormControl(0),
      active                   : new FormControl('true')
    });
  }

  ngAfterViewInit() {
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit(){ 
    console.log(this.workflowHierarchyHdrForm.getRawValue());    
    this.uploadFlagWorkflowDescription = true;
    this.commonService.commonInsertService('saveOrUpdateDefaultWorkflowHierarchyHdr.sams',this.workflowHierarchyHdrForm.getRawValue()).subscribe(
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
    this.employeePageNumber = 1;
    this.employeeCombo = [];
    this.workflowHierarchyHdrForm.controls.employeeId.setValue(0);
    this.workflowHierarchyHdrForm.controls.employeeName.setValue('');
  }
 

  listOfEmployeeName(searchValue) {
    let locId = this.workflowHierarchyHdrForm.controls.locationId.value;
    this.scrollSyncEmployeeCombo = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllWorkflowEmployeeCombo.sams', searchValue.term, '', locId, this.recordsPerPageForCombo, this.employeePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.employeePageNumber , this.employeeCombo , data.responseData.comboList)
          this.employeePageNumber = this.getData.pageNumber;
          this.employeeCombo = this.getData.dataList;
          this.scrollSyncEmployeeCombo = false;
        }
      );
  }


  setEmployeeNameCombo(event) {
    if (event === undefined) {
      this.workflowHierarchyHdrForm.controls.employeeId.setValue(0);
      this.workflowHierarchyHdrForm.controls.employeeName.setValue('');
      this.employeePageNumber = 1;
    } else {      
      this.workflowHierarchyHdrForm.controls.employeeId.setValue(event.employeeId);
      this.workflowHierarchyHdrForm.controls.employeeName.setValue(event.employeeFirstName);
    }
  }


}
