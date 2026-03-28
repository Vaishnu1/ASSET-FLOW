import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierModel } from 'src/app/Model/master/supplier';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Title } from '@angular/platform-browser';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { SupplierLocationModel } from 'src/app/Model/master/supplier-location';
import { getData } from 'src/app/Model/common/fetchListData';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';


const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  //Set Page Title
  title = 'Asset Optima - Supplier';

  displayedColumns = ['select','supplierName','supplierType','serviceType','active','createdBy','createdDt','updatedBy','updatedDt'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchvalue : any = '';
  panelOpenState = false;
  showFiller = false;
  mode = new FormControl('over');
  loading:boolean = true;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  subLoaderSupplier: boolean = true;
  scrollsyncSupplierName:boolean=false;
  recordsPerPageForCombo:string;

  supplierPageNumber:number;
  supplierName: any = [];
  suppliers: any = [];

  supplierAccessModule: ModuleAccessModel;

  supplierCode: any = [];
  scrollsyncSupplierCode:boolean=false;
  countries: any = [];

  scrollStatesync: boolean = false;
  statePageNumber: number;
  states: any = [];

  
  supLocationScrollSync:boolean=false;
  supLocationPageNumber:number=0;
  supLocationList:any=[];

  scrollCountrysync: boolean = false;
  countryPageNumber: number = 0;
  countriesList: any=[];

  searchKey: any = '';

  status = [
    { id: 1, name: 'ACTIVE' },
    { id: 2, name: 'INACTIVE' }
  ];

  
  @ViewChild('setSupplierFocus') setSearchFocus: ElementRef;

  //FOR VIEW
  viewData : any;

  public supplier : SupplierModel;
  public supplierDataSource: SupplierModel[];
  public supplierLocation: SupplierLocationModel;
  getData: getData;

  selectedItem:any = 0;
  cityscrollsync: boolean;
  cityPageNumber: any = 0;
  cities: any =[];


  constructor(private router: Router,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private titleService: Title,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSession: UserSessionService) { 
                this.supplierAccessModule = new ModuleAccessModel();
          this.pageSize = '100';
          this.pageIndex = '0';
          this.supplier = new SupplierModel();
          this.supplierLocation = new SupplierLocationModel();
          this.statePageNumber = 1;
          this.supplierPageNumber = 1;
          this.supLocationPageNumber=1;
          this.countryPageNumber=1;
          this.cityPageNumber = 1;
          this.getData = new getData();
  }

  ngOnInit() {
    this.supplierAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_SUPPLIER'];
    this.titleService.setTitle(this.title);
    this.supplier.direction = 'desc';
    this.supplier.columnName = 'updatedDt';
    this.supplier.activeDisplay = 'ACTIVE';
    this.supplier.activeDisp = true;
    this.statePageNumber = 1;

    this.fetchListForSupplier();
  }

  ngAfterViewInit() {
    this.setSearchFocus.nativeElement.focus();
  }

  createSupplier(element,mode){
    if(mode == 'edit' && element.supplierName == this.assetOptimaConstants.notApplicable){
      this.commonService.openToastWarningMessage('Supplier "NOT APPLICABLE" Cannot Be Edited.');
    }else{
      localStorage.setItem('previousRoute',this.router.url);
      this.router.navigate(['home/purchase/supplierCreate/'+element.supplierId + '/' + mode]);
    }
  }
  
  searchSupplier(event) {
    this.pageSize='100';
    this.pageIndex='0';
    this.fetchListForSupplier();  
    this.selectedItem = 0;
  }

  fetchListForSupplier(){
    this.subLoaderSupplier = true;
    this.supplierDataSource = null;
    this.supplier.pageNumber = Number(this.pageIndex);
    this.supplier.recordsPerPage = Number(this.pageSize);
    this.supplier.sourceScreen='supplier';
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllSupplier,this.supplier).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.supplierDataSource = data.responseData.dataList;
           this.subLoaderSupplier = false;
        }else{
          this.subLoaderSupplier = false;
        }        
      }
    );  
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListForSupplier();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.supplier.pageNumber = 0;
    this.supplier.columnName = event.active;
    this.supplier.direction = event.direction;
    this.fetchListForSupplier();
  }
  
  listOfSupplierName(searchKey) {
    
    this.scrollsyncSupplierName=true;
    this.supplier.sourceScreen='supplier';
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllSupplierNameCombo, searchKey.term, this.supplier.supplierId, '',this.recordsPerPageForCombo, this.supplierPageNumber,this.supplier.activeDisplay,this.supplier.sourceScreen).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.supplierPageNumber , this.suppliers , data.responseData.comboList)
      this.supplierPageNumber = this.getData.pageNumber;
      this.suppliers = this.getData.dataList;  
      this.scrollsyncSupplierName=false;    
    });
  }
  
  getSupplierNameComboValue(event) {
    if (event != null) {
      this.supplier.supplierName=event.supplierName;
      this.supplier.supplierId=event.supplierId;   
    }else{
      this.supplier.supplierName="";
      this.supplier.supplierId=0;
      this.supplierPageNumber=1;
    }
  }

  clearSearch(){
    this.supplier=new SupplierModel;
    this.supplierLocation=new SupplierLocationModel;
    this.ngOnInit();
    this.selectedItem = 0;
  }

  generateReportOfSupplier() {
    this.supplier.sourceScreen = 'supplier';
    this.commonService.commonListService('generateSupplierRequestReport.sams', this.supplier).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  }

  getStateData(searchValue) {
    const CountryId = this.supplier.supCountryId;
    this.scrollStatesync = true;
    if(CountryId > 0 ){
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfStateCombo, searchValue.term, CountryId , '', this.recordsPerPageForCombo, this.statePageNumber,CountryId !== 0 ? CountryId : '').subscribe(
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
      this.commonService.openToastWarningMessage("Kindly select country");
    }
  }

  setState(event) {
    
    if (event != null) {
      this.supplier.supSiteState = event.stateName;
      this.supplier.supSiteStateId = event.stateId;
    } else {
      this.supplier.supSiteState = "";
      this.supplier.supSiteCity ='';
      this.statePageNumber = 1;
    }
  }

  listOfSupplierLocationName(searchKey) {
    
    this.supLocationScrollSync=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllSupplierLocCombo, searchKey.term, '', '',
this.recordsPerPageForCombo, this.supLocationPageNumber,this.supplier.activeDisplay,'').subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.supLocationPageNumber , this.supLocationList , data.responseData.comboList)
      this.supLocationPageNumber = this.getData.pageNumber;
      this.supLocationList = this.getData.dataList;
      this.supLocationScrollSync=false;       
    });
  }

  setSupplierLocNameCombo(event) {
    if (event != null) {
      this.supplier.supplierLocationName=event.supplierSiteName;      
    }else{
      this.supplier.supplierLocationName="";
      this.supLocationPageNumber=1;
    }
  }

  changeStatus(event){
    if(event.id==1){
      this.supplier.activeDisplay = 'ACTIVE';
      this.supplier.activeDisp = true;
    }else{
      this.supplier.activeDisplay = 'INACTIVE';
      this.supplier.activeDisp = false;
    }
  }

  getCountryData(searchValue){
    this.scrollCountrysync = true;
    this.recordsPerPageForCombo = (searchValue.term  === '' || searchValue.term === undefined || searchValue.term === null) ? '50' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllCountryForCombo, searchValue.term,'', '', this.recordsPerPageForCombo, this.countryPageNumber).subscribe(
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
      this.supplier.supCountry='';
      this.supplier.supCountryId=0;
      this.supplier.supSiteState ='';
      this.supplier.supSiteStateId = 0;
      this.supplier.supSiteCity ='';
      this.countryPageNumber =1;
      this.statePageNumber =1;
      this.states =[];
    } else {
      this.supplier.supCountry=event.countryName;
     this.supplier.supCountryId=event.countryId;
     this.supplier.supSiteState ='';
     this.supplier.supSiteStateId = 0;
     this.supplier.supSiteCity ='';
     this.statePageNumber =1;
     this.states =[];
    }
  }
  
  selectAssets(element){
    if(this.selectedItem.supplierId == element.supplierId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element;
    }
  }

  
  getCityData(searchValue) {
    const stateId = this.supplier.supSiteStateId;
    if( stateId > 0){
    this.cityscrollsync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfCityCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.cityPageNumber,
      this.supplier.supSiteState,this.supplier.supCountry).subscribe(
        (data) => {
          
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.cityPageNumber , this.cities , data.responseData.comboList)
          this.cityPageNumber = this.getData.pageNumber;
          this.cities = this.getData.dataList;
          this.cityscrollsync = false;
        });
      }else{
        this.cities = [];
        this.cityPageNumber = 1;
        this.cityscrollsync = false;
        this.commonService.openToastWarningMessage("Kindly select country and state");
      }
  }

  setCity(event) {
    if (event) {
      this.supplier.supSiteCity = event.cityName;
      this.cities = [];
    } else {
      this.supplier.supSiteCity='';
    }

    this.cityPageNumber = 1;
  }
  

}
