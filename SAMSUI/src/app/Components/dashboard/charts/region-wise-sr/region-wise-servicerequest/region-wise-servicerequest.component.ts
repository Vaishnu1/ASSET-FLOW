import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-region-wise-servicerequest',
  templateUrl: './region-wise-servicerequest.component.html',
  styleUrls: ['./region-wise-servicerequest.component.css']
})
export class RegionWiseServicerequestComponent implements OnInit {

  locationBased;
  customerBased: boolean=false;

  constructor(public dialogRef: MatDialogRef<RegionWiseServicerequestComponent>,
    @Inject(MAT_DIALOG_DATA) private data, private dialog: MatDialog,
    private userSession: UserSessionService) { }

  ngOnInit() {
    let displayDashboardRegionWise= this.userSession.getDisplayRegionWiseDashboard();
    console.log(displayDashboardRegionWise);
  }

  ngAfterViewInit() {
  }

  option = {    
    title: {
      text: 'Service Request Based on Region Wise'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {           
            type : 'shadow'       
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['North', 'South', 'East', 'West'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[50, 22, 100, 75]
        }
    ]
};

onChartClick(event){
  this.customerBased=true;
}

options = {
  title: {
    text: 'Service Request Based on Location Wise'
  },
  color: ['#3398DB'],
  tooltip : {
      trigger: 'axis',
      axisPointer : {            
          type : 'shadow'        
      }
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  xAxis : [
      {
          type : 'category',
          data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
              alignWithLabel: true
          }
      }
  ],
  yAxis : [
      {
          type : 'value'
      }
  ],
  series : [
      {
          name:'直接访问',
          type:'bar',
          barWidth: '60%',
          data:[10, 52, 200, 334, 390, 330, 220]
      }
  ]
};

closeRegionModal(){
  this.dialogRef.close();
}

}
