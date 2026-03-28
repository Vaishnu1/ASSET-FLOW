import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// import { Label } from 'ng2-charts';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { BASE_FORM_GROUP_CONST } from 'src/app/Model/base/baseFormGroup';

@Component({
  selector: 'app-sr-with-out-pr-count',
  templateUrl: './sr-with-out-pr-count.component.html',
  styleUrls: ['./sr-with-out-pr-count.component.css']
})
export class SrWithOutPrCountComponent implements OnInit {


  dataSource1:any=[];                      
 
  displayedColumns:string[] =['sno', 'location', 'count', 'percent'];

  // public barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];

  // // Chart
  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  //   // We use these empty structures as placeholders for dynamic theming.
  //   scales: { xAxes: [{}], yAxes: [{}] },
  //   plugins: {
  //     datalabels: {
  //       anchor: 'end',
  //       align: 'end',
  //     }
  //   }
  // };
  public barChartLabels=[];
  // public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  //public barChartPlugins = [pluginDataLabels];

  constructor(private commonService: CommonService, private assetOptimaConstants: AssetOptimaConstants, private samsService: AssetOptimaServices) { }
  searchParams: FormGroup;

  ngOnInit() {
    this.initiateFormGroup();
    //dynamicly add all base from controls to the form Group
    Object.keys(BASE_FORM_GROUP_CONST.controls).forEach(key => {
      this.searchParams.addControl(key, BASE_FORM_GROUP_CONST.get(key));
    });

  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }  

  // public randomize(): void {
  //   // Only Change 3 values
  //   const data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  //   this.barChartData[0].data = data;
  // }
  showtab = 'tbl';    
  showtbl(value) {
    this.showtab = value;  
  }
  showchart(value) {
    this.showtab = value;
  }


  setSearchParams(searchParams) {
    this.searchParams.controls.recordsPerPage.setValue(0);
    this.searchParams.patchValue(searchParams);
    this.getList( this.searchParams.value);
  }
  length: number;
  getList(searchParams) {
    this.commonService.commonListService(this.samsService.listOfSRtoPR, searchParams).subscribe(
      data => {
        if (data.success) {        
          this.dataSource1 = data.responseData.dataList;  
          this.length = this.dataSource1.length;       
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, errro => {
        this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
      }
    );
  }

  initiateFormGroup() { 
    this.searchParams = new FormGroup({  
      locationName: new FormControl(''),
      locationId: new FormControl(0),
      srType: new FormControl(''),
      srStatus: new FormControl(''),
      srNo: new FormControl(''),
      srId: new FormControl(0),
      assetCategoryName: new FormControl(''),
      assetCategoryId: new FormControl(0),
      assetGroupName: new FormControl(''),
      assetGroupId: new FormControl(0),
      modelId: new FormControl(0),
      modelName: new FormControl(''),
      manufacturerName: new FormControl(''),
      manufacturerId: new FormControl(0),
      departmentName: new FormControl(''),
      departmentId: new FormControl(0),
      assignedTo: new FormControl(''),
      assignedToId: new FormControl(0),
      createdDtDisp: new FormControl(''),
      updatedDtDisp: new FormControl(''), 
      assetCode: new FormControl(''),
      assetHdrId: new FormControl(0),
      assetStatus: new FormControl(''),
      assetStatusId: new FormControl(0),
      functionality: new FormControl(''),
      assetTypeId: new FormControl(0),
      assetTypeName: new FormControl('')
    });
  }
 
  exportToexcel() {      
    this.commonService.commonListService(this.samsService.exportRepairSR,  this.searchParams.value).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      } 
    );
  }       

}
