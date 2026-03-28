import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ManufacturerModel } from 'src/app/Model/master/manufacturer';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';


@Component({
  selector: 'app-asset-manufacturer',
  templateUrl: './asset-manufacturer.component.html',
  styleUrls: ['./asset-manufacturer.component.css']
})
export class AssetManufacturerComponent implements OnInit {

  displayedColumns = ['select', 'sno', 'manufacturerCode', 'manufacturerName','locState','locCountry','updatedBy', 'updatedDt'];

  manufacturerNameScrollSync : boolean = false;
  limitCount:any;
  manufacturerNamePageNumber : number;
  manufacturerNameList : any = [];
  public manufacturerModel: ManufacturerModel;
  manufacturerCodeScrollSync : boolean = false;
  manufacturerCodePageNumber : number;
  manufacturerCodeList : any = [];
  modelAccessModule: ModuleAccessModel;
  subLoaderManufacturer: boolean = false;

  supplierPageNumber:number;
  supplierList: any = [];
  scrollsyncSupplierName:boolean=false;
  getData: getData;

 manufacturerdataSource=[];
  @ViewChild('searchSet') searchCategorySet: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;

  tempViewData: any;

  //GET DATA BASED ON ITS SCREEN
  screen:string='';

  source:string='ASSET';
  selectedItem: any = 0;

  constructor(private dialog:MatDialog,
    private router : Router,
    private commonService: CommonService,
    private userSession: UserSessionService,
    private assetOptimaConstants: AssetOptimaConstants,
    private assetOptimaServices: AssetOptimaServices
    ) {
      this.manufacturerModel = new ManufacturerModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule = new ModuleAccessModel();
    this.manufacturerNamePageNumber = 1;
    this.manufacturerCodePageNumber = 1;
    this.supplierPageNumber = 1;
  }

  ngOnInit() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_MANUFACTURER'];
    this.manufacturerModel.direction = 'asc';
    this.manufacturerModel.columnName = 'manufacturerName';
    this.manufacturerModel.source='ASSET';

    this.fetchList();
  }

  customSort(event) {
    this.manufacturerModel.pageNumber = 0;
    this.manufacturerModel.columnName = event.active;
    this.manufacturerModel.direction = event.direction;
    this.fetchList();
  }

  openManufaturerviewDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);
  }

  createAssetManufacturerSupplier(element,mode){
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

  listOfManufacturerName(searchValue){
    this.manufacturerNameScrollSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllManufacturerCombo, searchValue.term, '', '', this.limitCount, this.manufacturerNamePageNumber,this.source).subscribe(
      (data) => {
        this.manufacturerNameScrollSync = false;
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerNamePageNumber , this.manufacturerNameList , data.responseData.comboList)
        this.manufacturerNamePageNumber = this.getData.pageNumber;
        this.manufacturerNameList = this.getData.dataList;
      }
    );
  }

  getManufacturerNameComboValue(event){
    if (event === undefined) {
      this.manufacturerNamePageNumber = 1;
      this.manufacturerNameList = [];
    } else {
      this.manufacturerModel.manufacturerId = event.manufacturerId;
    }
  }

  listOfManufacturerCode(searchValue){
    this.manufacturerCodeScrollSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllManufacturerCodeCombo, searchValue.term, '', '', this.limitCount, this.manufacturerCodePageNumber,this.source).subscribe(
      (data) => {
        this.manufacturerCodeScrollSync = false;
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerCodePageNumber , this.manufacturerCodeList , data.responseData.comboList)
        this.manufacturerCodePageNumber = this.getData.pageNumber;
        this.manufacturerCodeList = this.getData.dataList;
      }
    );
  }

  getManufacturerCodeComboValue(event){
    if (event === undefined) {
      this.manufacturerCodePageNumber = 1;
      this.manufacturerCodeList = [];
    } else {
      this.manufacturerModel.manufacturerId = event.manufacturerId;
    }
  }

  fetchList() {
    this.subLoaderManufacturer = true;
    this.manufacturerdataSource = [];
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

  searchManufacturer(event) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
    this.selectedItem = 0;
  }

  clear(){
    this.manufacturerModel = new ManufacturerModel;
    this.ngOnInit();
    this.selectedItem = 0;
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchList();
  }


  generateManufacturerReportExport(){
    this.manufacturerModel.recordsPerPage = 0;
    this.manufacturerModel.reportType = 'ASSET MANUFACTURER REPORT';
    this.commonService.commonListService(this.assetOptimaServices.generateManufacturerReport, this.manufacturerModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage("Download Successful.");
        this.downloadDocument(data.responseData);
      }, error => {
        this.commonService.openToastSuccessMessage("Failed to create Report.");
      }
    );
  }

  downloadDocument(filePath: string) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadExcelFile(filePath).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  selectManufacturer(element){
    if(this.selectedItem.manufacturerId == element.manufacturerId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element;
    }
  }

}
