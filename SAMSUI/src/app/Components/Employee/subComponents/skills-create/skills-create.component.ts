import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
// import { ConsoleService } from '@ng-select/ng-select/ng-select-ng-select/ConsoleService';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-skills-create',
  templateUrl: './skills-create.component.html',
  styleUrls: ['./skills-create.component.css']
})
export class SkillsCreateComponent implements OnInit {

  @ViewChild('skillNameF') skillNameFocus: ElementRef;
  values = '';
  limitCount:any;
  skipCount:any;
  searchKey:any = '';
  empSkillForm: FormGroup;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  
  constructor(private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<SkillsCreateComponent>,
    private cdr: ChangeDetectorRef) {

}

  ngOnInit() {
    this.empSkillForm = new FormGroup({
      employeeSkillId: new FormControl(0),
      skillName: new FormControl(null,[Validators.required, Validators.maxLength(100)]),
      noOfYears: new FormControl('',[Validators.required,Validators.pattern(this.assetOptimaConstants.decimalValidation)]),
      remarks: new FormControl('', Validators.maxLength(500)),
      level: new FormControl(''),
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
  this.commonService.setFormFocus(this.skillNameFocus);
  this.cdr.detectChanges();

}
//Level COmbo
level = [
  {id: 1, levelName: '1'},
  {id: 2, levelName: '2'},
  {id: 3, levelName: '3'},
  {id: 4, levelName: '4'},
  {id: 5, levelName: '5'},
  {id: 6, levelName: '6'},
  {id: 7, levelName: '7'},
  {id: 8, levelName: '8'},
  {id: 9, levelName: '9'},
  {id: 10, levelName: '10'}

];

//Close modal popup form
closeModal() {
  this.dialogRef.close();
}

searchByKey(searchTerms) {

  this.searchKey = (searchTerms.term !== '') ? searchTerms : '';
}
  
addEmpSkill() {
  this.dialogRef.close(this.empSkillForm.getRawValue());
}
}
  
  
