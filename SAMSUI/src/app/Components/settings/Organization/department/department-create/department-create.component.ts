import { Component, OnInit, ElementRef, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { departmentModel } from 'src/app/Model/master/department';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { DepartmentListComponent } from '../department-list/department-list.component';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {

  departmentForm: FormGroup;
  uploadDeptFlag: boolean = false;
  @ViewChild('departmentFocus') departmentFocus: ElementRef;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  // Heading
  headingDisplay: string;

  //MODEL
  public department: departmentModel;

  buttonDisplay: string;
  uniqueError: boolean = false;
  tempValue: String = '';
  tempValue1: String = '';
  ErrorMsg: String = '';
  ErrorMsgCode:string='';
  isView:boolean=false;
  @ViewChild('departmentName') departmentNameFocus: ElementRef;

  constructor(public deptDialog: MatDialogRef<DepartmentListComponent>,
    public commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) private data,
    public assetOptimaMethod: AssetOptimaServices,
    private userSessionService: UserSessionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.departmentForm = new FormGroup({
      departmentName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      departmentCode: new FormControl('', [Validators.maxLength(5)]),
      departmentDesc: new FormControl('', [Validators.maxLength(500)]),
      departmentId: new FormControl(''),
      //COMMON OBJECTS
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgId: new FormControl(''),
      orgName: new FormControl(''),
      active: new FormControl(true),
      createdDt: new FormControl(''),
      updatedDt: new FormControl(''),
    })
    this.headingDisplay = "Create";
    this.buttonDisplay = "Submit";
  }

  setClick(): void {
    this.departmentNameFocus.nativeElement.click();
  }

  ngAfterViewInit() {
    this.setClick();
    if (this.data.department != 0 &&this.data.mode =='edit') {
      this.headingDisplay = "Edit";
      this.buttonDisplay = "Update";
      this.departmentForm.patchValue(this.data.department);
    } else if(this.data.mode=='view'){
      this.isView=true;
      this.headingDisplay='View';
      this.buttonDisplay='Update';
      this.departmentForm.disable();
      this.departmentForm.patchValue(this.data.department);
    }else {
      this.headingDisplay = "Create";
      this.buttonDisplay = "Submit";
    }
    this.tempValue = this.data.department.departmentName != null ? this.data.department.departmentName : '';
    this.tempValue1 = this.data.department.departmentCode != null ? this.data.department.departmentCode : '';
    this.cdr.detectChanges();
  }

  closeDeptModal() {
    this.deptDialog.close();
  }

  submitDept() {
    this.uploadDeptFlag = true;
    if(this.departmentForm.controls.departmentCode.value.trim() == ""){
      this.departmentForm.controls.departmentCode.setValue(null);
    }
    this.department = this.departmentForm.value;
    var v_department = this.department.departmentName.trim();
    if (v_department == "") {
      this.commonService.openToastWarningMessage("Kindly Enter the Valid Department");
    } else {
      this.department.departmentName = v_department;
      this.commonService.commonInsertService(this.assetOptimaMethod.saveOrUpdateDepartment, this.department).subscribe(
        data => {
          if (data.success) {
            this.uploadDeptFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
            this.setClick();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadDeptFlag = false;
          }
        }
      );
    }

  }


  //Check Department Name existence
  checkForDepartmentNameExistence() {
    if(this.departmentForm.controls.departmentName.value != ''){
      this.departmentForm.controls.departmentName.setValue(this.departmentForm.controls.departmentName.value.trim())
    }

    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.departmentForm.controls.departmentName.value != null) ? this.departmentForm.controls.departmentName.value.toLowerCase() : '')) {

    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.DepartmentTO";
      constraintData.constraints = {
        'departmentName': this.departmentForm.controls.departmentName.value,
        'orgId': this.userSessionService.getUserOrgId()

      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.departmentForm.controls.departmentName.setErrors(Validators.minLength);
            this.departmentForm.controls.departmentName.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsg = '';
          }
        }
      );
    }

  }

  checkForDepartmentCodeExistence() {
    if(this.departmentForm.controls.departmentCode.value != '' && this.departmentForm.controls.departmentCode.value != null){
      this.departmentForm.controls.departmentCode.setValue(this.departmentForm.controls.departmentCode.value.trim())
    }
    if (((this.tempValue1 != null || this.tempValue1 != '') ? this.tempValue1.toLowerCase() : '') === ((this.departmentForm.controls.departmentCode.value != null) ? this.departmentForm.controls.departmentCode.value.toLowerCase() : '')) {

    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.DepartmentTO";
      constraintData.constraints = {
        'departmentCode': this.departmentForm.controls.departmentCode.value,
        'orgId': this.userSessionService.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsgCode = data.message;
            this.departmentForm.controls.departmentCode.setErrors(Validators.minLength);
            this.departmentForm.controls.departmentCode.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsgCode = '';
            this.departmentForm.controls.departmentCode.setErrors(null);
          }
        }
      );
    }
  }

}
