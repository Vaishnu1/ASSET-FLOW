import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuildingComponent } from 'src/app/Components/settings/Organization/building/building.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { getData } from 'src/app/Model/common/fetchListData';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-building-block-create',
  templateUrl: './building-block-create.component.html',
  styleUrls: ['./building-block-create.component.css']
})
export class BuildingBlockCreateComponent implements OnInit {

  buildingBlockCreateForm: FormGroup;
  headingDisplay :string;
  uploadBlockFlag :boolean=false;
  buttonDisplay:string;
  modeDisplay:boolean=false;
  tempValue:string='';

  @ViewChild('locationName') locationNameFocus: NgSelectComponent;

  scrollsyncLocation:Boolean=false;
  recordsPerPageForCombo:string;
  locationPageNumber:number;
  locationCombo :any=[];

  CommonhintMsg = new CommonHint();
  getData: getData;
  ErrorMsg: String = '';

  constructor(public deptDialog: MatDialogRef<BuildingComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService:CommonService,
              private assetOptimaServices :AssetOptimaServices,
              private assetOptimaConstant :AssetOptimaConstants,
              private userSessionService: UserSessionService,
              private cdr: ChangeDetectorRef) {
                this.locationPageNumber=1;
              }

  ngOnInit() {
    this.buildingBlockCreateForm = new FormGroup({
        locationName : new FormControl(null,[Validators.required]),
        locationId : new FormControl(0),
        blockName : new FormControl('',[Validators.required]),
        buildingBlockId : new FormControl(0),
        orgId : new FormControl(0),
        blockDesc: new FormControl('',[Validators.maxLength(300)]),
        createdBy : new FormControl(''),
        createdDt : new FormControl(''),
        updatedDt : new FormControl(''),
        updatedBy : new FormControl(''),
        createdDtDisp : new FormControl(''),
        updatedDtDisp : new FormControl(''),
        active : new FormControl(true)
    })
    this.headingDisplay = 'Create';
    this.buttonDisplay='Submit';
    // this.locFocus.nativeElement.focus()
  }

  ngAfterViewInit() {
    if (this.data.block != 0 &&this.data.mode =='edit') {
      this.headingDisplay = "Edit";
      this.buttonDisplay = "Update";
      this.buildingBlockCreateForm.patchValue(this.data.block);
    } else if(this.data.mode=='view'){
      this.modeDisplay=true;
      this.headingDisplay='View';
      this.buttonDisplay='Back';
      this.buildingBlockCreateForm.patchValue(this.data.block);
      this.buildingBlockCreateForm.disable();

    }else {
      this.headingDisplay = "Create";
      this.buttonDisplay = "Submit";
      this.buildingBlockCreateForm.controls.locationName.setValue(this.assetOptimaConstant.defaultuserLocName);
      this.buildingBlockCreateForm.controls.locationId.setValue(this.assetOptimaConstant.defaultuserLocId)
    }    
    this.tempValue = this.data.block.blockName != null ? this.data.block.blockName : '';
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
      this.buildingBlockCreateForm.controls['locationId'].setValue(0);
      this.buildingBlockCreateForm.controls['locationName'].setValue(null);
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.buildingBlockCreateForm.controls['locationName'].setValue(event.locationName);
      this.buildingBlockCreateForm.controls['locationId'].setValue(event.locationId);
    }
  }


  submitBlock(){
    this.uploadBlockFlag = true;
      this.commonService.commonInsertService('saveOrUpdateBuildingBlock.sams', this.buildingBlockCreateForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.uploadBlockFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
            this.setClick();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadBlockFlag = false;
          }
        }
      );
    }
  
    setClick(): void {
      this.locationNameFocus.focus();
    }

  closeBlockModal(){
      this.deptDialog.close();
  }

  checkForblockNameExistence(){
    if(this.buildingBlockCreateForm.controls.blockName.value != ''){
      this.buildingBlockCreateForm.controls.blockName.setValue(this.buildingBlockCreateForm.controls.blockName.value.trim())
    }
    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.buildingBlockCreateForm.controls.blockName.value != null) ? this.buildingBlockCreateForm.controls.blockName.value.toLowerCase() : '')) {

    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.BuildingBlockTO";
      constraintData.constraints = {
        'blockName': this.buildingBlockCreateForm.controls.blockName.value,
        'orgId': this.userSessionService.getUserOrgId(),
        'locationName': this.buildingBlockCreateForm.controls.locationName.value
      };
      console.log(this.buildingBlockCreateForm.controls.locationName.value);
      
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.buildingBlockCreateForm.controls.blockName.setErrors(Validators.minLength);
            this.buildingBlockCreateForm.controls.blockName.setErrors({ "notUnique": true });            
          } else {
            this.ErrorMsg = '';
          }
        }
      );
    }
  }

}
