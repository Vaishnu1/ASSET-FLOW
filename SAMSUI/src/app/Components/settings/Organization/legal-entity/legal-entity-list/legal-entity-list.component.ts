import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { BASE_FORM_GROUP_CONST } from 'src/app/Model/base/baseFormGroup';
import { LegalEntity } from 'src/app/Model/base/legal-entity';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';


@Component({
  selector: 'app-legal-entity-list',
  templateUrl: './legal-entity-list.component.html',
  styleUrls: ['./legal-entity-list.component.css']
})
export class LegalEntityListComponent implements OnInit {
  defaultColumns = ['select', 'sno', 'legalEntityCode', 'legalEntityName', 'updatedBy', 'updatedDt'];
  displayedColumns = [...this.defaultColumns];

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  entityDataSource = [];
  searchvalue: any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;
  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  @ViewChild('legalEntitySearchFocus') searchFocusSet: ElementRef;

  //LOADER
  subloader: boolean = false;

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  legalEntityFormGroup: FormGroup;
  public legalEntity: LegalEntity;
  selectedItem: number=0;
  constructor(private dialog: MatDialog, public router: Router, public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private userSession: UserSessionService) {
    this.legalEntity = new LegalEntity();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.showManageColumns = false;
  }

  ngOnInit() {
    localStorage.setItem('helpManual','settings/master?id=legal-entity');
   // document.getElementById('commonFooter').style.display = 'none';
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_LEGAL_ENTITY'];
    this.legalEntityFormGroup = new FormGroup({
      legalEntityName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityId: new FormControl(''),
      entityGroupId: new FormControl(''),
      entityGroupName: new FormControl(''),
      legalEntityDesc: new FormControl('', [Validators.maxLength(300)]),
      legalEntityAddress1: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityAddress2: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityCity: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityState: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      legalEntityCountry: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityPostalCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      legalEntityEmailId: new FormControl('', [Validators.pattern(this.assetOptimaConstants.emailValidation), Validators.maxLength(50)]),
      legalEntityPhoneNumber: new FormControl('', [Validators.pattern(this.assetOptimaConstants.phoneNumberValidation), Validators.maxLength(15), Validators.minLength(10)]),
      legalEntityCurrencyCode: new FormControl('', [Validators.maxLength(20)]),
      legalRegistrationList: new FormControl([])
    });
    this.legalEntity.direction = 'asc';
    this.legalEntity.columnName = 'legalEntityName';

    this.userPreference = new UserPrefernce();
    this.userPreference.moduleKey = 'GROUPACCESS_LEGAL_ENTITY';
    this.getUserPreferenceInfo();
    //dynamicly add all base from controls to the form Group
    let formControlCount: number = 0;
    Object.keys(BASE_FORM_GROUP_CONST.controls).forEach(key => {
      this.legalEntityFormGroup.addControl(key, BASE_FORM_GROUP_CONST.get(key));
      formControlCount++;
      if (formControlCount == (Object.keys(BASE_FORM_GROUP_CONST.controls).length)) {
        //call the list method after adding all form controls 
        this.fetchList();
      }
    });

  }

  ngAfterViewInit() {
    this.searchFocusSet.nativeElement.focus();
  }
  onSearchChange(searchValue: string) {
    this.legalEntity.legalEntityName = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }
  viewLegalEntity(pId) {
    this.router.navigate(['/legalEntityView/' + pId]);
  }

  create(pId,mode) {
    this.router.navigate(['home/settingsmaster/legalEntityCreate/' + pId + '/' + mode]);
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
    this.legalEntity.pageNumber = 0;
    this.legalEntity.columnName = event.active;
    this.legalEntity.direction = event.direction;
    this.fetchList();
  }
  fetchList() {
    this.legalEntity.pageNumber = Number(this.pageIndex);
    this.legalEntity.recordsPerPage = Number(this.pageSize);
    this.entityDataSource = [];
    this.subloader = true;
    this.commonService.commonListService('fetchListOfAllLegalEntity.sams', this.legalEntity).subscribe(
      data => {
        if (data.success) {
          this.subloader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.entityDataSource = data.responseData.dataList;
        } else {
          this.subloader = false;
        }
      }
    );
  }

  selectLegalEntity(element){
    if(this.selectedItem == element.legalEntityId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element.legalEntityId;
    }
  }

  toggleColumn(column: string): void {
    const index = this.displayedColumns.indexOf(column);
    if (index >= 0) {
      this.displayedColumns.splice(index, 1); // Column is selected, remove it
    } else {
      this.displayedColumns.push(column); // Column is not selected, add it
    }
  }

  editManageColumns() {
    this.showManageColumns = !this.showManageColumns;
  }

  applyPreferredColumns() {
    //SAVE TO USER PREFERENCE TABLE
    this.showManageColumns = !this.showManageColumns
    this.userPreference.customColumns = JSON.stringify(this.displayedColumns);
    this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateUserPreference, this.userPreference).subscribe(
      data => {
        if(data.success) {
          // this.commonService.openToastSuccessMessage(data.message);
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }
    )
    
  }

  resetPreferredColumns() {
    this.displayedColumns = [...this.defaultColumns];
    this.userPreference.customColumns = JSON.stringify(this.displayedColumns);
  }

  getUserPreferenceInfo() {
    this.commonService.commonInsertService(this.assetOptimeMthnd.fetchUserPreferenceInfo, this.userPreference).subscribe(
      data => {
        if(data.responseData !== undefined) {
          this.userPreference = data.responseData;
          this.displayedColumns = this.userPreference.customColumnsList;
        }  
      }
    )
  }

  userManual(){
    const sidenav = document.getElementById("mySidenav");
    sidenav.style.marginTop  = "50px";
    sidenav.style.width = "30%";
    sidenav.style.height  = "95%";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

}


