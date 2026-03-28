import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { SubMenus } from 'src/app/Constants/SubMenusList';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { PrinterTemplateCreateComponent } from '../printer-template-create/printer-template-create.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getData } from 'src/app/Model/common/fetchListData';
import { PrinterTemplateModel } from 'src/app/Model/base/printerTemplate';

@Component({
  selector: 'app-printer-template-list',
  templateUrl: './printer-template-list.component.html',
  styleUrls: ['./printer-template-list.component.css']
})
export class PrinterTemplateListComponent implements OnInit {

  // Set Page Title
  title = 'Asset Optima - Printer Template';

  displayedColumns = ['select', 'printerModelTO.printerModel', 'printerLabelSizeTO.labelSize', 'templateName', 'fileName', 'defaultTemplate', 'updatedBy', 'updatedDt'];
  printerTemplateDataSource = new MatTableDataSource<PrinterTemplateListComponent>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  subLoaderPrinterTemplate: boolean = false;

  //For Pagination
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page


  scrollLocationNameSync: boolean = false;
  locationNamePageNumber: number;
  locationCombo: any = [];
  printerForm: FormGroup;

  //PERMISSIONS
  modelAccessModule: ModuleAccessModel;
  public printerTemplateModel : PrinterTemplateModel;

  recordsPerPageForCombo: string;

  printerModelCombo: any = [];
  scrollPrinterModelSync: boolean = false;
  printerModelPageNumber: number;
  getData: getData;

  selectedItem: any = 0;

  constructor(private dialog: MatDialog, private router: Router,
              private commonService: CommonService,
              private titleService: Title,
              public submodules:SubMenus,
              private userSession: UserSessionService) {

      this.printerTemplateModel = new PrinterTemplateModel();
      this.pageSize = '100';
      this.pageIndex = '0';
      this.modelAccessModule=new ModuleAccessModel();
      this.printerModelPageNumber = 1;
      this.locationNamePageNumber = 1;

  }

  ngOnInit(): void {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_PRINTER_TEMPLATE'];
    this.titleService.setTitle(this.title);
    this.printerTemplateModel.direction = 'desc';
    this.printerTemplateModel.columnName = 'updatedDt';
    this.pageSize = '100';
    this.pageIndex = '0';

    this.printerForm = new FormGroup({
      printerId               : new FormControl(''),
      printerName             : new FormControl('',[Validators.required,Validators.maxLength(50)]),
      printerModelId          : new FormControl(''),
      printerManufacturer     : new FormControl('',[Validators.required,Validators.maxLength(50)]),
      printerModel            : new FormControl('',[Validators.required,Validators.maxLength(50)]),
      communicationType       : new FormControl('',[Validators.required,Validators.maxLength(20)]),
      defaultPrinter          : new FormControl(false),

      printerLabelSizeDtl     : new FormControl([]),
       //COMMON OBJECTS
      createdBy               : new FormControl(''),
      createdDt               : new FormControl(''),
      updatedDt               : new FormControl(''),
      createdDtDisp           : new FormControl(''),
      updatedBy               : new FormControl(''),
      updatedDtDisp           : new FormControl(''),
      orgId                   : new FormControl(''),
      locationId              : new FormControl(''),
      locationName            : new FormControl(''),
      active                  : new FormControl(true),
    });


    this.fetchList();
  }

  fetchList(){
    console.log(this.printerTemplateModel);

    this.subLoaderPrinterTemplate = true;
    this.printerTemplateDataSource = null;
    this.printerTemplateModel.pageNumber = Number(this.pageIndex);
    this.printerTemplateModel.recordsPerPage = Number(this.pageSize);

    this.commonService.commonListService('fetchListOfAllPrinterTemplate.sams',this.printerTemplateModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.printerTemplateDataSource = data.responseData.dataList;
           this.subLoaderPrinterTemplate = false;
           }else{
             this.subLoaderPrinterTemplate = false;
           }
      });
   }

  searchPrinterTemplate() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
    this.selectedItem = 0;
  }

  clear() {
    this.printerTemplateModel = new PrinterTemplateModel();
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
    this.printerTemplateModel.pageNumber = 0;
    this.printerTemplateModel.columnName = event.active;
    this.printerTemplateModel.direction = event.direction;

    this.fetchList();
  }

  printerTemplateCreate(element,mode) {
    let dialogRef = this.dialog.open(PrinterTemplateCreateComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'printerTemplateInfo': element,
        'mode': mode
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.fetchList();
      });
  }

  setLocationNameComboValue(event) {
    this.printerForm.controls.printerManufacturer.setValue('');
    this.printerForm.controls.printerModel.setValue('');
    if (event === undefined) {
      this.printerForm.controls.locationId.setValue(0);
      this.printerForm.controls.locationName.setValue('');
      this.locationNamePageNumber = 1;
      this.locationCombo = [];
    } else {
      this.printerForm.controls.locationId.setValue(event.locationId);
      this.printerForm.controls.locationName.setValue(event.locationName);
      this.printerTemplateModel.locationId = event.locationId
    }
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
      this.printerTemplateModel.printerModelId=0;
      this.printerTemplateModel.printerModel='';
      this.printerModelPageNumber = 1;
      this.printerModelCombo = [];
    } else {
      this.printerTemplateModel.printerModelId=event.printerModelId;
      this.printerTemplateModel.printerModel=event.printerModel;
    }
  }

  deletePrinterTemplate(printerTemplateId,templatePath) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Template'
      }
    });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
      data => {
        if(data.status===true){
      this.commonService.commonGetService('deletePrinterTemplate.sams',printerTemplateId,templatePath).subscribe(
        data=>{
          if(data.success){
            this.commonService.openToastSuccessMessage(data.message);
            this.selectedItem = 0;
            this.fetchList();
          }else{
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }
      });
    }

    downloadDocument(filePath: string) {
      var fileName = filePath.split('.')[0];
      this.commonService.downloadExcelFile(filePath).subscribe(
        data => {
          let file = filePath.split('.');
          this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
          this.commonService.openToastSuccessMessage('Download Successful.');
        }
      );
    }

    selectPrinterTemplate(element) {
      if(this.selectedItem.printerTemplateId == element.printerTemplateId) {
        this.selectedItem = 0;
      } else {
        this.selectedItem = element;
      }

    }

}
