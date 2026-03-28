import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';

@Component({
  selector: 'app-service-request-hand-over',
  templateUrl: './service-request-hand-over.component.html',
  styleUrls: ['./service-request-hand-over.component.css']
})
export class ServiceRequestHandOverComponent implements OnInit {

  srHandOverForm: FormGroup;

  headingDisplay: string;
  buttonDisplay: string;

  modeDisplay: boolean = true;
  uploadFlag: boolean = false;

  scrollsyncHandOverItem: boolean = false;
  recordsPerPageForCombo: string;
  handOverPageNumber: number;
  handOverItemsCombo: any = [];

  scrollsyncEmployee: boolean = false;
  recordsPerPageForEmpCombo: string;
  employeePageNumber: number;
  employeeCombo: any = [];

  updateByBatch = false;

  constructor(public dialogRef: MatDialogRef<ServiceRequestHandOverComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private dialog: MatDialog,
    private change: ChangeDetectorRef,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private validationService: AssetOptimaConstants,
    private detectorRefs: ChangeDetectorRef,
    private userSessionService: UserSessionService,
    private readonly router: Router,
    private readonly location: Location) { 

      this.employeePageNumber = 1;
      this.handOverPageNumber = 1;
  }

  ngOnInit() {
    this.srHandOverForm = new FormGroup({
      srId: new FormControl(this.data.srId),
      srHandOverId: new FormControl(0),
      handOverItemType: new FormControl(''),
      employeeId: new FormControl('0'),
      handOverRemarks: new FormControl(''),
      handOverDtDisp: new FormControl(''),
      employeeNameDIsp: new FormControl(''),
      updateByBatch: new FormControl(this.data.updateByBatch),
      selectedSrIdList: new FormControl(this.data.selectedSrIdList)
    });
    if (this.data.srHandOverData != null) {
      this.headingDisplay = "";
      this.buttonDisplay = "Update";
    } else {
      this.headingDisplay = "";
      this.buttonDisplay = "Submit";
    }
    this.updateByBatch = this.data.updateByBatch;
  }

  ngAfterViewInit() {
    if (this.data.srHandOverData.srHandOverId > 0) {
      this.srHandOverForm.patchValue(this.data.srHandOverData);
      if (this.data.type == 'view') {
        this.headingDisplay = "";
        this.srHandOverForm.disable();
        this.modeDisplay = false;
      } else {
        this.headingDisplay = "";
        this.buttonDisplay = "Update";
      }
    } else {
      this.srHandOverForm.controls.handOverDtDisp.setValue(this.commonService.getCurrentDateYYYYMMDD());
      this.headingDisplay = "";
      this.buttonDisplay = "Submit";
    }
    this.detectorRefs.detectChanges();
  }

  exit() {
    this.dialogRef.close();
  }

  listOfHandOverItemName(searchKey) {
    this.scrollsyncHandOverItem = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllHandOverCombo, searchKey.term, '', '',
      this.recordsPerPageForCombo, this.handOverPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchKey))) {
            if (this.handOverPageNumber === 1) {
              this.handOverItemsCombo = data.responseData.comboList;
            } else {
              this.handOverItemsCombo = this.handOverItemsCombo.concat(data.responseData.comboList);
            }
          } else {
            this.handOverItemsCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.handOverPageNumber += 1 : this.handOverPageNumber = 1;
        });
    this.scrollsyncHandOverItem = false;
  }

  selectedHandOver(event) {
    if (event === undefined) {
      this.srHandOverForm.controls.handOverItemType.setValue('');
    } else {
      this.srHandOverForm.controls.handOverItemType.setValue(event.handOverItemType);
    }
  }

  listOfEmployeeName(searchKey) {
    this.scrollsyncEmployee = true;
    this.recordsPerPageForEmpCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllEmployeeForOrgCombo, searchKey.term, '', '',
      this.recordsPerPageForEmpCombo, this.employeePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchKey))) {
            if (this.employeePageNumber === 1) {
              this.employeeCombo = data.responseData.comboList;
            } else {
              this.employeeCombo = this.employeeCombo.concat(data.responseData.comboList);
            }
          } else {
            this.employeeCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.employeePageNumber += 1 : this.employeePageNumber = 1;
        });
    this.scrollsyncEmployee = false;
  }

  selectedEmployee(event) {
    if (event === undefined) {
      this.srHandOverForm.controls.employeeId.setValue('');
      this.srHandOverForm.controls.employeeNameDIsp.setValue('');
    } else {
      this.srHandOverForm.controls.employeeId.setValue(event.employeeId);
      this.srHandOverForm.controls.employeeNameDIsp.setValue(event.displayName);
    }
  }

  saveUpdateSrHandOverInfoByCheckingConfirmation() {
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
            this.saveUpdateSrHandOverInfo();
          }
        });
    } else {
      this.saveUpdateSrHandOverInfo();
    }
  }

  saveUpdateSrHandOverInfo() {
    this.srHandOverForm.controls.handOverDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srHandOverForm.controls.handOverDtDisp.value));
    this.commonService.commonInsertService('saveUpdateSrHandOver.sams', this.srHandOverForm.getRawValue()).subscribe(
      data => {
        if (data.success) {
          if (this.srHandOverForm.controls.srHandOverId.value <= 0) {
            this.commonService.openToastSuccessMessage('Handover Info Added Successfully' + data.responseData+".");
            if(this.data.updateByBatch) {
              this.navigateBackOnBatchUpdate();
            } else {
              this.dialogRef.close();
            }
          } else {
            this.commonService.openToastSuccessMessage('Handover Info Updated Successfully' + data.responseData+".");
            this.dialogRef.close();
          }
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.dialogRef.close();
        }
      }
    );
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
