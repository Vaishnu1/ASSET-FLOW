import { Component, OnInit, ElementRef, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuildingComponent } from 'src/app/Components/settings/Organization/building/building.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { getData } from 'src/app/Model/common/fetchListData';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-building-segment-create',
  templateUrl: './building-segment-create.component.html',
  styleUrls: ['./building-segment-create.component.css']
})
export class BuildingSegmentCreateComponent implements OnInit {

  buildingSegmentCreateForm: FormGroup;
  headingDisplay: string;
  uploadSegmentFlag: boolean = false;
  buttonDisplay: string;

  @ViewChild('locationName') locationNameFocus: NgSelectComponent;


  scrollsyncLocation: Boolean = false;
  recordsPerPageForCombo: string;
  locationPageNumber: number;
  locationCombo: any = [];
  modeDisplay: boolean = false;

  CommonhintMsg = new CommonHint();
  getData: getData;
  
  tempValue:string='';
  ErrorMsg: String = '';

  constructor(public deptDialog: MatDialogRef<BuildingComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    private assetOptimaConstant: AssetOptimaConstants,
    private userSessionService: UserSessionService,
    private assetOptimaServices: AssetOptimaServices) {
    this.locationPageNumber = 1;
  }
  ngOnInit() {
    this.buildingSegmentCreateForm = new FormGroup({
      locationName: new FormControl('', [Validators.required]),
      locationId: new FormControl(0),
      segmentName: new FormControl('', [Validators.required]),
      buildingSegmentId: new FormControl(0),
      orgId: new FormControl(0),
      segmentDesc: new FormControl('', [Validators.maxLength(300)]),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      active: new FormControl(true)
    })
    this.headingDisplay = 'Create';
    this.buttonDisplay = 'Submit';
    // this.locFocus.nativeElement.focus()
  }

  ngAfterViewInit() {
    if (this.data.segment != 0 &&this.data.mode =='edit') {
      this.headingDisplay = "Edit";
      this.buttonDisplay = "Update";
      this.buildingSegmentCreateForm.patchValue(this.data.segment);
    } else if(this.data.mode=='view'){
      this.modeDisplay=true;
      this.headingDisplay='View';
      this.buttonDisplay='Back';
      this.buildingSegmentCreateForm.disable();
      this.buildingSegmentCreateForm.patchValue(this.data.segment);
    }else {
      this.headingDisplay = "Create";
      this.buttonDisplay = "Submit";
      this.buildingSegmentCreateForm.controls.locationName.setValue(this.assetOptimaConstant.defaultuserLocName);
      this.buildingSegmentCreateForm.controls.locationId.setValue(this.assetOptimaConstant.defaultuserLocId)

     // this.tempValue = this.data.department.departmentName != null ? this.data.department.departmentName : '';
    }    
    this.tempValue = this.data.segment.floorName != null ? this.data.segment.floorName : '';
    this.cdr.detectChanges();
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
      this.buildingSegmentCreateForm.controls['locationId'].setValue(0);
      this.buildingSegmentCreateForm.controls['locationName'].setValue('');
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.buildingSegmentCreateForm.controls['locationName'].setValue(event.locationName);
      this.buildingSegmentCreateForm.controls['locationId'].setValue(event.locationId);
    }
  }


  submitSegment() { 
    this.uploadSegmentFlag = true;
      this.commonService.commonInsertService('saveOrUpdateBuildingSegment.sams', this.buildingSegmentCreateForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.uploadSegmentFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
            this.setClick();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadSegmentFlag = false;
          }
        }
      );
  }

  setClick(): void {
    this.locationNameFocus.focus();
  }

  closeSegmentModal() {
    this.deptDialog.close();
  }
  
  checkForSegmentNameExistence() { 
    if(this.buildingSegmentCreateForm.controls.segmentName.value != ''){
      this.buildingSegmentCreateForm.controls.segmentName.setValue(this.buildingSegmentCreateForm.controls.segmentName.value.trim())
    }
    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.buildingSegmentCreateForm.controls.segmentName.value != null) ? this.buildingSegmentCreateForm.controls.segmentName.value.toLowerCase() : '')) {

    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.BuildingSegmentTO";
      constraintData.constraints = {
        'segmentName': this.buildingSegmentCreateForm.controls.segmentName.value,
        'orgId': this.userSessionService.getUserOrgId(),
        'locationName': this.buildingSegmentCreateForm.controls.locationName.value
      };
      console.log(this.buildingSegmentCreateForm.controls.locationName.value);
      
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.buildingSegmentCreateForm.controls.segmentName.setErrors(Validators.minLength);
            this.buildingSegmentCreateForm.controls.segmentName.setErrors({ "notUnique": true });            
          } else {
            this.ErrorMsg = '';
          }
        }
      );
    }
  }

}
