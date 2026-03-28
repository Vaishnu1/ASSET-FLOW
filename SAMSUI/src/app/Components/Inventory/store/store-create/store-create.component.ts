import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatTable} from '@angular/material/table';
import {  MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Location } from '@angular/common';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-store-create',
  templateUrl: './store-create.component.html',
  styleUrls: ['./store-create.component.css']
})
export class StoreCreateComponent implements OnInit {

  storeForm: FormGroup;
  storeLocationForm: FormGroup;

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

  location: any;

  constructor(private commonService: CommonService,
    private changeDetectorRefs: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private appGlobals: AssetOptimaConstants,
    private locationRef: Location,
    private dialog: MatDialog,
    private userSession: UserSessionService,
    private assetOptimaConstants: AssetOptimaConstants
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
       /// this.listOfPersonInCharge();
     }

  ngOnInit() {
  //  document.getElementById('commonFooter').style.display='none';
    this.storeForm = new FormGroup({
      storeName: new FormControl('',[Validators.required,Validators.maxLength(50)]),
      storeDescription: new FormControl('',[Validators.maxLength(100)]),
      storeId: new FormControl(0),
      active: new FormControl(true),
      orgId: new FormControl(0),
      locationId: new FormControl(0),
      locationName: new FormControl('', [Validators.required]),
      buildingBlockId: new FormControl(0),
      buildingFloorId: new FormControl(0),
      storeTypeId: new FormControl(0),
      storeTypeName: new FormControl('', [Validators.required]),
      roomName: new FormControl(''),
      floorName: new FormControl(''),
      segmentName: new FormControl(''),
      blockName: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt:new FormControl('')
      });

    this.storeLocationForm = new FormGroup({
      acclocId: new FormControl(0,[Validators.required]),
      acclocName: new FormControl(''),
      storeLocId: new FormControl(0),
      storeLocSelected: new FormControl(true)
    });
    this.locationNamePageNumber = 1;
    this.inchargeNamePageNumber = 1;

    this.storeForm.controls['locationName'].setValue(this.userSession.getUserLocationName());
    this.storeForm.controls['locationId'].setValue(this.userSession.getUserLocationId());
    this.validateEditMode();
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.focusSetStore);
  }


  backTOItemScreen(){
    this.locationRef.back();
  }

  listOfLocation(searchTerms){    
    this.scrollLocationNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchTerms.term, '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {
        if (data.success) {
          if (!(this.commonService.fetchSearchValue(searchTerms))) {
            if (this.locationNamePageNumber === 1) {
              this.locationList = data.responseData.comboList;
            } else {
              this.locationList = this.locationList.concat(data.responseData.comboList);
            }
          } else {
            this.locationList = data.responseData.comboList;
          }
          this.locationList.length != 0 ? this.locationNamePageNumber += 1 : this.locationNamePageNumber = 1;
        }
      }
    );
    this.scrollLocationNamesync = false;   
  }

  setPageNumber(event){
    this.currentPageNumber=0;
  }

  getLocationList(event){
    if (event === undefined) {
      this.storeLocationForm.controls['locationId'].setValue(0);
      this.storeLocationForm.controls['locationName'].setValue('');
      this.locationList = [];
      this.locationNamePageNumber = 1;
    } else {
      this.storeLocationForm.controls['locationId'].setValue(event.locationId);
      this.storeLocationForm.controls['locationName'].setValue(event.locationName);    
    }

    this.storeAddButtonStatus = true;
  }

  @ViewChild('matLocation') table1: MatTable<any>;

  checkFlag: boolean = false;
  
  clearStore(){
    this.storeForm.reset();
    this.storeForm.updateValueAndValidity();
    this.storeForm.controls.blockName.enable();
    this.storeForm.controls.floorName.enable();
    this.storeForm.controls.segmentName.enable();
    this.storeForm.controls.roomName.enable();
    this.locationNamePageNumber = 1;
    this.inchargeNamePageNumber = 1;
    this.blockNamePageNumber = 1;
    this.floorNamePageNumber = 1;
    this.segmentNamePageNumber = 1;
    this.roomNamePageNumber = 1;
  }

  clearLocationForm(){
    this.storeLocationForm.controls.acclocName.setValue('');
    this.storeLocationForm.controls.acclocId.setValue(0);
    // this.storeLocationForm.controls.storeLocId.setValue(0);
    // this.storeLocationForm.controls.storeLocSelected.setValue(true);
  }

  //Delete Store Location
  DeleteStore(deleteid,index) {  
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Store Location'
      }
    });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
      data => {
          if(data.status){
            if(deleteid <= 0){
              this.storelocationList.splice(index, 1);
              this.refreshStoreLocationTable();
            } else {
              this.commonService.commonGetService('deleteDesignation.sams',deleteid).subscribe(
                data=>{
                  if(data.success){
                    this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
                    this.storelocationList.splice(index, 1);
                    this.refreshStoreLocationTable();     
                  }else{ 
                    this.commonService.openToastErrorMessage(data.message);
                  }
                }  
              );
            }
          }
      });   
    }

    refreshStoreLocationTable() {
      let tempArray = this.storelocationList;
      this.storelocationList = [];
      for (var i = 0; i < tempArray.length; i++) {
        this.storelocationList.push(tempArray[i]);
        this.changeDetectorRefs.detach();
      }
      this.changeDetectorRefs.detectChanges();
    }

  saveStock(){
    this.uploadFlagStore = true;
    this.storeForm.enable();
    this.commonService.commonInsertService('saveOrUpdateStore.sams',this.storeForm.getRawValue()).subscribe(
      data => {
        if(data.success){
          this.commonService.openToastSuccessMessage(data.message);
          this.locationRef.back();
          this.uploadFlagStore = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadFlagStore = false;
        }
      }
    );
  }

  validateEditMode(){
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId =Number(primaryId);
        if(primaryId <= 0){
          this.displayButton="Submit";
          this.disableClear=false;
          this.headingDisplay = "Create";
        }else{
          this.displayButton="Update";
          this.headingDisplay = "Update";
          this.disableClear=true;
          this.storeForm.controls.locationName.disable();
          this.storeForm.controls.storeName.disable();
          this.commonService.commonGetService('loadStoreInfo.sams',primaryId).subscribe(
            data => {
              this.storeForm.patchValue(data.responseData);
              this.storelocationList=data.responseData.storeLocDtl;
              this.tempValue = data.responseData.storeName!= null ? data.responseData.storeName : '';

            }
          );
        }
      }
    );
  }

  exitStore(){
    this.locationRef.back();
  }

  searchByEmployee(searchTerms) {
    this.searchKey = (searchTerms.term !== '') ? searchTerms : '';
    this.listOfAllPersonInCharge();
  }

  listOfPersonInCharge(searchTerms){       
    this.scrollInchargeNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchTerms.term, '', '', this.limitCount, this.inchargeNamePageNumber).subscribe(
      (data) => {
        if (data.success) {
          if (!(this.commonService.fetchSearchValue(searchTerms))) {
            if (this.inchargeNamePageNumber === 1) {
              this.storeInchargeList = data.responseData.comboList;
            } else {
              this.storeInchargeList = this.storeInchargeList.concat(data.responseData.comboList);
            }
          } else {
            this.storeInchargeList = data.responseData.comboList;
          }
          this.storeInchargeList.length != 0 ? this.inchargeNamePageNumber += 1 : this.inchargeNamePageNumber = 1;
        }
      }
    );
    this.scrollInchargeNamesync = false;
    // // this.personInChargeList = [];
    // this.limitCount = (this.searchKey === '' || this.searchKey === null) ? '10' : '';
    // this.skipCount = (this.searchKey === '' || this.searchKey === null) ? this.storeInchargeList.length.toString() : '';
    // this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams',  this.searchKey, '', '', this.limitCount, this.skipCount).subscribe(
    //   (data) => {
    //     this.storeInchargeList = data.responseData.comboList;
    //     // this.currentPage += 1;
    //   }
    // );
  }

  listOfAllPersonInCharge(){    
      this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams',  this.searchKey, '', '').subscribe(
        (data) => {
          this.storeInchargeList = data.responseData.comboList;
        }
      );
  }

  setStoreIncharge(event){

    if (event === undefined) {
      this.storeForm.controls['inchargeName'].setValue('');
      this.storeForm.controls['inchargeId'].setValue(0);
      this.storeInchargeList = [];
      this.inchargeNamePageNumber = 1;
    } else {
      this.storeForm.controls['inchargeName'].setValue(event.employeeFirstName);
      this.storeForm.controls['inchargeId'].setValue(event.employeeId);
    }
    
  }

  //Check Store Name existence
  checkForStoreNameExistence() { 
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === ((this.storeForm.controls.storeName.value!= null) ? this.storeForm.controls.storeName.value.toLowerCase():'')) {
      
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
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.blockNamePageNumber === 1) {
              this.blockNameCombo = data.responseData.comboList;
            } else {
              this.blockNameCombo = this.blockNameCombo.concat(data.responseData.comboList);
            }
          } else {
            this.blockNameCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.blockNamePageNumber += 1 : this.blockNamePageNumber = 1;
        }
      );
    this.scrollsyncBlock = false;
  }

  selectedBlockData(event) {
    if (event === undefined) {
      this.storeForm.controls.buildingBlockId.setValue(0);
      this.blockNamePageNumber = 1;
      this.blockNameCombo = [];
    } else {
      this.storeForm.controls.buildingBlockId.setValue(event.buildingBlockId);
    }
  }

  loadFloorComboData(searchValue) {
    this.scrollsyncFloor = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllFloorCombo.sams', searchValue.term, '', this.storeForm.controls.buildingBlockId.value,
      this.limitCount, this.floorNamePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.floorNamePageNumber === 1) {
              this.floorNameCombo = data.responseData.comboList;
            } else {
              this.floorNameCombo = this.floorNameCombo.concat(data.responseData.comboList);
            }
          } else {
            this.floorNameCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.floorNamePageNumber += 1 : this.floorNamePageNumber = 1;
        }
      );
    this.scrollsyncFloor = false;
  }

  selectedFloorData(event) {
    if (event === undefined) {
      this.storeForm.controls.buildingFloorId.setValue(0);
      this.storeForm.controls.blockName.setValue('');
      this.storeForm.controls.blockName.enable();
      this.floorNamePageNumber = 1;
      this.floorNameCombo = [];
    } else {
      this.storeForm.controls.buildingFloorId.setValue(event.buildingFloorId);
      this.storeForm.controls.blockName.setValue(event.blockName);
      this.storeForm.controls.blockName.disable();
    }
  }

  loadSegmentNameComboData(searchValue) {
    this.scrollsyncSegment = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSegmentCombo.sams', searchValue.term, '', '',
      this.limitCount, this.segmentNamePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.segmentNamePageNumber === 1) {
              this.segmentNameCombo = data.responseData.comboList;
            } else {
              this.segmentNameCombo = this.segmentNameCombo.concat(data.responseData.comboList);
            }
          } else {
            this.segmentNameCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.segmentNamePageNumber += 1 : this.segmentNamePageNumber = 1;
        }
      );
    this.scrollsyncSegment = false;
  }

  selectedSegmentData(event) {
    if (event === undefined) {
      this.storeForm.controls.buildingSegmentId.setValue(0);
      this.segmentNamePageNumber = 1;
      this.segmentNameCombo = [];
    } else {
      this.storeForm.controls.buildingSegmentId.setValue(event.buildingSegmentId);
    }
  }
  loadRoomNameComboData(searchValue) {
    this.scrollsyncRoom = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRoomCombo.sams', searchValue.term, this.storeForm.controls.locationId.value,this.storeForm.controls.buildingBlockId.value, 
      this.limitCount, this.roomNamePageNumber).subscribe(
        (data) => { 
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.roomNamePageNumber === 1) {
              this.roomNameCombo = data.responseData.comboList;
            } else {
              this.roomNameCombo = this.roomNameCombo.concat(data.responseData.comboList);
            }
          } else {
            this.roomNameCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.roomNamePageNumber += 1 : this.roomNamePageNumber = 1;
        }
      );
    this.scrollsyncRoom = false;
  }

  selectedRoomData(event) {
    if (event === undefined) {
      this.storeForm.controls.blockName.setValue('');
      this.storeForm.controls.roomName.setValue('');
      this.storeForm.controls.segmentName.setValue('');
      this.storeForm.controls.floorName.setValue('');
      this.storeForm.controls.floorName.enable();
      this.storeForm.controls.segmentName.enable();
      this.storeForm.controls.blockName.enable();
      this.storeForm.controls.roomName.enable();
      this.roomNamePageNumber = 1;
      this.roomNameCombo = [];
    } else {
      this.storeForm.controls.floorName.setValue(event.floorName);
      this.storeForm.controls.segmentName.setValue(event.segmentName);
      this.storeForm.controls.blockName.setValue(event.blockName);
      this.storeForm.controls.roomName.setValue(event.roomName);
      this.storeForm.controls.floorName.disable();
      this.storeForm.controls.segmentName.disable();
      this.storeForm.controls.blockName.disable();
    }
  }

  listOfStoreTypeName(searchTerms){       
    this.scrollStoreTypeNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllStoreTypeCombo.sams', searchTerms.term, '', '', this.limitCount, this.storeTypeNamePageNumber).subscribe(
      (data) => {
        if (data.success) {
          if (!(this.commonService.fetchSearchValue(searchTerms))) {
            if (this.storeTypeNamePageNumber === 1) {
              this.storeTypeList = data.responseData.comboList;
            } else {
              this.storeTypeList = this.storeTypeList.concat(data.responseData.comboList);
            }
          } else {
            this.storeTypeList = data.responseData.comboList;
          }
          this.storeTypeList.length != 0 ? this.storeTypeNamePageNumber += 1 : this.storeTypeNamePageNumber = 1;
        }
      }
    );
    this.scrollStoreTypeNamesync = false;
    
  }

  setStoreType(event) {
    if(event === undefined) {
      this.storeForm.controls.storeTypeName.setValue('');
      this.storeForm.controls.storeTypeId.setValue(0);
      this.storeTypeList = [];
      this.storeTypeNamePageNumber = 1;
    } else {
      this.storeForm.controls.storeTypeName.setValue(event.storeTypeName);
      this.storeForm.controls.storeTypeId.setValue(event.storeTypeId);
    }
  }

}
