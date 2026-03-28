import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuildingComponent } from 'src/app/Components/settings/Organization/building/building.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { getData } from 'src/app/Model/common/fetchListData';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-building-floor-create',
  templateUrl: './building-floor-create.component.html',
  styleUrls: ['./building-floor-create.component.css']
})
export class BuildingFloorCreateComponent implements OnInit {


  scrollsyncLocation:Boolean=false;
    recordsPerPageForCombo:string;
    locationPageNumber:number;
    locationCombo :any=[];
    modeDisplay :boolean = false;
    uploadFloorFlag: boolean =false;
    buttonDisplay:string ;
    headingDisplay:string;
    @ViewChild('locationName') locationNameFocus: NgSelectComponent;

    blockScrollSync : boolean=false;
    blockNamePageNumber :number =0;
    blockComboList : any=[];


    CommonhintMsg = new CommonHint();
    getData: getData;

    tempValue:string='';
    ErrorMsg: String = '';

  constructor(public deptDialog: MatDialogRef<BuildingComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService:CommonService,
    private assetOptimaServices :AssetOptimaServices,
    private assetOptimaConstant :AssetOptimaConstants,
    private userSessionService: UserSessionService,
    private cdr: ChangeDetectorRef
    ) {
      this.locationPageNumber=1;
      this.blockNamePageNumber=1;
     }

    buildingFloorCreateForm:FormGroup;
    

  ngOnInit() {
    this.buildingFloorCreateForm = new FormGroup({
      locationName : new FormControl(null,[Validators.required]),
      locationId : new FormControl(0),
      floorName : new FormControl('',[Validators.required]),
      buildingFloorId : new FormControl(0),
      orgId : new FormControl(0),
      createdBy : new FormControl(''),
      createdDt : new FormControl(''),
      updatedDt : new FormControl(''),
      updatedBy : new FormControl(''),
      createdDtDisp : new FormControl(''),
      updatedDtDisp : new FormControl(''),
      active : new FormControl(true),
      blockName : new FormControl(null,[Validators.required]),
      blockId : new FormControl(0)
  })
  this.buttonDisplay='Submit';
  this.headingDisplay ='Create';
  // this.locFocus.nativeElement.focus()

}

ngAfterViewInit() {
  if (this.data.floor != 0 &&this.data.mode =='edit') {
    this.headingDisplay = "Edit";
    this.buttonDisplay = "Update";
    this.buildingFloorCreateForm.patchValue(this.data.floor);
  } else if(this.data.mode=='view'){
    this.modeDisplay=true;
    this.headingDisplay='View';
    this.buttonDisplay='Back';
    this.buildingFloorCreateForm.disable();
    this.buildingFloorCreateForm.patchValue(this.data.floor);
  }else {
    this.headingDisplay = "Create";
    this.buttonDisplay = "Submit";
    this.buildingFloorCreateForm.controls.locationName.setValue(this.assetOptimaConstant.defaultuserLocName);
    this.buildingFloorCreateForm.controls.locationId.setValue(this.assetOptimaConstant.defaultuserLocId)
  }  
  this.tempValue = this.data.floor.floorName != null ? this.data.floor.floorName : '';
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
      );;
  }

  selectedLocationData(event) {
    
    if (event === undefined) {
      this.buildingFloorCreateForm.controls['locationId'].setValue(0);
      this.buildingFloorCreateForm.controls['locationName'].setValue(null);
      this.locationPageNumber = 1;
      this.blockNamePageNumber=1;
      this.blockComboList=[];
      this.locationCombo = [];
    } else {
      this.buildingFloorCreateForm.controls['locationName'].setValue(event.locationName);
      this.buildingFloorCreateForm.controls['locationId'].setValue(event.locationId);
      this.blockNamePageNumber=1;
      this.blockComboList=[];
    }
  }


  submitBlock(){
    this.uploadFloorFlag = true;
      this.commonService.commonInsertService('saveOrUpdateBuildingFloor.sams', this.buildingFloorCreateForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.uploadFloorFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
            this.setClick();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFloorFlag = false;
          }
        }
      );
  }

  setClick(): void {
    this.locationNameFocus.focus();
  }

  closeFloorModal(){
      this.deptDialog.close();
  }

  checkForFloorkNameExistence(){
    if(this.buildingFloorCreateForm.controls.floorName.value != ''){
      this.buildingFloorCreateForm.controls.floorName.setValue(this.buildingFloorCreateForm.controls.floorName.value.trim())
    }
    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.buildingFloorCreateForm.controls.floorName.value != null) ? this.buildingFloorCreateForm.controls.floorName.value.toLowerCase() : '')) {

    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.BuildingFloorTO";
      constraintData.constraints = {
        'floorName': this.buildingFloorCreateForm.controls.floorName.value,
        'orgId': this.userSessionService.getUserOrgId(),
        'locationName': this.buildingFloorCreateForm.controls.locationName.value,
        'blockId': this.buildingFloorCreateForm.controls.blockId.value
      };
      console.log(this.buildingFloorCreateForm.controls.locationName.value);
      
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.buildingFloorCreateForm.controls.floorName.setErrors(Validators.minLength);
            this.buildingFloorCreateForm.controls.floorName.setErrors({ "notUnique": true });            
          } else {
            this.ErrorMsg = '';
          }
        }
      );
    }
  }

  getBlockNameComboData(searchValue) { 
    this.blockScrollSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllBuildingCombo.sams', searchValue.term, this.buildingFloorCreateForm.controls.locationId.value>0 ? this.buildingFloorCreateForm.controls.locationId.value :0, '',
      this.recordsPerPageForCombo, this.blockNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.blockNamePageNumber , this.blockComboList , data.responseData.comboList)
          this.blockNamePageNumber = this.getData.pageNumber;
          this.blockComboList = this.getData.dataList;
          this.blockScrollSync = false;
        }
      );
  }

  selectedBlockName(event){
    if (event === undefined) {
      this.buildingFloorCreateForm.controls.blockId.setValue(0);
      this.buildingFloorCreateForm.controls.blockName.setValue('')
      this.blockNamePageNumber = 1;
      this.blockComboList = [];
    } else {
      this.buildingFloorCreateForm.controls.blockName.setValue(event.blockName);
      this.buildingFloorCreateForm.controls.blockId.setValue(event.buildingBlockId);
    }
  }
}
