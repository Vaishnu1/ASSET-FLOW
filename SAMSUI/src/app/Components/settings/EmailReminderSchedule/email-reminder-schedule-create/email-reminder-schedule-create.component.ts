import { ChangeDetectorRef } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-email-reminder-schedule-create',
  templateUrl: './email-reminder-schedule-create.component.html',
  styleUrls: ['./email-reminder-schedule-create.component.css']
})
export class EmailReminderScheduleCreateComponent implements OnInit {
  headingDisplay: string="";
  buttonDisplay: string="";
  errorMsg : String="";
  uploadFlag:boolean = false;
  modeDisplay:boolean = false;
  subLoaderEmailRem:boolean = false;
  length:number =0;
  isValid:boolean = false;
  hintErrorMsg : String="";
  error_msg: String='"No of Days" and "Schedule Type" should not be empty';
  error_msg_1: String='"Kindly Schedule Email Notification"';
  error_msg_2: String='"Email Notification "Schedule Type" With Same "No Of Days" Already Exist"';

  //combo
  scrollsyncLocation: boolean = false;
  locationPageNumber: number;
  locationCombo: any = [];

  scrollsyncProcess: boolean = false;
  processPageNumber: number;
  processCombo: any = [];

  recordsPerPageForCombo: string;

  emailReminderHdrFormGroup: FormGroup;
  emailReminderDtlFormGroup:FormGroup;
  emailReminderDtlListDataSource = new MatTableDataSource<any>();

  displayedColumns = ['sno', 'numberOfDays', 'reminderType','action'];

  getData: getData;
  uniqueList: boolean = false;
  tempLocId: number = 0;
  tempProcessId: number = 0;
  enableOnEdit : boolean = false;

  constructor(private matDialogRef: MatDialogRef<EmailReminderScheduleCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private userSession: UserSessionService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService) {
      this.locationPageNumber = 1;
      this.processPageNumber = 1;
     }

  ngOnInit(): void {    
    this.emailReminderDtlListDataSource.data = [];

    this.emailReminderHdrFormGroup = new FormGroup({
      emailReminderScheduleHdrId: new FormControl(0),
      orgId: new FormControl(0),
      locationId: new FormControl(0, [ Validators.required]),
      locationName: new FormControl(null, [ Validators.required, Validators.maxLength(100)]),
      processId: new FormControl(0, [ Validators.required]),
      processName: new FormControl(null, [ Validators.required]),
      active: new FormControl(true),
      createdBy:  new FormControl(''),
      createdDt:  new FormControl(''),
      updatedBy:  new FormControl(''),
      updatedDt:  new FormControl(''),
      emailReminderScheduleDtlTOList: new FormControl([]),
      transId: new FormControl(0)
    });
  }

  ngAfterViewInit(){
    if(this.data.mode === 'add'){
      this.headingDisplay = "Create";
      this.buttonDisplay = "Submit";

    }else{
      this.buttonDisplay = "Update";
      this.fetchEmailReminderInfoByEmailHdrId(this.data.emailReminderScheduleHdrId);
      if(this.data.mode === 'edit'){
        this.headingDisplay = "Edit";
      }else{
        this.headingDisplay = "View";
        this.modeDisplay = true;
        this.displayedColumns = ['sno', 'numberOfDays', 'reminderType'];
        this.emailReminderHdrFormGroup.disable();
      }
    }
    if(this.data.source !== 'master'){
      this.emailReminderHdrFormGroup.disable();
    }
  }

