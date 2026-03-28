import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { ServiceRequestModel } from 'src/app/Model/serviceRequest/serviceRequest';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Router } from '@angular/router';
import { SrAssignEngineerComponent } from '../sr-assign-engineer/sr-assign-engineer.component';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-sub-ticket-popup',
  templateUrl: './sub-ticket-popup.component.html',
  styleUrls: ['./sub-ticket-popup.component.css']
})
export class SubTicketPopupComponent implements OnInit {


  scrollsyncSrType: Boolean = false;
  recordsPerPageForCombo: string;
  srTypePageNumber: number;
  srTypeCombo: any = [];

  scrollsyncPersonIncharge: Boolean = false;
  personInchargePageNumber: number;
  personInchargeCombo: any = [];

  scrollsyncPriority: Boolean = false;
  priorityPageNumber: number;
  priorityCombo: any = [];

  scrollsyncSeverity: Boolean = false;
  severityPageNumber: number;
  severityCombo: any = [];

  uploadSubTicketFlag: boolean = false;


  CommonhintMsg = new CommonHint();

  serviceRequestModelFromParent: ServiceRequestModel;
  serviceRequestSubTicketModel: ServiceRequestModel;

  headingDisplay: string = 'Create Sub Ticket'

  subTicketFor = [
    { id: 1, name: 'INCIDENT' },
    { id: 2, name: 'RETIREMENT REQUEST' },
    { id: 3, name: 'OTHERS' }
  ];

  disableEFS: boolean = false;
  enableRetirementBtn : boolean = false;
  enableIncidentInfo : boolean = false;

  constructor(public dialogRef: MatDialogRef<SubTicketPopupComponent>, 
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService: CommonService,
              private validationService: AssetOptimaConstants,
              private router: Router,
              private dialog: MatDialog,
              private userSessionService: UserSessionService) {
    this.srTypePageNumber = 1;
    this.personInchargePageNumber = 1;
    this.priorityPageNumber = 1;
    this.severityPageNumber = 1;
    this.serviceRequestModelFromParent = new ServiceRequestModel();
    this.serviceRequestSubTicketModel = new ServiceRequestModel();
  }

  subTicketFormGroup: FormGroup;


