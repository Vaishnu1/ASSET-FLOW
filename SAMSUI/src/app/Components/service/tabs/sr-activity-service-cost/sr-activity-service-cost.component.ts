import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-sr-activity-service-cost',
  templateUrl: './sr-activity-service-cost.component.html',
  styleUrls: ['./sr-activity-service-cost.component.css']
})
export class SrActivityServiceCostComponent implements OnInit {


  serviceTypeList = [
    { id: 1, name: 'LABOUR' },
    { id: 2, name: 'SPARE PARTS' }
  ];
  headingDisplay: string;
  srActivitySRCostForm: FormGroup;
  @Input() srLabourId;
  searchKey: any = '';
  limitCount: any;
  uomPageNumber: number;
  scrollUomsync: boolean = false;
  modeDisplay: boolean = true;
  buttonDisplay: string = "Add";
  srActivitySRCostList = [];
  uom: any = [];
  uploadFlag: boolean = false;
  displaySRCostColumns = ['sNo', 'serviceType','itemName','itemSerialNo', 'serviceSpareDesc', 'uomCode', 'unitPrice', 'qty', 'totalCost', 'action'];
  dialogRef1;
  @ViewChild('serviceTypeFocus') serviceTypeFocusCombo: NgSelectComponent;

  scrollItemNameSync: boolean = false;
  itemList: any = [];
  itemNamePageNumber: number;

  modelId: number = 0;

  enableItemCombo : boolean = false;
  enableItemSerialNo : boolean = false;

  constructor(public dialogRef: MatDialogRef<SrActivityServiceCostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private dialog: MatDialog) {

    this.uomPageNumber = 1;
    this.itemNamePageNumber = 1;
  }

  ngOnInit() {
    this.srActivitySRCostForm = new FormGroup({
      srActServiceCostId: new FormControl('0'),
      srActivityId: new FormControl(this.data.srActivityId),
      srId: new FormControl(this.data.srId),
      serviceSpareDesc: new FormControl('', [Validators.required]),
      serviceType: new FormControl('', [Validators.required]),
      uomCode: new FormControl('NOS'),
      unitPrice: new FormControl('0.00'),
      qty: new FormControl(1),
      totalCost: new FormControl('0.00'),
      itemId : new FormControl(0),
      itemName : new FormControl(''),
      itemSerialNo : new FormControl('')
    });
    this.modelId = this.data.modelId;
    this.loadSrActivityCostList();
  }

  ngAfterViewInit() {
    this.commonService.setComboFocus(this.serviceTypeFocusCombo);
  }
 

  loadSrActivityCostList() {
    this.commonService.commonGetService('fetchSRActServiceCostList.sams', this.srActivitySRCostForm.controls.srActivityId.value).subscribe(
      data => {
        this.srActivitySRCostList = data.responseData;
      },
      error => {
      }
    );
  }

  exit() {
    this.dialogRef.close();
  }

