import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetModel } from 'src/app/Model/budget/budgetModel';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent implements OnInit {

  displayedColumns = ['select', 'budgetName', 'createdBy', 'createdDt', 'updatedBy', 'updatedDt'];
  subLoaderBudget: boolean = false;
  budgetDataSource: BudgetModel[];
  budget: BudgetModel;
  pageIndex: string = '0';
  pageSize: string = '100';
  length: number = 0;
  scrollsyncBudgetName: boolean = false;
  recordsPerPageForCombo: string; 
  budgetNamePageNumber: number;
  budgetNameList: any = [];
  budgetAccessModule: ModuleAccessModel;
  getData: getData;

  selectedItem: any = 0;
  
  constructor(private router: Router,private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private userSession: UserSessionService,) { 
      this.budget = new BudgetModel();
      this.budgetNamePageNumber = 1;
      this.getData = new getData();
    }

  ngOnInit() {

    this.budgetAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_BUDGET'];
    this.budget.direction = 'desc';
    this.budget.columnName = 'updatedDt';
    this.budget.activeDisplay = 'ACTIVE';
    this.budget.activeDisp = true;
    this.fetchListOfBudget()

  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListOfBudget();
  }

  createBudget(budgetId, mode) {
    localStorage.setItem('previousRoute', this.router.url);
    this.router.navigate(['home/budget/budgetCreate/' + budgetId + '/' + mode]);
  }

  clearSearch() {
    this.budget = new BudgetModel();
    this.ngOnInit();
    this.selectedItem = 0;
  }

  onSearchChange(event) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListOfBudget();
    this.selectedItem = 0;
  }

  fetchListOfBudget() {

    this.subLoaderBudget = true;
    this.budgetDataSource = null;
    this.budget.pageNumber = Number(this.pageIndex);
    this.budget.recordsPerPage = Number(this.pageSize);
    console.log("this.budget:",this.budget);
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllBudget, this.budget).subscribe(
      data => {
        console.log(data);
        if (data.success) {
          this.length = data.responseData.dataTotalRecCount;
          this.budgetDataSource = data.responseData.dataList;
          this.subLoaderBudget = false;
        } else {
          this.subLoaderBudget = false;
        }
      }
    );
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  listOfBudgetName(searchKey) {
    this.scrollsyncBudgetName = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllBudgetCombo, searchKey.term, '', '',
      this.recordsPerPageForCombo, this.budgetNamePageNumber, this.budget.activeDisplay, '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.budgetNamePageNumber , this.budgetNameList , data.responseData.comboList)
          this.budgetNamePageNumber = this.getData.pageNumber;
          this.budgetNameList = this.getData.dataList;
          this.scrollsyncBudgetName = false;
        });
  }

  setBudgetNameCombo(event) {
    console.log(event);
    if (event != null) {
      this.budget.budgetName = event.budgetName;
      this.budget.bdHdrId = event.bdHdrId;
    } else {
      this.budget.budgetName = "";
      this.budget.bdHdrId = 0;
      this.budgetNamePageNumber = 1;
    }
  }

  selectBudget(element){
    if(this.selectedItem == element.bdHdrId){
      this.selectedItem = 0;
    }else{
      this.selectedItem = element.bdHdrId;
    }
  }


  changeTabValidation(event) {
    // if (event.index == 0) {
    //   this.formOneValidation();
    // }
    // if (event.index == 1) {
    //   this.formOneValidation();
    //   this.streetFocusRef.nativeElement.focus();

    // }
    // if (event.index == 2) {
    //   this.formOneValidation();
    //   this.formThreeValidation();
    //   this.contactPersonFocus.nativeElement.focus();
    // }
    // if (event.index == 3) {
    //   this.formOneValidation();
    //   this.formThreeValidation();
    // }
    // this.cdr.detectChanges();
  }

  // Check validation based on form
  // form one validation (* in-order to check individual form dirty)
  // formOneValidation() {
  //   this.formOneDirty = true;
  //   if ( // Form One Validation
  //     (this.customerSiteForm.get('customerSiteName').value != '') &&
  //     (this.customerSiteForm.get('custSiteCompanyEmailId').valid) &&
  //     (this.customerSiteForm.get('custSiteCompanyPhoneNo').valid) &&
  //     this.customerSiteForm.get('custSiteAddress1').valid &&
  //     this.customerSiteForm.get('customerState').valid &&
  //     this.customerSiteForm.get('customerArea').valid &&
  //     this.customerSiteForm.get('customerCity').valid &&
  //     this.customerSiteForm.get('customerCountry').valid &&
  //     this.customerSiteForm.get('custSitePinCode').valid
  //   ) {
  //     this.formOneValid = true;
  //   } else {
  //     this.formOneValid = false;
  //   }
  // }

}