  ngOnInit() {
    this.subTicketFormGroup = new FormGroup({
      srTypeId: new FormControl(0),
      srType: new FormControl(''),
      problemReported: new FormControl('', [Validators.required]),

      assignedToId: new FormControl(0),
      assignedTo: new FormControl(''),
      assignedToContactNo : new FormControl(''),
      assignedDtDisp : new FormControl(''),
      assignedToDisp : new FormControl('', [Validators.required]),
      srPriority: new FormControl('', [Validators.required]),
      srSeverity: new FormControl('', [Validators.required]),
      
      parentSRId: new FormControl(0),
      callerName: new FormControl(''),
      srTypeName: new FormControl(''),
      callerContactNo: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.validationService.phoneNumberValidation)]),
      srRemarks: new FormControl(''),
      modelId : new FormControl('0'),
      locationId : new FormControl('0'),
      subTicketFor : new FormControl('OTHERS'),
      incidentPhysicalDamage : new FormControl(''),
      incidentDescription : new FormControl(''),
      assetId : new FormControl(''),
      assetCode : new FormControl(''),
      srId : new FormControl('')
    })
  }

  ngAfterViewInit() {
    this.serviceRequestSubTicketModel = this.data.serviceReqModel;
    this.serviceRequestSubTicketModel.parentSrId = this.data.serviceReqModel.srId;
    this.subTicketFormGroup.controls.callerName.setValue(this.serviceRequestSubTicketModel.callerName);
    this.subTicketFormGroup.controls.callerContactNo.setValue(this.serviceRequestSubTicketModel.callerContactNo);
    this.subTicketFormGroup.controls.problemReported.setValue(this.serviceRequestSubTicketModel.problemReported)
    this.subTicketFormGroup.controls.srSeverity.setValue(this.serviceRequestSubTicketModel.srSeverity);
    this.subTicketFormGroup.controls.srPriority.setValue(this.serviceRequestSubTicketModel.srPriority);
    this.subTicketFormGroup.controls.srType.setValue(this.serviceRequestSubTicketModel.srType);
    this.subTicketFormGroup.controls.modelId.setValue(this.serviceRequestSubTicketModel.modelId);
    this.subTicketFormGroup.controls.locationId.setValue(this.serviceRequestSubTicketModel.locationId);
    this.subTicketFormGroup.controls.assetId.setValue(this.serviceRequestSubTicketModel.assetId);
    this.subTicketFormGroup.controls.assetCode.setValue(this.serviceRequestSubTicketModel.assetCode);

    this.subTicketFormGroup.controls.assignedTo.setValue(this.serviceRequestSubTicketModel.assignedTo);
    this.subTicketFormGroup.controls.assignedToContactNo.setValue(this.serviceRequestSubTicketModel.assignedToContactNo);
    this.subTicketFormGroup.controls.assignedToId.setValue(this.serviceRequestSubTicketModel.assignedToId);
    var dateDisp = this.commonService.convertToDateStringdd_mm_yyyy(new Date());
    this.subTicketFormGroup.controls.assignedDtDisp.setValue(dateDisp);
    this.subTicketFormGroup.controls.assignedToDisp.setValue(this.subTicketFormGroup.controls.assignedTo.value + ' -- ' + 
                                                             this.subTicketFormGroup.controls.assignedToContactNo.value + ' -- ' + 
                                                             this.subTicketFormGroup.controls.assignedDtDisp.value);

    // console.log()
    if (this.serviceRequestSubTicketModel.srType === 'BM') {
      this.disableEFS = true;
    } else {
      this.disableEFS = false;
    }
    this.loadSrTypeComboData('');
    if (this.serviceRequestSubTicketModel.srType === 'PM') {
      this.subTicketFormGroup.controls.srTypeName.setValue('PREVENTATIVE MAINTANENCE');
    } else if (this.serviceRequestSubTicketModel.srType === 'PA') {
      this.subTicketFormGroup.controls.srTypeName.setValue('PREVENTIVE ASSURANCE');
    } else if (this.serviceRequestSubTicketModel.srType === 'QA') {
      this.subTicketFormGroup.controls.srTypeName.setValue('QUALITY ASSURANCE PERFORMED');
    } else if (this.serviceRequestSubTicketModel.srType === 'BM') {
      this.subTicketFormGroup.controls.srTypeName.setValue('BREAKDOWN MAINTANENCE');
    } else if (this.serviceRequestSubTicketModel.srType === 'INSTALLATION') {
      this.subTicketFormGroup.controls.srTypeName.setValue('ASSET INSTALLATION');
    } else if (this.serviceRequestSubTicketModel.srType === 'RFS') {
      this.subTicketFormGroup.controls.srTypeName.setValue('REQUEST FOR STOCK');
      this.router.navigate(['home/requestForStock/0/Create']);
    }
    this.subTicketFormGroup.controls.srTypeName.disable();

  }


  close() {
    this.dialogRef.close();
  }

  loadSrTypeComboData(searchValue) {
    this.scrollsyncSrType = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSrTypeCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.srTypePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.srTypePageNumber === 1) {
              this.srTypeCombo = data.responseData.comboList;
            } else {
              this.srTypeCombo = this.srTypeCombo.concat(data.responseData.comboList);
            }
          } else {
            this.srTypeCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.srTypePageNumber += 1 : this.srTypePageNumber = 1;
        }
      );
    this.scrollsyncSrType = false;
  }

  changeFieldsForSRType(event) {
    this.subTicketFormGroup.controls.srType.setValue(event.srId);
    if (event.srId === 'PM') {
      this.subTicketFormGroup.controls["problemReported"].setValue('PREVENTATIVE MAINTANENCE PERFORMED');
      if (!this.disableEFS) {
        // this.subTicketFormGroup.controls["efs"].setValue('1');
      }
    } else if (event.srId === 'PA') {
      this.subTicketFormGroup.controls["problemReported"].setValue('PREVENTIVE ASSURANCE PERFORMED');
      if (!this.disableEFS) {
        //this.subTicketFormGroup.controls["efs"].setValue('1');
      }
    } else if (event.srId === 'QA') {
      this.subTicketFormGroup.controls["problemReported"].setValue('QUALITY ASSURANCE PERFORMED');
      if (!this.disableEFS) {
        //this.subTicketFormGroup.controls["efs"].setValue('1');
      }
    } else if (event.srId === 'BM') {
      this.subTicketFormGroup.controls["problemReported"].setValue('');
      if (this.disableEFS) {
        //this.subTicketFormGroup.controls["efs"].setValue('2');
      }
    } else if (event.srId === 'RFS') {
      this.router.navigate(['home/requestForStock/0/Create']);
    }
  }

  loadPersonInchargeComboData(searchValue) {
    this.scrollsyncPersonIncharge = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeComboFromUser.sams', searchValue.term,
      this.data.departmentId.value > 0 ? this.data.departmentId.value : '', '',
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

  selectedPersonInchargeData(event) {
    if (event === undefined) {
      this.subTicketFormGroup.controls['assignedToId'].setValue(0);
      this.subTicketFormGroup.controls['assignedTo'].setValue('');
      this.personInchargePageNumber = 1;
      this.personInchargeCombo = [];
    } else {
      this.subTicketFormGroup.controls['assignedToId'].setValue(event.employeeId);
      this.subTicketFormGroup.controls['assignedTo'].setValue(event.employeeFirstName);
    }
  }

  loadPriorityComboData(searchValue) {
    this.scrollsyncPriority = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllPriorityForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.priorityPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.priorityPageNumber === 1) {
              this.priorityCombo = data.responseData.comboList;
            } else {
              this.priorityCombo = this.priorityCombo.concat(data.responseData.comboList);
            }
          } else {
            this.priorityCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.priorityPageNumber += 1 : this.priorityPageNumber = 1;
        }
      );
    this.scrollsyncPriority = false;
  }

  selectedPriorityData(event) {
    if (event === undefined) {
      this.subTicketFormGroup.controls['srPriority'].setValue('');
      this.priorityPageNumber = 1;
      this.priorityCombo = [];
    } else {
      this.subTicketFormGroup.controls['srPriority'].setValue(event.priorityName);
    }
  }

  loadSeverityComboData(searchValue) {
    this.scrollsyncSeverity = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllSeverityForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.severityPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.severityPageNumber === 1) {
              this.severityCombo = data.responseData.comboList;
            } else {
              this.severityCombo = this.severityCombo.concat(data.responseData.comboList);
            }
          } else {
            this.severityCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.severityPageNumber += 1 : this.severityPageNumber = 1;
        }
      );
    this.scrollsyncSeverity = false;
  }

  selectedSeverityData(event) {
    if (event === undefined) {
      this.subTicketFormGroup.controls['srSeverity'].setValue('');
      this.severityPageNumber = 1;
      this.severityCombo = [];
    } else {
      this.subTicketFormGroup.controls['srSeverity'].setValue(event.severityName);
    }
  }

  submit() {
    this.uploadSubTicketFlag = true;
    this.serviceRequestSubTicketModel.srType = this.subTicketFormGroup.controls.srType.value;
    this.serviceRequestSubTicketModel.assignedTo = this.subTicketFormGroup.controls.assignedTo.value;
    this.serviceRequestSubTicketModel.assignedToId = this.subTicketFormGroup.controls.assignedToId.value;
    this.serviceRequestSubTicketModel.srSeverity = this.subTicketFormGroup.controls.srSeverity.value;
    this.serviceRequestSubTicketModel.srPriority = this.subTicketFormGroup.controls.srPriority.value;
    this.serviceRequestSubTicketModel.problemReported = this.subTicketFormGroup.controls.problemReported.value;
    this.serviceRequestSubTicketModel.srStatus = 'BOOKED';
    this.serviceRequestSubTicketModel.subTicketFor = this.subTicketFormGroup.controls.subTicketFor.value;
    this.serviceRequestSubTicketModel.srId = 0;
    this.serviceRequestSubTicketModel.actionCode = '';
    this.serviceRequestSubTicketModel.causeCode = '';
    this.serviceRequestSubTicketModel.problemObserved = '';
    this.serviceRequestSubTicketModel.actionTaken = '';
    this.serviceRequestSubTicketModel.subTicketList = this.serviceRequestSubTicketModel.subTicketList;
    this.serviceRequestSubTicketModel.isParent = false;

    this.serviceRequestSubTicketModel.incidentPhysicalDamage = this.subTicketFormGroup.controls.incidentPhysicalDamage.value;
    this.serviceRequestSubTicketModel.incidentDescription = this.subTicketFormGroup.controls.incidentDescription.value;
    
    if (this.subTicketFormGroup.controls.srTypeName.value != '') {
      this.serviceRequestSubTicketModel.srType = this.subTicketFormGroup.controls.srType.value;
    }
    this.commonService.commonInsertService('saveUpdateBreakDownServiceRequest.sams', this.serviceRequestSubTicketModel).subscribe(
      data => {
        if (data.success) {
          this.uploadSubTicketFlag = false;
          this.commonService.openToastSuccessMessage(data.message);
          this.close();
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadSubTicketFlag = false;
        }
      }
    );
  }

  clear() {
    this.subTicketFormGroup.reset();
  }

  openAssignEng() {
    let dialogRef = this.dialog.open(SrAssignEngineerComponent, {
      height: 'auto',
      width: '1200px',
      data: {
        'modelId': this.subTicketFormGroup.controls.modelId.value,
        'locationId': this.subTicketFormGroup.controls.locationId.value
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.exit) {
          this.subTicketFormGroup.controls.assignedTo.setValue(data.assignEmpName);
          this.subTicketFormGroup.controls.assignedToId.setValue(data.assignEmpId);
          this.subTicketFormGroup.controls.assignedToContactNo.setValue(data.officeContactNo);
          this.subTicketFormGroup.controls.assignedDtDisp.setValue(data.assignedDtDisp);

          this.subTicketFormGroup.controls.assignedToDisp.setValue(data.assignEmpName + ' -- ' + data.officeContactNo + ' -- ' + this.commonService.convertToDateStringdd_mm_yyyy(data.assignedDtDisp));
        }
      });
  }

  changeSubTicketFor(event) {
    if(event === undefined) {
      this.subTicketFormGroup.controls.subTicketFor.setValue('');
      this.enableRetirementBtn = false;
      this.enableIncidentInfo = false;
      this.subTicketFormGroup.controls.problemReported.setValue('');
    } else if (event.name == 'RETIREMENT REQUEST') {
      this.subTicketFormGroup.controls.subTicketFor.setValue(event.name);
      this.enableRetirementBtn = true;
      this.enableIncidentInfo = false;
      this.subTicketFormGroup.controls.problemReported.setValue(event.name);
    } else if (event.name == 'INCIDENT') {
      this.subTicketFormGroup.controls.subTicketFor.setValue(event.name);
      this.enableRetirementBtn = false;
      this.enableIncidentInfo = true;
      this.subTicketFormGroup.controls.problemReported.setValue(event.name);
    } else if (event.name == 'OTHERS') {
      this.subTicketFormGroup.controls.subTicketFor.setValue(event.name);
      this.enableRetirementBtn = false;
      this.enableIncidentInfo = false;
      this.subTicketFormGroup.controls.problemReported.setValue('');
    } 
    
  }

  retirementRequest() {

    let dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg' : 'Sub Ticket and Work Activity will be created. Proceed to Asset Retirement Screen ?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {

            this.submit();

            this.router.navigate(['home/asset/assetRetirementCreate/' + 0 + '/' + 'add']);

            localStorage.setItem('srId', this.subTicketFormGroup.controls.srId.value);
            localStorage.setItem('assetId', this.subTicketFormGroup.controls.assetId.value);
            localStorage.setItem('assetCode', this.subTicketFormGroup.controls.assetCode.value);
            localStorage.setItem('requestedBy', this.userSessionService.getUserName());
            localStorage.setItem('source', 'WORKORDER');
        }
      }
    );
  }
  
}