  close() {
    this.matDialogRef.close();
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsyncLocation = false;
        }
      );
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.emailReminderHdrFormGroup.controls['locationId'].setValue(0);
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.emailReminderHdrFormGroup.controls['locationId'].setValue(event.locationId);
      }
      this.checkForAlreadyExistence()
    }

  addEmailReminderDtlToList(){
    this.emailReminderDtlListDataSource.data.push(this.emailReminderDtl().value);
    this.length = this.emailReminderDtlListDataSource.data.length;
    this.emailReminderDtlListDataSource._updateChangeSubscription();
    this.enableOnEdit = true;
    this.isValidList();
  }

  emailReminderDtl(){
    return new FormGroup({
      emailReminderScheduleDtlId: new FormControl(0),
      transId: new FormControl(0),
      numberOfDays: new FormControl(0),
      reminderType: new FormControl(null),
      active: new FormControl(true),
      createdBy:  new FormControl(''),
      createdDt:  new FormControl(''),
      updatedBy:  new FormControl(''),
      updatedDt:  new FormControl('')
    });
  }

  saveOrUpdate(){
    this.uploadFlag = true;
    if(this.data.source !== 'master' && this.data.transId > 0 ){
        this.emailReminderDtlListDataSource.data.forEach(element => {
          if(element.transId == 0){
            element.emailReminderScheduleDtlId=0;
            element.transId = this.data.transId;
          }
        });
        this.emailReminderHdrFormGroup.controls.transId.setValue(this.data.transId);
      }
    this.emailReminderHdrFormGroup.controls.emailReminderScheduleDtlTOList.setValue(this.emailReminderDtlListDataSource.data);

    const obj = this.emailReminderHdrFormGroup.getRawValue();   
      this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateEmailReminder, obj).subscribe(
        data => {
          if (data.success) {
            this.uploadFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.close();
          } else {
            this.uploadFlag = false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    this.uploadFlag = false;
  }

  checkForAlreadyExistence() {
    const processId = this.emailReminderHdrFormGroup.controls['processId'].value;
    const locationId =this.emailReminderHdrFormGroup.controls['locationId'].value;
    if (processId === 0 || locationId === 0) {
      return;
    }   
    if ((this.tempLocId === 0 || this.tempLocId === null || this.tempProcessId === 0 || this.tempProcessId === null) 
        || (this.tempLocId !== locationId || this.tempProcessId !== processId)) {
      this.validateUnique(processId, locationId);
    } else {
      this.errorMsg = '';
      this.emailReminderHdrFormGroup.controls.processName.setErrors(null);
    }
  }

  validateUnique(processId, locationId) {
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.base.EmailReminderScheduleHdrTO";
    constraintData.constraints = {
    'processId': processId,
    'orgId':this.userSession.getUserOrgId(),
    'locationId': locationId
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){
          this.errorMsg = data.message;
          this.emailReminderHdrFormGroup.controls.processName.setErrors(Validators.minLength);
          this.emailReminderHdrFormGroup.controls.processName.setErrors({"notUnique": true});
        }else{
          this.errorMsg = '';
          this.emailReminderHdrFormGroup.controls.processName.setErrors(null);
        }
      }
    );
  }


  fetchEmailReminderInfoByEmailHdrId(primaryId){
    this.subLoaderEmailRem = true;
    this.commonService.commonGetService(this.assetOptimaServices.fetchEmailReminderInfoByEmailHdrId, 
      primaryId,this.data.transId,this.data.processId,this.data.locId).subscribe(
      data => {
        if (data.success) {
          this.subLoaderEmailRem = false;
          this.emailReminderHdrFormGroup.patchValue(data.responseData);
          this.translateService.get([data.responseData.processName])
          .subscribe((val) => {
            const status = Object.values(val)
            this.emailReminderHdrFormGroup.controls.processName.setValue(status[0].toString());
          });   
          this.emailReminderDtlListDataSource.data = data.responseData.emailReminderScheduleDtlTOList;
          this.tempLocId = this.emailReminderHdrFormGroup.controls.locationId.value;
          this.tempProcessId = this.emailReminderHdrFormGroup.controls.processId.value;
          this.length = this.emailReminderDtlListDataSource.data.length;
          this.isValidList();
        }else{
          this.subLoaderEmailRem = false;
        }
      }
    );
  }

  isValidList() {
    this.isValid = this.validate();
    this.getUniqueObjectsFromArray(this.emailReminderDtlListDataSource.data);
  }

  validate(){
    for (const obj of this.emailReminderDtlListDataSource.data) {
      if (obj.numberOfDays <= 0 || obj.reminderType == '' || obj.reminderType == null || obj.numberOfDays > 180) {
        return false;
      }
    }
    return true;
  }

  
  deleteEmailNotify(i) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Email Schedule'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
            this.emailReminderDtlListDataSource.data.splice(i,1);
            this.emailReminderDtlListDataSource._updateChangeSubscription();
            this.length = this.emailReminderDtlListDataSource.data.length;
            this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
            this.enableOnEdit = true;
            this.isValidList();
        }
      });
  }

  loadProcessComboData(searchValue){
    this.scrollsyncProcess = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetProcessCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.processPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.processPageNumber , this.processCombo , data.responseData.comboList)
          this.processPageNumber = this.getData.pageNumber;
          this.processCombo = this.getData.dataList;
          this.scrollsyncProcess = false;
        }
      );
    }

    selectedProcessData(event) {
      if (event === undefined) {
        this.emailReminderHdrFormGroup.controls['processId'].setValue(0);
        this.emailReminderHdrFormGroup.controls.processName.setValue(null);
        this.locationPageNumber = 1;
        this.locationCombo = [];
      } else {
        this.emailReminderHdrFormGroup.controls['processId'].setValue(event.processId);
        this.translateService.get([event.processName])
        .subscribe((val) => {
          const status = Object.values(val)
          this.emailReminderHdrFormGroup.controls.processName.setValue(status[0].toString());
        });
        }
        this.checkForAlreadyExistence();
      }

  getUniqueObjectsFromArray(array) {
    const uniqueArray = array.filter((obj,index, self) => 
    index == self.findIndex(obj1 => obj1.numberOfDays === obj.numberOfDays && obj1.reminderType === obj.reminderType)
    );
    if(uniqueArray.length != array.length){
      this.uniqueList = true; 
    }else{
      this.uniqueList = false;
    }
  }

  enableEdit(){
    this.enableOnEdit = true;
  }

  isElementValid(element) {    
    if (element.numberOfDays < 0) {
      element.numberOfDays = 0;
    } else if (element.numberOfDays > 180) {
      element.numberOfDays = 180;
      console.log(element.numberOfDays);
    }
    this.cdr.detectChanges();
    this.enableOnEdit = true;
    this.isValidList()
  }
}
