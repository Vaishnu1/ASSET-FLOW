import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { Location } from '@angular/common';
import { getData } from 'src/app/Model/common/fetchListData';
import { NgSelectComponent } from '@ng-select/ng-select';
import { allBusinessPartnerRoles, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-rtv-create',
  templateUrl: './rtv-create.component.html',
  styleUrls: ['./rtv-create.component.css']
})
export class RtvCreateComponent implements OnInit {

  headingDisplay: string;
  mode: any;
  createMode: boolean = false;
  disableSubmit: boolean = false;
  disbleClear: boolean = false;
  stockQtyCheckFlag: boolean = false;
  rtvQtyNumberFlag: boolean = false;
  rtvQtyCheckTypeFlag: boolean = false;

  scrollLocationNamesync: boolean = false;
  limitCount: any;
  locationCombo: any = [];
  locationNamePageNumber: number;
  getData: getData;
  rtvForm: FormGroup;
  rtvDtlTO: FormArray;

  scrollSupplierNamesync = false;
  supplierPageNumber: number;
  supplierList = [];
  supplierLocationList: any = [];

  approvedSupplierPageNumber: number;
  scrollApprovedSupplierNamesync: boolean = false;

  scrollDonosync: boolean = false;
  donoPageNumber: number;
  doNoList = [];

  scrollGrnNosync: boolean = false;
  grnNoPageNumber: number;
  grnNoList = [];

  scrollStoreNamesync: boolean = false;
  storePageNumber: number;
  storeList = [];
  insertFlg: boolean;
  enableRtvDtlTable: boolean = true;
  stockQty: number = 0;
  supplierSiteCount: any;
  itemErrorMsg: string;

  public rtvHdrId: any;
  public transactionSource: any;
  employeeId: string = '0';
  approvalId: string = '0';
  approvebuttonEnable: boolean = false;
  currentDate: Date;

  @ViewChild('supplierSiteName') supplierSiteName: NgSelectComponent;
  @ViewChild('doNo') doNo: NgSelectComponent;

  constructor(private formBuilder: FormBuilder,
    public commonService: CommonService,
    public assetOptimaServices: AssetOptimaServices,
    public location: Location,
    public activatedRoute: ActivatedRoute,
    public assetOptimaConstants: AssetOptimaConstants,
    private userSessionService: UserSessionService,
    private router: Router,
    private readonly dialog: MatDialog) {
    this.getData = new getData();
    this.locationNamePageNumber = 1;
    this.supplierPageNumber = 1;
    this.approvedSupplierPageNumber = 1;
    this.donoPageNumber = 1;
    this.grnNoPageNumber = 1;
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.rtvForm = new FormGroup({
      rtvHdrId: new FormControl(0),
      rtvNo: new FormControl(''),
      rtvDate: new FormControl(new Date()),
      doDateDisp: new FormControl(''),
      requestedById: new FormControl(this.userSessionService.getUserId()),
      rtvStatus: new FormControl('BOOKED', [Validators.required]),
      srNo: new FormControl(''),
      storeId: new FormControl(0),
      errorFlg: new FormControl(''),
      errorMessage: new FormControl(''),
      createdDt: new FormControl(''),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      rtvDateDisp: new FormControl(''),
      orgId: new FormControl((this.userSessionService.getUserOrgId)),
      locationId: new FormControl((this.userSessionService.getUserLocationId())),
      locationName: new FormControl(this.userSessionService.getUserLocationName()),
      supplierName: new FormControl('', [Validators.required]),
      supplierId: new FormControl(0),
      grnId: new FormControl(0),
      grnNo: new FormControl(''),
      itemName: new FormControl(''),
      rtvFromDate: new FormControl(''),
      rtvToDate: new FormControl(''),
      poNo: new FormControl(''),
      doNo: new FormControl('', [Validators.required]),
      rtvRemarks: new FormControl(''),
      supplierSiteName: new FormControl('', [Validators.required]),
      supplierSiteId: new FormControl(0),
      storeName: new FormControl(''),
      rtvRequsetedBy: new FormControl(this.userSessionService.getUserName()),
      rtvDtlTO: this.formBuilder.array([]),
    });
    // this.rtvForm.get('rtvDate').disable();
    this.rtvForm.get('supplierSiteName').disable();
    this.rtvForm.get('doDateDisp').disable();
    this.rtvForm.get('grnNo').disable();
    this.rtvForm.get('rtvNo').disable();
    this.rtvForm.get('rtvStatus').disable();
    this.rtvForm.get('doNo').disable();
    this.approvedSupplierPageNumber = 1;
    this.validateEditMode();
  }

