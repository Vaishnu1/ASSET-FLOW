import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-printer-create',
  templateUrl: './printer-create.component.html',
  styleUrls: ['./printer-create.component.css']
})
export class PrinterCreateComponent implements OnInit {

  //Set Page Title
  title = 'Asset Optima - Printer';

  printerForm: FormGroup;

  @ViewChild('printerNameFocus') printerNameFocusSet : NgSelectComponent;

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  displayButton: string;
  disableClear: boolean=false;
  uploadFlag: boolean = false;

  isAddMode: boolean = false;
  isEditMode: boolean = false;
  isViewMode: boolean = false;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  //Communication Type Combo
  communicationTypeCombo = [
    {id: 1, name: 'BLUETOOTH'},
    {id: 2, name: 'WIFI'},
    {id: 3, name: 'LAN'},
    {id: 4, name: 'USB'}
  ];

  ErrorMsg: String;
  tempValue: String = '';
  updateFlag = false;

  // printerLabelDtlTempPush: any = [];
  // printerLabelDtlDataSource = new MatTableDataSource<any>();
  // @ViewChild('matPrinterLabel') printerLabeltable: MatTable<any>;

  // dispColPrinterLabelDtl= ['sNo','labelSize','active','createdBy','createdDt','action'];
  // printerLabelDtlLength: number = 0;

  recordsPerPageForCombo: string;

  locationCombo: any = [];
  scrollLocationNameSync: boolean = false;
  locationNamePageNumber: number;

  printerManufacturerCombo: any = [];
  scrollPrinterManufacturerSync: boolean = false;
  printerManufacturerPageNumber: number;

  printerModelCombo: any = [];
  scrollPrinterModelSync: boolean = false;
  printerModelPageNumber: number;
  getData: getData;

  constructor(private commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private userSessionService: UserSessionService,
              private router: Router) {

    this.locationNamePageNumber = 1;
    this.printerManufacturerPageNumber = 1;
    this.printerModelPageNumber = 1;

  }

  ngOnInit(): void {
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
    this.validateEditMode();
  }

  validateEditMode(){
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId =Number(primaryId);
        var mode = params.mode;
        if(primaryId <= 0){
          this.displayButton="Submit";
          this.disableClear=false;
          this.headingDisplay = "Create";
          this.isAddMode=true;
          this.printerForm.controls.locationName.setValue(this.userSessionService.getUserLocationName());
          this.printerForm.controls.locationId.setValue(this.userSessionService.getUserLocationId());
        }else{
          this.commonService.commonGetService('loadPrinterInfo.sams',primaryId).subscribe(
            data => {
              if(mode=='view'){
                this.printerForm.disable();
                this.headingDisplay = "View";
                this.isViewMode=true;
              }else{
                // button and heading names for edit
                this.headingDisplay = "Edit";
                this.displayButton = "Update";
                this.disableClear = true;
                this.isEditMode=true;
              }
              this.printerForm.patchValue(data.responseData);
              this.tempValue = data.responseData.printerName;
              this.printerForm.controls.printerManufacturer.disable();
              this.printerForm.controls.printerModel.disable();
              // this.printerLabelDtlDataSource.data=data.responseData.printerLabelSizeDtl;
              // this.printerLabelDtlLength=this.printerLabelDtlDataSource.data.length;
            }
          );
        }
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
    }
  }

  savePrinter(){
    this.commonService.showSpinner();
    this.commonService.commonInsertService('saveOrUpdatePrinter.sams',this.printerForm.getRawValue()).subscribe(
    data => {
      if(data.success){
        this.commonService.openToastSuccessMessage(data.message);
        this.commonService.hideSpinner();
        this.navigateToPrinter();
      } else {
        this.commonService.openToastErrorMessage(data.message);
        this.commonService.hideSpinner();
      }
    });
  }

  listOfPrinterManufacturer(searchValue) {
    this.scrollPrinterManufacturerSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterManufacturerCombo.sams', searchValue.term, this.printerForm.controls.locationId.value, '',
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
      this.printerForm.controls.printerManufacturer.setValue('');
      this.printerManufacturerPageNumber = 1;
      //Clear Printer Model Combo Also
      this.printerForm.controls.printerModelId.setValue(0);
      this.printerForm.controls.printerModel.setValue('');
      this.printerModelPageNumber = 1;
      this.printerManufacturerCombo = [];
      this.printerModelPageNumber = 1;
      this.printerModelCombo = [];
    } else {
      this.printerForm.controls.printerManufacturer.setValue(event.printerManufacturer);
      this.printerForm.controls.printerModelId.setValue(0);
      this.printerForm.controls.printerModel.setValue('');
      this.printerModelPageNumber = 1;
      this.printerModelCombo = [];
    }
  }

  listOfPrinterModel(searchValue) {
    this.scrollPrinterModelSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterModelCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.printerModelPageNumber,this.printerForm.controls.printerManufacturer.value,'').subscribe(
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
      this.printerForm.controls.printerModelId.setValue(0);
      this.printerForm.controls.printerModel.setValue('');
      this.printerModelPageNumber = 1;
      this.printerModelCombo = [];
    } else {
      this.printerForm.controls.printerModelId.setValue(event.printerModelId);
      this.printerForm.controls.printerModel.setValue(event.printerModel);
      this.printerForm.controls.printerManufacturer.setValue(event.printerManufacturer);
    }
  }

  navigateToPrinterEditMode(printerId){
    this.router.navigate(['home/settings/printerCreate/'+printerId+'/'+'edit']);
  }

  navigateToPrinter() {
    this.router.navigate(['home/settings/printer']);
  }

  clearPrinter() {
    this.printerForm.reset();
    this.printerForm.updateValueAndValidity();
    this.ngOnInit();
  }

  // addPrinterLabelSize(element,mode) {
  //   let dialogRef = this.dialog.open(PrinterLabelSizeCreateComponent, {
  //     data: {
  //       'printerLabelSizeInfo': element,
  //       'mode': mode,
  //       'printerId':this.printerForm.controls.printerId.value
  //     },
  //      width: '400px', height: 'auto'
  //   });
  //   dialogRef.disableClose = true;
  //   dialogRef.afterClosed().subscribe(
  //     data => {
  //       this.ngOnInit();
  //     });
  // }

  uniqueValidation() {
    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.printerForm.controls.printerName.value != null) ? this.printerForm.controls.printerName.value.toLowerCase() : '')) {

    } else if(this.printerForm.controls.printerName.value === ''){
     this.printerForm.controls.printerName.setErrors(Validators.required);
    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.PrinterTO";
      constraintData.constraints = {
        'printerName': this.printerForm.controls.printerName.value.trim(),
        'orgId': this.userSessionService.getUserOrgId(),
      };

      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.printerForm.controls.printerName.setErrors({ "notUnique": true });
            this.updateFlag = true;
          } else {
            this.ErrorMsg = '';
            this.printerForm.controls.printerName.setErrors(null);
            this.updateFlag = false;
          }
        }
      );
    }
  }

}
