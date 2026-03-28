import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices'; 
import { Location } from '@angular/common';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';

@Component({
  selector: 'app-service-request-training',
  templateUrl: './service-request-training.component.html',
  styleUrls: ['./service-request-training.component.css']
})
export class ServiceRequestTrainingComponent implements OnInit {

  srTrainingForm: FormGroup;

  headingDisplay: string;
  buttonDisplay: string;

  modeDisplay: boolean = true;
  uploadFlag: boolean = false;
  updateByBatch = false;

  scrollsyncDesignationName: boolean = false;
  recordsPerPageForCombo: string;
  employeePageNumber: number;
  designationName: any = [];
  employee: any = [];

  employeeList: any = [];

  srTrainingEmpList: any[];

  dispSRTrainingEmpColumns = ['sno','employeeDispName','add'];

  trainingType = [
    { id: 1, name: 'CLINICAL' },
    { id: 2, name: 'TECHNICAL' }
  ];

  constructor(public dialogRef: MatDialogRef<ServiceRequestTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private dialog: MatDialog, 
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices, 
    private detectorRefs: ChangeDetectorRef,  
    private readonly location:Location) { 
      this.employeePageNumber = 1;
    }

  ngOnInit() {
    this.srTrainingForm = new FormGroup({
      srId: new FormControl(this.data.srId),
      srTrainingId: new FormControl(0),
      trainingTypeId: new FormControl('0'),
      trainingTypeName: new FormControl('', [Validators.required]),
      trainingCompany: new FormControl('', [Validators.required]),
      trainerName: new FormControl(''),
      traineerContactNo: new FormControl(''),
      traineerEmailId: new FormControl(''),
      trainingDtDisp: new FormControl('', [Validators.required]),
      designationName: new FormControl(''),
      trainingDesc: new FormControl('', [Validators.required]),
      updateByBatch: new FormControl(this.data.updateByBatch),
      selectedSrIdList: new FormControl(this.data.selectedSrIdList)
    });
    console.log(this.srTrainingForm.getRawValue());
    this.updateByBatch = this.data.updateByBatch;
    this.srTrainingEmpList = [];
    if (this.data.srTrainingData != null) {
      this.headingDisplay = "Edit";
      this.buttonDisplay = "Update";
    } else {
      this.headingDisplay = "Create";
      this.buttonDisplay = "Submit";
    }
  }

  ngAfterViewInit() {
    if (this.data.srTrainingData.srTrainingId > 0) {
      this.srTrainingForm.patchValue(this.data.srTrainingData);
      this.srTrainingEmpDesignation();
      if (this.data.type == 'view') {
        this.headingDisplay = "View";
        this.srTrainingForm.disable();
        this.modeDisplay = false;
      } else {
        this.headingDisplay = "Edit";
        this.buttonDisplay = "Update";
      }
    } else {
      this.srTrainingForm.controls.trainingDtDisp.setValue(this.commonService.getCurrentDateYYYYMMDD());
      this.headingDisplay = "Create";
      this.buttonDisplay = "Submit";
    }
    this.detectorRefs.detectChanges();
  }

  exit() {
    this.dialogRef.close();
  }

  listOfDesignationName(searchKey, pageNumberUpdateFlag) {
    this.scrollsyncDesignationName = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllDesignationCombo, searchKey.term, '', '',
      this.recordsPerPageForCombo, this.employeePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchKey))) {
            if (this.employeePageNumber === 1) {
              this.designationName = data.responseData.comboList;
            } else {
              this.designationName = this.employee.concat(data.responseData.comboList);
            }
          } else {
            this.designationName = data.responseData.comboList;
          }
          if (pageNumberUpdateFlag) {
          data.responseData.comboList.length != 0 ? this.employeePageNumber += 1 : this.employeePageNumber = 1; 
          }
        });
    this.scrollsyncDesignationName = false;
  }

  saveUpdateSrTrainingInfo() {
    this.srTrainingForm.controls.trainingDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srTrainingForm.controls.trainingDtDisp.value));
    
    if(this.updateByBatch) {
      const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          'confirmHeading': 'Confirmation',
          'confirmMsg':'Are you sure, You want to Update the selected Installation WO from Batch ?'
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status) {
            this.saveUpdateSrTrainingInfoByConfirmation();
          }
        });
    } else {
      this.saveUpdateSrTrainingInfoByConfirmation();
    }
  }

  saveUpdateSrTrainingInfoByConfirmation() {
    var srObj = {'srTrainingInfo': this.srTrainingForm.getRawValue(),
                 'srTrainingEmp' : this.srTrainingEmpList}

    this.commonService.commonInsertService('saveUpdateSrTraining.sams', srObj).subscribe(
      data => {
        if (data.success) {
          if (this.srTrainingForm.controls.srTrainingId.value <= 0) {
            this.commonService.openToastSuccessMessage('Training Added Successfully' + data.responseData+'.');
            if(this.updateByBatch) {
              this.navigateBackOnBatchUpdate();
            } else {
              this.dialogRef.close();
            }
          } else {
            this.commonService.openToastSuccessMessage('Training Updated Successfully' + data.responseData+'.');
            this.dialogRef.close();
          }
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.dialogRef.close();
        }
      }
    );
  }

  selectedTrainingType(event) {
    if (event === undefined) {
      this.srTrainingForm.controls.trainingTypeId.setValue(0);
      this.srTrainingForm.controls.trainingTypeName.setValue('');
    } else {
      this.srTrainingForm.controls.trainingTypeId.setValue(event.id);
      this.srTrainingForm.controls.trainingTypeName.setValue(event.name);
    }
  }

  selectedDesignation(event) {
    this.commonService.commonGetService('fetchEmpListByDesignation.sams', event.designationId).subscribe(
      data => {
        this.employeeList = data.responseData;
      },
      error => {
      }
    );
  }

  srTrainingEmpDesignation() {
    this.commonService.commonGetService('fetchEmpListBySRTraining.sams', this.srTrainingForm.controls.srTrainingId.value).subscribe(
      data => {
        if(data.responseData)
        this.srTrainingEmpList = data.responseData;
      },
      error => {
      }
    );
  }

  addEmployeeToList(element) {
    if(this.srTrainingEmpList.length > 0) {
      if (this.commonService.getIndexOfTheItem(this.srTrainingEmpList, true, 'employeeId', element.employeeId) == -1) {
        this.srTrainingEmpList.push(element);
      } else {
        this.commonService.openToastWarningMessage(element.employeeDispName + ' is Already added !!!');
      }
    } else {
      this.srTrainingEmpList.push(element);
    }
  }

  removeEmpFromList(element) {
    let index = this.commonService.getIndexOfTheItem(this.srTrainingEmpList, true, 'employeeId', element.employeeId);
    if (index >= 0) {
      this.srTrainingEmpList.splice(index, 1);
    }
  }

  navigateBackOnBatchUpdate() {
    if(this.updateByBatch) {
      localStorage.setItem('updateInstallationWOByBatch', 'true');
      this.location.back();
    } else {
      localStorage.setItem('updateInstallationWOByBatch', 'false');
    }
  }

}
