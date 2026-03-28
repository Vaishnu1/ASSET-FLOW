import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { SubMenus } from 'src/app/Constants/SubMenusList';
import { EmailReminderScheduleHdrModel } from 'src/app/Model/base/emailReminderScheduleHdr';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { EmailReminderScheduleCreateComponent } from '../email-reminder-schedule-create/email-reminder-schedule-create.component';

@Component({
  selector: 'app-email-reminder-schedule-list',
  templateUrl: './email-reminder-schedule-list.component.html',
  styleUrls: ['./email-reminder-schedule-list.component.css']
})
export class EmailReminderScheduleListComponent implements OnInit {



  // Set Page Title
  title = 'Asset Optima - Email Notification';
  
  Active_Tab = 'reminder';

  displayedColumns = ['select', 'locationTO.locationName', 'processName', 'active', 'updatedBy', 'updatedDt', 'createdBy', 'createdDt'];                                  
  emailReminderdataSource = new MatTableDataSource<EmailReminderScheduleListComponent>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  subLoaderEmailReminder: boolean = false;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  //combo
  scrollsyncLocation: boolean = false;
  locationPageNumber: number;
  locationCombo: any = [];

  scrollsyncProcess: boolean = false;
  processPageNumber: number;
  processCombo: any = [];

  emailReminderActiveList = [
    { id: 1, name: 'ACTIVE' },
    { id: 2, name: 'INACTIVE' }
  ];

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;
  public emailReminderScheduleHdrModel : EmailReminderScheduleHdrModel;

  recordsPerPageForCombo: string; 
  getData: getData;
  selectedItem: any = 0;

  constructor(private dialog: MatDialog, private router: Router,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private titleService: Title,
              public submodules:SubMenus,
              private translateService: TranslateService,
              private userSession: UserSessionService) { 
    this.emailReminderScheduleHdrModel = new EmailReminderScheduleHdrModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.locationPageNumber = 1;
    this.processPageNumber = 1;
    this.modelAccessModule=new ModuleAccessModel();
  }

  ngOnInit(): void {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_REMINDERS'];
    this.titleService.setTitle(this.title);
    this.emailReminderScheduleHdrModel.direction = 'desc';
    this.emailReminderScheduleHdrModel.columnName = 'updatedDt';
    this.emailReminderScheduleHdrModel.activeDisplay = 'ACTIVE';
    this.emailReminderScheduleHdrModel.active = true;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }

  fetchList(){
    
    this.subLoaderEmailReminder = true;
    this.emailReminderdataSource = null;
    this.emailReminderScheduleHdrModel.pageNumber = Number(this.pageIndex);
    this.emailReminderScheduleHdrModel.recordsPerPage = Number(this.pageSize);
    
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllEmailReminderHdr,this.emailReminderScheduleHdrModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.emailReminderdataSource = data.responseData.dataList;
           this.subLoaderEmailReminder = false;       
           }else{
             this.subLoaderEmailReminder = false;
           }
      });
   }

  searchEmailReminder() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
    this.selectedItem = 0;
  }

  clear() {
    this.emailReminderScheduleHdrModel = new EmailReminderScheduleHdrModel();
    this.ngOnInit()
    this.selectedItem = 0;
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
    this.emailReminderScheduleHdrModel.pageNumber = 0;
    this.emailReminderScheduleHdrModel.columnName = event.active;
    this.emailReminderScheduleHdrModel.direction = event.direction;

    this.fetchList();
  }

  emailReminderAddEdit(element,mode) {
    let emailReminderScheduleHdrId = 0;
    if(element != null && element == 0){
      emailReminderScheduleHdrId = element;
    }else{
      emailReminderScheduleHdrId = element.emailReminderScheduleHdrId;
    }
    let dialogRef = this.dialog.open(EmailReminderScheduleCreateComponent, {
      data: { 
        'emailReminderScheduleHdrId': emailReminderScheduleHdrId,
        'mode': mode,
        'source':"master",
        'transId':0
      },
       width: '700px', height: '625px'     
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  Active_Tab_Change(name) {
    this.Active_Tab = name;    
  }

  selectEmailReminder(element) {
    if(this.selectedItem === element) {
      this.selectedItem = 0;
    } else {
      this.selectedItem = element;
    }
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '',
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
      this.emailReminderScheduleHdrModel.locationName = null;
      this.emailReminderScheduleHdrModel.locationId = 0;
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.emailReminderScheduleHdrModel.locationName = event.locDisplayField;
      this.emailReminderScheduleHdrModel.locationId = event.locationId;
    }
  }

  selectedemailReminderActiveList(event){
    if(event != undefined){
      if(event.id==1){
        this.emailReminderScheduleHdrModel.activeDisplay = event.name;
        this.emailReminderScheduleHdrModel.active = true;
      }else if(event.id==2){
        this.emailReminderScheduleHdrModel.activeDisplay = event.name;
        this.emailReminderScheduleHdrModel.active = false;
      }
    }else{
      this.emailReminderScheduleHdrModel.active = false;
    }
  }
  
  loadProcessComboData(searchValue){
    this.scrollsyncProcess = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetProcessCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.processPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.processPageNumber , this.processCombo , data.responseData.comboList)
          this.processPageNumber = this.getData.pageNumber;
          this.processCombo = this.getData.dataList;
          this.scrollsyncProcess = false;
        }
      );
    }

    selectedProcessData(event) {
      if (event === undefined) {
        this.emailReminderScheduleHdrModel.processId=0;
        this.emailReminderScheduleHdrModel.processName=null;
        this.locationPageNumber = 1;
        this.locationCombo = [];
      } else {
        this.emailReminderScheduleHdrModel.processId=event.processId;
        this.translateService.get([event.processName])
        .subscribe((val) => {
          const status = Object.values(val)
          this.emailReminderScheduleHdrModel.processName=status[0].toString();
        });
        }
      }
}
