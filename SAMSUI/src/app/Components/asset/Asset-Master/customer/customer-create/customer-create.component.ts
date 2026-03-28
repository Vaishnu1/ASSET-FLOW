import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Location } from '@angular/common';
import { CustomerSiteCreateComponent } from '../customer-site-create/customer-site-create.component';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customerSiteDisplayColumns = ['sno', 'customerSiteName', 'customerLocArea', 'customerLocCity', 'customerLocState', 'customerLocCurCd', 'contactPerson', 'customerSiteContactEmailId', 'customerSitePersonPhoneNo', 'action'];


  headingDisplay: string;

  modeDisplay: boolean = false;

  uploadFlagCustomer: boolean = false;

  customerCreateForm: FormGroup;

  table: boolean = true;

  customerSiteList: any[] = [];

  tempValue: String = '';

  ErrorMsg: string = '';

  buttonDisableInEdit: boolean = false;

  buttonHeadingDisplay: string = '';

  //display inactive date
  inActiveDtDisplay: boolean = false;

  @ViewChild('customerfocus') customerfocusSet: ElementRef;


  CommonhintMsg = new CommonHint();
  formOneValid: boolean =false;


  constructor(private location: Location,
    private commonService: CommonService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private service: AssetOptimaServices,
    private detectorRefs: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit() {
    this.customerCreateForm = new FormGroup({
      customerId: new FormControl(''),
      orgId: new FormControl(''),
      customerName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      active: new FormControl(),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDt: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      customerCode: new FormControl('', [Validators.maxLength(50)]),
      customerSinceDtDisp: new FormControl(''),
      customerSinceDt: new FormControl(''),
      customerSiteList: new FormControl('', []),
      inActiveFromDtDisp: new FormControl(''),
      inActiveFromDt: new FormControl(''),
    });
    this.headingDisplay = 'Create';
    this.validateEditMode();
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.customerfocusSet);
  }

  exit() {
    localStorage.setItem('previousRoute', this.router.url);
    this.location.back();
  }

  save() {
    this.uploadFlagCustomer = true;
    this.customerCreateForm.controls.customerSiteList.setValue(this.customerSiteList);
    this.customerCreateForm.controls.customerSinceDtDisp.setValue(
    this.commonService.convertToDateStringyyyy_mm_dd(this.customerCreateForm.controls.customerSinceDtDisp.value))
    this.commonService.commonInsertService(this.service.saveOrUpdateCustomer, this.customerCreateForm.getRawValue()).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.location.back();
          this.uploadFlagCustomer = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadFlagCustomer = false;
        }
      }
    );
    localStorage.setItem('previousRoute', this.router.url);
  }

  clear() {
    this.customerCreateForm.reset();
    this.customerCreateForm.updateValueAndValidity();
    this.customerSiteList = [];
    this.formOneValid =false;
    this.formValidation()
  }

  tabelValidation() {
    this.table = (this.customerSiteList.length > 0) ? false : true;
  }

  addCustomerSite(customerSite, index, mode) {
    let dialogRef = this.dialog.open(CustomerSiteCreateComponent, {
      height: '85%',
      width: '80%',
      data: {
        'customerSite': customerSite,
        'customerName': this.customerCreateForm.controls.customerName.value,
        'mode': mode
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          if (index === null) {
            this.customerSiteList = this.customerSiteList.concat([data]);
            this.formValidation()
          } else if (index !== null && index !== undefined && index !== '') {
            this.customerSiteList.splice(index, 1);
            this.customerSiteList = this.customerSiteList.concat([data]);
            this.formValidation()
          }
        }
        this.tabelValidation();

      });
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        var mode = params.mode;
        primaryId = Number(primaryId);
        if (primaryId <= 0) {
          this.buttonHeadingDisplay = 'Submit';
          this.headingDisplay = 'Create';
          this.buttonDisableInEdit = false;
          this.customerCreateForm.get('active').setValue(true);
        } else {
          if (mode == 'view') {
            this.headingDisplay = "View";
            this.modeDisplay = true;
            this.customerCreateForm.disable();
          } else {
            //button and heading names for edit
            this.buttonHeadingDisplay = 'Update';
            this.headingDisplay = 'Edit';
            this.buttonDisableInEdit = true;
          }
          this.commonService.commonGetService(this.service.fetchCustomerInfoByCustomerId, primaryId).subscribe(
            data => {
              this.customerCreateForm.patchValue(data.responseData);
              this.customerSiteList = data.responseData.customerSiteList;
              this.tabelValidation();
              this.formValidation();
              if (!this.customerCreateForm.controls.active.value) {
                this.inActiveDtDisplay = true;
              }
            }
          )
        }
      }
    );
    this.customerCreateForm.get('customerCode').disable();
  }

  refreshCustomerSiteList() {
    let tempArray = this.customerSiteList;
    this.customerSiteList = [];
    for (var i = 0; i < tempArray.length; i++) {
      this.customerSiteList.push(tempArray[i]);
      this.detectorRefs.detach();
    }
    this.detectorRefs.detectChanges();
  }

  backHomePage() {
    this.location.back();
  }

  setInactiveDt(event) {
    if (event.checked === true) {

    } else if (event.checked === false) {
      this.customerCreateForm.controls.inActiveFromDtDisp.setValue(this.commonService.getCurrentDateYYYYMMDD());
      this.customerCreateForm.controls.inActiveFromDtDisp.setValue(
        this.commonService.convertToDateStringyyyy_mm_dd(this.customerCreateForm.controls.inactiveFromDtDisp.value))
    }

  }

  dateValidation(event) {
    return false;
  }

  formValidation() {
    if (this.customerSiteList.length > 0) {
      this.formOneValid = true;
    } else {
      this.formOneValid = false;
    }
    return this.formOneValid;
  }

}
