import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-store-dialog-create',
  templateUrl: './store-dialog-create.component.html',
  styleUrls: ['./store-dialog-create.component.css']
})
export class StoreDialogCreateComponent implements OnInit {

  storeForm: FormGroup;

  @ViewChild('focusSet') focusSetStore: ElementRef;

  locationList=[];

  storelocationList=[];

  recordsPerPageForCombo: number;
  currentPageNumber: number;
  currentPage: number;
  headingDisplay: string;
  displayButton: string;
  disableClear: boolean=false;
  uploadFlagStore: boolean= false;
  storeAddButtonStatus: boolean = false;

  scrollLocationNamesync : boolean = false;
  scrollInchargeNamesync : boolean = false;
  scrollsyncBlock: boolean = false;
  scrollsyncFloor: boolean = false;
  scrollsyncRoom: boolean = false;
  scrollsyncSegment: boolean = false;
  scrollStoreTypeNamesync: boolean = false;
  defalutStoreFlag:boolean;

  locationNamePageNumber : number;
  inchargeNamePageNumber : number;
  blockNamePageNumber: number;
  floorNamePageNumber: number;
  segmentNamePageNumber: number;
  roomNamePageNumber: number;
  storeTypeNamePageNumber: number;

  limitCount:any;
  skipCount:any;
  searchKey:any = '';

  storeInchargeList=[];
  blockNameCombo: any = [];
  floorNameCombo: any = [];
  segmentNameCombo: any = [];
  roomNameCombo: any = [];
  storeTypeList: any = [];

  tempValue: String = '';
  ErrorMsg: String = '';
  getData: getData;

  constructor(
    public dialogRef: MatDialogRef<StoreDialogCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private userSession: UserSessionService,
    private cdr: ChangeDetectorRef
  ) { 
      this.recordsPerPageForCombo = 10;
      this.currentPageNumber = 1;
      this.currentPage = 1;
      this.locationNamePageNumber = 1;
      this.inchargeNamePageNumber = 1;
      this.blockNamePageNumber = 1;
      this.floorNamePageNumber = 1;
      this.segmentNamePageNumber = 1;
      this.roomNamePageNumber = 1;
      this.storeTypeNamePageNumber = 1;
      this.getData = new getData();
  }

  ngOnInit() {
    this.storeForm = new FormGroup({
      storeName: new FormControl('',[Validators.required,Validators.maxLength(50)]),
      storeDescription: new FormControl('',[Validators.maxLength(100)]),
      storeId: new FormControl(0),
      active: new FormControl(true),
      orgId: new FormControl(0),
      locationId: new FormControl(0),
      locationName: new FormControl('', [Validators.required]),
      blockId: new FormControl(0),
      floorId: new FormControl(0),
      segmentId: new FormControl(0),
      roomId: new FormControl(0),
      storeTypeId: new FormControl(0),
      storeTypeName: new FormControl('', [Validators.required]),
      roomName: new FormControl(''),
      floorName: new FormControl(''),
      segmentName: new FormControl(''),
      blockName: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt:new FormControl(''),
      defaultStore: new FormControl(false)
      });

    this.locationNamePageNumber = 1;
    this.inchargeNamePageNumber = 1;

    this.storeForm.controls['locationName'].setValue(this.userSession.getUserLocationName());
    this.storeForm.controls['locationId'].setValue(this.userSession.getUserLocationId());
    this.storeForm.controls.segmentName.disable();
    this.storeForm.controls.floorName.disable();
    this.headingDisplay = "Create";
    this.displayButton = "Submit";
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.focusSetStore);
    if(this.data.storeModel!=0){
      this.storeForm.patchValue(this.data.storeModel);
      if(this.data.mode === 'edit') {
        this.headingDisplay = "Edit";
        this.displayButton = "Update";
        this.disableClear = true;
        this.storeForm.controls.locationName.disable();
        this.storeForm.controls.storeName.disable();
        
      } else {
        this.headingDisplay = "View";
        this.displayButton = "Update";
        this.storeForm.disable();
      }
      
    }else{
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
    }
    this.cdr.detectChanges();
  }

  validateEditMode() {

  }

  closeModal() {
    this.dialogRef.close();
  }

  listOfLocation(searchTerms){    
    this.scrollLocationNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchTerms.term, '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.locationNamePageNumber , this.locationList , data.responseData.comboList)
        this.locationNamePageNumber = this.getData.pageNumber;
        this.locationList = this.getData.dataList;
        this.scrollLocationNamesync = false;
      }
    );   
  }

  clearStore(){
    this.storeForm.reset();
    this.storeForm.updateValueAndValidity();
    this.storeForm.controls.blockName.enable();
    this.storeForm.controls.roomName.enable();
    this.locationNamePageNumber = 1;
    this.inchargeNamePageNumber = 1;
    this.blockNamePageNumber = 1;
    this.floorNamePageNumber = 1;
    this.segmentNamePageNumber = 1;
    this.roomNamePageNumber = 1;
    this.storeAddButtonStatus = false
  }

  saveStock(){
    this.uploadFlagStore = true;
    this.storeForm.enable();
    this.commonService.commonInsertService('saveOrUpdateStore.sams',this.storeForm.getRawValue()).subscribe(
      data => {
        if(data.success){
          this.commonService.openToastSuccessMessage(data.message);
          this.uploadFlagStore = false;
          this.storeAddButtonStatus = false;
          this.dialogRef.close();
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadFlagStore = false;
        }
      }
    );
  }

  checkForStoreNameExistence() { 
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === ((this.storeForm.controls.storeName.value!= null) ? this.storeForm.controls.storeName.value.toLowerCase():'')) {
      
    } else if(this.storeForm.controls.storeName.value === ''){ 
      this.storeForm.controls.storeName.setErrors(Validators.required);
    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.StoreTO"; 
      constraintData.constraints = { 
      'storeName': this.storeForm.controls.storeName.value.toLowerCase(),
      'orgId':this.userSession.getUserOrgId() 
      
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){ 
          //show the warning invalidate the form group 
          this.ErrorMsg = data.message;
          this.storeForm.controls.storeName.setErrors(Validators.minLength);
          this.storeForm.controls.storeName.setErrors({"notUnique": true});
        } else {
          this.ErrorMsg = '';
          this.storeForm.controls.storeName.setErrors(null);
        }
  
      });
    }
    
  }

