import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { departmentModel } from 'src/app/Model/master/department';
import { AssetCategoryModel } from 'src/app/Model/master/assetCategory';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-category-department-mapping',
  templateUrl: './category-department-mapping.component.html',
  styleUrls: ['./category-department-mapping.component.css']
})
export class CategoryDepartmentMappingComponent implements OnInit {

  public departmentModel: departmentModel;
  public assetCategoryModel: AssetCategoryModel;
  locDepartmentList: any[] = [];
  categoryList: any[] = [];
  displayedDepartmentColumns = ['sno','select', 'departmentName'];
  displayedCategoryColumns = ['sno','select', 'categoryName'];
  userName : string = '';
  userId : number = 0;
  employeeId: number = 0;
  uploadBtnFlag: Boolean = true;
  error_msg: string = '';

  selectAllFlag : Boolean = false;
  selectAllFlagCategory : Boolean = false;

  constructor(private commonService: CommonService, public dialogRef: MatDialogRef<CategoryDepartmentMappingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private assetOptimaConstants: AssetOptimaConstants) {
    this.departmentModel = new departmentModel();
    this.assetCategoryModel=new AssetCategoryModel();
    this.userName = data.userName;
    this.userId = data.userId;
    this.employeeId = data.employeeId;
     }

  ngOnInit() {
    this.loadCategoryDepartment(this.userId);
  }

  loadCategoryDepartment(userId: number) { 
    this.commonService.commonGetService('loadCatDeptMapping.sams',userId).subscribe(
      (groupData) => {
        this.categoryList = groupData.responseData.userCategoryList;
        this.locDepartmentList = groupData.responseData.userDepartmentList;
        this.updateBtnFlag();
        this.error_msg='Kindly Select At least One "Department" And "Category"';
      }
    );
  }

  selectAll(value: boolean) {
    for (var i = 0; this.locDepartmentList.length > i; i++) this.locDepartmentList[i].active = value;
  }
  selectAllCategory(value: boolean){
    for (var i = 0; this.categoryList.length > i; i++) this.categoryList[i].active = value;
  }

  closeCategoryDepartmentModal(){
    this.dialogRef.close();
  }

  saveOrUpdateCategoryDepartmentMapping(event){
    let obj={
    departmentList:this.locDepartmentList,
    categoryList:this.categoryList,
    userId:this.data.userId,
    locationId:this.data.locationId
    };
    this.commonService.commonInsertService('saveOrUpdateUserCatDeptAccess.sams', obj).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.dialogRef.close();
        }else{
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
      }
    );
  }

  updateBtnFlag() {
    const categoryActive = this.categoryList.some(element => element.active);
    const departmentActive = this.locDepartmentList.some(element => element.active);
    
    this.uploadBtnFlag = !(categoryActive && departmentActive);
  
    this.selectAllFlag = this.locDepartmentList.every(element => element.active);
    this.selectAllFlagCategory = this.categoryList.every(element => element.active);

  }
}
