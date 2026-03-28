import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ServiceRequestModel } from 'src/app/Model/serviceRequest/serviceRequest';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-service-request-history',
  templateUrl: './service-request-history.component.html',
  styleUrls: ['./service-request-history.component.css']
})
export class ServiceRequestHistoryComponent implements OnInit {

  serviceRequest: ServiceRequestModel;
  @Input() assetId: number;
  @Output() setSrId = new EventEmitter<ServiceRequestModel>();
  @Output() setSrIdList = new EventEmitter<ServiceRequestModel[]>();

  serviceRequestList: ServiceRequestModel[];

  //for pagination
  length: String = '0';//set total record count here 
  pageIndex: String;//set page number starts with zeroo
  pageSize: String;// records per page

  //LOADER
  subloader: boolean = false;

  srDataSource = [];

  modeDisplay: boolean = false;

  displayedSRColumns = ['sno', 'locationName', 'srNo', 'srType', 'srStatus', 'problemReported', 'totalDownHrs', 'action'];

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  totalDownTimeStr: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private userSessionService: UserSessionService) {
    this.serviceRequest = new ServiceRequestModel();
  }

  ngOnInit() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_WORK_ORDER'];

    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId = Number(primaryId);
        var mode = params.mode;
        if (mode == 'view') {
          this.modeDisplay = true;
        }
      });
    if (this.assetId > 0) {
      this.loadServiceDetailsList();
    }
  }

  loadServiceDetailsList() {
    this.serviceRequest.pageNumber = Number(this.pageIndex);
    this.serviceRequest.recordsPerPage = Number(this.pageSize);
    this.serviceRequest.assetId = this.assetId;
    this.subloader = true;
    this.srDataSource = [];
    this.commonService.commonListService('fetchListOfServiceRequest.sams', this.serviceRequest).subscribe(
      data => {
        if (data.success) {
          this.subloader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.srDataSource = data.responseData.dataList;
          if (this.srDataSource && this.srDataSource.length > 0) {
            this.setSrId.emit(this.srDataSource[0]);
          }
          this.setSrIdList.emit(this.srDataSource);
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.subloader = false;
        }

        this.calculateTotalDownTime();

      }, error => {
        this.subloader = false;
      }
    );
  }

  viewServiceRequestDtl(srId, mode) {
    this.router.navigate(['home/serviceRequest/serviceViewV1/' + srId + '/' + mode, 'wo_info']);
  }


  calculateTotalDownTime(): void {
    let totalMinutes = 0;

    this.srDataSource.forEach((sr) => {
      const match = sr.totalDownHrsStr.match(/(\d+)\s*Day\(s\)\s*(\d+)\s*Hr\(s\)\s*(\d+)\s*Min\(s\)/);
      if (match) {
        const days = parseInt(match[1], 10);
        const hours = parseInt(match[2], 10);
        const minutes = parseInt(match[3], 10);
        totalMinutes += days * 1440 + hours * 60 + minutes;
      }
    });

    const totalDays = Math.floor(totalMinutes / 1440);
    const remainingMinutes = totalMinutes % 1440;
    const totalHours = Math.floor(remainingMinutes / 60);
    const totalMins = remainingMinutes % 60;

    this.totalDownTimeStr = `${totalDays} Day(s) ${totalHours} Hr(s) ${totalMins} Min(s)`;
  }


}
