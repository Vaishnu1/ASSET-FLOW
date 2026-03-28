import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { SubMenus } from 'src/app/Constants/SubMenusList';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { PrinterModel } from 'src/app/Model/base/printer';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-printer-list',
  templateUrl: './printer-list.component.html',
  styleUrls: ['./printer-list.component.css']
})
export class PrinterListComponent implements OnInit {

  // Set Page Title
  title = 'Asset Optima - Printer';
  
  Active_Tab = 'printer';

  displayedColumns = ['select', 'locationTO.locationName', 'printerName', 'printerManufacturer', 'printerModel', 'communicationType', 
                      'defaultPrinter', 'createdBy', 'createdDt'];                                  
  printerdataSource = new MatTableDataSource<PrinterListComponent>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  subLoaderPrinter: boolean = false;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  //Communication Type Combo
  communicationTypeCombo = [
    {id: 1, name: 'BLUETOOTH'},
    {id: 2, name: 'WIFI'},
    {id: 3, name: 'LAN'},
    {id: 4, name: 'USB'}
  ];

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;
  public printerModel : PrinterModel;

  recordsPerPageForCombo: string; 

  printerCombo: any = [];
  scrollPrinterSync: boolean = false;
  printerPageNumber: number;

  printerManufacturerCombo: any = [];
  scrollPrinterManufacturerSync: boolean = false;
  printerManufacturerPageNumber: number;

  printerModelCombo: any = [];
  scrollPrinterModelSync: boolean = false;
  printerModelPageNumber: number;

  locationCombo: any = [];
  scrollLocationNameSync: boolean = false;
  locationNamePageNumber: number;
  getData: getData;

  selectedItem: any = 0;

  constructor(private dialog: MatDialog, private router: Router,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private titleService: Title,
              public submodules:SubMenus,
              private userSession: UserSessionService) { 
    this.printerModel = new PrinterModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule=new ModuleAccessModel();
    this.printerPageNumber = 1;
    this.printerManufacturerPageNumber = 1;
    this.printerModelPageNumber = 1; 
    this.locationNamePageNumber = 1; 

  }

  ngOnInit(): void {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_PRINTER'];
    this.titleService.setTitle(this.title);
    this.printerModel.direction = 'desc';
    this.printerModel.columnName = 'updatedDt';
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }

  fetchList(){
    console.log(this.printerModel);
    
    this.subLoaderPrinter = true;
    this.printerdataSource = null;
    this.printerModel.pageNumber = Number(this.pageIndex);
    this.printerModel.recordsPerPage = Number(this.pageSize);
    
    this.commonService.commonListService('fetchListOfAllPrinter.sams',this.printerModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.printerdataSource = data.responseData.dataList;
           this.subLoaderPrinter = false;       
           }else{
             this.subLoaderPrinter = false;
           }
      });
   }

  searchPrinter() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
    this.selectedItem = 0;
  }

  clear() {
    this.printerModel = new PrinterModel();
    this.ngOnInit()
    this.selectedItem = 0;
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
    this.printerModel.pageNumber = 0;
    this.printerModel.columnName = event.active;
    this.printerModel.direction = event.direction;

    this.fetchList();
  }

  printerAddEdit(priterId,mode) {
    this.router.navigate(['home/settings/printerCreate/'+priterId+'/'+mode]);  
  }

  Active_Tab_Change(name) {
    this.Active_Tab = name;    
  }

  listOfPrinter(searchValue) {
    this.scrollPrinterSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.printerPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.printerPageNumber , this.printerCombo , data.responseData.comboList)
          this.printerPageNumber = this.getData.pageNumber;
          this.printerCombo = this.getData.dataList;
          this.scrollPrinterSync = false;
        }
      );
  }

  setLocationNameComboValue(event) {
    this.printerModel.printerManufacturer = "";
    this.printerModel.printerModel= "";
    if (event === undefined) {
      this.printerModel.locationId = 0;
      this.printerModel.locationName = "";
      this.locationNamePageNumber = 1;
      this.locationCombo = [];
    } else {
      this.printerModel.locationId = event.locationId;
      this.printerModel.locationName = event.locationName;
    }
  }
 
  setPrinter(event) {
    if (event === undefined) {
      this.printerModel.printerId = 0;
      this.printerModel.printerName = '';
      this.printerPageNumber = 1;
      this.printerCombo = [];
    } else {
      this.printerModel.printerId = event.printerId;
      this.printerModel.printerName = event.printerName;
    }
  }

  listOfPrinterManufacturer(searchValue) {
    this.scrollPrinterManufacturerSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterManufacturerCombo.sams', searchValue.term, this.printerModel.locationId, '',
      this.recordsPerPageForCombo, this.printerManufacturerPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.printerManufacturerPageNumber , this.printerManufacturerCombo , data.responseData.comboList)
          this.printerManufacturerPageNumber = this.getData.pageNumber;
          this.printerManufacturerCombo = this.getData.dataList;
          this.scrollPrinterManufacturerSync = false;
        }
      );
  }
 
  setPrinterManufacturer(event) {
    if (event === undefined) {
      this.printerModel.printerManufacturer='';
      this.printerManufacturerPageNumber = 1;	
      this.printerManufacturerCombo = [];  
    } else {
      this.printerModel.printerManufacturer=event.printerManufacturer;
    }
  }

  listOfPrinterModel(searchValue) {
    this.scrollPrinterModelSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterModelCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.printerModelPageNumber, this.printerModel.printerManufacturer,'').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.printerModelPageNumber , this.printerModelCombo , data.responseData.comboList)
          this.printerModelPageNumber = this.getData.pageNumber;
          this.printerModelCombo = this.getData.dataList;
          this.scrollPrinterModelSync = false;
        }
      );
  }
 
  listOfLocationName(searchValue) {
    this.scrollLocationNameSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.locationNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationNamePageNumber , this.locationCombo , data.responseData.comboList)
        this.locationNamePageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollLocationNameSync = false;
      }
    );
  }
 
  setPrinterModel(event) {
    if (event === undefined) {
      this.printerModel.printerModelId=0;
      this.printerModel.printerModel='';
      this.printerModelPageNumber = 1;
      this.printerModelCombo = [];
    } else {
      this.printerModel.printerModelId=event.printerModelId;
      this.printerModel.printerModel=event.printerModel;
    }
  }

  selectPrinter(element) {
    if(this.selectedItem === element.printerId) {
      this.selectedItem = 0;
    } else {
      this.selectedItem = element.printerId;
    }
  }

}
