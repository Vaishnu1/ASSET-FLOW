import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {  MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeModel } from 'src/app/Model/master/employee';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Title } from '@angular/platform-browser';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  employeeList: any = [];
  count = 1;
  // Set Page Title
  title = 'Asset Optima - Employee';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchvalue: any = '';
  empStatusForm: FormGroup;
  empUrl: string = '';
  empListLoader: boolean = false;
  public employeeModel: EmployeeModel;
  //@ViewChild('empSearch') searchFocusSet: ElementRef;
  scrollsyncFirstName: boolean = false;
  recordsPerPageForCombo: string;
  employeePageNumber: number;
  employee: any = [];
  employeeFirstName: any = [];
  employeeCode: any = [];
  scrollsyncCode: boolean = false;
  scrollsyncLastName: boolean = false;
  scrollsyncDepartmentName: boolean = false;
  scrollsyncLocationName: boolean = false;
  scrollsyncDesignationName: boolean = false;
  scrollsyncEmployeeStatus: boolean = false;
  employeeLastName: any = [];
  departmentName: any = [];
  designationName: any = [];
  accessLocName: any = [];
  name: any = [];
  employeeStatus = [
    { id: 1, name: 'WORKING' },
    { id: 2, name: 'RETIRED' },
    { id: 3, name: 'LONG-LEAVE' },
    { id: 4, name: 'MEDICAL LEAVE' },
    { id: 5, name: 'RELIEVING' }
  ];
  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: number;  //set page number starts with zeroo
  pageSize: String;   // records per page

  empStatusList = [
    { id: 1, name: 'ACTIVE' },
    { id: 2, name: 'INACTIVE' }
  ];
  moduleAccessModel: ModuleAccessModel;
  getData: getData;
  designationNamePageNumber: any;
  departmentNamePageNumber: any;
  employeeCodePageNumber: any;

  selectedItem: any = 0;
  isEmpActive: boolean = false;

  locationCombo: any = [];
  locationPageNumber: number;
  scrollsyncLocation: boolean = false;

  constructor(private dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private samsConstants: AssetOptimaConstants,
    private titleService: Title,
    private userSessionService: UserSessionService) {
    this.employeeModel = new EmployeeModel();
    this.pageSize = '100';
    this.pageIndex = 0;
    this.length = '0';
    this.moduleAccessModel = new ModuleAccessModel();
    this.designationNamePageNumber = 1;
    this.employeePageNumber = 1;
    this.departmentNamePageNumber = 1;
    this.employeeCodePageNumber = 1;
    this.locationPageNumber = 1;
  }

  ngOnInit() {
    //document.getElementById('commonFooter').style.display='block';
    this.titleService.setTitle(this.title);
    this.employeeModel.direction = 'desc';
    this.employeeModel.columnName = 'updatedDt'
    this.employeeModel.active = true;
    this.employeeModel.activeDisplay = "ACTIVE";
    this.empStatusForm = new FormGroup({
      active: new FormControl('ACTIVE'),
    });
    this.moduleAccessModel = this.userSessionService.getUserGroupAccess()['GROUPACCESS_EMPLOYEE'];
    this.employeeModel.orgId = this.userSessionService.getUserOrgId();
    this.fetchListofAssociate();



  }
  ngAfterViewInit() {
    //this.searchFocusSet.nativeElement.focus();
  }
  
  onSearchChange() {
    this.pageSize = '100';
    this.pageIndex = 0;
    this.fetchListofAssociate();
    this.selectedItem = 0;
  }

  createEmployee(pId) {
    this.router.navigate(['home/employee/employeeCreate/' + pId]);
  }

  //Inactive employee
  empinActive(empId, type) { 
    this.commonService.commonGetService('updateEmployeeActiveStatus.sams', empId).subscribe(
      data => {
        if (data.success) {
          if(type === 1) {
            this.selectedItem = 0;
            this.isEmpActive = false;
            this.commonService.openToastWarningMessage(data.message);
          } else {
            this.selectedItem = 0;
            this.isEmpActive = false;
            this.commonService.openToastSuccessMessage(data.message);
          }
          // this.commonService.openToastSuccessMessage(data.message);
          this.fetchListofAssociate();
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.fetchListofAssociate();
        }
      }
    );
  }


  fetchListofAssociate() {
    this.empListLoader = true;
    this.employeeModel.pageNumber = this.pageIndex;
    this.employeeModel.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllEmployee, this.employeeModel).subscribe(
      data => {
        if (data.success) {
          this.length = data.responseData.dataTotalRecCount;
          this.employeeList = data.responseData.dataList;
          this.empUrl = this.samsConstants.connectionUrl + "getImage.sams?resourceName=";
        }
        this.empListLoader = false;
      }, error => {
        this.empListLoader = false;
      });

  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofAssociate();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.employeeModel.pageNumber = 0;
    this.employeeModel.columnName = event.active;
    this.employeeModel.direction = event.direction;
    this.fetchListofAssociate();
  }
  changeempStatus(empstat) {
    if (empstat.id == '2') {
      this.employeeModel.active = false;
      this.employeeModel.activeDisplay = "INACTIVE";
      this.pageSize = '100';
      this.pageIndex = 0;
      this.employeeModel.pageNumber = this.pageIndex;
      this.employeeModel.recordsPerPage = Number(this.pageSize);

    } else {
      this.pageSize = '100';
      this.pageIndex = 0;
      this.employeeModel.active = true;
      this.employeeModel.activeDisplay = "ACTIVE";
      this.employeeModel.pageNumber = this.pageIndex;
      this.employeeModel.recordsPerPage = Number(this.pageSize);

    }
  }

  getEmployeeActiveComboValue(event) {
    if (event != null) {
      this.employeeModel.active = event.active;
      this.employeeModel.employeeId = event.employeeId;

    } else {
      this.employeeModel.active = false;
      this.employeeModel.employeeId = 0;
      this.employee = [];
      this.employeePageNumber = 1;
    }
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached()) {
      this.employeeList = [...this.employeeList, this.count++];
    }
  }
  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  generateReportOfEmployee() {
            this.commonService.commonListService('generateEmployeeRequestReport.sams', this.employeeModel).subscribe(
        (data) => {
          this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
        }, error => {
          // alert('error');
        }
      );
    }
    
  listOfEmployeeName(searchKey) {
    this.scrollsyncFirstName = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllEmployeeForOrgCombo, searchKey.term, this.employeeModel.employeeId, '',
      this.recordsPerPageForCombo, this.employeePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.employeePageNumber , this.employeeFirstName , data.responseData.comboList)
          this.employeePageNumber = this.getData.pageNumber;
          this.employeeFirstName = this.getData.dataList;
          this.scrollsyncFirstName = false;
        });
  }

  getEmployeeNameComboValue(event) {
    if (event != null) {
      this.employeeModel.employeeFirstName = event.employeeFirstName;
      this.employeeModel.employeeLastName = event.employeeLastName;
      this.employeeModel.employeeId = event.employeeId;

    } else {
      this.employeeModel.employeeFirstName = "";
      this.employeeModel.employeeId = 0;
      this.employee = [];
      this.employeePageNumber = 1;
    }
  }


  listOfEmployeeCode(searchKey) {
    this.scrollsyncCode = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllEmployeeCombocode, searchKey.term, '', '',
      this.recordsPerPageForCombo, this.employeeCodePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.employeeCodePageNumber , this.employeeCode , data.responseData.comboList)
          this.employeeCodePageNumber = this.getData.pageNumber;
          this.employeeCode = this.getData.dataList;
          this.scrollsyncCode = false;
        });
  }

  getEmployeeCodeComboValue(event) {
    if (event != null) {
      this.employeeModel.employeeCode = event.employeeCode;
      this.employeeModel.employeeId = event.employeeId;

    } else {
      this.employeeModel.employeeCode = "";
      this.employeeModel.employeeId = 0;
      this.employee = [];
      this.employeeCodePageNumber = 1;
    }
  }

  listOfDepartmentName(searchKey) {
    this.scrollsyncDepartmentName = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllDeparment, searchKey.term, this.employeeModel.employeeId, '',
      this.recordsPerPageForCombo, this.departmentNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.departmentNamePageNumber , this.departmentName , data.responseData.comboList)
          this.departmentNamePageNumber = this.getData.pageNumber;
          this.departmentName = this.getData.dataList;
          this.scrollsyncDepartmentName = false;
        });
  }

  getDepartmentNameComboValue(event) {
    if (event != null) {
      this.employeeModel.departmentName = event.departmentName;
      this.employeeModel.employeeId = event.employeeId;

    } else {
      this.employeeModel.departmentName = "";
      this.employeeModel.employeeId = 0;
      this.employee = [];
      this.departmentNamePageNumber = 1;
    }
  }

  listOfDesignationName(searchKey) {
    this.scrollsyncDesignationName = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllDesignationCombo, searchKey.term, this.employeeModel.employeeId, '',
      this.recordsPerPageForCombo, this.designationNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.designationNamePageNumber , this.designationName , data.responseData.comboList)
          this.designationNamePageNumber = this.getData.pageNumber;
          this.designationName = this.getData.dataList;
          this.scrollsyncDesignationName = false;
        });
  }

  getDesignationNameComboValue(event) {
    if (event != null) {
      this.employeeModel.designationName = event.designationName;
      this.employeeModel.employeeId = event.employeeId;

    } else {
      this.employeeModel.designationName = "";
      this.employeeModel.employeeId = 0;
      this.employee = [];
      this.designationNamePageNumber = 1;
    }
  }



  getEmployeeStatusComboValue(event) {
    if (event != null) {
      this.employeeModel.employeeStatus = event.name;

    } else {
      this.employeeModel.employeeStatus = "";
      this.employeeModel.employeeId = 0;
      this.employee = [];
      this.employeePageNumber = 1;
    }
  }

  clearSearch() {
    this.employeeModel = new EmployeeModel;
    this.ngOnInit()
    this.selectedItem = 0;
  }

  viewEmployee(empId) {
    this.router.navigate(['home/employee/employeeView/' + empId]);
  }

  selectEmployee(element){
    if(this.selectedItem == element.employeeId){
      this.selectedItem = 0;
      this.isEmpActive = false;
    }
    else{
      this.selectedItem = element.employeeId;
      this.isEmpActive = element.active;
    }
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsyncLocation = false;
        }
      );
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.employeeModel.accessLocId = 0;
      this.employeeModel.accessLocName = '';
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.employeeModel.accessLocId = event.locationId;
      this.employeeModel.accessLocName = event.locDisplayField;
    }
  }

}
