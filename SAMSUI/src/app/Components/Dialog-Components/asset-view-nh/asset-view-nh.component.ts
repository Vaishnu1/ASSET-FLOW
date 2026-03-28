import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';


@Component({
  selector: 'app-asset-view-nh',
  templateUrl: './asset-view-nh.component.html',
  styleUrls: ['./asset-view-nh.component.css']
})
export class AssetViewNhComponent implements OnInit {

  assetMainForm: FormGroup;
  assetHdrId:Number = 0;

  contractLength = '0';
  contractDataSource: any = [];
  contractDisplayCol = ['sno', 'contractNo', 'coverageType', 'contractingPartyType',
    'contractStatus', 'contractStartDtDisp', 'active', 'netContractValue']

  constructor(private matDialogRef: MatDialogRef<AssetViewNhComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private router: Router,
              private dialog: MatDialog,
              private userSessionService: UserSessionService,
              private translateService: TranslateService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.assetMainForm = new FormGroup({
      modelId: new FormControl(),
      assetGroup: new FormControl(''),
      modelImage: new FormControl(''),
      assetGroupName: new FormControl(''),
      modelName: new FormControl(''),
      manufacturerName: new FormControl(),
      lifeSpan: new FormControl(0),
      manufacturerId: new FormControl(),
      assetGroupId: new FormControl(),
      assetCategoryId: new FormControl(),
      assetCategoryName: new FormControl(),
      assetTypeId: new FormControl(),
      assetTypeName: new FormControl(),
      subCategoryId: new FormControl(),
      subCategoryName: new FormControl(),
      functionality: new FormControl(''),

      assetCode: new FormControl(''),
      serialNo: new FormControl(''),
      warrentyDays: new FormControl(''),
      installationDtDisp: new FormControl(''),
      warrentyStartDtDisp: new FormControl('',),
      warrentyEndDtDisp: new FormControl('',),
      assetHdrAttribute1: new FormControl(''),
      assetHdrAttribute2: new FormControl(''),
      assetHdrAttribute3: new FormControl(''),
      assetHdrAttribute4: new FormControl(''),
      assetHdrAttribute5: new FormControl(''),
      assetHdrAttribute6: new FormControl(''),
      assetHdrAttribute7: new FormControl(''),
      assetHdrAttribute8: new FormControl(''),
      assetHdrAttribute9: new FormControl(''),
      assetHdrAttribute10: new FormControl(''),
      supplierName: new FormControl(),
      supplierId: new FormControl(0),
      purchaseCd: new FormControl(''),
      purchaseOrderNo: new FormControl(''),
      purchaseDtDisp: new FormControl(''),
      originalPurchaseAmt: new FormControl(0),
      exchangeRt: new FormControl(0),
      localPurchaseAmt: new FormControl(0),
      localTaxRate: new FormControl(0),
      localTaxAmt: new FormControl(0),
      totalPurchaseAmt: new FormControl(0),
      yearOfManufacture: new FormControl(''),
      residualValue: new FormControl(''),
      returnDownValue: new FormControl(''),
      scrapValue: new FormControl(''),
      purchaseCurrencyCode: new FormControl(''),
      // maintenanceType : new FormControl(),
      ownershipType: new FormControl(),
      assignTo: new FormControl(''),
      locationId: new FormControl(''),
      locationName: new FormControl(null),
      assetStatus: new FormControl(null),
      assetStatusId: new FormControl(0),
      departmentId: new FormControl(0),
      departmentName: new FormControl(null),
      personInCharge: new FormControl(null),
      personInChargeId: new FormControl(0),
      assetHdrId: new FormControl(''),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      functionalStatus: new FormControl(),
      amcPercent: new FormControl(0),
      cmcPercent: new FormControl(0),
      amcValue: new FormControl(0),
      cmcValue: new FormControl(0),
      amcEscalationPercentage: new FormControl(0),
      cmcEscalationPercentage: new FormControl(0),
      amcEscalationValue: new FormControl(0),
      cmcEscalationValue: new FormControl(0),
      criticalNatureUnit: new FormControl(),
      warrentyEndDtDispForLabor: new FormControl(''),
      pmFrequency: new FormControl(),
      pmMonth: new FormControl(),
      lastPMdoneBy: new FormControl(''),
      lastPMdoneDt: new FormControl(''),
      lastPMdoneDtDisp: new FormControl(''),
      paFrequency: new FormControl(),
      paMonth: new FormControl(),
      lastPAdoneBy: new FormControl(''),
      lastPAdoneDt: new FormControl(''),
      lastPAdoneDtDisp: new FormControl(''),
      qaFrequency: new FormControl(''),
      qaMonth: new FormControl(''),
      lastQAdoneBy: new FormControl(''),
      lastQAdoneDt: new FormControl(''),
      lastQAdoneDtDisp: new FormControl(''),
      subDepartmentId: new FormControl(0),
      subDepartmentName: new FormControl(),
      subDepartmentInchargeName: new FormControl(''),
      strategyYear: new FormControl(''),
      warrantyCoveragePart: new FormControl(),
      warrantyCoverageLabor: new FormControl(),
      serviceEngg1: new FormControl(null),
      serviceEngg1Id: new FormControl(0),
      serviceEngg2: new FormControl(null),
      serviceEngg2Id: new FormControl(0),
      serviceEngg3: new FormControl(null),
      serviceEngg3Id: new FormControl(0),
      serviceEngg4: new FormControl(null),
      serviceEngg4Id: new FormControl(0),
      serviceEngg5: new FormControl(''),
      serviceEngg5Id: new FormControl(0)
    });

    this.assetHdrId = this.data.assetHdrId;
    this.validateEditMode();
  }

  validateEditMode(){
    this.commonService.commonGetService('fetchAssetDtlByAssetId.sams',this.assetHdrId).subscribe(
      data => {
        this.assetMainForm.patchValue(data.responseData);
        this.loadContractDetailsForAssetList();
      }
    )
  }

  closeModal(){
    this.matDialogRef.close();
  }

  loadContractDetailsForAssetList() {
    this.contractDataSource = [];
    this.commonService.commonGetService('loadAssetContract.sams', this.assetMainForm.controls.assetHdrId.value).subscribe(
      data => {
        if (data.success) {
          this.contractDataSource = data.responseData;
          this.contractLength = this.contractDataSource.length;
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }

}
