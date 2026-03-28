import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../Services/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetModel } from '../../../../Model/master/asset';
import { AssetOptimaConstants } from '../../../../Constants/AssetOptimaConstants';
import { AssetRelocationModel } from '../../../../Model/master/assetRelocation';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-relocation-search',
  templateUrl: './asset-relocation-search.component.html',
  styleUrls: ['./asset-relocation-search.component.css']
})
export class AssetRelocationSearchComponent implements OnInit {

  displayedColumns = [ 'select','sno', 'locationName', 'assetCode', 'assetCategoryName', 'modelName', 'assetGroupName', 'serialNo', 'departmentName', 'assetStatus'];

  scrollsyncLocation: boolean = false;
  scrollsyncLocationRelocate: boolean = false;
  locationPageNumber: number = 0;
  locationCombo: any = [];
  recordsPerPageForCombo: string;

  scrollsyncDepartment: boolean = false;
  scrollsyncDepartmentRelocate: boolean = false;
  departmentPageNumber: number = 0;
  departmentComboList: any = [];

  scrollsyncSubDepartment: boolean = false;
  subDepartmentPageNumber: number = 0;
  subDepartmentCombo: any = [];
  subDepartmentComboList: any = [];

  subLoader: boolean = false;
  dataSource = [];
  dataSourceTemp = [];
  transferSelectedCount = [];
  public asset: AssetModel;

  disableAssetId: boolean = true;

  public assetRelocationModel: AssetRelocationModel;

  //For Pagination
  length: String = '0';     //set total record count here

  assetRelocation: FormGroup;

  uploadAssetRelocation: boolean = false;

  scrollsyncSubDepartmentRelocate: boolean = false;
  subDepartmentPageNumberRelocate: number = 0;

  reallocateFlag: boolean=true;

  searchKey: any = '';
  modelAccessModule: ModuleAccessModel;
  getData: getData;

  scrollSyncPrimaryEnggPerson;
  primaryEnggPageNumber;
  primaryEnggCombo : any = [];

  scrollSyncSecondaryEnggPerson;
  secondaryEnggPageNumber;
  secondaryEnggCombo : any = [];

  constructor(private readonly commonService: CommonService, 
              private readonly assetOptimaConstants: AssetOptimaConstants,
              private readonly userSession: UserSessionService,
              private location: Location,
              private router: Router) {
    this.asset = new AssetModel();
    this.locationPageNumber = 1;
    this.departmentPageNumber = 1;
    this.subDepartmentPageNumber = 1;
    this.subDepartmentPageNumberRelocate=1;
    this.primaryEnggPageNumber = 1;
    this.secondaryEnggPageNumber = 1;
    this.assetRelocationModel = new AssetRelocationModel();
    this.modelAccessModule = new ModuleAccessModel();
  }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_RELOCATION'];
    this.assetRelocation = new FormGroup({
      assetRelocateId: new FormControl(0),
      relocateBatchNo: new FormControl(''),
      sourceLocId: new FormControl(0),
      sourceLocName: new FormControl(null, [Validators.required]),
      sourceDepId: new FormControl(0),
      sourceDepName: new FormControl(null, [Validators.required]),
      sourceSubDepId: new FormControl(0),
      sourceSubDepName: new FormControl(null),
      relocateLocId: new FormControl(0),
      relocateLocName: new FormControl(null,[Validators.required]),
      relocateDepId: new FormControl(0),
      relocateDepName: new FormControl(''),
      relocateSubDepId: new FormControl(0),
      relocateSubDepName: new FormControl(null),
      requestedBy: new FormControl(''),
      requestedDt: new FormControl(''),
      requestedDtDisp: new FormControl(''),
      remarks: new FormControl(''),
      approvedDt: new FormControl(''),
      approvedDtDisp: new FormControl(''),
      approvedBy: new FormControl(''),
      assetHdrId: new FormControl(0),
      relocateStatus: new FormControl(''),
      assetCode: new FormControl(''),
      previousStatusId: new FormControl(0),
      primaryEnggName : new FormControl(''),
      primaryEnggNameId : new FormControl(0),
      secondaryEnggName : new FormControl(''),
      secondaryEnggNameId : new FormControl(0)
    });

    this.assetRelocation.controls.primaryEnggName.disable();
    this.assetRelocation.controls.secondaryEnggName.disable();
    
