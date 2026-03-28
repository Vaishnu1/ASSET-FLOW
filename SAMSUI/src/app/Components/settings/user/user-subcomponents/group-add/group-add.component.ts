import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { NgSelectComponent } from '@ng-select/ng-select';
import { GroupModel } from 'src/app/Model/base/group';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';


@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.css']
})
export class GroupAddComponent implements OnInit {
  displayedColumns: string[] = ['menuName', 'active'];
  dataSource : any=[];
  organizationData: any =[];
  @ViewChild('groupNameField') groupFocusElement: ElementRef;
  @ViewChild('orgCombo') orgCombo: NgSelectComponent;
  editMode: boolean = false;
  public groupFormGroup: FormGroup;
  headingDisplay: string = "Create";
  buttonDisplay: string ="Submit";

  groupName: FormControl;
  groupId: FormControl;
  orgId: FormControl;
  groupMenuList: FormControl;
  orgName: FormControl;
  locationId: FormControl;
  locationName: FormControl;
  createdBy: FormControl;
  createdDt: FormControl;
  superAdmin:FormControl
  groupModel: GroupModel;

  //DISABLE BUTTON AFTER A SINGLE CLICK
  uploadFlagGroup: boolean = false;
  uploadBtnFlag: boolean = false;

  ErrorMsg :string;

  tempValue: String = '';

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  slideToggleFlag: boolean =false;

  constructor(public dialogRef: MatDialogRef<GroupAddComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private commonService: CommonService,
              private samsService: AssetOptimaServices,
              private userSession: UserSessionService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.iniFormControl();
    this.initFormGroup();
    this.loadListdata();
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.groupFocusElement);
    let paramData=this.data;
    if(paramData!= null) {
      if(paramData.groupId > 0 && this.data.mode == 'edit') {
        this.loadGroupInfo(paramData.groupId);
        this.headingDisplay="Edit";
        this.buttonDisplay="Update";
        this.groupName.disable();
        this.tempValue = this.data.groupName!= null ? this.data.groupName : '';
        this.uploadBtnFlag = true;
      }else if(paramData.groupId > 0 && this.data.mode == 'view'){
        this.loadGroupInfo(paramData.groupId);
        this.headingDisplay="View";
        this.buttonDisplay="Back";
        this.groupName.disable();
        this.slideToggleFlag = true;
        this.tempValue = this.data.groupName!= null ? this.data.groupName : '';
      }else{
       this.headingDisplay="Create";
       this.buttonDisplay="Submit";
       this.tempValue = this.data.groupName != null ? this.data.groupName : '';
      }
      this.cdr.detectChanges();
    }
  }

  iniFormControl() {
    this.groupName = new FormControl('',[Validators.required, Validators.maxLength(50)]);
    this.groupId = new FormControl('');
    this.orgId = new FormControl(0);
    this.groupMenuList = new FormControl([]);
    this.orgName = new FormControl('');
    this.locationId = new FormControl(0);
    this.locationName = new FormControl('');
    this.createdBy = new FormControl('');
    this.createdDt = new FormControl('');
    this.superAdmin = new FormControl(false);
  }

  initFormGroup() {
    this.groupFormGroup = new FormGroup({
      groupName: this.groupName,
      groupId: this.groupId,
      orgId: this.orgId,
      groupMenuList: this.groupMenuList,
      orgName: this.orgName,
      locationId: this.locationId,
      locationName: this.locationName,
      createdBy: this.createdBy,
      createdDt: this.createdDt,
      superAdmin: this.superAdmin
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  getOrganisationComboData(searchValue) {
    this.commonService.getComboResults(this.samsService.listOfActiveOrgNameCombo,searchValue.term,'','',25,2).subscribe(
      (data) => {
        this.organizationData = data.responseData.comboList;
      }
    );
  }

  setFormFocus() {
    setTimeout(() => {
      this.groupFocusElement.nativeElement.focus();
    }, 500);

  }

  loadListdata() {
    this.commonService.commonGetService(this.samsService.listOfAllMenus).subscribe(
      (data) => {
        this.dataSource = data.responseData;
      }
    );
  }

  saveOrUpdateGroup() {
    this.uploadFlagGroup=true;
    this.groupMenuList.patchValue(this.dataSource);
    this.groupModel = this.groupFormGroup.getRawValue();
    var groupName = this.groupModel.groupName.trim();
    if(groupName == ""){
      this.commonService.openToastWarningMessage("Kindly Enter the Valid Group");
    }else{
      this.commonService.commonInsertService(this.samsService.saveOrUpdateGroup,this.groupModel).subscribe(
        (data) => {
          if(data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            this.uploadFlagGroup=false;
            this.dialogRef.close();
          }
          else{
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFlagGroup=false;
          }
        }, error =>{
            this.uploadFlagGroup=false;
        }
      );
    }
  }

  onOrgComboSelect(event) {
  this.orgName.setValue(event.orgName);
  this.orgId.setValue(event.orgId);
  }

  loadGroupInfo(groupId) {
    this.commonService.commonGetService(this.samsService.loadGroupMenuInfo,groupId).subscribe(
      groupData => {
        if(groupData.success) {
          this.groupFormGroup.patchValue(groupData.responseData);
          this.dataSource = groupData.responseData.groupMenuList;
        }
      }
    );
  }

  clearData() {
    this.groupFormGroup.reset();
    this.orgCombo.clearItem(this.orgName.value);
  }


  gettingTheFreshList(event) {

  }

  //UNIQUE VALIDATION
  checkUniqueConstrainForGroup() {
    if(this.groupFormGroup.controls.groupName.value !== ''){
      this.groupFormGroup.controls.groupName.setValue(this.groupFormGroup.controls.groupName.value.trim())
    }
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') ===
       ((this.groupFormGroup.controls.groupName.value!= null) ? this.groupFormGroup.controls.groupName.value.toLowerCase():'')) {
    }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.base.GroupTO";
    constraintData.constraints = {
      'groupName': this.groupName.value.toLowerCase(),
      'orgId':this.userSession.getUserOrgId()
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){
          //show the warning invalidate the form group
          this.ErrorMsg = data.message;
          this.groupFormGroup.controls.groupName.setErrors(Validators.minLength);
          this.groupFormGroup.controls.groupName.setErrors({"notUnique": true});
          } else{
            this.ErrorMsg = '';
            this.groupFormGroup.controls.groupName.setErrors(null);
          }
      }
    );
  }
 }

    updateBtnflag(){
      this.uploadBtnFlag = false;
    }

}
