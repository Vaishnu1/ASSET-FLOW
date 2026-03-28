import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';
import { BusinessPartnerModel } from 'src/app/Model/master/businessPartner';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierModel } from 'src/app/Model/master/supplier';

@Component({
  selector: 'app-business-partner-list',
  templateUrl: './business-partner-list.component.html',
  styleUrls: ['./business-partner-list.component.css']
})

export class BusinessPartnerListComponent implements OnInit {

  title = 'Asset Optima - Business Partner';
  displayedColumns = ['sNo','select','businessPartnerName','activeFromDt','activeTillDt','businessPartnerRoleNameDisp','partnerSiteCount','updatedBy','updatedDt'];
  public businessPartnerDataSource: [];

  businessPartnerAccessModule: ModuleAccessModel;
  public businessPartnerModel : BusinessPartnerModel;

  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  getData: getData;
  selectedItem:any = 0;

  scrollPartnerNamesync: boolean = false;
  partnerNamePageNumber: number;
  partnerCombo: any = [];

  scrollPartnerSiteNamesync: boolean = false;
  partnerSiteNamePageNumber: number;
  partnerSiteNameList: any = [];

  limitCount: any;

  scrollCountrysync: boolean = false;
  countryPageNumber: number = 0;
  countriesList: any=[];

  scrollStatesync: boolean = false;
  statePageNumber: number;
  states: any = [];

  cityscrollsync: boolean;
  cityPageNumber: any = 0;
  cities: any =[];

  scrollPartnerRolessync: boolean = false;
  partnerRolesPageNumber: number;
  partnerRolesCombo: any = [];

  selectedBusinessPartnerList = [];

  subLoaderBusinessPartner : boolean = true;
  @ViewChild('setSupplierFocus') setSearchFocus: ElementRef;

  constructor(private router: Router,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private titleService: Title,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSession: UserSessionService) { 
          this.businessPartnerAccessModule = new ModuleAccessModel();
          this.pageSize = '100';
          this.pageIndex = '0';
          this.partnerNamePageNumber = 1;
          this.partnerSiteNamePageNumber = 1;
          this.countryPageNumber = 1;
          this.statePageNumber = 1;
          this.cityPageNumber = 1;
          this.partnerRolesPageNumber = 1;
          this.businessPartnerModel = new BusinessPartnerModel();
          this.getData = new getData();
  }

  ngOnInit(): void {
    localStorage.setItem('helpManual','settings/master?id=business-partner');
    this.businessPartnerAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_BUSINESS_PARTNER'];
    this.titleService.setTitle(this.title);
    this.businessPartnerModel.direction = 'desc';
    this.businessPartnerModel.columnName = 'updatedDt';
    this.partnerNamePageNumber = 1;
    this.partnerSiteNamePageNumber = 1;
    this.countryPageNumber = 1;
    this.statePageNumber = 1;
    this.cityPageNumber = 1;
    this.partnerRolesPageNumber = 1;
    this.selectedBusinessPartnerList = [];
    this.fetchListForBusinessPartner();
  }

  ngAfterViewInit() {
    //this.setSearchFocus.nativeElement.focus();
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListForBusinessPartner();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.businessPartnerModel.pageNumber = 0;
    this.businessPartnerModel.columnName = event.active;
    this.businessPartnerModel.direction = event.direction;
    this.fetchListForBusinessPartner();
  }

