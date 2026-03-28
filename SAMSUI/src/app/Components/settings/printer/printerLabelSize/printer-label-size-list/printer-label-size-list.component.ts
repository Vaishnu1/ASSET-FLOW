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
import { PrinterLabelSizeModel } from 'src/app/Model/base/printerLabelSize';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { PrinterLabelSizeCreateComponent } from '../printer-label-size-create/printer-label-size-create.component';

@Component({
  selector: 'app-printer-label-size-list',
  templateUrl: './printer-label-size-list.component.html',
  styleUrls: ['./printer-label-size-list.component.css']
})
export class PrinterLabelSizeListComponent implements OnInit {

  // Set Page Title
  title = 'Asset Optima - Printer Label';

  displayedColumns = ['select','printerModelTO.printerModel','labelSize','active','createdBy','createdDt']; 
  printerLabelDtlDataSource = new MatTableDataSource<PrinterLabelSizeListComponent>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  subLoaderPrinterLabel: boolean = false;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;
  public printerLabelSizeModel : PrinterLabelSizeModel;

  recordsPerPageForCombo: string; 

  printerModelCombo: any = [];
  scrollPrinterModelSync: boolean = false;
  printerModelPageNumber: number;
  getData: getData;

  selectedItem: any = 0;

  constructor(private dialog: MatDialog, private router: Router,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private titleService: Title,
              public submodules:SubMenus,
              private userSession: UserSessionService) {

      this.printerLabelSizeModel = new PrinterLabelSizeModel();
      this.pageSize = '100';
      this.pageIndex = '0';
      this.modelAccessModule=new ModuleAccessModel();
      this.printerModelPageNumber = 1;

  }

  ngOnInit(): void {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_PRINTER_TEMPLATE'];
    this.titleService.setTitle(this.title);
    this.printerLabelSizeModel.direction = 'desc';
    this.printerLabelSizeModel.columnName = 'updatedDt';
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }

  fetchList(){
    this.subLoaderPrinterLabel = true;
    this.printerLabelDtlDataSource = null;
    this.printerLabelSizeModel.pageNumber = Number(this.pageIndex);
    this.printerLabelSizeModel.recordsPerPage = Number(this.pageSize);
    
    this.commonService.commonListService('fetchListOfAllPrinterLabelSize.sams',this.printerLabelSizeModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.printerLabelDtlDataSource = data.responseData.dataList;
           this.subLoaderPrinterLabel = false;       
           }else{
             this.subLoaderPrinterLabel = false;
           }
      });
   }

  searchPrinterLabelSize() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
    this.selectedItem = 0;
  }

  clear() {
    this.printerLabelSizeModel = new PrinterLabelSizeModel();
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
    this.printerLabelSizeModel.pageNumber = 0;
    this.printerLabelSizeModel.columnName = event.active;
    this.printerLabelSizeModel.direction = event.direction;

    this.fetchList();
  }

  listOfPrinterModel(searchValue) {
    this.scrollPrinterModelSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterModelCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.printerModelPageNumber, '','').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.printerModelPageNumber , this.printerModelCombo , data.responseData.comboList)
          this.printerModelPageNumber = this.getData.pageNumber;
          this.printerModelCombo = this.getData.dataList;
          this.scrollPrinterModelSync = false;
        }
      );
  }
 
  setPrinterModel(event) {
    if (event === undefined) {
      this.printerLabelSizeModel.printerModelId=0;
      this.printerLabelSizeModel.printerModel='';
      this.printerModelPageNumber = 1;
      this.printerModelCombo = [];
    } else {
      this.printerLabelSizeModel.printerModelId=event.printerModelId;
      this.printerLabelSizeModel.printerModel=event.printerModel;
    }
  }

  addPrinterLabelSize(element,mode) {
    let dialogRef = this.dialog.open(PrinterLabelSizeCreateComponent, {
      data: { 
        'printerLabelSizeInfo': element,
        'mode': mode 
      },
       width: '400px', height: 'auto'     
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  selectPrinterSize(element) {
    if(this.selectedItem.printerLabelId == element.printerLabelId) {
      this.selectedItem = 0;
    } else {
      this.selectedItem = element;
    }
  }

}
