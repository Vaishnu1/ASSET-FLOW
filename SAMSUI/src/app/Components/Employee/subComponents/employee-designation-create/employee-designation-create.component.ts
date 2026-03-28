import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-employee-designation-create',
  templateUrl: './employee-designation-create.component.html',
  styleUrls: ['./employee-designation-create.component.css']
})
export class EmployeeDesignationCreateComponent implements OnInit {

  @ViewChild('designationNameF') designationNameFocus: NgSelectComponent;
  values = '';
  itemNameList: any[] = [];
  limitCount:any;
  skipCount:any;
  searchKey:any = '';
  employeeList: any[] =[];
  reportingList: any[] =[];
  designationList: any[] =[];
  empDesignationForm: FormGroup;
  showToDate:boolean = true;
  currentPageNumber: number;
  uploadEmpDesingation: boolean = false;
  minToDate: Date;
  scrollDesignationsync : boolean = false;
  scrollReportingManagersync : boolean = false;
  scrollReportingHod : boolean = false;

  designationPageNumber : number;
  reportingManagerPageNumber : number;
  reportingHodPageNumber : number;

  constructor(private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EmployeeDesignationCreateComponent>,
    private cdr: ChangeDetectorRef) {
      this.currentPageNumber = 1;
      this.designationPageNumber =1;
      this.reportingManagerPageNumber =1;
      this.reportingHodPageNumber =1;

}

ngOnInit() {
  this.empDesignationForm = new FormGroup({
    designationId: new FormControl(0),
    designationName: new FormControl(null,[Validators.required]),
    fromDate: new FormControl(''),
    tillDate: new FormControl(''),
    fromDateDisp: new FormControl('', Validators.required),
    tillDateDisp: new FormControl(''),
    reportingPersonId: new FormControl(),
    reportingPersonName: new FormControl('',Validators.required),
    reportingHodId: new FormControl(''),
    reportingHodName: new FormControl('',Validators.required),
    currentJob: new FormControl(''),
    employeeId: new FormControl(''),
    //Common Objects
    createdBy: new FormControl(''),
    createdDtDisp: new FormControl(''),
    updatedBy: new FormControl(''), 
    updatedDtDisp: new FormControl(''),
    pageNumber: new FormControl(''),
    recordsPerPage: new FormControl(''),
    orgName: new FormControl(''),
    orgId: new FormControl(''),
  });
  //this.listOfEmployees();
  //this.listOfReportingHOD();
  this.currentPageNumber = 1;
  this.designationPageNumber =1;
  this.reportingManagerPageNumber =1;
  this.reportingHodPageNumber =1;
  
}

ngAfterViewInit() {
  this.commonService.setComboFocus(this.designationNameFocus);
  this.cdr.detectChanges();
}

closeModal() {
  this.dialogRef.close();
}



addEmpDesignation() {
  this.uploadEmpDesingation = true;
  this.empDesignationForm.controls.fromDateDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.empDesignationForm.controls.fromDateDisp.value));
  if(this.empDesignationForm.controls.tillDateDisp.value!= null && this.empDesignationForm.controls.tillDateDisp.value!=''){
    this.empDesignationForm.controls.tillDateDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.empDesignationForm.controls.tillDateDisp.value));
  }
  this.dialogRef.close(this.empDesignationForm.getRawValue());
  this.uploadEmpDesingation = false;
}

searchByEmployees(searchTerms){
  this.searchKey = (searchTerms.term !== '') ? searchTerms : '';
  //this.listOfAllEmployees();
}

listOfEmployees(searchValue){
  this.scrollReportingManagersync = true;
  this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listAllEmployeeForOrgCombo,  searchValue.term , '', '', this.limitCount, this.reportingManagerPageNumber).subscribe(
    (data) =>{
      if (!(this.commonService.fetchSearchValue(searchValue))) {
        if (this.reportingManagerPageNumber === 1) {
          this.employeeList = data.responseData.comboList;
        } else {
          this.employeeList = this.employeeList.concat(data.responseData.comboList);
        }
      } else {
        this.employeeList = data.responseData.comboList;
      }
      data.responseData.comboList.length != 0 ? this.reportingManagerPageNumber += 1 : this.reportingManagerPageNumber = 1;
    }
  );
  this.scrollReportingManagersync = false;

}

