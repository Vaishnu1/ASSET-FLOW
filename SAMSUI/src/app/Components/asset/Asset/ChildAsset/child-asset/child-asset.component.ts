import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { ChildAssetAddComponent } from '../child-asset-add/child-asset-add.component';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { DefaultPrinterService } from 'src/app/Services/default-printer-service/default-printer-service';

@Component({
  selector: 'app-child-asset',
  templateUrl: './child-asset.component.html',
  styleUrls: ['./child-asset.component.css']
})
export class ChildAssetComponent implements OnInit, OnDestroy {

  @Input() assetId;
  @Input() modelName;
  @Input() modelId;
  @Input() preInwHdrId;
  @Input() preInwDtlId;
  @Input() fromScreen;
  @Input() parentAssetCode;

  childAssetDataSource = [];

  //LOADER
  subloader: boolean = false;

  modeDisplay: boolean = false;

  //for pagination
  length: number;
  childAssetNo: string;
  childNo: number;
  childDataNo: number;
  childDataList = [];

  modelAccessModule: ModuleAccessModel;

  displayedChildAssetColumns = ['sno',  'childAssetCode','childAssetNo', 'serialNo', 'childAssetCategoryName', 'childAssetModelName', 'action'];
  assetDataSource=[];

  constructor(private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private dialog: MatDialog,
    private userSessionService: UserSessionService,
    private router: Router,) {
  }

  ngOnInit() {
    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_ASSET_REGISTER'];

    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId = Number(primaryId);
        var mode = params.mode;
        if (mode == 'view') {
          this.modeDisplay = true;
        }
      });
// if the path is from asset retirment for edit and create add button disable
      this.activatedRoute.url.subscribe(
        url => {
          var urls = url[0].path;
          if(urls==='assetRetirementCreate'){
            this.modeDisplay = true;
          }
        });

    if (this.assetId > 0) {
      this.loadChildAssetList();
    }
  }

  ngAfterViewInit() {
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
      this.loadChildAssetList();
    }
  }

  dialogRef;

  ngOnDestroy() {
    if (this.dialogRef != null) {
      this.dialogRef.close();
    }
  }

  loadChildAssetList() {
    this.childAssetDataSource = [];
    this.childDataList =[];
    this.subloader = true;
    this.commonService.commonGetService('fetchListOfAllChildAsset.sams', this.assetId).subscribe(
      data => {

        if (data.success) {

          for(this.childDataNo=0;this.childDataNo<data.responseData.length;this.childDataNo++){
            if(data.responseData[this.childDataNo].active ==true){

              this.childDataList.push(data.responseData[this.childDataNo]);
            }
          }


          this.childAssetDataSource = this.childDataList;
          this.length = this.childAssetDataSource.length;
          this.subloader = false;

        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.subloader = false;
        }
      }, error => {
        this.subloader = false;
      }
    );

  }

  addChildAsset() {

    if(this.childAssetDataSource.length<=0 || this.childAssetDataSource.length ==null ||this.childAssetDataSource.length == undefined ){

      this.dialogRef = this.dialog.open(ChildAssetAddComponent, {
        data: {
          'assetId': this.assetId,
          'modelName': this.modelName,
          'modelId': this.modelId,
          'preInwHdrId':this.preInwHdrId,
          'preInwDtlId':this.preInwDtlId,
          'length':this.childAssetDataSource.length,
        },
        width: "767px", height: "550px"
      });
    }else{

    this.childAssetNo = this.childAssetDataSource[this.childAssetDataSource.length-1].childAssetNo ;
    var value = this.childAssetNo.split("##",2);
    this.childNo= parseInt(value[1]);
    this.dialogRef = this.dialog.open(ChildAssetAddComponent, {
      data: {
        'assetId': this.assetId,
        'modelName': this.modelName,
        'modelId': this.modelId,
        'preInwHdrId':this.preInwHdrId,
        'preInwDtlId':this.preInwDtlId,
        'length':this.childAssetDataSource.length,
        'childAssetNo':this.childNo
      },
      width: "95%", height: "97%", maxWidth: "95%"
    });
  }
    this.dialogRef.afterClosed().subscribe(
      data => {
        this.ngOnInit();
        this.loadChildAssetList();
      });
  }

  //Delete Child Asset
  DeleteChildAsset(element, index) {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Child Asset'
      }
    });
    this.dialogRef.disableClose = true;

    let obj = {
      childAssetId:element.childAssetId,
      assetId:this.assetId,
      trackIndividualLicense:element.trackIndividualLicense,
      volumeLicensePresent:element.volumeLicensePresent,
      volumeLicenseQty:element.volumeLicenseQty,
      usedVolumeLicenseQty:element.usedVolumeLicenseQty,
      childAssetHdrId:element.childAssetHdrId,
      volumeLicenseId:element.volumeLicenseId
    };
    console.log(obj);

    this.dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.commonService.commonInsertService('deleteChildAssetInfo.sams', obj).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.ngOnInit();
              } else {
                this.commonService.openToastErrorMessage(data.message);
                this.ngOnInit();

              }
            }
          );
        }
      });
  }

  qrCodeChildAsset(element) {
    this.assetDataSource[0]={
      assetCode : element.childAssetCode,
      modelName : element.childAssetModelName,
      manufacturerName : element.childAssetManufacturerName,
      serialNo : element.childAssetSerialNo ,
      purchaseDtDisp : element.childAssetPurchaseDtDisp,
      installationDtDisp : element.childAssetInstallationDtDisp,
      parentAssetCode: this.parentAssetCode
    }

    let defaultprinterservice = new DefaultPrinterService(this.commonService);
    defaultprinterservice.DefaultPrintService(this.assetDataSource, 1,'')
  }

  downloadDocument(filePath: string, contentType) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadFileFromServer(filePath, contentType).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
        this.commonService.openToastSuccessMessage("Pdf Report Downloaded Successfully.");
      }
    );
  }

  viewChildAssetDtl(childAssetId, mode) {
  const url = this.router.serializeUrl(
    this.router.createUrlTree(['home/asset/assetCreateV1', childAssetId, mode, 'asset_info'])
  );
  window.open(url, '_blank');
}


}
