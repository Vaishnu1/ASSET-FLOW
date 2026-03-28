import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import {  MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  MatTable } from '@angular/material/table';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { BudgetModel } from 'src/app/Model/budget/budgetModel';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { DeleteConfirmationComponent } from '../../Common-components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-budget-detail-pop-up',
  templateUrl: './budget-detail-pop-up.component.html',
  styleUrls: ['./budget-detail-pop-up.component.css']
})
export class BudgetDetailPopUpComponent implements OnInit {
  budgetDetailFormGroup: FormGroup;
  previousYearDetailFormGroup: FormGroup;
  budgetItemDisplayCol = ['sno', 'assetGroup', 'procurementType', 'quantity', 'unitPrice', 'budgetAmount', 'pyQuantity', 'pyUnitPrice', 'pyActualSpent', 'pyBudgetAmount', 'action'];
  previousYearDisplayCol = ['pyQuantity', 'pyUnitPrice', 'pyActualSpent', 'pyBudgetAmount'];
  @ViewChild('matAssignee') tableAssignee: MatTable<any>;
  @ViewChild('matAssignees') tableAssignees: MatTable<any>;
  buttonDisplay: string = "Submit";
  public budgetDataSource = [];
  public previousYearDataSource = [];
  tempList: any[] = [];
  scrollSyncModel: boolean = false;
  isModel: boolean = false;
  isProcurementType: boolean = false;
  scrollSyncAddAssetGroup: boolean = true;
  assetGroupPageNumber: number = 0;
  assetGroup: any = [];
  limitCount: any;
  modelCombo: any[] = [];
  manufacturer: any[] = [];
  modelComboPageNumber: number;
  manufacturerScrollSync: boolean = false;
  manufacturerPageNumber: number;
  newQuantity: any;
  currencyCodePageNumber: number;
  poItemList: FormArray;
  public currencyCdList: any = [];
  totalAmountIndex: number;
  finalTotalAmount: number;
  uploadBudgetDetails: boolean = false;
  budgetNamePageNumber: number;
  budgetNameList: any = [];
  budget: BudgetModel;
  scrollsyncBudgetName: boolean = false;
  recordsPerPageForCombo: string;
  budgetDetailList: any = [];
  budgetDetailListLength: number;
  budgetDetailListNumber: number;
  capexDetailList: any = [];
  capexDetailListLength: number;
  capexDetailListNumber: number;
  modeDisplay: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data, public dialogRef: MatDialogRef<BudgetDetailPopUpComponent>,
    private samsService: AssetOptimaServices,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private assetOptimaServices: AssetOptimaServices, ) {
    this.budget = new BudgetModel();
    this.budgetNamePageNumber = 1;
    this.assetGroupPageNumber = 1;
    this.manufacturerPageNumber = 1;
    this.currencyCodePageNumber = 1;
    this.finalTotalAmount = 0;
  }

  ngOnInit() {

    this.budgetDetailFormGroup = new FormGroup({
      // budgetItem: new FormControl(''),
      bdCapexDtlId: new FormControl(0),
      bdDtlId: new FormControl(0),
      bdHdrId: new FormControl(0),
      assetGroupName: new FormControl(''),
      modelName: new FormControl(''),
      manufacturerName: new FormControl(''),
      procurementType: new FormControl('', [Validators.required]),
      procurementReason: new FormControl(''),
      //  curCd: new FormControl('', [Validators.maxLength(10), Validators.required]),
      quantity: new FormControl(0, [Validators.required]),
      unitPrice: new FormControl(0, [Validators.required]),
      budgetAmount: new FormControl(0),
      totalAmount: new FormControl(0),
      remarks: new FormControl(''),
      active: new FormControl(true),
      //  pyQuantity:new FormControl(0),
      // pyUnitPrice:new FormControl(0),
      // pyBudgetAmount:new FormControl(0),
      // pyActualSpent:new FormControl(0),

    });

    this.previousYearDetailFormGroup = new FormGroup({
      assetGroupName: new FormControl(''),
      modelName: new FormControl(''),
      manufacturerName: new FormControl(''),
      procurementType: new FormControl(''),
      procurementReason: new FormControl(''),
      //  curCd: new FormControl(''),
      // itemCode: new FormControl(''),
      // itemDescription: new FormControl(''),
      quantity: new FormControl(0),
      unitPrice: new FormControl(0),
      budgetAmount: new FormControl(0),
      totalAmount: new FormControl(0),
      remarks: new FormControl(''),
      active: new FormControl(true),

      pyQuantity: new FormControl(0),
      pyUnitPrice: new FormControl(0),
      pyBudgetAmount: new FormControl(0),
      pyActualSpent: new FormControl(0),

    });

    this.validateViewMode();

  }

  validateViewMode(){
    if (this.data.mode =='view'){
      this.budgetDetailFormGroup.disable();
      this.previousYearDetailFormGroup.disable();
this.modeDisplay = true;
    }
  }

  ngAfterViewInit() {
    console.log(this.data.capexDetailList);
    this.budgetDataSource = this.data.capexDetailList;
  }

  budgetItemList = [
    { budgetItemId: 1, budgetItem: 'Spares' },
    { budgetItemId: 2, budgetItem: 'Consumables' },
    { budgetItemId: 3, budgetItem: 'Contracts' },
    { budgetItemId: 4, budgetItem: 'New Asset' }
  ]

  procurementTypeData = [
    { procurementTypeId: 1, procurementTypeValue: 'Replacement' },
    { procurementTypeId: 2, procurementTypeValue: 'New' },

  ]

  procurementReasonData = [
    { procurementReasonId: 1, procurementReasonValue: 'Aging' },
    { procurementReasonId: 2, procurementReasonValue: 'EOL' },
    { procurementReasonId: 3, procurementReasonValue: 'Exceeding maintenance cost limit' },
    { procurementReasonId: 4, procurementReasonValue: 'Technology' },
    { procurementReasonId: 5, procurementReasonValue: 'Expansion' },
  ]

  addAssetGroup() {
    console.log(this.budgetDataSource);



    // this.budgetDetailFormGroup.controls.procurementType.setValue('');
    // this.budgetDetailFormGroup.controls.procurementReason.setValue('');
    // this.budgetDetailFormGroup.controls.quantity.setValue(0);
    // //  this.budgetDetailFormGroup.controls.curCd.setValue('');
    // this.budgetDetailFormGroup.controls.unitPrice.setValue(0);
    // this.budgetDetailFormGroup.controls.budgetAmount.setValue(0);

    this.budgetDataSource.push(this.budgetDetailFormGroup.value);

    this.budgetDetailFormGroup = new FormGroup({
      // budgetItem: new FormControl(''),
      assetGroupName: new FormControl(''),
      modelName: new FormControl(''),
      manufacturerName: new FormControl(''),
      procurementType: new FormControl(''),
      procurementReason: new FormControl(''),
      //  curCd: new FormControl(''),
      // itemCode: new FormControl(''),
      // itemDescription: new FormControl(''),
      quantity: new FormControl(0),
      unitPrice: new FormControl(0),
      budgetAmount: new FormControl(0),
      totalAmount: new FormControl(0),
      remarks: new FormControl(''),
      active: new FormControl(true),

    });
    console.log("this.budgetDetailFormGroup.controls.totalAmount.value:", this.budgetDetailFormGroup.controls.totalAmount.value);
    console.log("this.budgetDataSource::::", this.budgetDataSource);
    this.budgetDetailFormGroup.controls.totalAmount.setValue(this.budgetDataSource[this.budgetDataSource.length - 1].totalAmount);

    this.changeDetectorRefs.detectChanges();
    this.tableAssignee.renderRows();
    this.scrollSyncAddAssetGroup = true;
  }

  procurementType(value, index) {

    this.budgetDetailFormGroup.controls.procurementType.setValue(value.procurementType);
  }

  procurementReason(value, index) {
    this.budgetDetailFormGroup.controls.procurementReason.setValue(value.procurementReason);
  }

  listOfAllAssetGroup(searchKey) {

    this.limitCount = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term, '', '', this.limitCount, this.assetGroupPageNumber).subscribe(
      (data) => {

        if (!(this.commonService.fetchSearchValue(searchKey))) {
          if (this.assetGroupPageNumber === 1) {
            this.assetGroup = data.responseData.comboList;
          } else {
            this.assetGroup = this.assetGroup.concat(data.responseData.comboList);
          }
        } else {
          this.assetGroup = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.assetGroupPageNumber += 1 : this.assetGroupPageNumber = 1;
      });

  }

  assetGroupSettingUp(value, index) {
    console.log("value:", value);
    console.log("index:", index);

  }

  getAssetGroupComboValue(event) {
    if (event != null) {
      this.budgetDetailFormGroup.controls.assetGroupName.setValue(event.assetGroupName);
      this.scrollSyncAddAssetGroup = false;
    }
  }

  listOfAllModel(searchKey) {
    this.scrollSyncModel = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, '', '', this.limitCount, this.modelComboPageNumber).subscribe(
      (data) => {
        if (!(this.commonService.fetchSearchValue(searchKey))) {
          if (this.modelComboPageNumber === 1) {
            this.modelCombo = data.responseData.comboList;

          } else {
            this.modelCombo = this.modelCombo.concat(data.responseData.comboList);

          }
        } else {
          this.modelCombo = data.responseData.comboList;

        }
        data.responseData.comboList.length != 0 ? this.modelComboPageNumber += 1 : this.modelComboPageNumber = 1;
      });
    this.scrollSyncModel = false;
    this.isModel = true;
  }

  getModelComboValue(event) {
    if (event != null) {
      this.budgetDetailFormGroup.controls.manufacturerName.setValue(event.manufacturerName);
      this.budgetDetailFormGroup.controls.modelName.setValue(event.modelName);
      this.modelComboPageNumber = 1;
      this.modelCombo = [];
    } else {
      this.modelComboPageNumber = 1;
    }
  }

  listOfManufacturer(searchValue) {
    this.manufacturerScrollSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfManufacturerCombo, searchValue.term, '', '', this.limitCount, this.manufacturerPageNumber).subscribe(
      (data) => {
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if (this.manufacturerPageNumber === 1) {
            this.manufacturer = data.responseData.comboList;

          } else {
            this.manufacturer = this.manufacturer.concat(data.responseData.comboList);

          }
        } else {
          this.manufacturer = data.responseData.comboList;

        }
        this.manufacturer.length != 0 ? this.manufacturerPageNumber += 1 : this.manufacturerPageNumber = 1;
      }
    );
    this.manufacturerScrollSync = false;
  }

  getManufacturerComboValue(event) {
    if (event === undefined) {
      this.manufacturerPageNumber = 1;
      this.manufacturer = [];
    }

  }

  calculations(value, index) {
    var quantity = value.quantity;
    var unitPrice = value.unitPrice;
    this.budgetDetailFormGroup.controls.quantity.setValue(value.quantity);
    this.budgetDetailFormGroup.controls.unitPrice.setValue(value.unitPrice);
    this.budgetDataSource[index].budgetAmount = quantity * unitPrice;
    if (this.budgetDataSource[index].quantity === quantity && this.budgetDataSource[index].unitPrice === unitPrice && quantity > 0 && unitPrice > 0) {
      this.calculationTotalAmount(index);

    }

  }

  calculationTotalAmount(index) {

    for (this.totalAmountIndex = 0; this.totalAmountIndex <= index; this.totalAmountIndex++) {
      var budgetAmountRowWiseValue = this.budgetDataSource[this.totalAmountIndex].budgetAmount;
      this.finalTotalAmount = budgetAmountRowWiseValue + this.finalTotalAmount;

    }
    console.log("this.finalTotalAmount:", this.finalTotalAmount);
    var totalAmount = this.finalTotalAmount;
    this.budgetDetailFormGroup.controls.totalAmount.setValue(totalAmount);
    this.budgetDataSource[index].totalAmount = totalAmount;
    console.log("this.budgetDataSource:", this.budgetDataSource);
    this.finalTotalAmount = 0;

  }

  closeModal() {
    this.dialogRef.close();
  }

  listOfCurrencyCd(searchValue) {
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfCurCdCombo, searchValue.term, '', '', this.limitCount, this.currencyCodePageNumber).subscribe(
      (data) => {
        //IF THE RECORD VALUE IS LESS THAN 10 ITS GETTING CONCAT EVERYTIME AND SHOWING DOUBLE TIMES
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if (this.currencyCodePageNumber == 1) {
            this.currencyCdList = data.responseData.comboList;
          } else {
            this.currencyCdList = this.currencyCdList.concat(data.responseData.comboList);
          }
        } else {
          this.currencyCdList = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.currencyCodePageNumber += 1 : this.currencyCodePageNumber = 1;
      }
    );
    this.budgetDetailFormGroup.controls.curCd.setValue(this.currencyCdList);
  }

  save() {
    this.dialogRef.close(this.budgetDataSource);
    this.uploadBudgetDetails = true;

  }

  listOfBudgetName(searchKey) {

    console.log(searchKey);
    this.scrollsyncBudgetName = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllBudgetCombo, searchKey.term, '', '',
      this.recordsPerPageForCombo, this.budgetNamePageNumber, this.budget.activeDisplay, '').subscribe(
        (data) => {
          console.log("this.recordsPerPageForCombo, this.budgetNamePageNumber", this.recordsPerPageForCombo, this.budgetNamePageNumber);
          console.log("data:", data);
          if (!(this.commonService.fetchSearchValue(searchKey))) {
            if (this.budgetNamePageNumber === 1) {
              this.budgetNameList = data.responseData.comboList;
              console.log("this.budgetNameList::", this.budgetNameList);
            } else {
              this.budgetNameList = this.budgetNameList.concat(data.responseData.comboList);
              console.log("this.budgetNameList:::", this.budgetNameList);
            }
          } else {
            this.budgetNameList = data.responseData.comboList;
            console.log("this.budgetNameList::::", this.budgetNameList);
          }
          data.responseData.comboList.length != 0 ? this.budgetNamePageNumber += 1 : this.budgetNamePageNumber = 1;
        });
    this.scrollsyncBudgetName = false;
  }


  confirmForPreviousYear(event) {
    this.setBudgetNameCombo(event);
    let dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Load previous year procurements?',
        // 'confirmMsg': 'Confirm'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("data:", data);
        if (data.status) {
          this.previousYearTable(event);

        }
      });
  }

  previousYearTable(event) {

    console.log("event::", event);
    if (event != null) {
      this.budget.budgetName = event.budgetName;
      this.budget.bdHdrId = event.bdHdrId;

      this.commonService.commonGetService(this.assetOptimaServices.fetchBudgetByBudgetId, this.budget.bdHdrId).subscribe(
        data => {
          console.log("data::", data);
          this.budgetDetailList = data.responseData.budgetItemList;
          this.budgetDetailListLength = this.budgetDetailList.length;
          console.log(this.budgetDetailListLength);
          for (this.budgetDetailListNumber = 0; this.budgetDetailListNumber < this.budgetDetailListLength; this.budgetDetailListNumber++) {
            if (this.budgetDetailList[this.budgetDetailListNumber].budgetItem == "New Assets") {
              this.capexDetailList = this.budgetDetailList[this.budgetDetailListNumber].capexDetailList;
              console.log("this.capexDetailList:", this.capexDetailList);

              this.capexDetailListLength = this.capexDetailList.length;
              for (this.capexDetailListNumber = 0; this.capexDetailListNumber < this.capexDetailListLength; this.capexDetailListNumber++) {

                this.budgetDetailFormGroup.controls.procurementType.setValue('');
                this.budgetDetailFormGroup.controls.procurementReason.setValue('');
                this.budgetDetailFormGroup.controls.quantity.setValue(0);
                //  this.budgetDetailFormGroup.controls.curCd.setValue('');
                this.budgetDetailFormGroup.controls.unitPrice.setValue(0);
                this.budgetDetailFormGroup.controls.budgetAmount.setValue(0);
                this.previousYearDetailFormGroup.controls.assetGroupName.setValue(this.capexDetailList[this.capexDetailListNumber].assetGroupName);
                this.previousYearDetailFormGroup.controls.modelName.setValue(this.capexDetailList[this.capexDetailListNumber].modelName);
                this.previousYearDetailFormGroup.controls.manufacturerName.setValue(this.capexDetailList[this.capexDetailListNumber].manufacturerName);
                this.previousYearDetailFormGroup.controls.pyQuantity.setValue(this.capexDetailList[this.capexDetailListNumber].quantity);
                this.previousYearDetailFormGroup.controls.pyUnitPrice.setValue(this.capexDetailList[this.capexDetailListNumber].unitPrice);
                this.previousYearDetailFormGroup.controls.pyActualSpent.setValue(this.capexDetailList[this.capexDetailListNumber].actualSptAmt);
                this.previousYearDetailFormGroup.controls.pyBudgetAmount.setValue(this.capexDetailList[this.capexDetailListNumber].budgetAmount);

                this.budgetDataSource.push(this.previousYearDetailFormGroup.value);
                console.log("this.budgetDataSource:", this.budgetDataSource);

                this.previousYearDetailFormGroup = new FormGroup({
                  assetGroupName: new FormControl(''),
                  modelName: new FormControl(''),
                  manufacturerName: new FormControl(''),
                  procurementType: new FormControl(''),
                  procurementReason: new FormControl(''),
                  //  curCd: new FormControl(''),
                  // itemCode: new FormControl(''),
                  // itemDescription: new FormControl(''),
                  quantity: new FormControl(0),
                  unitPrice: new FormControl(0),
                  budgetAmount: new FormControl(0),
                  totalAmount: new FormControl(0),
                  remarks: new FormControl(''),
                  active: new FormControl(true),

                  pyQuantity: new FormControl(0),
                  pyUnitPrice: new FormControl(0),
                  pyBudgetAmount: new FormControl(0),
                  pyActualSpent: new FormControl(0),

                });
                this.changeDetectorRefs.detectChanges();
                this.tableAssignee.renderRows();
              }
            }
          }
        });
    }
    //   console.log("this.capexDetailList::",this.capexDetailList);
    //   this.capexDetailListLength = this.capexDetailList.length;
    // for (this.capexDetailListNumber=0; this.capexDetailListNumber <this.capexDetailListLength;this.capexDetailListNumber++){




    //     this.budgetDetailFormGroup.controls.procurementType.setValue('');
    //     this.budgetDetailFormGroup.controls.procurementReason.setValue('');
    //     this.budgetDetailFormGroup.controls.quantity.setValue(0);
    //     //  this.budgetDetailFormGroup.controls.curCd.setValue('');
    //     this.budgetDetailFormGroup.controls.unitPrice.setValue(0);
    //     this.budgetDetailFormGroup.controls.budgetAmount.setValue(0);
    //     this.previousYearDetailFormGroup.controls.assetGroupName.setValue(this.capexDetailList[this.capexDetailListNumber].assetGroupName);
    //     this.previousYearDetailFormGroup.controls.modelName.setValue(this.capexDetailList[this.capexDetailListNumber].modelName);
    //     this.previousYearDetailFormGroup.controls.manufacturerName.setValue(this.capexDetailList[this.capexDetailListNumber].manufacturerName);
    //     this.previousYearDetailFormGroup.controls.pyQuantity.setValue(this.capexDetailList[this.capexDetailListNumber].quantity);
    //     this.previousYearDetailFormGroup.controls.pyUnitPrice.setValue(this.capexDetailList[this.capexDetailListNumber].unitPrice);
    //     this.previousYearDetailFormGroup.controls.pyActualSpent.setValue(this.capexDetailList[this.capexDetailListNumber].actualSptAmt);
    //     this.previousYearDetailFormGroup.controls.pyBudgetAmount.setValue(this.capexDetailList[this.capexDetailListNumber].budgetAmount);

    //     this.budgetDataSource.push(this.previousYearDetailFormGroup.value);
    //     console.log("this.budgetDataSource:", this.budgetDataSource);

    //     this.previousYearDetailFormGroup = new FormGroup({
    //       assetGroupName: new FormControl(''),
    //       modelName: new FormControl(''),
    //       manufacturerName: new FormControl(''),
    //       procurementType: new FormControl(''),
    //       procurementReason: new FormControl(''),
    //       //  curCd: new FormControl(''),
    //       // itemCode: new FormControl(''),
    //       // itemDescription: new FormControl(''),
    //       quantity: new FormControl(0),
    //       unitPrice: new FormControl(0),
    //       budgetAmount: new FormControl(0),
    //       totalAmount: new FormControl(0),
    //       remarks: new FormControl(''),
    //       active: new FormControl(true),

    //       pyQuantity: new FormControl(0),
    //       pyUnitPrice: new FormControl(0),
    //       pyBudgetAmount: new FormControl(0),
    //       pyActualSpent: new FormControl(0),

    //     });
    //     this.changeDetectorRefs.detectChanges();
    //     this.tableAssignee.renderRows();
    //   }
  }

  setBudgetNameCombo(event) {
    console.log("event::", event);
    if (event != null) {
      this.budget.budgetName = event.budgetName;
      this.budget.bdHdrId = event.bdHdrId;

    } else {
      this.budget.budgetName = "";
      this.budget.bdHdrId = 0;
      this.budgetNameList = [];
      this.budgetNamePageNumber = 1;
    }

  }

  deleteRegistration(deleteid, index) {
    var serialNumber = index + 1;
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'row ' + serialNumber,
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.budgetDataSource.splice(index, 1);
          this.changeDetectorRefs.detectChanges();
          this.tableAssignee.renderRows();
          this.budgetDetailFormGroup.controls.totalAmount.setValue(this.budgetDataSource[this.budgetDataSource.length - 1].totalAmount);
        }
      });
  }





}