    this.loadAssetInfo();
  }

  loadAssetInfo(){
    const assetHdrId = localStorage.getItem('assetHdrIdForAssetRelocation');

    if(Number(assetHdrId) > 0){
    this.commonService.commonGetService('fetchAssetDtlByAssetId.sams', assetHdrId).subscribe(
      data => {


        this.assetRelocation.controls['sourceLocId'].setValue(data.responseData.locationId);
        this.assetRelocation.controls['sourceLocName'].setValue(data.responseData.locationName);

        this.assetRelocation.controls['sourceDepId'].setValue(data.responseData.departmentId);
        this.assetRelocation.controls['sourceDepName'].setValue(data.responseData.departmentName);

        this.assetRelocation.controls['sourceSubDepId'].setValue(data.responseData.subDepartmentId);
        this.assetRelocation.controls['sourceSubDepName'].setValue(data.responseData.subDepartmentName);

        this.asset.assetCode = data.responseData.assetCode;

        this.searchSource();
      })

      localStorage.removeItem('assetHdrIdForAssetRelocation');
    }
  }

  loadLocationComboData(searchValue,event) {
    if (event) {
      this.scrollsyncLocation = true;
    }else if(!event){
      this.scrollsyncLocationRelocate = true;
    }
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsyncLocation = false;
          this.scrollsyncLocationRelocate = false;
        }
      );
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.assetRelocation.controls['sourceLocId'].setValue(0);
      this.assetRelocation.controls['sourceLocName'].setValue(null);
    } else {
      this.assetRelocation.controls['sourceLocId'].setValue(event.locationId);
      this.assetRelocation.controls['sourceLocName'].setValue(event.locDisplayField);
    }
    this.locationPageNumber = 1;
    this.locationCombo = [];
    this.dataSource = [];
  }

  selectedLocationDataDestination(event) {
    if (event === undefined) {
      this.assetRelocation.controls['relocateLocId'].setValue(0);
      this.assetRelocation.controls['relocateLocName'].setValue(null);
    } else {
      this.assetRelocation.controls['relocateLocId'].setValue(event.locationId);
      this.assetRelocation.controls['relocateLocName'].setValue(event.locDisplayField);

      this.assetRelocation.controls.primaryEnggName.enable();
      this.assetRelocation.controls.secondaryEnggName.enable();
    }
    this.locationPageNumber = 1;
    this.locationCombo = [];
  }

  loadDepartmentComboData(searchValue,event) {
    if (event) {
      this.scrollsyncDepartment = true;
    }else if(!event){
      this.scrollsyncDepartmentRelocate = true;
    }
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDeparment.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.departmentPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.departmentPageNumber , this.departmentComboList , data.responseData.comboList)
          this.departmentPageNumber = this.getData.pageNumber;
          this.departmentComboList = this.getData.dataList;
          this.scrollsyncDepartment = false;
          this.scrollsyncDepartmentRelocate = false;
        }
      );
  }

  selectedDepartmentData(event) {
    if (event === undefined) {
      this.assetRelocation.controls['sourceDepId'].setValue(0);
      this.assetRelocation.controls['sourceDepName'].setValue(null);
      this.selectedSubDepartmentData(undefined);
    } else {
      if(this.assetRelocation.controls['sourceDepId'].value !== 0 && event.departmentId !== this.assetRelocation.controls['sourceDepId'].value){
        this.selectedSubDepartmentData(undefined);
      }
      this.assetRelocation.controls['sourceDepId'].setValue(event.departmentId);
      this.assetRelocation.controls['sourceDepName'].setValue(event.departmentName);
    }
    this.departmentPageNumber = 1;
    this.departmentComboList = [];
    this.dataSource = [];
  }

  selectedDepartmentDataRelocate(event) {
    if (event === undefined) {
      this.assetRelocation.controls['relocateDepId'].setValue(0);
      this.assetRelocation.controls['relocateDepName'].setValue(null);
    } else {
      if(this.assetRelocation.controls['relocateDepId'].value !== 0 && event.departmentId !== this.assetRelocation.controls['relocateDepId'].value){
        this.selectedSubDepartmentDataRelocate(undefined);
      }
      this.assetRelocation.controls['relocateDepId'].setValue(event.departmentId);
      this.assetRelocation.controls['relocateDepName'].setValue(event.departmentName);
    }
    this.departmentPageNumber = 1;
    this.departmentComboList = [];
  }

  loadSubDepartmentComboData(searchValue) {
    this.scrollsyncSubDepartment = true;
    const sourceDepId = this.assetRelocation.controls.sourceDepId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSubDeparment.sams', searchValue.term,
    sourceDepId > 0 ? sourceDepId : '', '',this.recordsPerPageForCombo, this.subDepartmentPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.subDepartmentPageNumber , this.subDepartmentCombo , data.responseData.comboList)
          this.subDepartmentPageNumber = this.getData.pageNumber;
          this.subDepartmentCombo = this.getData.dataList;
          this.scrollsyncSubDepartment = false;
        }
      );
  }

  loadSubDepartmentForRelocation(searchValue) {
    this.scrollsyncSubDepartmentRelocate = true;
    const relocateDepId = this.assetRelocation.controls.relocateDepId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSubDeparment.sams', searchValue.term,relocateDepId > 0 ? relocateDepId : '', '',
      this.recordsPerPageForCombo, this.subDepartmentPageNumberRelocate).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.subDepartmentPageNumberRelocate , this.subDepartmentComboList , data.responseData.comboList)
          this.subDepartmentPageNumberRelocate = this.getData.pageNumber;
          this.subDepartmentComboList = this.getData.dataList;
          this.scrollsyncSubDepartmentRelocate = false;
        }
      );
  }

  selectedSubDepartmentData(event) {
    if (event === undefined) {
      this.assetRelocation.controls['sourceSubDepId'].setValue(0);
      this.assetRelocation.controls['sourceSubDepName'].setValue(null);
    } else {
      this.assetRelocation.controls['sourceSubDepId'].setValue(event.subDepartmentId);
      this.assetRelocation.controls['sourceSubDepName'].setValue(event.subDepartmentName);
      this.selectedDepartmentData(event);
    }
    this.subDepartmentPageNumber = 1;
    this.subDepartmentCombo = [];
    this.dataSource = [];
  }

  selectedSubDepartmentDataRelocate(event) {
    if (event === undefined) {
      this.assetRelocation.controls['relocateSubDepId'].setValue(0);
      this.assetRelocation.controls['relocateSubDepName'].setValue(null);
    } else {
      this.assetRelocation.controls['relocateSubDepId'].setValue(event.subDepartmentId);
      this.assetRelocation.controls['relocateSubDepName'].setValue(event.subDepartmentName);
    }
    this.subDepartmentPageNumber = 1;
    this.subDepartmentCombo = [];
  }

  searchSource() {
    this.asset.locationId = this.assetRelocation.controls['sourceLocId'].value > 0 ? this.assetRelocation.controls['sourceLocId'].value : 0;
    this.asset.locationName = this.assetRelocation.controls['sourceLocName'].value != null ? this.assetRelocation.controls['sourceLocName'].value : '';
    this.asset.departmentId = this.assetRelocation.controls['sourceDepId'].value > 0 ? this.assetRelocation.controls['sourceDepId'].value : 0;
    this.asset.departmentName = this.assetRelocation.controls['sourceDepName'].value != null ? this.assetRelocation.controls['sourceDepName'].value : '';
    this.asset.subDepartmentId = this.assetRelocation.controls['sourceSubDepId'].value > 0 ? this.assetRelocation.controls['sourceSubDepId'].value : 0;
    this.asset.subDepartment = this.assetRelocation.controls['sourceSubDepName'].value != null ? this.assetRelocation.controls['sourceSubDepName'].value : '';
    this.asset.columnName = 'updatedDt';
    this.asset.direction = 'desc';
    this.asset.source='Relocation';
    this.subLoader = true;
    this.dataSource = [];
    this.commonService.commonListService('fetchListOfAllAsset.sams', this.asset).subscribe(
      data => {
        if (data.success) {
          this.subLoader = false;
          console.log("total rec count" , data.responseData.dataTotalRecCount);
          this.length = data.responseData.dataTotalRecCount;
          this.dataSource = data.responseData.dataList;
          //this.dataSource = (this.dataSource).filter(data => {return data.avilableToProcess === true;});
        } else {
          this.subLoader = false;
        }
      }, error => {
        this.subLoader = false;
      }
    );
  }

  resetSource() {

  }

  reallocatSearch() {
    if (this.dataSource.length > 0) {
      if (this.assetRelocation.controls.sourceLocId.value === this.assetRelocation.controls.relocateLocId.value) {
        if ((this.assetRelocation.controls.sourceDepId.value === this.assetRelocation.controls.relocateDepId.value)
          && this.assetRelocation.controls.sourceSubDepId.value === 0 && this.assetRelocation.controls.relocateSubDepId.value === 0) {
          this.commonService.openToastWarningMessage('Kindly select Department for "Transfer To", if the Transfer is within same "Branch"');
        } else {
          if (this.assetRelocation.controls.sourceSubDepId.value === this.assetRelocation.controls.relocateSubDepId.value &&
            this.assetRelocation.controls.sourceSubDepId.value !== 0 && this.assetRelocation.controls.relocateSubDepId.value !== 0) {
            this.commonService.openToastWarningMessage('Kindly select Department for "Transfer To", if the Transfer is within same "Branch"');
          } else {
            this.reallocateSaveSearch();
          }
        }
      } else {
        this.reallocateSaveSearch();
      }
    }
  }

  reallocateSaveSearch() {
    this.uploadAssetRelocation = true;
    for (let i = 0; i < this.dataSource.length; i++) {
      if (this.dataSource[i].active === true) {
        this.assetRelocationModel = new AssetRelocationModel();
        this.assetRelocationModel.assetHdrId = this.dataSource[i].assetHdrId;
        this.assetRelocationModel.previousStatusId = this.dataSource[i].assetStatusId;
        this.assetRelocationModel.assetCode = this.dataSource[i].assetCode;
        this.assetRelocationModel.relocateAssetCode = this.dataSource[i].assetCode;
        this.assetRelocationModel.sourceLocId = this.assetRelocation.controls['sourceLocId'].value > 0 ? this.assetRelocation.controls['sourceLocId'].value : 0;
        this.assetRelocationModel.sourceLocName = this.assetRelocation.controls['sourceLocName'].value != null ? this.assetRelocation.controls['sourceLocName'].value : '';
        this.assetRelocationModel.sourceDepId = this.assetRelocation.controls['sourceDepId'].value > 0 ? this.assetRelocation.controls['sourceDepId'].value : 0;
        this.assetRelocationModel.sourceDepName = this.assetRelocation.controls['sourceDepName'].value != null ? this.assetRelocation.controls['sourceDepName'].value : '';
        this.assetRelocationModel.sourceSubDepId = this.assetRelocation.controls['sourceSubDepId'].value > 0 ? this.assetRelocation.controls['sourceSubDepId'].value : 0;
        this.assetRelocationModel.sourceSubDepName = this.assetRelocation.controls['sourceSubDepName'].value != null ? this.assetRelocation.controls['sourceSubDepName'].value : '';
        this.assetRelocationModel.relocateLocId = this.assetRelocation.controls['relocateLocId'].value > 0 ? this.assetRelocation.controls['relocateLocId'].value : 0;
        this.assetRelocationModel.relocateLocName = this.assetRelocation.controls['relocateLocName'].value != null ? this.assetRelocation.controls['relocateLocName'].value : '';
        this.assetRelocationModel.relocateDepId = this.assetRelocation.controls['relocateDepId'].value > 0 ? this.assetRelocation.controls['relocateDepId'].value : 0;
        this.assetRelocationModel.relocateDepName = this.assetRelocation.controls['relocateDepName'].value != null ? this.assetRelocation.controls['relocateDepName'].value : '';
        this.assetRelocationModel.relocateSubDepId = this.assetRelocation.controls['relocateSubDepId'].value > 0 ? this.assetRelocation.controls['relocateSubDepId'].value : 0;
        this.assetRelocationModel.relocateSubDepName = this.assetRelocation.controls['relocateSubDepName'].value != null ? this.assetRelocation.controls['relocateSubDepName'].value : '';

        this.assetRelocationModel.primaryEnggNameId = this.assetRelocation.controls['primaryEnggNameId'].value > 0 ? this.assetRelocation.controls['primaryEnggNameId'].value : 0;
        this.assetRelocationModel.primaryEnggName = this.assetRelocation.controls['primaryEnggName'].value != null ? this.assetRelocation.controls['primaryEnggName'].value : '';
        this.assetRelocationModel.secondaryEnggNameId = this.assetRelocation.controls['secondaryEnggNameId'].value > 0 ? this.assetRelocation.controls['secondaryEnggNameId'].value : 0;
        this.assetRelocationModel.secondaryEnggName = this.assetRelocation.controls['secondaryEnggName'].value != null ? this.assetRelocation.controls['secondaryEnggName'].value : '';
        this.dataSourceTemp.push(this.assetRelocationModel);
      }
    }
    const obj = {
      'assetRelocateList': this.dataSourceTemp
    }
    this.commonService.showSpinner();
    this.commonService.commonInsertService('saveOrUpdateAssetRelocate.sams', obj).subscribe(
      data => {
        if (data.success) {
          const message = `Transfer Request With Batch No. : ${data.responseData} Has Been Submitted Successfully.`;
          this.commonService.openToastSuccessMessage(message);
          this.uploadAssetRelocation = false;
          this.dataSource = [];
          this.resetSourceDestination();
          this.commonService.hideSpinner();
          this.location.back();
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadAssetRelocation = false;
          this.commonService.hideSpinner();   
        }
      }
    );
  }

  resetSourceDestination() {
    this.selectedLocationData(undefined);
    this.selectedLocationDataDestination(undefined);
    this.selectedDepartmentData(undefined);
    this.selectedDepartmentDataRelocate(undefined);
    this.selectedSubDepartmentData(undefined);
    this.selectedSubDepartmentDataRelocate(undefined);
    this.transferSelectedCount = [];
    this.dataSource = [];
    this.dataSourceTemp = [];
    this.reallocateFlag = true;
    this.ngOnInit();
  }

  selectAll(flag,value) {
    for (let i = 0; this.dataSource.length > i; i++){
      this.dataSource[i].active = flag;
    }
    if(value===true){
      this.reallocateFlag=false;
    }else{
      this.transferSelectedCount=[];
      this.reallocateFlag=true;
    }
  }

  enableFlag(value){
    if(value===true){
      this.transferSelectedCount.push(0);
      this.reallocateFlag=false;
    }else{
      this.transferSelectedCount.pop();
      if(this.transferSelectedCount.length==0){
        this.reallocateFlag=true;
      }
    }
  }

  loadPrimaryEnggComboData(searchValue) {
    this.scrollSyncPrimaryEnggPerson = true;
    const locId = this.assetRelocation.controls.relocateLocId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllEmployeeComboByLocId.sams', 0, searchValue.term, locId, this.recordsPerPageForCombo, this.primaryEnggPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.primaryEnggPageNumber , this.primaryEnggCombo , data.responseData.comboList)
        this.primaryEnggPageNumber = this.getData.pageNumber;
        this.primaryEnggCombo = this.getData.dataList;
        this.scrollSyncPrimaryEnggPerson = false;
      }
    );
  }

  selectedPrimaryEngg(event) {
    if (event === undefined) {
      this.assetRelocation.controls.primaryEnggNameId.setValue(0);
      this.assetRelocation.controls.primaryEnggName.setValue('');
    } else {
      this.assetRelocation.controls.primaryEnggNameId.setValue(event.employeeId);
      this.assetRelocation.controls.primaryEnggName.setValue(event.employeeFirstName);
    }
    this.primaryEnggPageNumber = 1;
    this.primaryEnggCombo = [];
  }

  selectedSecondaryEngg(event) {
    if (event === undefined) {
      this.assetRelocation.controls.secondaryEnggNameId.setValue(0);
      this.assetRelocation.controls.secondaryEnggName.setValue('');
    } else {
      this.assetRelocation.controls.secondaryEnggNameId.setValue(event.employeeId);
      this.assetRelocation.controls.secondaryEnggName.setValue(event.employeeFirstName);
    }
    this.secondaryEnggPageNumber = 1;
    this.secondaryEnggCombo = [];
  }

  loadSecondaryEnggComboData(searchValue) {
    this.scrollSyncSecondaryEnggPerson = true;
    const locId = this.assetRelocation.controls.relocateLocId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllEmployeeComboByLocId.sams', 0, searchValue.term, locId, this.recordsPerPageForCombo, this.secondaryEnggPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.secondaryEnggPageNumber , this.secondaryEnggCombo , data.responseData.comboList)
        this.secondaryEnggPageNumber = this.getData.pageNumber;
        this.secondaryEnggCombo = this.getData.dataList;
        this.scrollSyncSecondaryEnggPerson = false;
      }
    );
  }

  backToPreviousPage() {
    this.router.navigate(['home/asset/assetRelocationList']);
  }

  navigateToSourceScreen(id?: number, sourceModule?: string, mode?: string) {
    if (sourceModule == 'GATE PASS') {
      this.router.navigate(['home/asset/gatePassCreate/' + id + '/' + mode]);
    }
    if (sourceModule == 'INTERNAL LOAN') {
      this.router.navigate(['home/asset/internalLoanCreate/' + id + '/' + mode]);
    }
    if (sourceModule == 'EXTERNAL LOAN') {
      this.router.navigate(['home/asset/loanReturnRequesCreate/' + id + '/' + mode]);
    }
    if (sourceModule == 'ASSET RELOCATE') {
      this.router.navigate(['home/asset/assetRelocationList']);
    }
  }

}
