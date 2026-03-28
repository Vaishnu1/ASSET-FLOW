import { Component, OnInit, ChangeDetectorRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceRequestModel } from 'src/app/Model/serviceRequest/serviceRequest';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { OtpVerificationComponent } from 'src/app/Components/Common-components/otp-verification/otp-verification.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-sr-add-labour',
  templateUrl: './sr-add-labour.component.html',
  styleUrls: ['./sr-add-labour.component.css']
})
export class SrAddLabourComponent implements OnInit {

  addLabourAddEdit: FormGroup;

  headingDisplay: string;
  buttonDisplay: string;

  mandatoryString: String = "";
  mandatoryEDString: String = "";

  //COMBO
  personInchargeCombo: any = [];
  personInchargePageNumber: number;
  scrollsyncPersonIncharge: boolean = false;
  recordsPerPageForCombo: string;

  //COMBO
  funcStatusCombo: any = [];
  funcStatusPageNumber: number;
  scrollsyncFuncStatus: boolean = false;

  scrollSuppliersync: boolean = false;
  supplierListPageNumber: number;
  supplierList: any = [];

  scrollManufacturersync: boolean = false;
  manufacturerListPageNumber: number;
  manufacturerList: any = [];

  limitCount: any;

  //DISABLE BUTTON AFTER A SINGLE CLICK
  uploadFlag: boolean = false;

  modeDisplay: boolean = true;

  saveSRAddLabourTimeValid: boolean = false;
  saveSRHoldTimeValid : boolean = false;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  isParent: boolean = false
  mandatoryActivity: string = "";
  parentSrId: number = 0;
  isSubTicketsClosed: boolean = false;
  srType: string = "";

  externalEnggInfo: boolean = false;

  activityDoneBy = [
    { id: 1, name: 'INTERNAL' },
    { id: 2, name: 'EXTERNAL' }
  ];

  

  serviceProvidedBy = [
    { id: 1, name: 'MANUFACTURER' },
    { id: 2, name: 'SUPPLIER' }
  ];

  getData: getData;

  findingsCombo: any = [];
  findingsPageNumber: number;
  scrollSyncFindings: boolean = false;

  correctiveActionsCombo: any = [];
  correctiveActionsPageNumber: number;
  scrollSyncCorrectiveActions: boolean = false;

  efsCombo: any = [];
  efsPageNumber: number;
  scrollSyncEFS: boolean = false;

  srStartDt : String = '';

  constructor(public dialogRef: MatDialogRef<SrAddLabourComponent>,
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

    this.personInchargePageNumber = 1;
    this.funcStatusPageNumber = 1;
    this.supplierListPageNumber = 1;
    this.manufacturerListPageNumber = 1;

    this.findingsPageNumber = 1;
    this.correctiveActionsPageNumber = 1;
    this.efsPageNumber = 1;
  }

