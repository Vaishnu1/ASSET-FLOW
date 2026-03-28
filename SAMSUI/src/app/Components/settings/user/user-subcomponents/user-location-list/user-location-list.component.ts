import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationAccessModel } from 'src/app/Model/base/locationAccess';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { MatTableDataSource } from '@angular/material/table';
import { getData } from 'src/app/Model/common/fetchListData';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-user-location-list',
  templateUrl: './user-location-list.component.html',
  styleUrls: ['./user-location-list.component.css']
})
export class UserLocationListComponent implements OnInit {

  locationAccessModel:LocationAccessModel;
  locationAccessModelList : any =[];
  displayedColumns = ['accessLocationName','locShortName','locationCode','allocateFlag'];
  userComboData: any =[];
  userComboFormGroup: FormGroup;
  locationListTempList: [];

  uploadFlagUser: boolean = false;
  userLocationPageNumber: number;
  recordsPerPageForCombo: string;
  modelAccessModule: ModuleAccessModel;

  disableAssignOption:number;

  @ViewChild('locationComboField') locationComboField: NgSelectComponent;
  getData: getData;
  scrolluserComboSync: boolean = false;

  constructor(private commonService: CommonService,
              private readonly userSession: UserSessionService,
              private samsServices: AssetOptimaServices) { 
                this.locationAccessModel = new LocationAccessModel();
                this.userLocationPageNumber=1;
                this.modelAccessModule = new ModuleAccessModel();
              }

  ngOnInit() {
    
   this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_LOCATION_ACCESS'];
    this.userComboFormGroup = new FormGroup({
      usersearchCombo : new FormControl(null,[Validators.required])
    });
    this.locationAccessModel.columnName = 'accessLocationName';
    this.locationAccessModel.direction = 'desc';
  }

  ngAfterViewInit(){
    this.commonService.setComboFocus(this.locationComboField);
  }

  userComboSearch(searchValue) {
    this.scrolluserComboSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsServices.listOfAllUserNameCombo,searchValue.term,'','',
    this.recordsPerPageForCombo,this.userLocationPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.userLocationPageNumber , this.userComboData , data.responseData.comboList)
        this.userLocationPageNumber = this.getData.pageNumber;
        this.userComboData = this.getData.dataList;
        this.scrolluserComboSync = false;
      }
    );
  }

  userComboSelectValue(event) {    
    if(event!=null){
        this.locationAccessModel.userId=event.userId;
        this.locationAccessModel.userName=event.userName;
        this.locationAccessModel.locationId=event.locationId;
        this.locationAccessModel.loginId=event.loginId;
        this.locationAccessModel.locationName=event.locationName;
        this.commonService.commonGetService(this.samsServices.listLocAccessForUser,event.userId).subscribe(
      (data) => {        
        this.disableAssignOption=event.locationId;
        this.locationAccessModelList = data.responseData;
      }
    );
    }else{
        this.locationAccessModel.userId=0;
        this.locationAccessModel.userName='';
        this.locationAccessModel.locationId=0;
        this.locationAccessModel.loginId='';
        this.locationAccessModel.locationName='';
        this.userLocationPageNumber=1;
        this.userComboData = [];
    }
  }

  submitData() {
    this.uploadFlagUser=true;
    var obj={
      userId:this.locationAccessModel.userId,
      userName:this.locationAccessModel.userName, 
      loginId:this.locationAccessModel.loginId,
      locationId:this.locationAccessModel.locationId,
      locationName:this.locationAccessModel.locationName,
      locationAccessModelList:this.locationAccessModelList
    };
    this.commonService.commonInsertService(this.samsServices.saveOrUpdateUserLocAccess,obj).subscribe(
      (data) => {
        if(data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.uploadFlagUser=false;
          this.loadUserAccessLocation(this.locationAccessModel.userId, this.locationAccessModel.locationId);
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadFlagUser=false;
        }
      }
    );
  }

  clear() {
    this.userComboFormGroup.reset();
    this.locationComboField.clearModel();
    this.locationAccessModel = new LocationAccessModel();
  }

  loadUserAccessLocation(userId,locationId){
    this.commonService.commonGetService(this.samsServices.listLocAccessForUser,userId).subscribe(
      (data) => {        
        this.disableAssignOption=locationId;
        this.locationAccessModelList = data.responseData;
      }
    );
  }

}
