import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AssetListComponent } from '../asset-list/asset-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { MatTable } from '@angular/material/table';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetAssignee } from 'src/app/Model/master/asset-assignee';

@Component({
  selector: 'app-bulk-asset-reassign',
  templateUrl: './bulk-asset-reassign.component.html',
  styleUrls: ['./bulk-asset-reassign.component.css']
})
export class BulkAssetReassignComponent implements OnInit {

  assigneeDisplayedColumns = ['sno', 'deptName', 'assignedTo', 'primaryTechnician','secondaryTechnician','pmPATechnician','qaTechnician', 'action']
  @ViewChild('matAssignee') tableAssignee: MatTable<any>;
  public assetAssigneeDataSource: AssetAssignee[] = [];
  
  public assetAssigneeForm : FormGroup;
  assignToPersonPageNumber: number = 0;
  assignToPersonCombo: any = [];
  scrollsyncAssignToPerson = false;
  getData: getData;
  recordsPerPageForCombo: string;
  diableAssigneeAddButton = false;

  constructor(public dialogRef: MatDialogRef<AssetListComponent>,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private changeDetectorRefs: ChangeDetectorRef,
    private assetOptimaConstants: AssetOptimaConstants,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.assignToPersonPageNumber = 1;
    this.getData = new getData();
    }

  ngOnInit(): void {

    this.assetAssigneeForm = new FormGroup({
      assetAssigneeId: new FormControl(0),
      assignedToEmpId: new FormControl(0),
      assetId: new FormControl(0),
      assigneeTypeId: new FormControl(0),
      startDt: new FormControl('', [Validators.required]),
      endDt: new FormControl('',[Validators.required]),
      defaultPersonIncharge: new FormControl(false),
      assigneeTypeName: new FormControl(''),
      startDtDisp: new FormControl(''),
      endDtDisp: new FormControl(''),
      assignedPersonContactNumber: new FormControl(''),
      assignedPersonEmail: new FormControl(''),
      assignToEmpName: new FormControl('', [Validators.required]),
      departmentName: new FormControl('', [Validators.required]),
      departmentId: new FormControl(0),
      assignedVolumeLicenseQty: new FormControl(0),
      primaryTechnician: new FormControl(false),
      secondaryTechnician: new FormControl(false),
      pmPaTechnician: new FormControl(false),
      qaTechnician: new FormControl(false)
    })
  }

  exit(){
    this.dialogRef.close();
  }