  ngOnInit() {
    this.addLabourAddEdit = new FormGroup({
      srId: new FormControl(this.data.serviceRequestModel.srId),
      srStatusId: new FormControl(this.data.serviceRequestModel.srStatusId),
      srActivityId: new FormControl(0),
      activityFromDt: new FormControl(''),
      activityFromTime: new FormControl(''),
      activityStartDtDisp: new FormControl('', [Validators.required]),
      activityStartDt: new FormControl(''),
      activityEndDt: new FormControl(''),
      activityEndDtDisp: new FormControl(''),
      activityToDt: new FormControl(''),
      activityToTime: new FormControl(''),
      
      activityDone: new FormControl('', [Validators.maxLength(500)]),
      
      activityStartTime: new FormControl('', [Validators.required]),
      activityEndTime: new FormControl(''),
      activityImage: new FormControl(''),
      
      correctiveActionCode: new FormControl(''),
      srDoneByVendor: new FormControl(''),
      vendorServiceRefNo: new FormControl(''),
      srAttributeId5: new FormControl('0'),
      srCost: new FormControl('0'),

      internalEngineerId: new FormControl(''),
      internalEngineerName: new FormControl('', [Validators.required]),

      activityDoneBy: new FormControl('INTERNAL'),
      serviceProvidedBy: new FormControl(' ', [Validators.required]),
      internalEngineerRemarks: new FormControl(''),
      externalEngineerRemarks: new FormControl(''),

      serviceProvidedById: new FormControl('0'),
      serviceProvidedByName: new FormControl(' ', [Validators.required]),

      externalEngineerName: new FormControl(''),
      externalEngineerEmailId: new FormControl(''),
      externalEngineerContactNo: new FormControl(''),

      holdFlag: new FormControl(''),
      holdStartDt: new FormControl(''),
      holdEndDt: new FormControl(''),
      holdStartDtDisp: new FormControl(''),
      holdEndDtDisp: new FormControl(''),
      holdStartTime: new FormControl(''),
      holdEndTime:new FormControl(''),
     
      calibrationRemarks : new FormControl(''),
      updateByBatch: new FormControl(this.data.serviceRequestModel.updateByBatch),
      selectedSrIdList: new FormControl(this.data.serviceRequestModel.selectedSrIdList),

      physicalDamage : new FormControl(false),
      physicalDamageDesc  : new FormControl(''),
      findings  : new FormControl(''),
      findingsDesc  : new FormControl(''),
      correctiveActions  : new FormControl(''),
      patientSafety  : new FormControl(false),
      patientSafetyDesc  : new FormControl(''),
      efs  : new FormControl(''),
      efsId  : new FormControl('0')
    });
    if (this.data.addLabourModel.srActivityId > 0) {
      this.headingDisplay = "Edit";
      this.buttonDisplay = "Update";
    } else {
      this.headingDisplay = "Create";
      this.buttonDisplay = "Submit";
    }
    if (this.data.parentSrId > 0) {
      this.isParent = true;
      this.parentSrId = this.data.parentSrId;
      this.SubTicket()
    } else {
      this.isParent = false;
    }
    this.srType = this.data.serviceRequestModel.srType;

    const srOpenedDt = this.data.serviceRequestModel.srOpenedDtDisp;
    const [day, month, yearTime] = srOpenedDt.split('-');
    const [year, time] = yearTime.split(' ');
    this.srStartDt = `${year}-${month}-${day}T${time}`;

    this.findingsPageNumber = 1;
    this.correctiveActionsPageNumber = 1;
    this.efsPageNumber = 1;
  }

  ngAfterViewInit() {
    if (this.data.addLabourModel.srActivityId > 0) {
      this.addLabourAddEdit.patchValue(this.data.addLabourModel);

      if(this.data.addLabourModel.activityDoneBy == 'EXTERNAL') {
        this.externalEnggInfo = true;
      }
      if (this.data.type == 'view') {
        this.headingDisplay = "View";
        this.addLabourAddEdit.disable();
        this.modeDisplay = false;
      } else {
        this.headingDisplay = "Edit";
        this.buttonDisplay = "Update";
      }

      this.addLabourAddEdit.controls.activityDoneBy.disable();
      this.addLabourAddEdit.controls.serviceProvidedBy.disable();
      this.addLabourAddEdit.controls.serviceProvidedByName.disable();

    } else {
      this.addLabourAddEdit.controls.internalEngineerId.setValue(this.userSessionService.getUserId());
      this.addLabourAddEdit.controls.internalEngineerName.setValue(this.userSessionService.getUserName());
      this.addLabourAddEdit.controls.activityStartDtDisp.setValue(this.commonService.getCurrentDateYYYYMMDD());
      this.addLabourAddEdit.controls.activityStartTime.setValue(this.commonService.getCurrentTime());
      this.headingDisplay = "Create";
      this.buttonDisplay = "Submit";
    }

    this.detectorRefs.detectChanges();
  }

