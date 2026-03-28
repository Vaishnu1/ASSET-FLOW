import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-item-branch-mapping',
  templateUrl: './item-branch-mapping.component.html',
  styleUrls: ['./item-branch-mapping.component.css']
})
export class ItemBranchMappingComponent implements OnInit {

  branchList: any[] = [];
  uploadBtnFlag: boolean = false;
  branchColumns = ['sno','select', 'locationName'];
  selectAllFlag: boolean;
  itemIdList: any;


  constructor(public dialogRef: MatDialogRef<ItemBranchMappingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private assetOptimaConstants: AssetOptimaConstants,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices) { }

  ngOnInit(): void {
    this.itemIdList = this.data.itemIdList;
    if(this.itemIdList.length > 1){
      this.loadCategoryDepartment(0);
    }else{
      this.loadCategoryDepartment(this.itemIdList[0])
    }
  }

  loadCategoryDepartment(itemId: number) {
    this.commonService.commonGetService(this.assetOptimaServices.loadItemBranchMapping,itemId).subscribe(
      (groupData) => {
        this.branchList = groupData.responseData.dataList;
        if((this.branchList.filter(data => {return data.active}).length) === this.branchList.length){
            this.selectAllFlag = true;
        }
      }
    );
  }

  selectAll(value: boolean) {
    for (var i = 0; this.branchList.length > i; i++){
      if(!(this.branchList[i].activeValid)){
        this.branchList[i].active = value;
      }
    }
  }

  saveOrUpdateItemBranchMapping(){
    let obj={
    branchList:this.branchList,
    itemIdList:this.itemIdList
    };
    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateItemBranchMapping, obj).subscribe(
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

  closeItemBranchMapping(){
      this.dialogRef.close();
  }

  updateBtnflag(){
    this.uploadBtnFlag = false;
  }
}
