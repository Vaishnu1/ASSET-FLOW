import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import {  MatTableDataSource } from '@angular/material/table';
import {  MatSort } from '@angular/material/sort';import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ManufacturerModel } from 'src/app/Model/master/manufacturer';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ManufacturerCreateComponent } from 'src/app/Components/Dialog-Components/assetPopUp/manufacturer-create/manufacturer-create.component';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { FormGroup } from '@angular/forms';
import { getData } from 'src/app/Model/common/fetchListData';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent implements OnInit {
  displayedColumns = ['select', 'manufacturerCode','manufacturerName','manufacturerStatus', 'locState','locCountry', 'updatedBy', 'updatedDt', 'createdBy', 'createdDt'];
  manufacturerdataSource = new MatTableDataSource<ManufacturerListComponent>();

  
  selectedCity: any;
  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
];

  searchvalue: any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;
  subLoaderManufacturer: boolean = false;

  @ViewChild('searchSet') searchCategorySet: ElementRef;

  public manufacturerModel: ManufacturerModel;

  manufacturerForm : FormGroup;
  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  manufacturerNameScrollSync : boolean = false;
  limitCount:any;
  manufacturerNamePageNumber : number;
  manufacturerNameList : any = [];

  manufacturerTypeScrollSync : boolean = false;
  manufacturerTypePageNumber : number;
  manufacturerTypeList : any = [];

  manufacturerCodeScrollSync : boolean = false;
  manufacturerCodePageNumber : number;
  manufacturerCodeList : any = [];

  cityscrollsync : boolean = false;
  cityPageNumber : number;
  citiesList : any = [];
  
  stateScrollsync : boolean = false;
  statePageNumber : number;
  statesList : any = [];

  countries:any=[];
  countryScrollsync : boolean;
  countryPageNumber : number;

  searchKey : any = '';
  recordsPerPageForCombo : string;

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;
  manufacturerLocList: any[]=[];
  getData: getData;

  selectedItem:any = 0;

  constructor(private dialog: MatDialog, private router: Router,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private userSession: UserSessionService,
    ) {
    this.getData = new getData();
    this.manufacturerModel = new ManufacturerModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule = new ModuleAccessModel();
    this.manufacturerNamePageNumber = 1;
    this.manufacturerCodePageNumber = 1;
    this.cityPageNumber = 1;
    this.statePageNumber = 1;
    this.countryPageNumber = 1;
  }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_MANUFACTURER'];
    this.manufacturerModel.direction = 'desc';
    this.manufacturerModel.columnName = 'updatedDt';
    this.pageSize = '100';
    this.pageIndex = '0';
    this.manufacturerModel.source='ITEM';
    this.fetchList();
  }

  ngAfterViewInit() {
    this.searchCategorySet.nativeElement.focus();
  }

  onSearchChange(searchValue: string) {
    this.manufacturerModel.manufacturerName = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }
  dialogRef;

  openassetManufacturerDialog(element,mode) {

    this.dialogRef = this.dialog.open(ManufacturerCreateComponent, {
      height: 'auto',
      width: '800px',
      data: {
        'ManufacturerModel': element,
        'mode': mode
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  ngOnDestroy() {
    if (this.dialogRef != null) {
      this.dialogRef.close();
    }
  }

  fetchList() {
    this.subLoaderManufacturer = true;
    this.manufacturerdataSource = null;
    this.manufacturerModel.pageNumber = Number(this.pageIndex);
    this.manufacturerModel.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllManufacturer, this.manufacturerModel).subscribe(
      data => {
        if (data.success) {
          this.length = data.responseData.dataTotalRecCount;
          this.manufacturerdataSource = data.responseData.dataList;
          this.subLoaderManufacturer = false;
        } else {
          this.subLoaderManufacturer = false;
        }
      }

    );
  }

  nextPage(pageNuber: number) {

  }
  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchList();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.manufacturerModel.pageNumber = 0;
    this.manufacturerModel.columnName = event.active;
    this.manufacturerModel.direction = event.direction;
    this.fetchList();
  }

  listOfManufacturerName(searchValue){
    this.manufacturerNameScrollSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllManufacturerCombo.sams', searchValue.term, '', '', this.limitCount, this.manufacturerNamePageNumber,this.manufacturerModel.source).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerNamePageNumber , this.manufacturerNameList , data.responseData.comboList)
        this.manufacturerNamePageNumber = this.getData.pageNumber;
        this.manufacturerNameList = this.getData.dataList;
        this.manufacturerNameScrollSync = false;
      }
    );
  }

  getManufacturerNameComboValue(event){
    if (event === undefined) {
      this.manufacturerNamePageNumber = 1;
    } else {
      this.manufacturerModel.manufacturerId = event.manufacturerId;
    }
  }

  listOfManufacturerCode(searchValue){
    this.manufacturerCodeScrollSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllManufacturerCodeCombo.sams', searchValue.term, '', '', this.limitCount, this.manufacturerCodePageNumber,this.manufacturerModel.source).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerCodePageNumber , this.manufacturerCodeList , data.responseData.comboList)
        this.manufacturerCodePageNumber = this.getData.pageNumber;
        this.manufacturerCodeList = this.getData.dataList;
        this.manufacturerCodeScrollSync = false;
      }
    );
  }

  getManufacturerCodeComboValue(event){
    if (event === undefined) {
      this.manufacturerCodePageNumber = 1;
    } else {
      this.manufacturerModel.manufacturerId = event.manufacturerId;
    }
  }

  getStateData(searchValue) {
    const locCountryId =  this.manufacturerModel.locCountryId;
    console.log(locCountryId);
    
    this.stateScrollsync = true;
      if(locCountryId > 0 ){
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
      this.commonService.getComboResults(this.assetOptimaServices.listOfStateCombo, searchValue.term, locCountryId,'', this.limitCount, this.statePageNumber,this.manufacturerModel.locCountry !== null ? this.manufacturerModel.locCountry : '').subscribe(
          (data) => {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.statePageNumber , this.statesList , data.responseData.comboList)
            this.statePageNumber = this.getData.pageNumber;
            this.statesList = this.getData.dataList;
            this.stateScrollsync = false;
          }
        );
      }else{
        this.statesList = [];
        this.statePageNumber = 1;
        this.stateScrollsync = false;
        this.commonService.openToastWarningMessage("Kindly select country");
      }
    }

  selectedManufacturerStateComboValue(event){
    if (event === undefined) {
      this.manufacturerModel.locCity = '';
      this.manufacturerModel.locCityId = 0;
      this.manufacturerModel.locState = '';
      this.manufacturerModel.locStateId = 0;
      this.cityPageNumber = 1;
      this.statePageNumber = 1;
      this.citiesList = [];
    } else {
      this.manufacturerModel.locState = event.stateName;
      this.manufacturerModel.locStateId = event.stateId;
      this.manufacturerModel.locCity='';
      this.manufacturerModel.locCityId=0;
      this.cityPageNumber=1;
      this.citiesList=[];
    }

  }
  

  selectedManufacturerCityComboValue(event){
    if (event !== null) {
      this.manufacturerModel.locCity = event.cityName !== null ? event.cityName : '';
      this.manufacturerModel.locCityId = event.cityId !== 0 ? event.cityId : 0;
      this.manufacturerModel.locState = event.stateName !== null ? event.stateName : '';
      this.manufacturerModel.locStateId = event.stateId !== 0 ? event.stateId : 0;
      this.cityPageNumber = 1;
      this.citiesList = [];
    }else{
      this.manufacturerModel.locCity = '';
      this.manufacturerModel.locCityId = 0;
    }
  }

  searchManufacturer() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
    this.selectedItem = 0;
  }

  clear(){
    this.selectedManufacturerStateComboValue(event);
    this.selectedManufacturerCityComboValue(event);
    this.manufacturerModel = new ManufacturerModel;
    this.ngOnInit();
    this.selectedItem = 0;
  }

  generateManufacturerReportExport(){
    console.log("Manufacturer report");
    this.manufacturerModel.recordsPerPage = 0;
    this.manufacturerModel.reportType = 'ITEM MANUFACTURER REPORT';
    this.commonService.commonListService('generateManufacturerReport.sams', this.manufacturerModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        this.commonService.openToastSuccessMessage("Failed to create Report.");
      }
    );
  }

  createManufacturerSupplier(element,mode){
    if(mode == 'edit' && element.manufacturerName == this.assetOptimaConstants.notApplicable){
      this.commonService.openToastWarningMessage('Manufacturer "NOT APPLICABLE" Cannot Be Edited.');
    }else{
      localStorage.setItem('previousRoute',this.router.url);
      if(element == 0){        
        this.router.navigate(['home/purchase/manufacturerSupplierCreate/' +element +'/' + mode ]);
      }else{
        this.router.navigate(['home/purchase/manufacturerSupplierCreate/' +element.manufacturerId +'/' + mode ]);
      }
    }
  }

  getCountryData(searchValue) {
    this.countryScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '0';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllCountryForCombo, searchValue.term, '', '', this.limitCount, this.countryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.countryPageNumber , this.countries , data.responseData.comboList)
        this.countryPageNumber = this.getData.pageNumber;
        this.countries = this.getData.dataList;
        this.countryScrollsync = false;        
      });
  }

  getCountryList(event) {
    if (event === null || event === undefined) {
      this.manufacturerModel.locCountry='';
      this.manufacturerModel.locCountryId=0;
      this.manufacturerModel.locState ='';
      this.countryPageNumber =1;
      this.statesList =[];
    } else {
      this.manufacturerModel.locCountry=event.countryName;
     this.manufacturerModel.locCountryId=event.countryId;
    }
  }

  selectManufacturer(element){
    if(this.selectedItem.manufacturerId == element.manufacturerId){
      this.selectedItem = 0;
    }else{
      this.selectedItem = element;
    }
  }

}