//Check Store Name Length
  storeLengthCal() {
    if(this.storeForm.controls.storeName.value.length <= 50) {
      return true;
    } else {
      return false;
    }
  }

  loadBlockNameComboData(searchValue) {
    this.scrollsyncBlock = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllBuildingCombo.sams', searchValue.term, this.storeForm.controls.locationId.value, '',
      this.limitCount, this.blockNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.blockNamePageNumber , this.blockNameCombo , data.responseData.comboList)
          this.blockNamePageNumber = this.getData.pageNumber;
          this.blockNameCombo = this.getData.dataList;
          this.scrollsyncBlock = false;
        }
      );
  }

  selectedBlockData(event) {
    if (event === undefined) {
      this.storeForm.controls.blockId.setValue(0);
      this.blockNamePageNumber = 1; 
      this.storeForm.controls.roomId.setValue(0);
      this.storeForm.controls.roomName.setValue('');
      this.storeForm.controls.floorId.setValue(0);
      this.storeForm.controls.floorName.setValue('');
      this.storeForm.controls.segmentId.setValue(0);
      this.storeForm.controls.segmentName.setValue('');
      this.storeAddButtonStatus = false;
    } else {
      this.storeForm.controls.blockId.setValue(event.buildingBlockId);
      this.storeForm.controls.roomId.setValue(0);
      this.storeForm.controls.roomName.setValue('');
      this.roomNameCombo = [];
      this.roomNamePageNumber = 1;
      this.storeForm.controls.floorId.setValue(0);
      this.storeForm.controls.floorName.setValue('');
      this.storeForm.controls.segmentId.setValue(0);
      this.storeForm.controls.segmentName.setValue('');
      this.storeAddButtonStatus = true;
    }
  }

  loadFloorComboData(searchValue) {
    this.scrollsyncFloor = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllFloorCombo.sams', searchValue.term, '', this.storeForm.controls.blockId.value,
      this.limitCount, this.floorNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.floorNamePageNumber , this.floorNameCombo , data.responseData.comboList)
          this.floorNamePageNumber = this.getData.pageNumber;
          this.floorNameCombo = this.getData.dataList;
          this.scrollsyncFloor = false;
        }
      );
  }

  selectedFloorData(event) {
    if (event === undefined) {
      this.storeForm.controls.floorId.setValue(0);
      this.storeForm.controls.blockName.setValue('');
      this.storeForm.controls.blockName.enable();
      this.floorNamePageNumber = 1;
    } else {
      this.storeForm.controls.floorId.setValue(event.buildingFloorId);
      this.storeForm.controls.blockName.setValue(event.blockName);
      this.storeForm.controls.blockName.disable();
    }
  }

  loadSegmentNameComboData(searchValue) {
    this.scrollsyncSegment = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSegmentCombo.sams', searchValue.term, this.storeForm.controls.locationId.value, '',
      this.limitCount, this.segmentNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.segmentNamePageNumber , this.segmentNameCombo , data.responseData.comboList)
          this.segmentNamePageNumber = this.getData.pageNumber;
          this.segmentNameCombo = this.getData.dataList;
          this.scrollsyncSegment = false;
        }
      );
  }

  selectedSegmentData(event) {
    if (event === undefined) {
      this.storeForm.controls.segmentId.setValue(0);
      this.segmentNamePageNumber = 1;
    } else {
      this.storeForm.controls.segmentId.setValue(event.buildingSegmentId);
    }
  }
  loadRoomNameComboData(searchValue) {
    this.scrollsyncRoom = true;
    const locId = this.storeForm.controls.locationId.value;
    const blockId = this.storeForm.controls.blockId.value;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRoomCombo.sams', searchValue.term,locId,blockId, this.limitCount, this.roomNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.roomNamePageNumber , this.roomNameCombo , data.responseData.comboList)
          this.roomNamePageNumber = this.getData.pageNumber;
          this.roomNameCombo = this.getData.dataList;
          this.scrollsyncRoom = false;
        }
      );
  }

  selectedRoomData(event) {
    if (event === undefined) {
      this.storeForm.controls.blockId.setValue(0);
      this.storeForm.controls.blockName.setValue('');

      this.storeForm.controls.roomId.setValue(0);
      this.storeForm.controls.roomName.setValue('');

      this.storeForm.controls.segmentId.setValue(0);
      this.storeForm.controls.segmentName.setValue('');

      this.storeForm.controls.floorId.setValue(0);
      this.storeForm.controls.floorName.setValue('');
      this.storeForm.controls.blockName.enable();
      this.storeForm.controls.roomName.enable();
      this.roomNamePageNumber = 1;
      this.storeAddButtonStatus = false;
    } else {
      this.storeForm.controls.floorId.setValue(event.floorId);
      this.storeForm.controls.floorName.setValue(event.floorName);

      this.storeForm.controls.segmentId.setValue(event.segmentId);
      this.storeForm.controls.segmentName.setValue(event.segmentName);

      this.storeForm.controls.blockId.setValue(event.blockId);
      this.storeForm.controls.blockName.setValue(event.blockName);

      this.storeForm.controls.roomId.setValue(event.buildingRoomId);
      this.storeForm.controls.roomName.setValue(event.roomName);

      this.storeForm.controls.floorName.disable();
      this.storeForm.controls.segmentName.disable();
      this.storeForm.controls.blockName.disable();
      this.storeAddButtonStatus = false;
    }
  }

  listOfStoreTypeName(searchTerms){       
    this.scrollStoreTypeNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllStoreTypeCombo.sams', searchTerms.term, '', '', this.limitCount, this.storeTypeNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.storeTypeNamePageNumber , this.storeTypeList , data.responseData.comboList)
        this.storeTypeNamePageNumber = this.getData.pageNumber;
        this.storeTypeList = this.getData.dataList;
        this.scrollStoreTypeNamesync = false;
      }
    );    
  }

  setStoreType(event) {
    if(event === undefined) {
      this.storeForm.controls.storeTypeName.setValue('');
      this.storeForm.controls.storeTypeId.setValue(0);
      this.storeTypeNamePageNumber = 1;
    } else {
      this.storeForm.controls.storeTypeName.setValue(event.storeTypeName);
      this.storeForm.controls.storeTypeId.setValue(event.storeTypeId);
    }
  }

  getLocationList(event){
    if (event === undefined) {
      this.storeForm.controls['locationId'].setValue(0);
      this.storeForm.controls['locationName'].setValue('');
      this.storeForm.controls.segmentName.disable(); 
      this.storeForm.controls.segmentName.setValue(""); 
      this.locationNamePageNumber = 1;
    } else {
      this.storeForm.controls['locationId'].setValue(event.locationId);
      this.storeForm.controls['locationName'].setValue(event.locationName);   
    }
  }

  defalutStoreCheckBox(){
    let storeId = this.storeForm.get('storeId').value;
    let locationId = this.storeForm.get('locationId').value;
    this.commonService.commonGetService('findDefalutStoreAlreadyInExist.sams',storeId, locationId).subscribe(
      data => {
        if(data.success){
          this.defalutStoreFlag = data.responseData;
          if(this.defalutStoreFlag && this.storeForm.get('defaultStore').value){
            this.commonService.openToastWarningMessage("Default Store already exist for this location");
          }else if(!this.defalutStoreFlag){
            this.defalutStoreFlag = this.defalutStoreFlag;
          } else{
            this.defalutStoreFlag = !this.defalutStoreFlag;
          }
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }
}