  fetchListForBusinessPartner() {
    this.subLoaderBusinessPartner = true;
    this.businessPartnerDataSource = null;
    this.businessPartnerModel.pageNumber = Number(this.pageIndex);
    this.businessPartnerModel.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllPartner,this.businessPartnerModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.businessPartnerDataSource = data.responseData.dataList;
           this.subLoaderBusinessPartner = false;
        }else{
          this.subLoaderBusinessPartner = false;
        }        
      }
    );
  }

  createBusinessPartner(element, mode?: string) {
    if(mode == 'add') {
      this.router.navigate(['home/settingsmaster/businessPartnerCreate/' + 0 + '/' + mode]);
    } else {
      this.router.navigate(['home/settingsmaster/businessPartnerCreate/' + element.businessPartnerId + '/' + mode]);
    }
  }

  searchBusinessPartner() {
    // if (this.supplierInvoiceHdr.fromDt != null) {
    //   this.supplierInvoiceHdr.fromDt = this.commonService.convertToDateStringyyyy_mm_dd(this.supplierInvoiceHdr.fromDt);
    // }
    // if (this.supplierInvoiceHdr.endDt != null) {
    //   this.supplierInvoiceHdr.endDt = this.commonService.convertToDateStringyyyy_mm_dd(this.supplierInvoiceHdr.endDt);
    // }
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListForBusinessPartner();
    this.selectedBusinessPartnerList = [];
  }

  clearSearch() {
    this.businessPartnerModel = new BusinessPartnerModel();
    this.ngOnInit();
    this.selectedBusinessPartnerList = [];

    this.partnerCombo = [];
    this.countriesList = [];
    this.partnerRolesCombo = [];
    this.partnerSiteNameList = [];
    this.states = [];
    this.cities = [];
  }

  generateReportOfBusinessPartner() {

    this.commonService.commonListService('reports/businessPartner/generateBusinessPartnerReport.sams', this. businessPartnerModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
    
  }

  selectBusinessPartner(element){
    if(this.selectedItem.businessPartnerId == element.businessPartnerId){
      this.selectedItem = 0;
    } else{
      this.selectedItem = element;
    }
  }

  

  listofBusinessPartnerName(searchValue) {
    this.scrollPartnerNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '', this.limitCount, this.partnerNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.partnerNamePageNumber, this.partnerCombo, data.responseData.comboList)
        this.partnerNamePageNumber = this.getData.pageNumber;
        this.partnerCombo = this.getData.dataList;
        this.scrollPartnerNamesync = false;
      }
    );
  }

  setPartnerNameComboValue(event) {
    if (event === undefined) {
      this.businessPartnerModel.businessPartnerId = 0;
      this.partnerNamePageNumber = 1;
    } else {
      this.businessPartnerModel.businessPartnerId = event.businessPartnerId;
      this.businessPartnerModel.businessPartnerName = event.businessPartnerName;
    }
  }  

  listOfPartnerSiteName(searchValue) {
    this.scrollPartnerSiteNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllPartnerSiteCombo.sams', searchValue.term, this.businessPartnerModel.businessPartnerId, '', this.limitCount, this.partnerSiteNamePageNumber, '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.partnerSiteNamePageNumber, this.partnerSiteNameList, data.responseData.comboList)
        this.partnerSiteNamePageNumber = this.getData.pageNumber;
        this.partnerSiteNameList = this.getData.dataList;
        this.scrollPartnerSiteNamesync = false;
      }
    );
    this.scrollPartnerSiteNamesync = false;
  }

  setPartnerSiteNameComboValue(event) {
    if (event === undefined) {
      this.businessPartnerModel.partnerSiteId = 0;
      this.partnerSiteNamePageNumber = 1;
    } else {
      this.businessPartnerModel.partnerSiteId = event.partnerSiteId;
      this.businessPartnerModel.partnerSiteName = event.partnerSiteName;
      this.businessPartnerModel.businessPartnerId = event.businessPartnerId;
      this.businessPartnerModel.businessPartnerName = event.businessPartnerName;
    }
  }

  getCountryData(searchValue){
    this.scrollCountrysync = true;
    this.limitCount = (searchValue.term  === '' || searchValue.term === undefined || searchValue.term === null) ? '50' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllCountryForCombo, searchValue.term,'', '', this.limitCount, this.countryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.countryPageNumber , this.countriesList , data.responseData.comboList)
        this.countryPageNumber = this.getData.pageNumber;
        this.countriesList = this.getData.dataList;
        this.scrollCountrysync = false;
    });
  }
  
  getCountryList(event) {
    if (event === null || event === undefined) {
      this.businessPartnerModel.partnerSiteCountry='';
      this.businessPartnerModel.partnerSiteCountryId=0;
      this.businessPartnerModel.partnerSiteState ='';
      this.businessPartnerModel.partnerSiteStateId = 0;
      this.businessPartnerModel.partnerSiteCity ='';
      this.countryPageNumber =1;
      this.statePageNumber =1;
      this.states =[];
    } else {
      this.businessPartnerModel.partnerSiteCountry=event.countryName;
      this.businessPartnerModel.partnerSiteCountryId=event.countryId;
      this.businessPartnerModel.partnerSiteState ='';
      this.businessPartnerModel.partnerSiteStateId = 0;
      this.businessPartnerModel.partnerSiteCity ='';
      this.statePageNumber =1;
      this.states =[];
    }
  }

  getStateData(searchValue) {
    const CountryId = this.businessPartnerModel.partnerSiteCountryId;
    this.scrollStatesync = true;
    if (CountryId > 0) {
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
      this.commonService.getComboResults(this.assetOptimaServices.listOfStateCombo, searchValue.term, CountryId, '', this.limitCount, this.statePageNumber, CountryId !== 0 ? CountryId : '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.statePageNumber, this.states, data.responseData.comboList)
          this.statePageNumber = this.getData.pageNumber;
          this.states = this.getData.dataList;
          this.scrollStatesync = false;
        }
      );
    } else {
      this.states = [];
      this.statePageNumber = 1;
      this.scrollStatesync = false;
      this.commonService.openToastWarningMessage("Kindly select country");
    }
  }

  setState(event) {
    if (event != null) {
      this.businessPartnerModel.partnerSiteState = event.stateName;
      this.businessPartnerModel.partnerSiteStateId = event.stateId;
    } else {
      this.businessPartnerModel.partnerSiteState = "";
      this.businessPartnerModel.partnerSiteCity ='';
      this.statePageNumber = 1;
    }
  }

  getCityData(searchValue) {
    const stateId = this.businessPartnerModel.partnerSiteStateId;
    if (stateId > 0) {
      this.cityscrollsync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
      this.commonService.getComboResults(this.assetOptimaServices.listOfCityCombo, searchValue.term, '', '',
        this.limitCount, this.cityPageNumber,
        this.businessPartnerModel.partnerSiteState, this.businessPartnerModel.partnerSiteCountry).subscribe(
          (data) => {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.cityPageNumber, this.cities, data.responseData.comboList)
            this.cityPageNumber = this.getData.pageNumber;
            this.cities = this.getData.dataList;
            this.cityscrollsync = false;
          });
    } else {
      this.cities = [];
      this.cityPageNumber = 1;
      this.cityscrollsync = false;
      this.commonService.openToastWarningMessage("Kindly select country and state");
    }
  }

  setCity(event) {
    if (event) {
      this.businessPartnerModel.partnerSiteCity = event.cityName;
      this.cities = [];
    } else {
      this.businessPartnerModel.partnerSiteCity = '';
    }
    this.cityPageNumber = 1;
  }

  listofBusinessPartnerRoles(searchValue) {
    this.scrollPartnerRolessync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerRolesCombo, searchValue.term, '', '', this.limitCount, this.partnerRolesPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.partnerRolesPageNumber, this.partnerRolesCombo, data.responseData.comboList)
        this.partnerRolesPageNumber = this.getData.pageNumber;
        this.partnerRolesCombo = this.getData.dataList;
        this.scrollPartnerRolessync = false;
      }
    );
  }

  setPartnerRolesComboValue(event) {
    if (event === undefined) {
      this.businessPartnerModel.businessPartnerRoleId = 0;
      this.businessPartnerModel.businessPartnerRoleName = '';
      this.partnerRolesPageNumber = 1;
      this.partnerRolesCombo = [];
      this.businessPartnerModel.selectedRolesList = [];
    } else {
      this.businessPartnerModel.businessPartnerRoleId = event.businessPartnerRoleId;
    }
  }
}
