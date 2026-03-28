import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-printer-sub-category-mapping',
  templateUrl: './printer-sub-category-mapping.component.html',
  styleUrls: ['./printer-sub-category-mapping.component.css']
})
export class PrinterSubCategoryMappingComponent implements OnInit {

  printerSubCategoryFormGroup: FormGroup;

  //for pagination
  length: number = 0;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  //LOADER
  subloader: boolean = false;

  printerSubCategoryDataSource = [];

  displayedColumns = ['sNo', 'printerModel', 'labelSize', 'templateName', 'noOfLabels', 'action'];

  recordsPerPageForCombo: string; 

  printerModelCombo: any = [];
  scrollPrinterModelSync: boolean = false;
  printerModelPageNumber: number;

  printerLabelSizeCombo: any = [];
  scrollPrinterLabelSizeSync: boolean = false;
  printerLabelSizePageNumber: number;

  printerTemplateCombo: any = [];
  scrollPrinterTemplateSync: boolean = false;
  printerTemplatePageNumber: number;

  constructor(private commonService: CommonService, 
              private dialogRef: MatDialogRef<PrinterSubCategoryMappingComponent>, 
              @Inject(MAT_DIALOG_DATA) private data,
              private dialog: MatDialog,
              private validationService: AssetOptimaConstants,
              private cdr: ChangeDetectorRef) { 

      this.printerModelPageNumber = 1;
      this.printerLabelSizePageNumber = 1;
      this.printerTemplatePageNumber = 1;
  }

  ngOnInit(): void {

    this.printerSubCategoryFormGroup = new FormGroup({
      printerSubCategoryMappingId : new FormControl(''),

      subCategoryId               : new FormControl(this.data.subCategoryId),
      
      printerModelId              : new FormControl(''),
      printerModel                : new FormControl('',[Validators.required]),

      printerLabelId              : new FormControl(''),
      labelSize                   : new FormControl('',[Validators.required]),

      printerTemplateId           : new FormControl(''),
      templateName                : new FormControl('',[Validators.required]),
      fileName                    : new FormControl(''),

      noOfLabels                  : new FormControl('1',[Validators.maxLength(2), Validators.pattern(this.validationService.numericValidation)]),

      active                      : new FormControl(true),
      createdBy                   : new FormControl(''),
      createdDt                   : new FormControl(''),
      updatedBy                   : new FormControl(''),
      updatedDt                   : new FormControl(''),
      updatedDtDisp               : new FormControl(''),
      createdDtDisp               : new FormControl(''),
    });
    this.printerSubCategoryFormGroup.controls.labelSize.disable();
    this.printerSubCategoryFormGroup.controls.templateName.disable();
    this.getList();

  }

  ngAfterViewInit() {
    if(this.data.subCategoryId != 0){
      this.printerSubCategoryFormGroup.controls.subCategoryId.setValue(this.data.subCategoryId);
    }
  }

  zeroValidation(){
    if(this.printerSubCategoryFormGroup.controls.noOfLabels.value == 0){
      this.printerSubCategoryFormGroup.controls.noOfLabels.setValue('');
      this.commonService.openToastWarningMessage(`Kindly Enter Valid "No of Labels".`);
    }
  }

  exit(){
    this.dialogRef.close();
  }

  clear() {
    this.printerSubCategoryFormGroup.reset();
    this.printerSubCategoryFormGroup.updateValueAndValidity();
    this.ngOnInit();
  }

