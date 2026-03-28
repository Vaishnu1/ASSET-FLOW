import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssetAssignee } from 'src/app/Model/master/asset-assignee';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ConfirmConfirmationComponent } from '../Common-components/confirm-confirmation/confirm-confirmation.component';
import { RejectConfirmationComponent } from '../Common-components/reject-confirmation/reject-confirmation.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-approve-reject-asset-assignee',
  templateUrl: './approve-reject-asset-assignee.component.html',
  styleUrls: ['./approve-reject-asset-assignee.component.css']
})
export class ApproveRejectAssetAssigneeComponent implements OnInit {
  public assetAssignee: AssetAssignee;

  status : string ="";
  rejectReason : string ="";
  displayedColumns = ['branch', 'assetCode', 'department', 'assigneeType', 'assignedStartDate', 'assignedEndDate', 'assignedBy'];
  dataSource =[];
  disablebttn: boolean = false;
  errormsg: string = '';
  color: string;

  constructor(private readonly commonService: CommonService,
    private readonly dialog: MatDialog,
    private change: ChangeDetectorRef,
    private route: ActivatedRoute) {
      this.assetAssignee = new AssetAssignee()
     }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      console.log(token);
      this.validateToken(token);
    });
  }

  confirmAssigneeApprove() {
    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg': 'Are You Sure To Approve This Record?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          this.status = "APPROVED";
          this.rejectReason ="";
          this.updateAssigneeStatus(this.status,this.rejectReason);
        }
      });
  }

  rejectAssigneeApprove() {
    const dialogRef = this.dialog.open(RejectConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg': 'Are You Sure To Reject This Record?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          this.status = "REJECTED";
          this.rejectReason = data.reason
          this.updateAssigneeStatus(this.status,this.rejectReason);
        }
      });
  }

  updateAssigneeStatus(status,rejectReason) {
    let assignee = {assetAssigneeId: this.assetAssignee.assetAssigneeId,status: status,rejectReason:rejectReason};
    this.commonService.commonInsertService('approvalOrRejectAssetAssigneeByEmail.sams', assignee).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.disablebttn = false;
          this.errormsg= data.message;
          this.color='green';
        } else {
          this.disablebttn = true;
          this.errormsg = '';
          this.color='red';
          this.commonService.openToastErrorMessage(data.message);
        }
      });
  }

  validateToken(token) {
    this.dataSource=[];
    this.commonService.commonInsertService('validateAssetAssigneeToken.sams', {token}).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.assetAssignee = data.responseData;
          this.dataSource=[this.assetAssignee];
          this.change.detectChanges();
          this.disablebttn = true;
          this.errormsg = '';
          this.color='green';
        } else {
          this.disablebttn = false;
          this.commonService.openToastErrorMessage(data.message);
          this.errormsg= data.message;
          this.color='red';
        }
      });
  }
}
