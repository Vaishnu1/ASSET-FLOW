import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuildingComponent } from 'src/app/Components/settings/Organization/building/building.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-building-room-create',
  templateUrl: './building-room-create.component.html',
  styleUrls: ['./building-room-create.component.css']
})
export class BuildingRoomCreateComponent implements OnInit {



  buildingRoomCreateForm: FormGroup;
  headingDisplay: string;
  uploadRoomFlag: boolean = false;
  buttonDisplay: string;

  @ViewChild('locationName') locationNameFocus: NgSelectComponent;


  scrollsyncLocation: Boolean = false;
  recordsPerPageForCombo: string;
  locationPageNumber: number;
  locationCombo: any = [];
  modeDisplay: boolean = false;

  blockScrollSync :Boolean =false;
  blockNamePageNumber : number=0;
  blockComboList : any=[];

  floorSrcollSync :Boolean =false;
  floorNamePageNumber : number=0;
  floorComboList : any=[];

  segmentSrcollSync : Boolean=false;
  segmentNamePageNumber :number =0;
  segmentComboList :any=[];

  CommonhintMsg = new CommonHint();
  getData: getData;
  
  tempValue:string='';
  ErrorMsg: String = '';

  constructor(public deptDialog: MatDialogRef<BuildingComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private userSession: UserSessionService,
    private cdr : ChangeDetectorRef) {
    this.locationPageNumber = 1;
    this.blockNamePageNumber=1;
    this.floorNamePageNumber=1;
    this.segmentNamePageNumber =1;
  }

  ngOnInit(){
    
    this.buildingRoomCreateForm = new FormGroup({
    locationName : new FormControl(null,[Validators.required]),
    locationId : new FormControl(0),
    roomName : new FormControl('',[Validators.required]),
    buildingRoomId : new FormControl(0),
    orgId : new FormControl(0),
    roomDesc: new FormControl('',[Validators.maxLength(300)]),
    createdBy : new FormControl(''),
    createdDt : new FormControl(''),
    updatedDt : new FormControl(''),
    updatedBy : new FormControl(''),
    createdDtDisp : new FormControl(''),
    updatedDtDisp : new FormControl(''),
    active : new FormControl(true),
    blockName : new FormControl(null,[Validators.required]),
    blockId : new FormControl(0),
    floorName : new FormControl(null,Validators.required),
    floorId : new FormControl(0),
    segmentName : new FormControl(''),
    segmentId : new FormControl(0)
})
this.headingDisplay = 'Create';
this.buttonDisplay='Submit';
// this.locFocus.nativeElement.focus()
}

ngAfterViewInit() {
  if (this.data.room != 0 &&this.data.mode =='edit') {
    this.headingDisplay = "Edit";
    this.buttonDisplay = "Update";
    this.buildingRoomCreateForm.patchValue(this.data.room);
  } else if(this.data.mode=='view'){
    this.modeDisplay=true;
    this.headingDisplay='View';
    this.buttonDisplay='Back';
    this.buildingRoomCreateForm.disable();
    this.buildingRoomCreateForm.patchValue(this.data.room);
  }else {
    this.headingDisplay = "Create";
    this.buttonDisplay = "Submit";
   
    this.buildingRoomCreateForm.controls.locationName.setValue(this.userSession.getUserLocationName());
    this.buildingRoomCreateForm.controls.locationId.setValue((this.userSession.getUserLocationId()));
  }
  this.tempValue = this.data.room.roomName != null ? this.data.room.roomName : '';
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
    this.buildingRoomCreateForm.controls['locationId'].setValue(0);
    this.buildingRoomCreateForm.controls['locationName'].setValue(null);
    this.locationPageNumber = 1;
    this.blockNamePageNumber=1;
    this.floorNamePageNumber=1;
    this.segmentNamePageNumber=1;
    this.segmentComboList=[];
    this.blockComboList=[];
    this.floorComboList=[];
    this.locationCombo = [];
    this.buildingRoomCreateForm.controls.blockName.setValue(null)
    this.buildingRoomCreateForm.controls.blockId.setValue(0)

    this.buildingRoomCreateForm.controls.floorName.setValue(null);
    this.buildingRoomCreateForm.controls.floorId.setValue(0)

    this.buildingRoomCreateForm.controls.segmentId.setValue(0);
    this.buildingRoomCreateForm.controls.segmentName.setValue(null)
  } else {
    this.buildingRoomCreateForm.controls['locationName'].setValue(event.locationName);
    this.buildingRoomCreateForm.controls['locationId'].setValue(event.locationId);
    this.blockNamePageNumber=1;
    this.floorNamePageNumber=1;
    this.blockComboList=[];
    this.floorComboList=[];
    this.segmentNamePageNumber=1;
    this.segmentComboList=[];

    this.buildingRoomCreateForm.controls.blockName.setValue(null)
    this.buildingRoomCreateForm.controls.blockId.setValue(0)

    this.buildingRoomCreateForm.controls.floorName.setValue(null);
    this.buildingRoomCreateForm.controls.floorId.setValue(0)

    this.buildingRoomCreateForm.controls.segmentId.setValue(0);
    this.buildingRoomCreateForm.controls.segmentName.setValue(null)

  }
}


