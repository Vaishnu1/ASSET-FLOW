import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
// import { ConsoleService } from '@ng-select/ng-select/ng-select-ng-select/ConsoleService';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-experience-create',
  templateUrl: './experience-create.component.html',
  styleUrls: ['./experience-create.component.css']
})
export class ExperienceCreateComponent implements OnInit {

  @ViewChild('companyNameF') companyNameFocus: NgSelectComponent;
  values = '';
  limitCount:any;
  skipCount:any;
  searchKey:any = '';
  designationList: any[] =[];
  minToDate: Date;
  empExperienceForm: FormGroup;

  scrollDesignationNamesync : boolean = false;
  designationPageNumber : number;

   //COMMON HINT MESSAGE
   CommonhintMsg = new CommonHint();

  constructor(private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ExperienceCreateComponent>,
    private cdr: ChangeDetectorRef) {
      this.designationPageNumber = 1;

}

  ngOnInit() {
    this.empExperienceForm = new FormGroup({
      employeeExperienceId: new FormControl(0),
      companyName: new FormControl(null,[Validators.required, Validators.maxLength(100)]),
      address: new FormControl(''),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      designation: new FormControl(''),
      designationId: new FormControl(''),
      startDateDisp: new FormControl(''),
      endDateDisp: new FormControl(''),
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
    this.designationPageNumber = 1;
  }
  ngAfterViewInit() {
    this.commonService.setComboFocus(this.companyNameFocus);
    this.cdr.detectChanges();
  }
  //Close modal popup form
closeModal() {
  this.dialogRef.close();
}

  
addEmpExperience() {
  this.empExperienceForm.controls.startDateDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.empExperienceForm.controls.startDateDisp.value));
  this.empExperienceForm.controls.endDateDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.empExperienceForm.controls.endDateDisp.value));
  this.dialogRef.close(this.empExperienceForm.getRawValue());
}

//List of designation
listOfDesignation(searchValue){
  this.scrollDesignationNamesync = true;
  this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listOfAllDesignationCombo,searchValue.term, '', '', this.limitCount, this.designationPageNumber).subscribe(
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
  this.scrollDesignationNamesync = false;
}



getDesignationValue(event){
  
  if (event === undefined) {
    this.empExperienceForm.get('designationId').setValue(0);
    this.designationList = [];
    this.designationPageNumber = 1;
  } else {
    this.empExperienceForm.get('designationId').setValue(event.designationId);
  }
}

// Set min date for To Date 
getFromDate(fromDt) {
  this.empExperienceForm.controls.startDateDisp.setValue(fromDt.value);
  this.minToDate = new Date(fromDt.value);
}
dateValidation(event){
  return false;
}
dateValidation1(event){
  return false;
}
}