  listOfUOM(searchValue) {
    this.scrollUomsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfUOMCombo, this.searchKey, '', '', this.limitCount, this.uomPageNumber).subscribe(
      (data) => {
        if (data.success) {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.uomPageNumber === 1) {
              this.uom = data.responseData.comboList;
            } else {
              this.uom = this.uom.concat(data.responseData.comboList);
            }
          } else {
            this.uom = data.responseData.comboList;
          }
          this.uom.length !== 0 ? this.uomPageNumber += 1 : this.uomPageNumber = 1;
        }
      }
    );
    this.scrollUomsync = false;
  }

  getUOMValue(event) {
    if (event === undefined) {
      this.srActivitySRCostForm.get('uomCode').setValue('');
      this.uom = [];
      this.uomPageNumber = 1;
    } else {
      this.srActivitySRCostForm.get('uomCode').setValue(event.uomCode);
    }
  }

  saveUpdateSRCost() {
    this.uploadFlag = true;
    var saveSrCost = true;
    if(this.enableItemSerialNo === true) {
      if(this.srActivitySRCostForm.controls.itemSerialNo.value === '' || this.srActivitySRCostForm.controls.itemSerialNo.value === null) {
        saveSrCost = false;
      }
    } 

    if(saveSrCost) {
      this.commonService.commonInsertService('saveUpdateSrActServiceCost.sams', this.srActivitySRCostForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            if (this.srActivitySRCostForm.get('srActServiceCostId').value <= 0) {
              this.commonService.openToastSuccessMessage('Service Cost Added  Successfully' + data.responseData+'.');
              this.uploadFlag = false;

              this.enableItemCombo = false;
              this.enableItemSerialNo = false;

              this.loadSrActivityCostList();
              this.srActivitySRCostForm.reset();
              this.srActivitySRCostForm.updateValueAndValidity();
              this.ngOnInit();
              this.commonService.setComboFocus(this.serviceTypeFocusCombo);
            } else {
              this.commonService.openToastSuccessMessage('Service Cost Updated  Successfully' + data.responseData+'.');
              this.uploadFlag = false;
              this.loadSrActivityCostList();
              this.srActivitySRCostForm.reset();
              this.srActivitySRCostForm.updateValueAndValidity();
              this.ngOnInit();
              this.commonService.setComboFocus(this.serviceTypeFocusCombo);
            }
            this.uploadFlag = false;
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFlag = false;
          }
        }
      );
    } else {
      this.commonService.openToastWarningMessage('Kindly enter spare serial No!');
      this.uploadFlag = false;
    }
  }

  calculateSRCCost() {
    let unitPrice = Number(this.srActivitySRCostForm.controls.unitPrice.value);
    let qty = Number(this.srActivitySRCostForm.controls.qty.value);

    if (unitPrice > 0 && qty > 0) {
      let totalCost = unitPrice * qty;
      this.srActivitySRCostForm.controls.totalCost.setValue(totalCost);
    }
  }

  srCostDelete(srActServiceCostId) {
    this.dialogRef1 = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text ': 'Service Cost'
      }
    });
    this.dialogRef1.disableClose = true;
    this.dialogRef1.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.commonService.commonGetService('deleteSrActivityCost.sams', srActServiceCostId).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
                this.loadSrActivityCostList();
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }
          );
        }
      }
    );
  }

  listOfItem(searchValue) {
    this.scrollItemNameSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfModelItemsCombo, searchValue.term, this.modelId, '', this.limitCount, this.itemNamePageNumber, '').subscribe(
      (data) => {
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if (this.itemNamePageNumber === 1) {
            this.itemList = data.responseData.comboList;
          } else {
            this.itemList = this.itemList.concat(data.responseData.comboList);
          }
        } else {
          this.itemList = data.responseData.comboList;
        }
        data.responseData.comboList.length !== 0 ? this.itemNamePageNumber += 1 : this.itemNamePageNumber = 1;
      }
    );
    this.scrollItemNameSync = false;
  }

  selectedServiceType(event) {
    if (event === undefined) {
      this.srActivitySRCostForm.controls.serviceType.setValue('');
      this.enableItemCombo = false;
    } else {
      this.srActivitySRCostForm.controls.serviceType.setValue(event.name);
      this.enableItemCombo = true;
    }
  }

  selectedItem(event) {
    if (event === undefined) {
      this.srActivitySRCostForm.controls.itemId.setValue(0);
      this.srActivitySRCostForm.controls.itemName.setValue('');
      this.enableItemSerialNo = false;
    } else {
      this.srActivitySRCostForm.controls.itemId.setValue(event.itemId);
      this.srActivitySRCostForm.controls.itemName.setValue(event.itemName);

      if(event.serialNoRequired === true) {
        this.enableItemSerialNo = true;
      } else {
        this.enableItemSerialNo = false;
      }
    }
  }

}
