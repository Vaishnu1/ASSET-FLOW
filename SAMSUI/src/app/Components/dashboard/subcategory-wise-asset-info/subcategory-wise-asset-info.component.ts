import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategory-wise-asset-info',
  templateUrl: './subcategory-wise-asset-info.component.html',
  styleUrls: ['./subcategory-wise-asset-info.component.css']
})
export class SubcategoryWiseAssetInfoComponent implements OnInit {

  arrName = [];
  arrValue =[];
  option;
  header: string[];
  assetsubCategoryBased: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              public dialogRef: MatDialogRef<SubcategoryWiseAssetInfoComponent>,
              private commonService: CommonService,
              private assetOptimaConstants: AssetOptimaConstants,
              private readonly dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.header=this.data.title;
    this.fetchSubCategoryListBasedonCategory();
  }

  fetchSubCategoryListBasedonCategory(){
    
    if(this.data.year === null || this.data.year === undefined){
      this.data.year = "2020";
    }
    
    this.commonService.commonGetService('fetchSubCategoryListBasedOnCategory.sams', 
            this.data.locationId.toString(),this.data.statusId.toString(),this.data.category.toString(),
            this.data.locationList,this.data.year.toString()).subscribe(
      dataValue => {
          if (dataValue.success) {
            this.nameAndValueBuilding(dataValue.responseData.dataList);
            this.option = this.getChartOptions();
          }
      }
  );
  }

  closeSubCategoryModal(){
    this.dialogRef.close();
  }

  nameAndValueBuilding(array){
    this.arrName = this.getArrayValueForName(array);
    this.arrValue = this.getArrayValueForValue(array);
   
  }

  getArrayValueForName(data){
    let res = [];
    for(let i = 0; i < data.length; i++){
      var item = data[i].subCategoryName;
      res.push(item);
    }
    return res; 
  }

  getArrayValueForValue(data) {
    let res = [];
    for(let i = 0; i < data.length; i++){
      var item = data[i].count;
      res.push(item);
    }
    return res; 
  }

  getChartOptions(){
    let chartOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'     
            }
        }, 
        grid: {
          left: '2%',
          right: '3%',
          bottom: '2%',
          containLabel: true
      },
        xAxis: {
            type: 'category',
            data: this.arrName
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            barWidth: '30%',
            data: this.arrValue,
            label: {
              normal: {
                  show: true,
                  position: 'inside'
              }
            },
            type: 'bar'
        }]
    };
      return chartOption;
  }

  openAssetViewPage(data){
    
    localStorage.setItem('locationId', this.data.locationId);
    localStorage.setItem('locationName', this.data.locationName);
  if(this.data.statusId ===0){

    this.assetsubCategoryBased = this.dialog.open(SubcategoryWiseAssetInfoComponent, {
      width: '60%',
      height: '500px',
      position: { top: '10%', left: '47%' },
      data: {
           'category': this.data.category,
           'title': 'Sub Category value for ' + this.data.category,
           'statusId': -1,
           'locationId': this.data.locationId,
           'locationName': this.data.locationName,
           'locationList': this.data.locationList,
           'year': this.data.year,
           'categoryId':this.data.categoryId,
      }
  });
  this.assetsubCategoryBased.disableClose = true;
  this.assetsubCategoryBased.afterClosed().subscribe(
      data => {
          this.ngOnInit();
      });
  
  }else if(this.data.statusId ===-1){

this.router.navigate([`home/asset/assetDash/${this.data.categoryId}/${data.name}/1/${this.data.year}`]);
  }
   else{
    this.router.navigate(['home/asset/assetList/' +data.name+ '/' +this.data.statusId + '/' + 'OWN']);   
  
  }
  
  }

  
  ngOnDestroy() {


    if (this.assetsubCategoryBased != null) {
        this.assetsubCategoryBased.close();
    }
  }

}
