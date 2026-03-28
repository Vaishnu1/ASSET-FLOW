import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { GroupModuleAccessModel } from 'src/app/Model/base/groupModuleAccess';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {MatSelect} from '@angular/material/select'
import { getData } from 'src/app/Model/common/fetchListData';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';

@Component({
  selector: 'app-group-access',
  templateUrl: './group-access.component.html',
  styleUrls: ['./group-access.component.css']
})
export class GroupAccessComponent implements OnInit {

  //Set Page Title
  title = 'Asset Optima - User';

  displayedColumnsMenus: string[] = [ 'menuName'];
  @ViewChild('groupNameComboField') groupNameComboField : NgSelectComponent;
  displayedColumnsSubMenus: string[] = [];
  groupListData: any = [];
  menus: any = [];
  menuGroupList: any =[];
  groupModuleAccessModel: GroupModuleAccessModel;
  groupId: number = 0;
  createBtn:boolean=false;
  updateBtn:boolean = false;
  readBtn:boolean = false;
  deleteBtn: boolean = false;

  recordsPerPageForCombo: string;
  groupComboFormGroup: FormGroup;

  disableAccess: boolean = false;
  uploadFlagUser: boolean = false;

  groupPageNumber:number;
  scrollsync: boolean=false;
  getData: getData;

  //PERMISSIONS
  modelAccess: ModuleAccessModel;

  constructor(private commonService:CommonService,
              private samsService: AssetOptimaServices,
              private readonly userSessionService: UserSessionService,
              private titleService: Title) {
  this.groupModuleAccessModel=new GroupModuleAccessModel();
  this.groupPageNumber=1;
               }

  ngOnInit() {

    this.modelAccess = this.userSessionService.getUserGroupAccess()['GROUPACCESS_GROUP_ACCESS'];

    this.titleService.setTitle(this.title);
    this.groupComboFormGroup = new FormGroup({
      groupNameComboField : new FormControl(null,[Validators.required])
    });
    this.commonService.setComboFocus(this.groupNameComboField);

    if(!(this.modelAccess.createFlagDisplay || this.modelAccess.updateFlagDisplay || this.modelAccess.readFlagDisplay || this.modelAccess.deleteFlagDisplay)){
      this.groupComboFormGroup.controls.groupNameComboField.disable();
      this.disableAccess = true;
    }

    if(!this.modelAccess.createFlagDisplay && !this.modelAccess.updateFlagDisplay && !this.modelAccess.deleteFlagDisplay){
      this.disableAccess = true;
    }
    // this.getgroupList('');
  }

  getgroupList(searchValue) {
    this.scrollsync=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults(this.samsService.listOfAllGroupNameCombo,searchValue != null ? searchValue.term : '', this.userSessionService.getUserId(), '',
      this.recordsPerPageForCombo, this.groupPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.groupPageNumber , this.groupListData , data.responseData.comboList)
          this.groupPageNumber = this.getData.pageNumber;
          this.groupListData = this.getData.dataList;
          this.scrollsync = false;
        }
      );
  }

  getGroupAccessMenu(groupId: number) {
    this.groupId = groupId;
    this.commonService.commonGetService(this.samsService.loadGroupModuleAccess,groupId).subscribe(
      (data) => {
        this.menuGroupList = data.responseData;
        let result=[new Set(data.responseData.map(a => a.menuName))];
        this.menus=Array.from(result[0].values());
      }
    );
  }

  selectedGroupName(event) {
    if(event != null){
            this.groupModuleAccessModel.groupId=event.groupId;
            this.groupModuleAccessModel.groupName=event.groupName;
            this.groupModuleAccessModel.orgId=event.orgId;
            this.getGroupAccessMenu(event.groupId);
    }else{
      this.groupPageNumber=1;
      this.groupListData = [];
      this.menus = [];
    }
  }

  setCreateValue(event) {
    this.menuGroupList.forEach(function (value) {
      value.createFlagDisplay=event.checked;
      value.createFlag=value.createFlagDisplay==true?'Y':'N';
      value.createFlagView=value.createFlagDisplay==true?'Y':'N';
    });
  }

  setDeleteValue(event) {
    this.menuGroupList.forEach(function (value) {
      value.deleteFlagDisplay=event.checked;
      value.deleteFlag=value.deleteFlagDisplay==true?'Y':'N';
      value.deleteFlagView=value.deleteFlagDisplay==true?'Y':'N';
    });
  }

  setReadValue(event) {
    this.menuGroupList.forEach(function (value) {
      value.readFlagDisplay=event.checked;
      value.readFlag=value.readFlagDisplay==true?'Y':'N';
      value.readFlagView=value.readFlagDisplay==true?'Y':'N';
    });
  }

  setUpdateValue(event) {
    this.menuGroupList.forEach(function (value) {
      value.updateFlagDisplay=event.checked;
      value.updateFlag=value.updateFlagDisplay==true?'Y':'N';
      value.updateFlagView=value.updateFlagDisplay==true?'Y':'N';
    });
  }

  setIndividualvalueForCreate(event){
    if(event.createFlagDisplay){
      event.createFlagView='Y';
    }else{
      event.createFlagView='N';
    }
  }

  setIndividualvalueForUpdate(event){
    if(event.updateFlagDisplay){
      event.updateFlagView='Y';
    }else{
      event.updateFlagView='N';
    }
  }

  setIndividualvalueForDelete(event){
    if(event.deleteFlagDisplay){
      event.deleteFlagView='Y';
    }else{
      event.deleteFlagView='N';
    }
  }

  setIndividualvalueForView(event){
    if(event.readFlagDisplay){
      event.readFlagView='Y';
    }else{
      event.readFlagView='N';
    }
  }

  submit() {
    this.uploadFlagUser=true;
    this.menuGroupList.forEach(obj => {
      if (obj.menuName === "Dashboard") {
        obj.createFlagDisplay = false;
        obj.createFlagView = "N";
        obj.deleteFlagDisplay = false;
        obj.deleteFlagView = "N";
        obj.updateFlagDisplay = false;
        obj.updateFlagView = "N";
      }
    });
    console.log(this.menuGroupList);
    var obj={
      orgId:this.groupModuleAccessModel.orgId,
      groupId:this.groupModuleAccessModel.groupId,
      groupAccessList:this.menuGroupList
    };
    this.commonService.commonInsertService(this.samsService.saveGroupAccess,obj).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(data.message);
        this.clear();
        this.uploadFlagUser=false;
      }
    );
  }

  clear() {
    this.menus = [];
    this.menuGroupList = [];
    this.groupId = 0;
    this.createBtn=false;
    this.readBtn=false;
    this.updateBtn=false;
    this.deleteBtn=false;
    this.groupListData=[];
    this.groupNameComboField.clearModel();
  }

}