listOfAllEmployees(){
  this.commonService.getComboResults(this.assetOptimaServices.listAllEmployeeForOrgCombo,  this.searchKey, '', '').subscribe(
    (data) =>{
          this.employeeList = data.responseData.comboList;
       }
  );
}

getEmployeeValue(event){
  if (event === undefined) {
    this.empDesignationForm.get('reportingPersonId').setValue(0);
    this.employeeList = [];
    this.reportingManagerPageNumber = 1;
  } else {
    this.empDesignationForm.get('reportingPersonId').setValue(event.employeeId);
  }
}

searchReportingHOD(searchTerms){
  this.searchKey = (searchTerms.term !== '') ? searchTerms : '';
  //this.listOfAllReportingHOD();
}

listOfReportingHOD(searchValue) {
  this.scrollReportingHod = true;
  this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listAllEmployeeForOrgCombo,  searchValue.term, '', '', this.limitCount, this.reportingHodPageNumber).subscribe(
    (data) =>{
      if (!(this.commonService.fetchSearchValue(searchValue))) {
        if (this.reportingHodPageNumber === 1) {
          this.reportingList = data.responseData.comboList;
        } else {
          this.reportingList = this.reportingList.concat(data.responseData.comboList);
        }
      } else {
        this.reportingList = data.responseData.comboList;
      }
      data.responseData.comboList.length != 0 ? this.reportingHodPageNumber += 1 : this.reportingHodPageNumber = 1;
    }
  );
  this.scrollReportingHod = false;
}

listOfAllReportingHOD() {
  this.commonService.getComboResults(this.assetOptimaServices.listAllEmployeeForOrgCombo,this.searchKey).subscribe(
    (data) =>{
      this.reportingList = data.responseData.comboList;
    }
  );
}

getReportingHodValue(event) {
  if (event === undefined) {
    this.empDesignationForm.get('reportingHodId').setValue(0);
    this.reportingList = [];
    this.reportingHodPageNumber = 1;
  } else {
    this.empDesignationForm.get('reportingHodId').setValue(event.employeeId);
  }
}

//List of designation
listOfDesignation(searchValue){
  this.scrollDesignationsync = true;
  this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listOfAllDesignationCombo,searchValue.term,'','',this.limitCount, this.designationPageNumber).subscribe(
    (data) =>{
      if (!(this.commonService.fetchSearchValue(searchValue))) {
        if (this.designationPageNumber === 1) {
          this.designationList = data.responseData.comboList;
        } else {
          this.designationList = this.designationList.concat(data.responseData.comboList);
        }
      } else {
        this.designationList = data.responseData.comboList;
      }
      data.responseData.comboList.length != 0 ? this.designationPageNumber += 1 : this.designationPageNumber = 1;
    }
  );
  this.scrollDesignationsync =false;
}

getDesignationValue(event){
  if (event === undefined) {
    this.empDesignationForm.get('designationId').setValue(0);
    this.designationList = [];
    this.designationPageNumber = 1;
  } else {
    this.empDesignationForm.get('designationId').setValue(event.designationId);
  }
}
currentJob(checkvalue) {
  const Status = checkvalue.checked;
    if (Status) {
      this.showToDate= false;
    }else {
      this.showToDate = true;
    }
}

// Set min date for To Date 
getFromDate(fromDt) {
  this.empDesignationForm.controls.fromDateDisp.setValue(fromDt.value);
  this.minToDate = new Date(fromDt.value);
}
dateValidation(event){
  return false;
}
dateValidation1(event){
  return false;
}
}