submitRoom(){
    this.uploadRoomFlag = true;
      this.commonService.commonInsertService('saveOrUpdateBuildingRoom.sams', this.buildingRoomCreateForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.uploadRoomFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
            this.setClick();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadRoomFlag = false;
          }
        }
      );
}

setClick(): void {
  this.locationNameFocus.focus();
}
closeRoomModal(){
    this.deptDialog.close();
}

getBlockNameComboData(searchValue) {
  this.blockScrollSync = true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults('listOfAllBuildingCombo.sams', searchValue.term, 
  this.buildingRoomCreateForm.controls.locationId.value>0 ? this.buildingRoomCreateForm.controls.locationId.value : 0, '',
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
    this.buildingRoomCreateForm.controls.blockName.setValue(null);
    this.buildingRoomCreateForm.controls.blockId.setValue(0)
    this.blockNamePageNumber = 1;
    this.floorNamePageNumber=1;
    this.floorComboList=[];
    this.blockComboList = [];
    this.buildingRoomCreateForm.controls.floorId.setValue(0);
    this.buildingRoomCreateForm.controls.floorName.setValue(null)
  } else {
    this.buildingRoomCreateForm.controls.blockName.setValue(event.blockName);
    this.buildingRoomCreateForm.controls.blockId.setValue(event.buildingBlockId);
    this.floorNamePageNumber=1;
    this.floorComboList=[];

    this.buildingRoomCreateForm.controls.floorId.setValue(0);
    this.buildingRoomCreateForm.controls.floorName.setValue(null)
  }
}

getFloorNameComboData(searchValue) {
  this.floorSrcollSync = true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults('listOfAllFloorCombo.sams', searchValue.term, this.buildingRoomCreateForm.controls.locationId.value>0 ?this.buildingRoomCreateForm.controls.locationId.value : 0 ,
  this.buildingRoomCreateForm.controls.blockId.value>0 ? this.buildingRoomCreateForm.controls.blockId.value : 0,
    this.recordsPerPageForCombo, this.floorNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.floorNamePageNumber , this.floorComboList , data.responseData.comboList)
        this.floorNamePageNumber = this.getData.pageNumber;
        this.floorComboList = this.getData.dataList;
        this.floorSrcollSync = false;
      }
    );
}

selectedFloorName(event){
  if (event === undefined) {
  this.buildingRoomCreateForm.controls.floorName.setValue(null);
  this.buildingRoomCreateForm.controls.floorId.setValue (0);
  this.segmentNamePageNumber = 1;
  this.segmentComboList = [];
  this.floorNamePageNumber = 1;
  this.floorComboList = [];
} else {
  this.buildingRoomCreateForm.controls.floorName.setValue(event.floorName);
  this.buildingRoomCreateForm.controls.floorId.setValue(event.buildingFloorId);
}
}

getSegmentNameComboData(searchValue) {
  this.segmentSrcollSync = true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults('listOfAllSegmentCombo.sams', searchValue.term, this.buildingRoomCreateForm.controls.locationId.value>0 ? this.buildingRoomCreateForm.controls.locationId.value : 0, '',
    this.recordsPerPageForCombo, this.segmentNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.segmentNamePageNumber , this.segmentComboList , data.responseData.comboList)
        this.segmentNamePageNumber = this.getData.pageNumber;
        this.segmentComboList = this.getData.dataList;
        this.segmentSrcollSync = false;
      }
    );
}


selectedSegmentName(event){
  if (event === undefined) {
  this.buildingRoomCreateForm.controls.segmentName.setValue(null);
  this.buildingRoomCreateForm.controls.segmentId.setValue (0);
  this.segmentNamePageNumber = 1;
  this.segmentComboList = [];
} else {
  this.buildingRoomCreateForm.controls.segmentName.setValue(event.segmentName);
  this.buildingRoomCreateForm.controls.segmentId.setValue(event.buildingSegmentId);
}
}

checkForRoomNameExistence(){
  if(this.buildingRoomCreateForm.controls.roomName.value != ''){
    this.buildingRoomCreateForm.controls.roomName.setValue(this.buildingRoomCreateForm.controls.roomName.value.trim())
  }
  if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.buildingRoomCreateForm.controls.roomName.value != null) ? this.buildingRoomCreateForm.controls.roomName.value.toLowerCase() : '')) {

  } else {
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.base.BuildingRoomsTO";
    constraintData.constraints = {
      'roomName': this.buildingRoomCreateForm.controls.roomName.value,
      'orgId': this.userSession.getUserOrgId(),
      'locationName': this.buildingRoomCreateForm.controls.locationName.value,
      'blockId': this.buildingRoomCreateForm.controls.blockId.value,
      'floorId': this.buildingRoomCreateForm.controls.floorId.value,
    };
    console.log(this.buildingRoomCreateForm.controls.locationName.value);
    
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if (!data.success) {
          this.ErrorMsg = data.message;
          this.buildingRoomCreateForm.controls.roomName.setErrors(Validators.minLength);
          this.buildingRoomCreateForm.controls.roomName.setErrors({ "notUnique": true });            
        } else {
          this.ErrorMsg = '';
        }
      }
    );
  }
}

}
