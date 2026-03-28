import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
// import { ConsoleService } from '@ng-select/ng-select/ng-select/console.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-qualification-create',
  templateUrl: './qualification-create.component.html',
  styleUrls: ['./qualification-create.component.css']
})
export class QualificationCreateComponent implements OnInit {

  @ViewChild('qualificationNameF') qualificationNameFocus: NgSelectComponent;
  values = '';
  limitCount:any;
  skipCount:any;
  searchKey:any = '';
  empQualificationForm: FormGroup;
  getYear: any;
  minToDate: Date;

   //COMMON HINT MESSAGE
   CommonhintMsg = new CommonHint();
   
  constructor(private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private router: Router,
    private assetOptimaConstants: AssetOptimaConstants,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<QualificationCreateComponent>,
    private cdr: ChangeDetectorRef) {

}

ngOnInit() {
  this.empQualificationForm = new FormGroup({
    employeeQualificationId: new FormControl(0),
    qualificationName: new FormControl(null,[Validators.required]),
    university: new FormControl('',[Validators.required, Validators.maxLength(100)]),
    startDate: new FormControl(''),
    completedDate: new FormControl(''),
    yearOfPassing: new FormControl(''),
    percentage: new FormControl('',[Validators.maxLength(4), Validators.pattern(this.assetOptimaConstants.percentageValidation)]), 
    startDateDisp: new FormControl('', Validators.required),
    completedDateDisp: new FormControl('', Validators.required),
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
  
}

ngAfterViewInit() {
  this.commonService.setComboFocus(this.qualificationNameFocus);
  this.cdr.detectChanges();
}

closeModal() {
  this.dialogRef.close();
}



addEmpQualification() {
  this.empQualificationForm.controls.startDateDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.empQualificationForm.controls.startDateDisp.value));
  this.empQualificationForm.controls.completedDateDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.empQualificationForm.controls.completedDateDisp.value));
  this.dialogRef.close(this.empQualificationForm.getRawValue());
}

//Get To date
getToDt(toDate) {
  var getDt = new Date(this.empQualificationForm.get('completedDateDisp').value);
  this.getYear = (getDt.getFullYear());
  this.empQualificationForm.controls.yearOfPassing.setValue(this.getYear);
  this.empQualificationForm.controls.yearOfPassing.disable();
}
dateValidation(event){
  return false;
}
dateValidation1(event){
  return false;
}


// Set min date for To Date 
getFromDate(fromDt) {
  this.empQualificationForm.controls.startDateDisp.setValue(fromDt.value);
  this.minToDate = new Date(fromDt.value);
}
}

