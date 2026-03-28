import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { BudgetDetailPopUpComponent } from '../budget-detail-pop-up/budget-detail-pop-up.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DeleteConfirmationComponent } from '../../Common-components/delete-confirmation/delete-confirmation.component';
import { getData } from 'src/app/Model/common/fetchListData';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  @ViewChild('focusLocationName') focusLocationName: ElementRef;
  buttonDisplay: string = "Submit";
  budgetListFormGroup: FormGroup;
  budgetDetailFormGroup: FormGroup;
  scrollSyncBudgetListCombo: boolean = true;
  limitCount: string = '';
  budgetItemNameList: any = [];
  budgetList = new MatTableDataSource<any>();
  fyStartMonthDisp: string = '';
  currencyCodePageNumber: number;
  isOpex: boolean = false;
  scrollLocationNamesync: boolean = false;
  locationNamePageNumber: number;
  locationCombo: any = [];
  public currencycdList: any = [];
  uploadBudget: boolean = false;
  sourcingApproval: boolean = false;
  rmApproval: boolean = false;
  capexDetailList: any = [];
  headingDisplay: string;
  buttonDisableInEdit: boolean = false;
  modeDisplay: boolean = false;
  mode: string = 'create';
  //budgetItemList: any = [];
  displayedColumns = ['sno', 'Budget Item', 'Budget Amount', 'Actual Spent', 'FY Budget Amount', 'FY Actual Spent', 'action'];
  @ViewChild('matAssignee') tableAssignee: MatTable<any>;
  public budgetItemList = [];
  getData: getData;
  scrollcurCdsync: boolean =false;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private router: Router, private location: Location, private service: AssetOptimaServices, private assetOptimaConstants: AssetOptimaConstants, private dialog: MatDialog, private assetOptimaServices: AssetOptimaServices, private commonService: CommonService, private samsService: AssetOptimaServices,
    private userSession: UserSessionService) {
    this.currencyCodePageNumber = 1,
      this.locationNamePageNumber = 1;
      this.getData = new getData();
  }

  ngOnInit() {
    this.sourcingApproval = this.assetOptimaConstants.sourcingApproved;
    this.rmApproval = this.assetOptimaConstants.rmApproved;

    this.budgetListFormGroup = new FormGroup({
      locationName: new FormControl(null, [Validators.required]),
      locationId: new FormControl(0),
      ordId: new FormControl(0),
      budgetName: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      fyStartMonth: new FormControl('', [Validators.required]),
      fyEndMonth: new FormControl('', [Validators.required]),
      curCd: new FormControl(null, [Validators.maxLength(10), Validators.required]),
      budgetStatus: new FormControl('',[Validators.required]),
      budgetItemList: new FormControl('', []),
      bdHdrId: new FormControl(0),
      active: new FormControl(true),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      // pageNumber: new FormControl(''),
      //  recordsPerPage: new FormControl(''),
    });
    
    this.budgetListFormGroup.controls['locationName'].setValue(this.userSession.getUserLocationName());
    this.budgetListFormGroup.controls['locationId'].setValue(this.userSession.getUserLocationId());
    this.budgetListFormGroup.controls['fyStartMonth'].setValue(this.assetOptimaConstants.fyStartYear);
    this.budgetListFormGroup.controls['fyEndMonth'].setValue(this.assetOptimaConstants.fyEndYear);
    this.budgetListFormGroup.controls['curCd'].setValue(this.assetOptimaConstants.locCurrCd);
    this.commonService.setFormFocus(this.focusLocationName);

    this.budgetDetailFormGroup = new FormGroup({
      bdDtlId: new FormControl(0),
      bdHdrId: new FormControl(0),
      budgetAmount: new FormControl(0,),
      active: new FormControl(true),
      actualSpent: new FormControl(0),
      budgetItem: new FormControl('', [Validators.required]),
      previousYearBudget: new FormControl(0),
      previousYearActualAmount: new FormControl(0),
      capexDetailList: new FormControl([]), 
    });
    this.headingDisplay = 'Create';
    this.validateEditMode();
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        var mode = params.mode;
        primaryId = Number(primaryId);
        if (primaryId <= 0) {
          this.buttonDisplay = 'Submit';
          this.headingDisplay = 'Create';
          this.buttonDisableInEdit = false;
          this.budgetListFormGroup.get('active').setValue(true);
        } else {
          if (mode == 'view') {
            this.headingDisplay = "View";
            this.modeDisplay = true;
            this.budgetListFormGroup.disable();
            this.budgetDetailFormGroup.disable();
            this.mode = 'view'
          } else {
            //button and heading names for edit
            this.buttonDisplay = 'Update';
            this.headingDisplay = 'Edit';
            this.buttonDisableInEdit = true;
            this.budgetListFormGroup.controls['active'].setValue(true);
          }
          this.commonService.commonGetService(this.service.fetchBudgetByBudgetId, primaryId).subscribe(
            data => {
              console.log("data::", data);
              
              this.budgetListFormGroup.patchValue(data.responseData);
              this.budgetItemList = data.responseData.budgetItemList;
           //   this.budgetListFormGroup.controls['active'].setValue(true);
             // this.budgetListFormGroup.controls.budgetItemList['active'].setValue(true);
              //this.budgetListFormGroup.controls.budgetItemList['activeDisp'].setValue(true);
              console.log(this.budgetItemList);
              console.log("this.budgetListFormGroup:",this.budgetListFormGroup.value);
              // this.tabelValidation();

            }
          )
        }
      }
    );
 
  }


  listofLocationName(searchValue) {
    this.scrollLocationNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationNamePageNumber , this.locationCombo , data.responseData.comboList)
        this.locationNamePageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollLocationNamesync = false;
      }
    );
    this.scrollLocationNamesync = false;
  }

  setLocationNameComboValue(event) {
    if (event === undefined) {
      this.budgetListFormGroup.controls['locationId'].setValue(0);
      this.locationNamePageNumber = 1;
    } else {
      this.budgetListFormGroup.controls['locationId'].setValue(event.locationId);
    }
  }

  listofMonth = [
    { id: 1, name: 'JANUARY' },
    { id: 2, name: 'FEBRUARY' },
    { id: 3, name: 'MARCH' },
    { id: 4, name: 'APRIL' },
    { id: 5, name: 'MAY' },
    { id: 6, name: 'JUNE' },
    { id: 7, name: 'JULY' },
    { id: 8, name: 'AUGUST' },
    { id: 9, name: 'SEPTEMBER' },
    { id: 10, name: 'OCTOBER' },
    { id: 11, name: 'NOVEMBER' },
    { id: 12, name: 'DECEMBER' }
  ]

  listOfYears = [
    { id: 1, name: '2020' },
    { id: 2, name: '2021' },
    { id: 3, name: '2022' },
   


  ]

  selectedBudgetItem(event) {

    if (event != undefined) {
      this.budgetDetailFormGroup.controls.budgetItem.setValue(event.budgetItem);
      this.scrollSyncBudgetListCombo = false;
      if (this.budgetDetailFormGroup.controls.budgetItem.value === 'New Assets') {
        this.isOpex = true;
      } else {
        this.isOpex = false;
      }
    } else {
      this.budgetDetailFormGroup.controls.budgetItem.setValue('');
    }
  }

  addBudgetItem() {
    if (this.budgetDetailFormGroup.controls.budgetItem.value == "New Assets") {
      this.isOpex = true;
    } else {
      this.isOpex = false;
    }

    this.budgetItemList.push(this.budgetDetailFormGroup.value);
    this.budgetItemList.concat('isOpex', this.isOpex)

    this.budgetDetailFormGroup.controls.budgetItem.setValue(this.budgetDetailFormGroup.controls.budgetItem.value);
    //this.budgetDetailFormGroup.controls.budgetAmount.setValue(0);
    this.budgetDetailFormGroup.controls.actualSpent.setValue('');
    this.budgetDetailFormGroup.controls.previousYearBudget.setValue('');
    this.budgetDetailFormGroup.controls.previousYearActualAmount.setValue('');

    this.budgetDetailFormGroup = new FormGroup({
      bdDtlId: new FormControl(0),
      budgetItem: new FormControl(''),
      budgetAmount: new FormControl(0),
      actualSpent: new FormControl(0),
      previousYearBudget: new FormControl(0),
      previousYearActualAmount: new FormControl(0),
      capexDetailList: new FormControl([]),
      active: new FormControl(true),
    });

    this.changeDetectorRefs.detectChanges();
    this.tableAssignee.renderRows();

    this.scrollSyncBudgetListCombo = true;

    //this.budgetItemList.concat([this.budgetItemList]);
    console.log(this.budgetItemList);
    // console.log(this.budgetItemList);

  }

  budgetItems = [
    { budgetItemId: 1, budgetItem: 'Spares' },
    { budgetItemId: 2, budgetItem: 'Consumables' },
    { budgetItemId: 3, budgetItem: 'Contracts' },
    { budgetItemId: 4, budgetItem: 'New Assets' }
  ] 

  dialogRef

  budgetItemDetail(itemValue, indexValue,mode) {
    console.log(this.budgetItemList);
    
if (itemValue === "New Assets"){
    this.dialogRef = this.dialog.open(BudgetDetailPopUpComponent, {
      width: '1000px',
      height: '550px',
      maxWidth: "90vw",
      data: {
        'budgetItem': itemValue,
        'indexValue': indexValue,
        'capexDetailList': this.budgetItemList[indexValue].capexDetailList, 
        'mode': mode,
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          console.log("data:", data);
          //this.budgetDetailFormGroup.controls.capexDetailList.setValue(data);
          // this.capexDetailList = this.capexDetailList.concat([data]);
          var index = data.length - 1;
          this.budgetItemList[indexValue].budgetAmount = data[index].totalAmount;
          this.budgetItemList[indexValue].capexDetailList = data;
          this.changeDetectorRefs.detectChanges();
          this.tableAssignee.renderRows();

        }

      });
    }
  }

  listOfCurrencyCd(searchValue) {
    this.scrollcurCdsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfCurCdCombo, searchValue.term, '', '', this.limitCount, this.currencyCodePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.currencyCodePageNumber , this.currencycdList , data.responseData.comboList)
        this.currencyCodePageNumber = this.getData.pageNumber;
        this.currencycdList = this.getData.dataList;
        this.scrollcurCdsync = false;
      }
    );
  }

   BudgetLink(){ 
    this.router.navigate(['/home/budget']);
   }

  save() {

    console.log("this.budgetItemList:", this.budgetItemList);
    console.log("this.capexDetailList:", this.capexDetailList);
    // this.uploadBudget = true;
    //this.budgetDetailFormGroup.controls.capexDetailList.setValue(this.capexDetailList);
    //  this.budgetItemList.push(this.budgetDetailFormGroup.value);
    this.budgetListFormGroup.controls.budgetItemList.setValue(this.budgetItemList); //this.capexDetailList IS Empty PRESENT IN  this.budgetItemList
    console.log("this.this.budgetListFormGroup :", this.budgetListFormGroup.value);
    this.commonService.commonInsertService(this.service.saveOrUpdateBudget, this.budgetListFormGroup.getRawValue()).subscribe(
      data => {
        console.log("Output data:", data);
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          // this.location.back();
          this.uploadBudget = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadBudget = false;
        }
      }
    );
  }

  clear() {

    this.budgetListFormGroup.reset();
    this.budgetDetailFormGroup.reset();
    this.budgetItemList = [];
    this.capexDetailList = [];
    this.ngOnInit();

  }

  exit() {
    localStorage.setItem('previousRoute', this.router.url);
    this.location.back();
  }

  deleteRegistration(budgetItem, index) {
   // var serialNumber = index + 1;
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': budgetItem ,
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.budgetItemList.splice(index, 1);
          this.changeDetectorRefs.detectChanges();
          this.tableAssignee.renderRows();
        }
      });
  }


}
