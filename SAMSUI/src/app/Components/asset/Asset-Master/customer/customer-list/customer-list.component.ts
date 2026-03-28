import { Component, OnInit } from '@angular/core';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CustomerModel } from 'src/app/Model/master/customerModel';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  displayedColumns = ['select', 'customerName', 'active', 'createdBy', 'createdDt', 'updatedBy', 'updatedDt'];


  pageIndex: string = '0';
  pageSize: string = '100';
  cityScrollsync: boolean = false;

  countryPageNumber: number;
  customerNamePageNumber: number;
  cityPageNumber: number;
  scrollCountrysync: boolean = false;
  scrollsyncCustomerName: boolean = false;
  recordsPerPageForCombo: string;

  customerNameList: any = []
  countries: any = [];
  cities: any = [];
  customer: CustomerModel;

  subLoaderCustomer: boolean = false;
  customerDataSource: CustomerModel[];

  customerAccessModule: ModuleAccessModel;

  scrollStatesync: boolean = false;
  statePageNumber: number = 0;
  states: any = [];
  limitCount: any;
  StateId = '0';
  scrollsyncCustomerSiteName: boolean = false;
  customerSiteNamePageNumber: number = 0;
  customerSiteNameList: any = [];

  status = [
    { id: 1, name: 'ACTIVE' },
    { id: 2, name: 'INACTIVE' }
  ]


  length: number = 0;
  getData: getData;
  selectedItem: number = 0;

  constructor(private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private router: Router,
    private userSession: UserSessionService) {
    this.customer = new CustomerModel();
    this.customerAccessModule = new ModuleAccessModel();
    this.customerNamePageNumber = 1;
    this.statePageNumber = 1;
    this.customerSiteNamePageNumber = 1;
    this.countryPageNumber = 1;


  }

  ngOnInit() {
    this.customerAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_CUSTOMER'];
    this.customer.direction = 'desc';
    this.customer.columnName = 'updatedDt';
    this.customer.activeDisplay = 'ACTIVE';
    this.customer.activeDisp = true;
    this.customer.customerCountryId = '0';
    this.StateId = '0';
    this.fetchListOfCustomer()
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListOfCustomer();
  }

  createCustomer(customerId, mode) {
    localStorage.setItem('previousRoute', this.router.url);
    this.router.navigate(['home/assetmaster/customerCreate/' + customerId + '/' + mode]);

  }

  listOfCustomerName(searchKey) {
    this.scrollsyncCustomerName = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllCustomerCombo, searchKey.term, '', '',
      this.recordsPerPageForCombo, this.customerNamePageNumber, this.customer.activeDisplay, '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.customerNamePageNumber , this.customerNameList , data.responseData.comboList)
          this.customerNamePageNumber = this.getData.pageNumber;
          this.customerNameList = this.getData.dataList;
          this.scrollsyncCustomerName = false;
        });
  }

  getCityMethod(searchValue) {
    this.cityScrollsync = true;
    const CountryId = this.customer.customerCountryId;

    if( this.StateId > '0'){
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfCityCombo, searchValue.term, '', '', this.limitCount, this.cityPageNumber, this.customer.customerState !== null ? this.customer.customerState : '', this.customer.customerCountry !== null ? this.customer.customerCountry : '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.cityPageNumber , this.cities , data.responseData.comboList)
        this.cityPageNumber = this.getData.pageNumber;
        this.cities = this.getData.dataList;
        this.cityScrollsync = false;
      }
    );
  }else {
    this.cities = [];
    this.cityPageNumber = 1;
    this.cityScrollsync = false;
    if((CountryId==='0'||CountryId===undefined)&&(this.StateId==='0'||this.StateId===undefined)){
      this.commonService.openToastWarningMessage(`Kindly Select The "Country" And The "State".`);
    }else if(CountryId>'0' && this.StateId==='0'){
      this.commonService.openToastWarningMessage(`Kindly Select The "State".`);
    }
  }
}
getCityListData(event) {
  if (event === undefined) {
    this.cityPageNumber = 1;
      this.cities = [];
  } else {
   this.customer.customerCity = event.cityName
  }
}
  onSearchChange(event) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListOfCustomer();
    this.selectedItem = 0;
  }

  clearSearch() {
    this.customer = new CustomerModel();
    this.ngOnInit();
    this.selectedItem = 0;
  }

  generateReportOfCustomer() {
    {
      this.commonService.commonListService(this.assetOptimaServices.generateCustomerRequestReport, this.customer).subscribe(
        (data) => {
          this.commonService.openToastSuccessMessage("Report With Request Number : " + data.responseData+" Is Generated. Kindly Check "+ '"Reports"'+ " Menu To Download.");
        }, error => {

        }
      );

    }
  }

  setCustomerNameCombo(event) {
    if (event != null) {
      this.customer.customerName = event.customerName;
      this.customer.customerId = event.customerId;

    } else {
      this.customer.customerName = null;
      this.customer.customerId = 0;
      this.customerNameList = [];
      this.customerNamePageNumber = 1;
    }
  }

  fetchListOfCustomer() {

    this.subLoaderCustomer = true;
    this.customerDataSource = null;
    this.customer.pageNumber = Number(this.pageIndex);
    this.customer.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllCustomers, this.customer).subscribe(
      data => {
        if (data.success) {
          this.length = data.responseData.dataTotalRecCount;
          this.customerDataSource = data.responseData.dataList;
          this.subLoaderCustomer = false;
        } else {
          this.subLoaderCustomer = false;
        }
      }
    );
  }

  customSort(event) {
    this.customer.pageNumber = 0;
    this.customer.columnName = event.active;
    this.customer.direction = event.direction;
    this.fetchListOfCustomer();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  getStateData(searchValue) {
    if(this.customer.customerCountryId!='0'){
    this.scrollStatesync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfStateCombo, searchValue.term, this.customer.customerCountryId , '', this.recordsPerPageForCombo,
      this.statePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.statePageNumber , this.states , data.responseData.comboList)
          this.statePageNumber = this.getData.pageNumber;
          this.states = this.getData.dataList;
            this.scrollStatesync = false;
        }
      );
    }else{
      this.states = [];
      this.statePageNumber = 1;
      this.scrollStatesync = false;
      this.commonService.openToastWarningMessage(`Kindly Select The "Country".`);
    }
  }

  setState(event) {
    if (event != null) {
      this.customer.customerCity = null;
      this.customer.customerState = event.stateName;
      this.StateId  = event.stateId;
      this.cities = [];
      this.cityPageNumber = 1;
    } else {
      this.customer.customerState = null;
      this.customer.customerCity = null;
      this.states = [];
      this.cities = [];
      this.StateId  = '0';
      this.cityPageNumber = 1;
      this.statePageNumber = 1;
    }
  }

  getCountryData(searchValue) {
    this.scrollCountrysync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllCountryForCombo, searchValue.term, '', '', this.limitCount, this.countryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.countryPageNumber , this.countries , data.responseData.comboList)
        this.countryPageNumber = this.getData.pageNumber;
        this.countries = this.getData.dataList;
        this.scrollCountrysync = false;
      });
  }

  setCountryData(event) {
    if (event === undefined) {
      this.customer.customerCountry = null;
      this.customer.customerCountryId = '0';
      this.countries = [];
      this.states = [];
      this.statePageNumber = 1;
      this.countryPageNumber = 1;
    } else {
      this.cities = [];
      this.states = [];
      this.statePageNumber = 1;
      this.cityPageNumber = 1;
      this.customer.customerCity = null;
      this.customer.customerState  = null;
      this.customer.customerCountry = event.countryName;
      this.customer.customerCountryId = event.countryId;
    }
  }

  listOfCustomerSiteName(searchKey) {
    this.scrollsyncCustomerSiteName = true;
    this.customer.activeDisplay=null;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllCustomerSiteCombo, searchKey.term, this.customer.customerId, '',
      this.recordsPerPageForCombo, this.customerSiteNamePageNumber, this.customer.activeDisplay, '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.customerSiteNamePageNumber , this.customerSiteNameList , data.responseData.comboList)
          this.customerSiteNamePageNumber = this.getData.pageNumber;
          this.customerSiteNameList = this.getData.dataList;
          this.scrollsyncCustomerSiteName = false;
        });
  }

  setCustomerSiteNameCombo(event) {
    if (event != null) {
      this.customer.customerSiteName = event.customerSiteName;
      this.customer.customerId = event.customerId;

    } else {
      this.customer.customerSiteName = null;
      this.customer.customerId = 0;
      this.customerSiteNameList = [];
      this.customerSiteNamePageNumber = 1;
    }
  }

  changeStatus(event){
    if(event.id==1){
      this.customer.activeDisplay = 'ACTIVE';
      this.customer.activeDisp = true;
    }else{
      this.customer.activeDisplay = 'INACTIVE';
      this.customer.activeDisp = false;
    }
  }

  selectCustomer(element){
    if(this.selectedItem == element.customerId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element.customerId;
    }
  }


}