  validateEditMode() {
    this.commonService.showSpinner();
    // this.stockIndentForm.get('indentNo').disable();
    // this.stockIndentForm.get('indentDtDisp').disable();
    // this.stockIndentForm.get('indentStatus').disable();
    // this.stockIndentForm.get('assetCode').disable();


    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        this.mode = params.mode;
        primaryId = Number(primaryId);
        if (primaryId <= 0) {
          // this.stockIndentForm.get('requestedBy').disable();
          // this.stockIndentForm.get('requestedDtDisp').disable();
          // this.stockIndentForm.controls['requestedDtDisp'].setValue(new Date());

          this.headingDisplay = 'Create';
          this.createMode = true;
        } else {
          this.rtvHdrId = Number(primaryId);
          this.transactionSource = allWorkflowStatus[allWorkflowStatus.RTV_APPROVAL];
          if (this.mode === 'view') {
            this.headingDisplay = 'View';
            this.disableSubmit = true;
            this.rtvForm.disable();
          } else {
            //button and heading names for edit
            this.headingDisplay = 'Edit';
            // this.stockIndentForm.get('requestedDtDisp').disable();
            // this.stockIndentForm.get('storeName').disable();
            // this.stockIndentForm.get('srNo').disable();
            // this.stockIndentForm.get('requestedBy').disable();

          }
          this.commonService.commonGetService('loadRtvInfo.sams', primaryId).subscribe(
            data => {
              this.rtvForm.patchValue(data.responseData);
              this.fetchGridDataInEdit(data.responseData);

            }
          )
          this.getWorkflowApprovalForRtv();
        }
      }
    );
    this.commonService.hideSpinner();

  }

  backTOItemScreen() {

  }

  exitForm() {
    this.location.back();
  }

  clear() {
    this.ngOnInit();
  }

  listofLocationName(searchValue) {
    this.scrollLocationNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationNamePageNumber, this.locationCombo, data.responseData.comboList)
        this.locationNamePageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollLocationNamesync = false;
      }
    );
  }

  setLocationNameComboValue(event) {
    // if (event === undefined) {
    //   this.rtvHdrModel.locationId = 0;
    //   this.rtvHdrModel.locationName = '';
    //   this.locationNamePageNumber = 1;
    // } else {
    //   this.rtvHdrModel.locationId = event.locationId;
    //   this.rtvHdrModel.locationName = event.locationName;
    // }
  }

  listOfSupplier(searchTerms) {
    this.scrollSupplierNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchTerms.term, '', '', this.limitCount, this.supplierPageNumber, '', partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.supplierPageNumber, this.supplierList, data.responseData.comboList)
        this.supplierPageNumber = this.getData.pageNumber;
        this.supplierList = this.getData.dataList;
        this.scrollSupplierNamesync = false;
      }
    );
  }

  fetchIdOfSupplier(event) {
    if (event === undefined) {
      this.rtvForm.controls['supplierId'].setValue(0);
      this.rtvForm.controls['supplierName'].setValue('');
      this.supplierLocationList = [];
      this.supplierPageNumber = 1;
    } else {
      this.supplierLocationList = [];
      this.rtvForm.controls['supplierSiteName'].setValue('');
      this.rtvForm.controls['supplierSiteId'].setValue(0);
      this.rtvForm.get('doNo').enable();
      this.commonService.setComboFocus(this.doNo);
      this.rtvForm.controls['supplierId'].setValue(event.businessPartnerId);
      this.listOfSupplierApproved('');
      this.doNoList = [];
      this.rtvDtlTO.clear();
    }
  }

  listOfSupplierApproved(searchTerms) {
    let supplierId = this.rtvForm.get('supplierId').value;
    if (supplierId > 0) {
      this.approvedSupplierPageNumber = 1;
      this.scrollApprovedSupplierNamesync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
      this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchTerms.term, this.rtvForm.get('supplierId').value, '', this.limitCount, this.approvedSupplierPageNumber, '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchTerms, this.approvedSupplierPageNumber, this.supplierLocationList, data.responseData.comboList)
          this.approvedSupplierPageNumber = this.getData.pageNumber;
          this.supplierLocationList = this.getData.dataList;
          this.scrollApprovedSupplierNamesync = false;
          if (this.supplierLocationList.length == 1) {
            this.rtvForm.get('supplierSiteName').disable();
            this.rtvForm.controls['supplierSiteName'].setValue(this.supplierLocationList[0].partnerSiteName);
            this.rtvForm.controls['supplierSiteId'].setValue(this.supplierLocationList[0].partnerSiteId);
          } else {
            this.rtvForm.get('supplierSiteName').enable();
          }
        }
      );
    } else {
      this.rtvForm.controls['supplierSiteName'].setValue('');
      this.commonService.openToastWarningMessage("Kindly select supplier name");
    }
  }

  fetchIdOfSupplierApproved(event) {
    if (event === undefined) {
      this.rtvForm.controls['supplierSiteId'].setValue(0);
      this.rtvForm.controls['supplierSiteName'].setValue('');
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
    } else {
      this.rtvForm.controls['supplierSiteId'].setValue(event.partnerSiteId);
    }
  }

  listOfGrnDoNo(searchTerms) {

    let supplierId = this.rtvForm.get('supplierId').value;
    console.log(supplierId)
    this.donoPageNumber = 1;
    if (supplierId > 0) {
      this.scrollDonosync = true;
      this.doNoList = [];
      this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
      this.commonService.getComboResults(this.assetOptimaServices.listOfGrnHdrSupplierNameCombo, searchTerms.term, this.rtvForm.get('supplierId').value, '', this.limitCount, this.donoPageNumber, '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchTerms, this.donoPageNumber, this.doNoList, data.responseData.comboList)
          this.donoPageNumber = this.getData.pageNumber;
          this.doNoList = this.getData.dataList;
          this.scrollDonosync = false;
          console.log(this.doNoList);
        }
      );
    } else {
      this.rtvForm.controls['doNo'].setValue('');
      this.commonService.openToastWarningMessage("Kindly select supplier name");
    }

  }

  fetchIdOfGrnDoNo(event) {
    if (event === undefined) {
      this.doNoList = [];
      this.rtvForm.controls['doNo'].setValue('');
      this.donoPageNumber = 1;
    } else {
      this.rtvForm.controls['doNo'].setValue(event.doNo);
      this.rtvForm.controls['grnNo'].setValue(event.grnNo);
      this.rtvForm.controls['grnId'].setValue(event.grnId);
      this.rtvForm.controls['storeId'].setValue(event.storeId);

      // console.log(event.doNo,event.grnNo,event.grnId,event.storeId)
      this.insertFlg = false;
      if (event.rtvStatus == 'BOOKED') {
        this.commonService.openToastWarningMessage("Already in Booked status");
        this.rtvDtlTO.clear();
      } else {
        this.rtvDtlTO = this.rtvForm.get('rtvDtlTO') as FormArray;
        this.rtvDtlTO.clear();
        event.grnDtlList.map(obj => {
          this.rtvForm.controls['doDateDisp'].setValue(obj.doDateDisp);
          if (!this.insertFlg) {
            const Group = this.formBuilder.group({
              grnDtlId: new FormControl(obj.grnDtlId),
              rtvHdrId: new FormControl(0),
              poQty: new FormControl(obj.poQty),
              itemTypeId: new FormControl(obj.itemTypeId),
              itemTypeName: new FormControl(obj.itemTypeName),
              itemId: new FormControl(obj.itemId),
              itemName: new FormControl(obj.itemName),
              itemDesc: new FormControl(obj.description),
              poId: new FormControl(obj.poId),
              poNo: new FormControl(obj.poNo),
              poLineNo: new FormControl(obj.poLineNo),
              poLineId: new FormControl(obj.poLineNoId),
              grnQty: new FormControl(obj.acceptQty),
              stockQty: new FormControl(obj.stockQty),
              rtvQty: new FormControl(0),
              storeName: new FormControl(obj.storeName),
              manufacturePartNo: new FormControl(event.manufacturerPartNo),
              uomCd: new FormControl(obj.uom),
              rtvReason: new FormControl(this.rtvForm.get('rtvRemarks').value),
              storeId: new FormControl(obj.storeId),
              poType : new FormControl(obj.poType)
            });

            if(Group.controls.poType.value == 'MATERIAL'){
              this.rtvDtlTO.push(Group);
            }
            
          }
        });
      }
    }
  }

  listOfRtvGrnNo(searchTerms) {
    let supplierId = this.rtvForm.get('supplierId').value;
    this.grnNoPageNumber = 1;
    if (supplierId > 0) {
      this.scrollGrnNosync = true;
      this.grnNoList = [];
      this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
      this.commonService.getComboResults(this.assetOptimaServices.listOfGrnHdrSupplierNameCombo, searchTerms.term, this.rtvForm.get('supplierId').value, '', this.limitCount, this.grnNoPageNumber, '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchTerms, this.grnNoPageNumber, this.grnNoList, data.responseData.comboList)
          this.grnNoPageNumber = this.getData.pageNumber;
          this.grnNoList = this.getData.dataList;
          this.scrollGrnNosync = false;
        }
      );
    } else {
      this.rtvForm.controls['grnNo'].setValue('');
      this.commonService.openToastWarningMessage("Kindly select supplier name");
    }

  }

  fetchIdOfRtvGrnNo(event) {
    if (event === undefined) {
      this.grnNoList = [];
      this.rtvForm.controls['grnNo'].setValue('');
      this.grnNoPageNumber = 1;
    } else {
      this.rtvForm.controls['grnNo'].setValue(event.grnNo);
      this.insertFlg = false;
      this.rtvDtlTO = this.rtvForm.get('rtvDtlTO') as FormArray;
      event.grnDtlList.map(obj => {

        if (!this.insertFlg) {
          const Group = this.formBuilder.group({
            grnDtlId: new FormControl(obj.grnDtlId),
            rtvHdrId: new FormControl(0),
            poQty: new FormControl(obj.poQty),
            itemId: new FormControl(obj.itemId),
            itemName: new FormControl(obj.itemName),
            itemDesc: new FormControl(obj.description),
            poId: new FormControl(obj.poId),
            poNo: new FormControl(obj.poNo),
            poLineNo: new FormControl(obj.poLineNo),
            poLineId: new FormControl(obj.poLineId),
            grnQty: new FormControl(obj.acceptQty),
            stockQty: new FormControl(0),
            rtvQty: new FormControl(0, [Validators.pattern(this.assetOptimaConstants.numericValidation)]),
            returnQty: new FormControl(0),
          });
          this.rtvDtlTO.push(Group);
        }
      });

    }
  }

  listOfStore(searchTerms) {
    this.scrollStoreNamesync = true;
    this.storeList = [];
    this.storePageNumber = 1;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllStoreCombo.sams', searchTerms.term, '', '', this.limitCount, this.storePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.storePageNumber, this.storeList, data.responseData.comboList)
        this.storePageNumber = this.getData.pageNumber;
        this.storeList = this.getData.dataList;
        this.scrollStoreNamesync = false;
      }
    );
  }

  getStoreValue(event) {
    if (event === undefined) {
      this.rtvForm.controls['storeName'].setValue('');
      this.storePageNumber = 1;
      this.storeList = [];
    } else {
      this.rtvForm.controls['storeId'].setValue(event.storeId);
      this.rtvForm.controls['storeName'].setValue(event.storeName);
    }
  }


  stockQtyList(locId, storeId, itemId, makerPartCode) {
    this.commonService.commonGetService('fetchOnHandQty.sams', locId, storeId, itemId, makerPartCode).subscribe(
      data => {
        this.stockQty = data.responseData
      }
    )
  }

  submit() {
    const rtvDtlTO = this.rtvForm.get('rtvDtlTO') as FormArray;
    this.stockQtyCheckFlag = false;
    this.rtvQtyNumberFlag = false;
    this.rtvQtyCheckTypeFlag = false;
    rtvDtlTO.controls.forEach((control: FormGroup) => {
      const numericRegex = /^[0-9]+$/;
      if (numericRegex.test(control.get('rtvQty').value)) {
        if (control.get('rtvQty').value == 0) {
          this.rtvQtyNumberFlag = true;
          this.itemErrorMsg = control.get('itemName').value;
        }
        if (control.get('stockQty').value < control.get('rtvQty').value) {
          this.stockQtyCheckFlag = true;
          this.itemErrorMsg = control.get('itemName').value;
        }
      } else {
        this.rtvQtyCheckTypeFlag = true;
        this.itemErrorMsg = control.get('itemName').value;
      }

    });
    if (this.stockQtyCheckFlag) {
      this.commonService.openToastWarningMessage("Item  : " + this.itemErrorMsg + " Return Qty is Greater than Stock Qty");
    } else if (this.rtvQtyNumberFlag) {
      this.commonService.openToastWarningMessage("Item  : " + this.itemErrorMsg + " Return Qty is Zero" + " Kindly update Return Qty");
    } else if (this.rtvQtyCheckTypeFlag) {
      this.commonService.openToastWarningMessage("Item  : " + this.itemErrorMsg + " Return Qty is String" + " Kindly Enter Numeric Value");
    } else {
      this.commonService.commonInsertService('saveOrUpdateRTV.sams', this.rtvForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            localStorage.setItem('previousRoute', '');
            this.location.back();
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );

    }

  }

  fetchGridDataInEdit(event) {
    if (event === undefined) {
      this.doNoList = [];
      this.rtvForm.controls['doNo'].setValue('');
      this.donoPageNumber = 1;
    } else {
      this.rtvForm.controls['doNo'].setValue(event.doNo);
      this.rtvForm.controls['grnNo'].setValue(event.grnNo);
      this.rtvForm.controls['grnId'].setValue(event.grnId);
      this.rtvForm.controls['rtvDate'].setValue(event.rtvDateDisp);
      // this.rtvForm.controls['manufacturePartNo'].setValue(event.manufacturerPartNo);
      this.rtvForm.controls['storeId'].setValue(event.storeId);
      this.insertFlg = false;
      this.rtvDtlTO = this.rtvForm.get('rtvDtlTO') as FormArray;
      event.rtvDtlTO.map(obj => {
        this.stockQtyList(this.userSessionService.getUserLocationId(), obj.storeId, obj.itemId, obj.manufacturePartNo);
        if (!this.insertFlg) {
          const Group = this.formBuilder.group({
            rtvDtlId: new FormControl(obj.rtvDtlId),
            grnDtlId: new FormControl(obj.grnDtlId),
            rtvHdrId: new FormControl(0),
            poQty: new FormControl(obj.poQty),
            itemTypeId: new FormControl(obj.itemTypeId),
            itemTypeName: new FormControl(obj.itemTypeName),
            itemId: new FormControl(obj.itemId),
            itemName: new FormControl(obj.itemName),
            itemDesc: new FormControl(obj.itemDesc),
            poNo: new FormControl(obj.poNo),
            poLineNo: new FormControl(obj.poLineNo),
            poLineId: new FormControl(obj.poLineId),
            grnQty: new FormControl(obj.grnQty),
            stockQty: new FormControl(obj.stockQty),
            rtvQty: new FormControl(obj.rtvQty),
            storeId: new FormControl(obj.storeId),
            createdDt: new FormControl(obj.createdDt),
            createdBy: new FormControl(obj.createdBy),
            storeName: new FormControl(obj.storeName),
            manufacturePartNo: new FormControl(obj.manufacturerPartNo),
            uomCd: new FormControl(''),
            rtvReason: new FormControl('')
          });
          this.rtvDtlTO.push(Group);
        }
      });
      console.log("stock id", this.stockQty);
    }
  }

  delete(index) {
    if (this.rtvDtlTO.length > 1) {
      if (this.headingDisplay == 'Edit') {
        const removedItem = this.rtvDtlTO.at(index).value;
        const rtvDtlId = removedItem.rtvDtlId;
        this.deleteRtvDtl(rtvDtlId, index);
        removedItem.splice(index, 1);
      } else {
        this.rtvDtlTO = this.rtvForm.get('rtvDtlTO') as FormArray;
        this.rtvDtlTO.removeAt(index);
      }
    } else {
      this.commonService.openToastWarningMessage("Minimum one data is Required");
    }

  }


  getWorkflowApprovalForRtv() {
    this.commonService.commonGetService('getWorkflowForId.sams', this.rtvHdrId,
      this.userSessionService.getUserEmpId(),
      allWorkflowStatus[allWorkflowStatus.RTV_APPROVAL], this.userSessionService.getUserOrgId()).subscribe(
        data => {
          if (data.success) {
            this.employeeId = this.userSessionService.getUserEmpId();
            this.approvebuttonEnable = data.responseData.approvalFlag;
            this.approvalId = data.responseData.workflowApprovalId;
          } else {
            this.commonService.openToastWarningMessage(data.message);
          }
        }, error => {
        }
      );
  }

  rtvWorkflowApproval(status) {
    let result;
    let selectedRtvList = [];
    selectedRtvList.push({ ...this.rtvForm.value, approvalId: this.approvalId });
    this.commonService.showSpinner();
    if (status) {
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.RTV_APPROVAL], selectedRtvList, "");
    } else {
      result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.RTV_APPROVAL], selectedRtvList, "");
    }
    this.getWorkflowApprovalForRtv();
    this.ngOnInit();
    this.commonService.hideSpinner();

    result.then(data=>{
      if(data){        
        this.exitForm();
      }
    })

  }

  deleteRtvDtl(deleteid, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'RTV'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.commonService.commonGetService('deleteRTVDtl.sams', deleteid).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }
          );
          // }
        }
      });
  }


}