  loadPersonInchargeComboData(searchValue) {
    this.scrollsyncPersonIncharge = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.personInchargePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.personInchargePageNumber === 1) {
              this.personInchargeCombo = data.responseData.comboList;
            } else {
              this.personInchargeCombo = this.personInchargeCombo.concat(data.responseData.comboList);
            }
          } else {
            this.personInchargeCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.personInchargePageNumber += 1 : this.personInchargePageNumber = 1;
        }
      );
    this.scrollsyncPersonIncharge = false;
  }

  loadAssetFuncStatusComboData(searchValue) {
    this.scrollsyncFuncStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfsrAttribute5Combo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.funcStatusPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.funcStatusPageNumber === 1) {
              this.funcStatusCombo = data.responseData.comboList;
            } else {
              this.funcStatusCombo = this.funcStatusCombo.concat(data.responseData.comboList);
            }
          } else {
            this.funcStatusCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.funcStatusPageNumber += 1 : this.funcStatusPageNumber = 1;
        }
      );
    this.scrollsyncFuncStatus = false;
  }

  selectedPersonInchargeData(event) {
    
    if (event === undefined) {
      this.addLabourAddEdit.controls['internalEngineerId'].setValue(0);
      this.addLabourAddEdit.controls['internalEngineerName'].setValue('');
      this.personInchargePageNumber = 1;
      this.personInchargeCombo = [];
    } else {
      this.addLabourAddEdit.controls['internalEngineerId'].setValue(event.employeeId);
      this.addLabourAddEdit.controls['internalEngineerName'].setValue(event.employeeFirstName);
    }
  }

  

  changeEndTimeAsMandatory() {
    this.addLabourAddEdit.controls["activityEndTime"].setValidators(Validators.required);
    this.addLabourAddEdit.controls["activityEndTime"].updateValueAndValidity();
    this.mandatoryString = "*";
  }

  changeEndDateAsMandatory(event) {
    if (event.name === 'UP') {
      this.addLabourAddEdit.controls["activityEndDtDisp"].setValidators(Validators.required);
      this.addLabourAddEdit.controls["activityEndDtDisp"].updateValueAndValidity();
      this.mandatoryEDString = "*";
    } else {
      this.addLabourAddEdit.controls["activityEndDtDisp"].setValidators([]);
      this.addLabourAddEdit.controls["activityEndDtDisp"].updateValueAndValidity();
      this.mandatoryEDString = "";
    }
  }

  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  saveUpdate() {
    let notify = false;

    if (this.addLabourAddEdit.controls.activityStartDtDisp.value && this.addLabourAddEdit.controls.activityStartDtDisp.value != "") {
      this.addLabourAddEdit.controls.activityStartDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.addLabourAddEdit.controls.activityStartDtDisp.value));
    }
    if (this.addLabourAddEdit.controls.activityEndDtDisp.value && this.addLabourAddEdit.controls.activityEndDtDisp.value != "") {
      this.addLabourAddEdit.controls.activityEndDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.addLabourAddEdit.controls.activityEndDtDisp.value));
    }

    if (this.addLabourAddEdit.controls.holdStartDtDisp.value && this.addLabourAddEdit.controls.holdStartDtDisp.value != "") {
      this.addLabourAddEdit.controls.holdStartDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.addLabourAddEdit.controls.holdStartDtDisp.value));
    }

    if (this.addLabourAddEdit.controls.holdEndDtDisp.value && this.addLabourAddEdit.controls.holdEndDtDisp.value != "") {
      this.addLabourAddEdit.controls.holdEndDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.addLabourAddEdit.controls.holdEndDtDisp.value));
    }

    //To Check End Time > Start Time if End Date= Start Date 
    if (this.addLabourAddEdit.controls.activityEndDtDisp.value != null && this.addLabourAddEdit.controls.activityEndDtDisp.value != '') {
      if (this.addLabourAddEdit.controls.activityStartDtDisp.value === this.addLabourAddEdit.controls.activityEndDtDisp.value) {
       
        const startTime = this.addLabourAddEdit.controls.activityStartTime.value;
        const endTime = this.addLabourAddEdit.controls.activityEndTime.value;
        
        const startTimeMinutes = this.convertTimeToMinutes(startTime);
        const endTimeMinutes = this.convertTimeToMinutes(endTime);
        
        if (endTimeMinutes > startTimeMinutes) {
          this.saveSRAddLabourTimeValid = true;
        } else {
          this.saveSRAddLabourTimeValid = false;
          this.commonService.openToastWarningMessage('The End Time Must be Greater than Start Time.');          
        }
      } else {
        this.saveSRAddLabourTimeValid = true;
      }
    } else {
      this.saveSRAddLabourTimeValid = true;
    }

    if (this.saveSRAddLabourTimeValid) {      
      this.addLabourAddEdit.controls.activityStartDtDisp.setValue(this.addLabourAddEdit.controls.activityStartDtDisp.value + ' ' + this.addLabourAddEdit.controls.activityStartTime.value);
      if (this.addLabourAddEdit.controls.activityEndDtDisp.value && this.addLabourAddEdit.controls.activityEndTime.value) {
        this.addLabourAddEdit.controls.activityEndDtDisp.setValue(this.addLabourAddEdit.controls.activityEndDtDisp.value + ' ' + this.addLabourAddEdit.controls.activityEndTime.value);
      }
    }

    if (this.addLabourAddEdit.controls.holdEndDtDisp.value != null && this.addLabourAddEdit.controls.holdEndDtDisp.value != '') {     
      if (this.addLabourAddEdit.controls.holdStartDtDisp.value === this.addLabourAddEdit.controls.holdStartDtDisp.value) {
        if (this.addLabourAddEdit.controls.holdEndTime.value > this.addLabourAddEdit.controls.holdStartTime.value) {
          this.saveSRHoldTimeValid = true;
        } else {
          this.saveSRHoldTimeValid = false;
          this.commonService.openToastWarningMessage('The Hold End Time Must be Greater than Hold Start Time.');
        }
      } else {
        this.saveSRHoldTimeValid = true;
      }
    } else {
      this.saveSRHoldTimeValid = false;
    }

    if (this.saveSRHoldTimeValid) {
      this.addLabourAddEdit.controls.holdStartDtDisp.setValue(this.addLabourAddEdit.controls.holdStartDtDisp.value + ' ' + this.addLabourAddEdit.controls.holdStartTime.value);
      if (this.addLabourAddEdit.controls.holdEndDtDisp.value && this.addLabourAddEdit.controls.holdEndTime.value) {
        this.addLabourAddEdit.controls.holdEndDtDisp.setValue(this.addLabourAddEdit.controls.holdEndDtDisp.value + ' ' + this.addLabourAddEdit.controls.holdEndTime.value);
      }
    }

    if (this.saveSRAddLabourTimeValid) {
      if (this.addLabourAddEdit.controls.srAttributeId5.value == '1' && this.addLabourAddEdit.controls.srStatusId.value == '4' && this.parentSrId == 0) {
        // if(this.data.serviceRequestModel.closedSubticketCount!= this.data.serviceRequestModel.subTicketCount){
        //   this.commonService.openToastWarningMessage('Please close all the sub tickets');
        //   this.isSubTicketsClosed=true;
        // }else{
        notify = true;
        this.saveLabor(notify, '');
        //SR will be completed based on Otp Verified in Otp Screen
        let dialogRef = this.dialog.open(OtpVerificationComponent, {
          height: 'auto',
          width: '400px',
          data: {
            'srId': this.addLabourAddEdit.controls.srId.value,
            'serviceRequestModel': this.data.serviceRequestModel
          }
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(
          data => {
            if (data.success) {
              this.router.navigate(['home/serviceRequest/serviceView/' + this.data.serviceRequestModel.srId + '/' + 'edit']);
            } else {
              this.router.navigate(['home/serviceRequest/serviceView/' + this.data.serviceRequestModel.srId + '/' + 'edit']);
            }
          });
      } else {
        this.saveLabor(notify, '');
      }
    }

  }

  saveLabor(notify, callback) {
    this.uploadFlag = true;
    if(this.addLabourAddEdit.controls.updateByBatch.value) {
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
            this.saveLabourByConfirmation(notify, callback);
          }
        });
    } else {
      let efsValue = this.addLabourAddEdit.controls.efs.value;
      let srId = this.addLabourAddEdit.controls.srId.value;
      if(efsValue == 'UP') {

        this.commonService.commonGetService('fetchCountSRSubStatus.sams', srId).subscribe(
          data => {
            if (data.success) {
              var srSubStatusCount = data.responseData;
              if(Number(srSubStatusCount) > 0) {
                const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
                  height: 'auto',
                  width: '400px',
                  data: {
                    'confirmHeading': 'Confirmation',
                    'confirmMsg':'Are you sure, to update EFS status to UP - PR/PO/STOCK INDENT is open?'
                  }
                });
                dialogRef.disableClose = true;
                dialogRef.afterClosed().subscribe(
                  data => {
                    if (data.status) {
                      this.saveLabourByConfirmation(notify, callback);
                    } else {
                      this.uploadFlag = false;
                    }
                  });
              } else {
                const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
                  height: 'auto',
                  width: '400px',
                  data: {
                    'confirmHeading': 'Confirmation',
                    'confirmMsg': 'Are you sure, to add activity to this Service Request?'
                  }
                });
                dialogRef.disableClose = true;
                dialogRef.afterClosed().subscribe(
                  data => {
                    if (data.status) {
                      this.saveLabourByConfirmation(notify, callback);
                    } else {
                      this.uploadFlag = false;
                    }
                  });
              }
            }
          }
        );
      } else {
        const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
          height: 'auto',
          width: '400px',
          data: {
            'confirmHeading': 'Confirmation',
            'confirmMsg': 'Are you sure, to add activity to this Service Request?'
          }
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(
          data => {
            if (data.status) {
              this.saveLabourByConfirmation(notify, callback);
            } else {
              this.uploadFlag = false;
            }
          });
        //this.saveLabourByConfirmation(notify, callback);
      }
    }
  }

  saveLabourByConfirmation(notify, callback) {
    this.commonService.commonInsertService('saveUpdateAddLabour.sams', this.addLabourAddEdit.getRawValue()).subscribe(
      data => {
        if (data.success) {

          if (typeof callback == "function") {
            callback();
            this.uploadFlag = false;
          }
          if (!notify) {

            if (this.addLabourAddEdit.get('srActivityId').value <= 0) {
              this.commonService.openToastSuccessMessage('Activity Added  Successfully' + data.responseData+'.');
              this.uploadFlag = false;
            } else {
              this.commonService.openToastSuccessMessage('Activity Updated  Successfully' + data.responseData+'.');
              this.uploadFlag = false;
            }
          }
          this.dialogRef.close(true);
          this.uploadFlag = false;
          this.navigateBackOnBatchUpdate();

        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadFlag = false;
        }
      }
    );
  }

  approvalSR(status, callback) {
    let serviceRequestmodel: ServiceRequestModel = new ServiceRequestModel();
    serviceRequestmodel = this.data.serviceRequestModel;
    serviceRequestmodel.srStatusId = status;
    serviceRequestmodel.isParent = this.isParent;
    serviceRequestmodel.parentSrId = this.parentSrId;
    var statusToDisplay = this.commonService.toTitleCase(status);
    this.commonService.commonInsertService('saveUpdateApprovalsServiceRequest.sams', serviceRequestmodel).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage('Service Request ' + statusToDisplay + ' successfully.');
          if (typeof callback == "function") {
            callback(true, '');
          }
        } else {
          this.commonService.openToastErrorMessage(data.message);
          if (typeof callback == "function") {
            callback();
          }
        }
      }, error => {
      }
    );
  }

  dateValidationinstall(event) {
    return false;
  }


  exit() {
    this.dialogRef.close(false);
  }

  setPageNumber(event) {

  }

  SubTicket() {
    this.addLabourAddEdit.controls.srAttributeId5.setValue(this.data.efs);
    this.addLabourAddEdit.controls.attribute5Name.setValue(this.data.efs)
    this.addLabourAddEdit.controls["activity"].setValidators(Validators.required);
    this.mandatoryActivity = "*"
  }

  logData() {
    (this.addLabourAddEdit.value)
  }

  checkForSubTicketStatus() {
    let srModel: ServiceRequestModel = new ServiceRequestModel()
    srModel = this.data.serviceRequestModel;
    if (this.data.serviceRequestModel.closedSubticketCount != this.data.serviceRequestModel.subTicketCount) {
      // this.commonService.openToastWarningMessage('Kindly close all the sub tickets');
      this.isSubTicketsClosed = true;
    } else {
      this.isSubTicketsClosed = false;

    }
  }

  changeActivityDoneBy(event) {
    if (event.name == "INTERNAL") {
      this.externalEnggInfo = false;
      this.addLabourAddEdit.controls.serviceProvidedBy.setValue(" ")
      this.addLabourAddEdit.controls.serviceProvidedByName.setValue(" ") 
      this.addLabourAddEdit.controls.internalEngineerName.setValue("") 
    } else if (event.name == "EXTERNAL") { 
      this.addLabourAddEdit.controls.serviceProvidedBy.setValue("")
      this.addLabourAddEdit.controls.serviceProvidedByName.setValue("") 
      this.addLabourAddEdit.controls.internalEngineerName.setValue(" ") 
      this.externalEnggInfo = true;
    }
  }

  listOfSupplier(searchValue) {
    
    this.scrollSuppliersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllSupplierNameCombo, searchValue.term, '', '',
      this.limitCount, this.supplierListPageNumber, '', 'SUPPLIER').subscribe(
        (data) => {
          if (data.success) {
            if (!(this.commonService.fetchSearchValue(searchValue))) {
              if (this.supplierListPageNumber === 1) {
                this.supplierList = data.responseData.comboList;
              } else {
                this.supplierList = this.supplierList.concat(data.responseData.comboList);
              }
            } else {
              this.supplierList = data.responseData.comboList;
            }
            this.supplierList.length != 0 ? this.supplierListPageNumber += 1 : this.supplierListPageNumber = 1;
          }
        }
      );
    this.scrollSuppliersync = false;
  }

  listOfManufacturer(searchValue) {
    
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfManufacturerCombo, searchValue.term, '', '',
      this.limitCount, this.manufacturerListPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.manufacturerListPageNumber === 1) {
              this.manufacturerList = data.responseData.comboList;
            } else {
              this.manufacturerList = this.manufacturerList.concat(data.responseData.comboList);
            }
          } else {
            this.manufacturerList = data.responseData.comboList;
          }
          this.manufacturerList.length != 0 ? this.manufacturerListPageNumber += 1 : this.manufacturerListPageNumber = 1;
        }
      );
  }

  setSupplierData(event) {
    if (event === undefined) {
      this.addLabourAddEdit.controls.serviceProvidedById.setValue(0);
      this.addLabourAddEdit.controls.serviceProvidedByName.setValue('');
      this.supplierListPageNumber = 1;
      this.supplierList = [];
    } else {
      this.addLabourAddEdit.controls.serviceProvidedById.setValue(event.supplierId);
      this.addLabourAddEdit.controls.serviceProvidedByName.setValue(event.supplierName);
    }
  }

  setManufacturerData(event) {
    if (event === undefined) {
      this.addLabourAddEdit.controls.serviceProvidedById.setValue(0);
      this.addLabourAddEdit.controls.serviceProvidedByName.setValue('');
      this.manufacturerListPageNumber = 1;
      this.manufacturerList = [];
    } else {
      this.addLabourAddEdit.controls.serviceProvidedById.setValue(event.manufacturerId);
      this.addLabourAddEdit.controls.serviceProvidedByName.setValue(event.manufacturerName);
    }
  }

  navigateBackOnBatchUpdate() {
    if(this.addLabourAddEdit.controls.updateByBatch.value) {
      localStorage.setItem('updateInstallationWOByBatch', 'true');
      this.location.back();
    } else {
      localStorage.setItem('updateInstallationWOByBatch', 'false');
    }
  }

  

  // listOfFindingsCombo(searchValue) {
  //   this.scrollSyncFindings = true;
  //   this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  //   this.commonService.getComboResults('listOfFindingsCombo.sams', searchValue.term, '', '', this.limitCount, this.findingsPageNumber).subscribe(
  //     (data) => {
  //       this.getData = new getData();
  //       this.getData = this.commonService.fetchDataList(searchValue, this.findingsPageNumber, this.findingsCombo, data.responseData.comboList)
  //       this.findingsPageNumber = this.getData.pageNumber;
  //       this.findingsCombo = this.getData.dataList;
  //       this.scrollSyncFindings = false;
  //     }
  //   );
  // }

  listOfFindingsCombo(searchValue) {
    this.scrollSyncFindings = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfsrAttribute3Combo.sams', searchValue.term, '', '', this.limitCount, this.findingsPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.findingsPageNumber, this.findingsCombo, data.responseData.comboList)
        this.findingsPageNumber = this.getData.pageNumber;
        this.findingsCombo = this.getData.dataList;
        this.scrollSyncFindings = false;
      }
    );
  }

  setFindingsDataCombo(event) {
    
  }

  // listOfCorrectiveActionCombo(searchValue) {
  //   this.scrollSyncCorrectiveActions = true;
  //   this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  //   this.commonService.getComboResults('listOfCorrectiveActionCombo.sams', searchValue.term, '', '', this.limitCount, this.correctiveActionsPageNumber).subscribe(
  //     (data) => {
  //       this.getData = new getData();
  //       this.getData = this.commonService.fetchDataList(searchValue, this.correctiveActionsPageNumber, this.correctiveActionsCombo, data.responseData.comboList)
  //       this.correctiveActionsPageNumber = this.getData.pageNumber;
  //       this.correctiveActionsCombo = this.getData.dataList;
  //       this.scrollSyncCorrectiveActions = false;
  //     }
  //   );
  // }

  listOfCorrectiveActionCombo(searchValue) {
    this.scrollSyncCorrectiveActions = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfsrAttribute4Combo.sams', searchValue.term, '', '', this.limitCount, this.correctiveActionsPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.correctiveActionsPageNumber, this.correctiveActionsCombo, data.responseData.comboList)
        this.correctiveActionsPageNumber = this.getData.pageNumber;
        this.correctiveActionsCombo = this.getData.dataList;
        this.scrollSyncCorrectiveActions = false;
      }
    );
  }

  setCorrectionActionDataCombo(event) {
    
  }

  listOfEFSCombo(searchValue) {
    this.scrollSyncEFS = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfEFSCombo.sams', searchValue.term, '', '', this.limitCount, this.efsPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.efsPageNumber, this.efsCombo, data.responseData.comboList)
        this.efsPageNumber = this.getData.pageNumber;
        this.efsCombo = this.getData.dataList;
        this.scrollSyncEFS = false;
      }
    );
  }

  setEFSDataCombo(event) {
    if (event === undefined) {
      this.addLabourAddEdit.controls.efs.setValue('');
      this.addLabourAddEdit.controls.efsId.setValue('0');
      this.manufacturerListPageNumber = 1;
      this.manufacturerList = [];
    } else {
      this.addLabourAddEdit.controls.efsId.setValue(event.srActivityEFSId);
      this.addLabourAddEdit.controls.efs.setValue(event.srActivityEFSName);
    }
  }


}
