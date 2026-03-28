import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {  MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/Components/Common-components/header/header.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { BASE_FORM_GROUP_CONST } from 'src/app/Model/base/baseFormGroup';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { LocationModel } from 'src/app/Model/base/location';
import { getData } from 'src/app/Model/common/fetchListData';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';
import { resolve } from 'path';


@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent {
  defaultColumns = ['select', 'sno', 'locationCode', 'locationName', 'locCity', 'locState', 'updatedBy', 'updatedDt'];
  displayedColumns = [...this.defaultColumns];

  locationDataSource: any;
  @ViewChild(HeaderComponent) headerComponent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchvalue: any = '';
  panelOpenState = false;
  showFiller = false;
  mode = new FormControl('over');
  locationFormGroup: FormGroup;
  subLoaderLocation: boolean = false;
  locationCombo: any = [];
  locationCodeCombo:any=[];
  scrollsyncLocation: boolean = false;
  recordsPerPageForCombo: string;
  locationPageNumber: number;
  public locationModel: LocationModel;
  cityscrollsync: boolean = false;
  scrollsyncLocationCode:boolean=false;
  limitCount: any;
  searchKey: any = '';
  cityPageNumber: number;
  public cities: any = [];
  stateScrollsync: boolean = false;
  legalcrollsync:boolean=false;
  entityScrollsync:boolean=false;
  entityGroupCombo:any=[];
  legalEntityCombo:any=[];
  legalEntityPageNumber:number;
  entityGroupPageNumber:number;
  locationCodePageNumber:number;
  statePageNumber: number;
  states: any = [];
  formOneDirty: boolean = false;
  formOneValid: boolean = false;

  locationType = [
    { id: 1, name: 'SERVICE PROVIDER' },
    { id: 2, name: 'END USER' }
  ];

  @ViewChild('searchSet') searchSetFocus: ElementRef;

  //For Pagination
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  //PERMISSIONS
  modelAccessModule: ModuleAccessModel;
  getData: getData;

  scrollCountrysync: boolean = false;
  countryPageNumber: number;
  countriesList: any =[];

  selectedItem: number =0;

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private assetOptimaConstants: AssetOptimaConstants,
    private samsService: AssetOptimaServices,
    private userSession: UserSessionService,
  ) {
    this.modelAccessModule = new ModuleAccessModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.locationModel = new LocationModel();
    this.locationPageNumber = 1;
    this.legalEntityPageNumber=1;
    this.entityGroupPageNumber=1;
    this.locationCodePageNumber=1;
    this.cityPageNumber=1;
    this.statePageNumber=1;
    this.countryPageNumber=1;
    this.userPreference = new UserPrefernce();
    this.showManageColumns = false;
  }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_LOCATION'];
    this.locationModel.direction = 'asc';
    this.locationModel.columnName = 'locationName';
    this.pageIndex='0';

    this.locationFormGroup = new FormGroup({
      locationName: new FormControl(''),
    });

    this.userPreference.moduleKey = 'GROUPACCESS_LOCATION';
      let userPreferenceData = this.getUserPreferenceInfo();
      userPreferenceData.then(response => {
        //dynamicly add all base from controls to the form Group
        let formControlCount: number = 0;
        Object.keys(BASE_FORM_GROUP_CONST.controls).forEach(key => {
          this.locationFormGroup.addControl(key, BASE_FORM_GROUP_CONST.get(key));
          formControlCount++;
          if (formControlCount == (Object.keys(BASE_FORM_GROUP_CONST.controls).length)) {
            //call the list method after adding all form controls
            this.loadList();
          }
        });
      })

    //dynamicly add all base from controls to the form Group
    // let formControlCount: number = 0;
    // Object.keys(BASE_FORM_GROUP_CONST.controls).forEach(key => {
    //   this.locationFormGroup.addControl(key, BASE_FORM_GROUP_CONST.get(key));
    //   formControlCount++;
    //   if (formControlCount == (Object.keys(BASE_FORM_GROUP_CONST.controls).length)) {
    //     //call the list method after adding all form controls
    //     this.loadList();
    //   }
    // });
  }

  ngAfterViewInit() {
    if (this.searchSetFocus !== undefined){
    this.searchSetFocus.nativeElement.focus();
    }
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }
  
  sortData(event) {
    this.locationModel.pageNumber = 0;
    this.locationModel.columnName = event.active;
    this.locationModel.direction = event.direction;
    this.loadList();
  }

  onSearchChange(searchValue: string) {
    this.locationFormGroup.controls.locationName.setValue(searchValue);
    this.pageSize = '100';
    this.pageIndex = '0';
    this.loadList();
    this.selectedItem = 0;
  }

  createLocation(pId, mode) {
    this.router.navigate(['home/settingsmaster/locationCreate/' + pId + '/' + mode]);
  }

  loadList() {
    this.locationFormGroup.get('pageNumber').setValue(this.pageIndex);
    this.locationFormGroup.get('recordsPerPage').setValue(this.pageSize);
    this.locationDataSource = [];
    this.subLoaderLocation = true;
    this.commonService.commonListService(this.samsService.listOfAllLocation, this.locationModel).subscribe(
      data => {
          if (data.success) {
          this.subLoaderLocation = false;
          this.locationDataSource = data.responseData.dataList;
          this.length = data.responseData.dataTotalRecCount;
        } else {
          this.subLoaderLocation = false;
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        this.subLoaderLocation = false;
        this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
      }
    );
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadList();
  }

  loadLocationComboData(searchValue) {

    this.scrollsyncLocation = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
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


  getCityData(searchValue) {
    const StateId = this.locationModel.locStateId;
    const CountryId = this.locationModel.locCountryId;

    this.cityscrollsync = true;
    if( StateId > 0){
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.samsService.listOfCityCombo, searchValue.term, '', '', this.limitCount, this.cityPageNumber, this.locationModel.locState !== null ? this.locationModel.locState : '', this.locationModel.locCountry !== null ? this.locationModel.locCountry : '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.cityPageNumber , this.cities , data.responseData.comboList)
        this.cityPageNumber = this.getData.pageNumber;
        this.cities = this.getData.dataList;
        this.cityscrollsync = false;
      }
    );
  }else {
    this.cities = [];
    this.cityPageNumber = 1;
    this.cityscrollsync = false;
    if((CountryId===0||CountryId===undefined)&&(StateId===0||StateId===undefined)){
      this.commonService.openToastWarningMessage(`Kindly Select The "Country" And The "State".`);
    }else if(CountryId>0 && StateId===0){
      this.commonService.openToastWarningMessage(`Kindly Select The "State".`);
    }
    }
  }

  getStateData(searchValue) {
    const CountryId = this.locationModel.locCountryId;
    this.stateScrollsync = true;
    if(CountryId > 0 ){
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.samsService.listOfStateCombo, searchValue.term, CountryId, '', this.limitCount, this.statePageNumber,CountryId !== 0 ? CountryId : '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.statePageNumber , this.states , data.responseData.comboList)
        this.statePageNumber = this.getData.pageNumber;
        this.states = this.getData.dataList;
        this.stateScrollsync = false;
    }
    );
  }else{
      this.states = [];
      this.statePageNumber = 1;
      this.stateScrollsync = false;
      this.commonService.openToastWarningMessage(`Kindly Select The "Country".`);
    }
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.locationModel.locationName = '';
      this.locationModel.locId = 0;
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.locationModel.locationName = event.locationName;
      this.locationModel.locId = event.locId;
    }
  }

  selectedCity(event) {
    if (event === undefined) {
      this.cityPageNumber = 1;
      this.locationModel.locCity = '';
      this.locationModel.locCityId = 0;
      this.cities = [];
    }else{
      this.locationModel.locCity = event.cityName != null ? event.cityName : '';
      this.locationModel.locCityId = event.cityId != 0 ? event.cityId : 0;
      this.locationModel.locState = event.stateName != null ? event.stateName : '';
      this.locationModel.locStateId = event.stateId != 0 ? event.stateId : 0;
    }
  }

  selecedState(event) {
    if (event === undefined) {
      this.locationModel.locCity = '';
      this.locationModel.locCityId = 0;
      this.locationModel.locState = '';
      this.locationModel.locStateId = 0;
      this.cityPageNumber = 1;
      this.statePageNumber = 1;
      this.states = [];
      this.cities = [];
    } else {
      this.locationModel.locState = event.stateName;
      this.locationModel.locStateId = event.stateId;
      this.locationModel.locCity='';
      this.locationModel.locCityId=0;
      this.cityPageNumber=1;
      this.cities=[];
    }
  }

  clear() {
    this.locationModel = new LocationModel();
    this.selectedItem = 0;
    this.applyPreferredFilters();
    this.ngOnInit()
  }

  searchLocation(event) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.loadList();
    this.selectedItem = 0;
    this.applyPreferredFilters();
  }

  generateReportOfLocation() {
    this.commonService.commonListService('generateLocationReport.sams', this.locationModel).subscribe(
      (data) => {
        this.downloadDocument(data.responseData);
        if(data.responseData != null && data.responseData != undefined ){
          this.commonService.openToastSuccessMessage("Download Successful.");
        }
      }, error => {
      }
    );
  }

  downloadDocument(filePath: string) {
    let fileName = filePath.split('.')[0];
    this.commonService.downloadExcelFile(filePath).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  listOfLegalEntityGroup(searchValue) {
    this.legalcrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfAllLegalEntity, searchValue.term, '', '', this.limitCount, this.legalEntityPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.legalEntityPageNumber , this.legalEntityCombo , data.responseData.comboList)
        this.legalEntityPageNumber = this.getData.pageNumber;
        this.legalEntityCombo = this.getData.dataList;
        this.legalcrollsync = false;
      }
    );
  }

  // listOfEntityGroup(searchValue) {
  //   this.entityScrollsync = true;
  //   this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  //   this.commonService.getComboResults(this.samsService.listOfAllEntityGroup, searchValue.term, '', '', this.limitCount, this.entityGroupPageNumber).subscribe(
  //     (data) => {
  //       if (!(this.commonService.fetchSearchValue(searchValue))) {
  //         if (this.entityGroupPageNumber === 1) {
  //           this.entityGroupCombo = data.responseData.comboList;
  //         } else {
  //           this.entityGroupCombo = this.entityGroupCombo.concat(data.responseData.comboList);
  //         }
  //       } else {
  //         this.entityGroupCombo = data.responseData.comboList;
  //       }
  //       data.responseData.length != 0 ? this.entityGroupPageNumber += 1 : this.entityGroupPageNumber = 1;
  //     }
  //   );
  //   this.entityScrollsync = false;
  // }

  selectedLegalEntity(event) {
    if (event === undefined) {
      this.locationModel.legalEntityName = '';
      this.locationModel.legalEntityId = 0;
      this.legalEntityPageNumber = 1;
      this.legalEntityCombo = [];
    } else {
      this.locationModel.legalEntityName = event.legalEntityName;
      this.locationModel.legalEntityId = event.legalEntityId;
    }
  }

  // selectedEntityGroup(event) {
  //   if (event === undefined) {
  //     this.locationModel.entityGroupName = '';
  //     this.locationModel.legalEntityId = 0;
  //     this.entityGroupPageNumber = 1;
  //     this.entityGroupCombo = [];
  //   } else {
  //     this.locationModel.entityGroupName = event.entityGroupName;
  //     this.locationModel.legalEntityId = event.legalEntityId;
  //   }
  // }

  loadLocationCode(searchValue) {
    this.scrollsyncLocationCode = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllLocationCode.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationCodePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationCodePageNumber , this.locationCodeCombo , data.responseData.comboList)
          this.locationCodePageNumber = this.getData.pageNumber;
          this.locationCodeCombo = this.getData.dataList;
          this.scrollsyncLocationCode = false;
        }
      );
  }

  selecedLocationCode(event) {
    if (event === undefined) {
      this.locationModel.locationCode = '';
      this.locationCodePageNumber = 1;
      this.locationCodeCombo = [];
    } else {
      this.locationModel.locationCode = event.locationCode;
    }
  }

  getCountryData(searchValue){
    this.scrollCountrysync = true;
    this.limitCount = (searchValue.term  === '' || searchValue.term === undefined || searchValue.term === null) ? '50' : '';
    this.commonService.getComboResults('listOfCountryCombo.sams', searchValue.term,'', '', this.limitCount, this.countryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.countryPageNumber , this.countriesList , data.responseData.comboList)
        this.countryPageNumber = this.getData.pageNumber;
        this.countriesList = this.getData.dataList;
        this.scrollCountrysync = false;
    });
  }

  getCountryList(event) {
    if (event == null || event == undefined) {
      this.locationModel.locCountry=('');
      this.locationModel.locCountryId = 0;
      this.countryPageNumber = 1;
      this.cityPageNumber = 1;
      this.statePageNumber = 1;
      this.countriesList = [];
      this.states = [];
      this.cities = [];
    } else {
      this.locationModel.locCountry=(event.countryName);
      this.locationModel.locCountryId=(event.countryId);
      this.locationModel.locState = '';
      this.locationModel.locStateId = 0;
      this.locationModel.locCity='';
      this.locationModel.locCityId=0;
      this.cityPageNumber = 1;
      this.statePageNumber = 1;
      this.states = [];
      this.cities = [];
    }
  }

  selectLocation(element){
    if(this.selectedItem == element.locationId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element.locationId;
    }
  }

  toggleColumn(column: string): void {
    const index = this.displayedColumns.indexOf(column);
    if (index >= 0) {
      this.displayedColumns.splice(index, 1); // Column is selected, remove it
    } else {
      this.displayedColumns.push(column); // Column is not selected, add it
    }
  }

  editManageColumns() {
    this.showManageColumns = !this.showManageColumns;
  }

  applyPreferredColumns() {
    //SAVE TO USER PREFERENCE TABLE
    this.showManageColumns = !this.showManageColumns
    this.userPreference.customColumns = JSON.stringify(this.displayedColumns);
    this.commonService.commonInsertService(this.samsService.saveOrUpdateUserPreference, this.userPreference).subscribe(
      data => {
        if(data.success) {
          // this.commonService.openToastSuccessMessage(data.message);
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }
    )
  }

  resetPreferredColumns() {
    this.displayedColumns = [...this.defaultColumns];
    this.userPreference.customColumns = JSON.stringify(this.displayedColumns);
  }

  getUserPreferenceInfo() {
    let userPreferenceInfo = new Promise((resolve) => {
      this.commonService.commonInsertService(this.samsService.fetchUserPreferenceInfo, this.userPreference).subscribe(
        data => {
          if(data.responseData !== undefined) {
            this.userPreference = data.responseData;
            if(this.userPreference.customColumnsList.length>0) {
              this.displayedColumns = this.userPreference.customColumnsList;
            }
            this.locationModel = JSON.parse(this.userPreference.customFilters);
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }

  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    this.userPreference.customFilters = JSON.stringify(this.locationModel);
    this.commonService.commonInsertService(this.samsService.saveOrUpdateUserPreference, this.userPreference).subscribe(
      data => {
        if(data.success) {
          // this.commonService.openToastSuccessMessage(data.message);
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }
    )
  }

}









