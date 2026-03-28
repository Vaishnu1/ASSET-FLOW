import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';

@Component({
  selector: 'app-user-group-mapping',
  templateUrl: './user-group-mapping.component.html',
  styleUrls: ['./user-group-mapping.component.css']
})
export class UserGroupMappingComponent implements OnInit {

  dataSource: any =[];
  displayedColumns :string[] = ['groupName','active'];
  userName : string = '';
  
  uploadBtnFlag: boolean = true;

  constructor(public dialogRef: MatDialogRef<UserGroupMappingComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private commonService: CommonService,
              private samsServices: AssetOptimaServices) {
                this.loadUserGroup(data.userId);
                this.userName = data.userName;
               }

  ngOnInit() {
  }

  loadUserGroup(userId: number) {
    this.commonService.commonGetService(this.samsServices.listUserGroup,userId).subscribe(
      (groupData) => {
        this.dataSource = groupData.responseData.dataList;
        this.dataSource.forEach(element => {
          element.userId = userId;
        });
      }
    );
  }

  closeModal() {
    this.dialogRef.close();
  }

  saveOrUpdateGroupMapping() {
    var obj={
      groupAccessList:this.dataSource
    };
    this.commonService.commonInsertService(this.samsServices.saveOrUpdateUserGroupMapping,obj).subscribe(
      (data) => {
        if(data.success){
          this.commonService.openToastSuccessMessage(data.message);
          this.dialogRef.close();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

  
  updateBtnflag(){
    this.uploadBtnFlag = false;
  }



}