  loadAssignToComboData(searchValue) {
    this.scrollsyncAssignToPerson = true;
    const locId = this.data.locId;
    const departmentId = this.assetAssigneeForm.controls.departmentId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllEmployeeComboByLocId.sams', 0, searchValue.term, locId, this.recordsPerPageForCombo, this.assignToPersonPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assignToPersonPageNumber , this.assignToPersonCombo , data.responseData.comboList)
        this.assignToPersonPageNumber = this.getData.pageNumber;
        this.assignToPersonCombo = this.getData.dataList;
        this.scrollsyncAssignToPerson = false;
      }
    );
  }

  selectedAssignToPerson(event) {
    if (event === undefined) {
      this.assetAssigneeForm.controls['assignedToEmpId'].setValue(0);
      this.assetAssigneeForm.controls['assignToEmpName'].setValue('');
      this.assetAssigneeForm.controls.assignedPersonEmail.setValue('');
      this.assetAssigneeForm.controls.assignedPersonContactNumber.setValue('')
      this.assignToPersonPageNumber = 1;
      this.assignToPersonCombo  = [];
    } else {
      if (this.assetAssigneeDataSource.length > 0) {
        let checkUser = this.assetAssigneeDataSource.findIndex(data => data.assignedToEmpId === event.employeeId && data.approvalStatus != 'REJECTED') !== -1;
          if (checkUser) {
            this.commonService.openToastWarningMessage("Asset Is Already Assigned To This Employee.")
            this.diableAssigneeAddButton = false;
            this.assetAssigneeForm.controls['assignedToEmpId'].setValue(0);
            this.assetAssigneeForm.controls['assignToEmpName'].setValue('');
            this.assetAssigneeForm.controls.assignedPersonEmail.setValue('');
            this.assetAssigneeForm.controls.assignedPersonContactNumber.setValue('')
            this.assetAssigneeForm.controls.departmentId.setValue(0);
            this.assetAssigneeForm.controls.departmentName.setValue('');
          } else {
            this.assetAssigneeForm.controls['assignedToEmpId'].setValue(event.employeeId);
            this.assetAssigneeForm.controls['assignToEmpName'].setValue(event.employeeFirstName);
            this.assetAssigneeForm.controls.assignedPersonEmail.setValue(event.officeEmailId);
            this.assetAssigneeForm.controls.assignedPersonContactNumber.setValue(event.officeContactNo)
            this.assetAssigneeForm.controls.departmentId.setValue(event.departmentId);
            this.assetAssigneeForm.controls.departmentName.setValue(event.departmentName);
            this.diableAssigneeAddButton = true;
          }
      } else {
        this.assetAssigneeForm.controls['assignedToEmpId'].setValue(event.employeeId);
        this.assetAssigneeForm.controls['assignToEmpName'].setValue(event.employeeFirstName);
        this.assetAssigneeForm.controls.assignedPersonEmail.setValue(event.officeEmailId);
        this.assetAssigneeForm.controls.assignedPersonContactNumber.setValue(event.officeContactNo)
        this.assetAssigneeForm.controls.departmentId.setValue(event.departmentId);
        this.assetAssigneeForm.controls.departmentName.setValue(event.departmentName);
        this.diableAssigneeAddButton = true;
      }
    }
  }

  addNewAssetAssignee() {
    this.assetAssigneeForm.controls.assigneeTypeName.setValue('TECHNICIAN');
    this.assetAssigneeForm.controls.assigneeTypeId.setValue(0);
    this.assetAssigneeForm.controls.startDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
    this.assetAssigneeForm.controls.endDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.assetOptimaConstants.defaultAssigneeEndDate))
    this.assetAssigneeForm.controls.assignedVolumeLicenseQty.setValue(0);
    this.assetAssigneeDataSource.push(this.assetAssigneeForm.value);
    this.diableAssigneeAddButton = false;
    this.addAssetAssignee();
  }

  addAssetAssignee() {
    this.assetAssigneeForm = new FormGroup({
      assetAssigneeId: new FormControl(0),
      assignedToEmpId: new FormControl(0),
      assetId: new FormControl(0),
      assigneeTypeId: new FormControl(0),
      startDt: new FormControl(''),
      endDt: new FormControl('',[Validators.required]),
      defaultPersonIncharge: new FormControl(false),
      assigneeTypeName: new FormControl(''),
      startDtDisp: new FormControl(''),
      endDtDisp: new FormControl(''),
      assignedPersonContactNumber: new FormControl(''),
      assignedPersonEmail: new FormControl(''),
      assignToEmpName: new FormControl('', [Validators.required]),
      departmentName: new FormControl('', [Validators.required]),
      departmentId: new FormControl(0),
      assignedVolumeLicenseQty: new FormControl(0),
      primaryTechnician: new FormControl(false),
      secondaryTechnician: new FormControl(false),
      pmPaTechnician: new FormControl(false),
      qaTechnician: new FormControl(false)
    })
    this.changeDetectorRefs.detectChanges();
    this.tableAssignee.renderRows();
  }

  deleteAssetAssignee(i){
    this.assetAssigneeDataSource.splice(i,1);
    this.changeDetectorRefs.detectChanges();
    this.tableAssignee.renderRows();
  }

  reAssigneeSave(){
    let ptCount = 0;
    let checkFlag = true;
    for(let i=0; i<this.assetAssigneeDataSource.length; i++){
      if(!this.assetAssigneeDataSource[i].primaryTechnician && !this.assetAssigneeDataSource[i].secondaryTechnician && !this.assetAssigneeDataSource[i].pmPaTechnician && !this.assetAssigneeDataSource[i].qaTechnician){
        this.commonService.openToastWarningMessage("Please select the appropriate technician type for the Assigned Person "+this.assetAssigneeDataSource[i].assignToEmpName+ " to proceed");
        checkFlag = false;
      }
      if(this.assetAssigneeDataSource[i].primaryTechnician){
         ptCount = ptCount + 1;
      }
    }
    if(ptCount > 1){
      this.commonService.openToastWarningMessage("Only one primary technician can be assigned. Please modify your selection to proceed");
    } else if(checkFlag){
      var obj = {
        'reAssigneeList': this.assetAssigneeDataSource,
        'assetIdList': this.data.assetIds
      }
        this.commonService.showSpinner();
        this.commonService.commonInsertService('saveAssetReassignInfo.sams', obj).subscribe(
          data => {
            if (data.success) {
              this.commonService.openToastSuccessMessage("Assets Reassigned Successfully.");
              this.commonService.hideSpinner();
              this.exit();
            } else {
              this.commonService.openToastErrorMessage(data.message);
            }
          }
        );
        this.commonService.hideSpinner();
    }
    
  }

}
