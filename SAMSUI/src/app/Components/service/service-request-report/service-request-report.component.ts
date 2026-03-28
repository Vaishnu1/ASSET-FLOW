import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceRequestListComponent } from '../service-request-list/service-request-list.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ServiceRequestModel } from 'src/app/Model/serviceRequest/serviceRequest';

@Component({
  selector: 'app-service-request-report',
  templateUrl: './service-request-report.component.html',
  styleUrls: ['./service-request-report.component.css']
})
export class ServiceRequestReportComponent implements OnInit {

  serviceRequestModel: ServiceRequestModel; 
  constructor(public dialogRef: MatDialogRef<ServiceRequestListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService) { 
      this.serviceRequestModel = new ServiceRequestModel();
    }

  ngOnInit(): void {
    this.serviceRequestModel = this.data.serviceRequestModel;
  }

  generateWOReport() {
    if(this.serviceRequestModel.srReportType == 'summary'){
      this.commonService.commonListService('generateWorkOrderSummaryReport.sams', this.serviceRequestModel).subscribe(
        (data) => {
          this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
          this.closeModal();
        }, error => {
        }
      );
    }
    if(this.serviceRequestModel.srReportType == 'detailed'){
      this.commonService.commonListService('generateWorkOrderReport.sams', this.serviceRequestModel).subscribe(
        (data) => {
          this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
          this.closeModal();
        }, error => {
        }
      );
    }

  }

  closeModal(){
    this.serviceRequestModel.srReportType = '';
    this.dialogRef.close();
  }

  changeAllowEditItem(value){
    this.serviceRequestModel.srReportType = value;
  }

}