  saveUpdate() {
    if(this.length == 0){
      this.commonService.commonInsertService('savePrinterSubCategoryMapping.sams', this.printerSubCategoryFormGroup.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            this.clear();      
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }, error => {
          throw error;
        }
      );
    }else if(this.length > 0){
      this.commonService.openToastWarningMessage("Template Already exist for Sub category");
    }
    
  }

  getList() {
    this.printerSubCategoryDataSource = [];
    this.subloader = true;
    this.commonService.commonListService('fetchListOfAllPrinterMappedToSubCategory.sams', this.printerSubCategoryFormGroup.value).subscribe(
      data => {
        if (data.success) {
          this.printerSubCategoryDataSource = data.responseData;
          this.length=this.printerSubCategoryDataSource.length; 
          this.subloader = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.subloader = false;
        }
      }, error => {
        this.subloader = false;
      }
    );
  }

  deleteMappedTemplate(printerSubCategoryMappingId) {  
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Mapped Template'
      }
    });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
      data => {
      this.commonService.commonGetService('deleteSubCategoryMappedTemplate.sams',printerSubCategoryMappingId).subscribe(
        data=>{
          if(data.success){
            this.commonService.openToastSuccessMessage(data.message); 
            this.getList();
          }else{ 
            this.commonService.openToastErrorMessage(data.message);
          }
        }  
      );
      });  
    }

  listOfPrinterModel(searchValue) {
    this.scrollPrinterModelSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterModelCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.printerModelPageNumber,'','').subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.printerModelPageNumber === 1) {
              this.printerModelCombo = data.responseData.comboList;
            } else {
              this.printerModelCombo = this.printerModelCombo.concat(data.responseData.comboList);
            }
          } else {
            this.printerModelCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.printerModelPageNumber += 1 : this.printerModelPageNumber = 1;
        }
      );
    this.scrollPrinterModelSync = false;
  }
 
  setPrinterModel(event) {
    if (event === undefined) {
      this.printerSubCategoryFormGroup.controls.printerModelId.setValue(0);
      this.printerSubCategoryFormGroup.controls.printerModel.setValue('');
      this.printerModelPageNumber = 1;
      this.printerModelCombo = [];

      //Clear label size combo
      this.printerSubCategoryFormGroup.controls.printerLabelId.setValue(0);
      this.printerSubCategoryFormGroup.controls.labelSize.setValue('');
      this.printerLabelSizePageNumber = 1;
      this.printerLabelSizeCombo = [];
      this.printerSubCategoryFormGroup.controls.labelSize.disable();

      //Clear Template Combo
      this.printerSubCategoryFormGroup.controls.printerTemplateId.setValue(0);
      this.printerSubCategoryFormGroup.controls.templateName.setValue('');
      this.printerTemplatePageNumber = 1;
      this.printerTemplateCombo = [];
      this.printerSubCategoryFormGroup.controls.templateName.disable();
    } else {
      this.printerSubCategoryFormGroup.controls.printerModelId.setValue(event.printerModelId);
      this.printerSubCategoryFormGroup.controls.printerModel.setValue(event.printerModel);
      this.printerSubCategoryFormGroup.controls.labelSize.enable();
    }
  }

  listOfPrinterLabelSize(searchValue) {
    this.scrollPrinterLabelSizeSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterLabelSizeCombo.sams', searchValue.term, this.printerSubCategoryFormGroup.controls.printerModelId.value, '',
      this.recordsPerPageForCombo, this.printerLabelSizePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.printerLabelSizePageNumber === 1) {
              this.printerLabelSizeCombo = data.responseData.comboList;
            } else {
              this.printerLabelSizeCombo = this.printerLabelSizeCombo.concat(data.responseData.comboList);
            }
          } else {
            this.printerLabelSizeCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.printerLabelSizePageNumber += 1 : this.printerLabelSizePageNumber = 1;
        }
      );
    this.scrollPrinterLabelSizeSync = false;
  }
 
  setPrinterLabelSize(event) {
    if (event === undefined) {
      this.printerSubCategoryFormGroup.controls.printerLabelId.setValue(0);
      this.printerSubCategoryFormGroup.controls.labelSize.setValue('');
      this.printerLabelSizePageNumber = 1;
      this.printerLabelSizeCombo = [];

      //Clear Template Combo
      this.printerSubCategoryFormGroup.controls.printerTemplateId.setValue(0);
      this.printerSubCategoryFormGroup.controls.templateName.setValue('');
      this.printerTemplatePageNumber = 1;
      this.printerTemplateCombo = [];
      this.printerSubCategoryFormGroup.controls.templateName.disable();
    } else {
      this.printerSubCategoryFormGroup.controls.printerLabelId.setValue(event.printerLabelId);
      this.printerSubCategoryFormGroup.controls.labelSize.setValue(event.labelSize);
      this.printerSubCategoryFormGroup.controls.templateName.enable();
    }
  }

  listOfPrinterTemplate(searchValue) {
    this.scrollPrinterTemplateSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterTemplateCombo.sams', searchValue.term, 
                                       this.printerSubCategoryFormGroup.controls.printerModelId.value, 
                                       this.printerSubCategoryFormGroup.controls.printerLabelId.value,
      this.recordsPerPageForCombo, this.printerTemplatePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.printerTemplatePageNumber === 1) {
              this.printerTemplateCombo = data.responseData.comboList;
            } else {
              this.printerTemplateCombo = this.printerTemplateCombo.concat(data.responseData.comboList);
            }
          } else {
            this.printerTemplateCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.printerTemplatePageNumber += 1 : this.printerTemplatePageNumber = 1;
        }
      );
    this.scrollPrinterTemplateSync = false;
  }
 
  setPrinterTemplate(event) {
    if (event === undefined) {
      this.printerSubCategoryFormGroup.controls.printerTemplateId.setValue(0);
      this.printerSubCategoryFormGroup.controls.templateName.setValue('');
      this.printerTemplatePageNumber = 1;
      this.printerTemplateCombo = [];
    } else {
      this.printerSubCategoryFormGroup.controls.printerTemplateId.setValue(event.printerTemplateId);
      this.printerSubCategoryFormGroup.controls.templateName.setValue(event.templateName);
    }
  }

}
