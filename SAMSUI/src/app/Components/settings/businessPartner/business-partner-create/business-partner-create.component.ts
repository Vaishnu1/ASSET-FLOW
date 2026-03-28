import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from 'echarts';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { Location } from '@angular/common';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { BusinessPartnerSiteCreateComponent } from '../business-partner-site-create/business-partner-site-create.component';

@Component({
  selector: 'app-business-partner-create',
  templateUrl: './business-partner-create.component.html',
  styleUrls: ['./business-partner-create.component.css']
})
export class BusinessPartnerCreateComponent implements OnInit {

  flagForToggleBtn: boolean = false;


  title = 'Asset Optima - Business Partner';
  businessPartnerForm: FormGroup;

  public model: Model;
  getData: getData;

  @ViewChild('businessPartnerNamefocus') businessPartnerfocusSet: ElementRef;

  modeDisplay: boolean = false;
  buttonDisableInEdit: boolean;
  table: boolean = true;
  uploadFlagBusinessPartner: boolean = false;

  buttonSubmit: string;
  headingDisplay: string;

  partnerRolesSource: any = [];
  partnerRolesDisplayedColumns: string[] = ['businessPartnerRoleName', 'roleActive'];

  CommonhintMsg = new CommonHint();
  uploadBtnFlag: boolean = true;

  businessPartnerSiteDispCols = ['sno', 'partnerSiteName', 'partnerSiteArea', 'partnerSiteCity', 'partnerSiteState', 'partnerSiteCurCd', 'contactPersonName',
    'partnerSiteContactEmailId', 'partnerSitePersonPhoneNo', 'action'];
  businessPartnerSiteList: any[] = [];
  subloaderBusinessPartnerSite: boolean = false;

  selectedIndex: number;

  partnerRolesNotSelected : boolean = true;

  constructor(private dialog: MatDialog,
    private commonService: CommonService,
    private service: AssetOptimaServices,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private detectorRefs: ChangeDetectorRef,
    private titleService: Title,
    private userSession: UserSessionService,
    private readonly router: Router) {
    this.model = new Model();
    this.getData = new getData();
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.businessPartnerForm = new FormGroup({
      businessPartnerId: new FormControl(''),
      orgId: new FormControl(''),
      orgName: new FormControl(''),
      businessPartnerName: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      businessPartnerCode: new FormControl('', [Validators.required,Validators.maxLength(20)]),
      activeFromDtDisp: new FormControl(this.commonService.convertToDateStringyyyy_mm_dd(new Date()), [Validators.required]),
      activeTillDtDisp: new FormControl(''),
      active: new FormControl(true),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      businessPartnerSiteList: new FormControl('', []),
      businessPartnerRoleMapList: new FormControl('', []),
      activeFromDt: new FormControl('')
    });
    this.validateEditMode();
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.businessPartnerfocusSet);
  }

  backTOItemScreen() {
    localStorage.setItem('presentRoute', this.router.url);
    this.location.back();
  }

  backToOrganization() {
    this.location.back();
  }

  public businessPartnerId: any;
  viewMode: boolean = false;

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        var mode = params.mode;
        primaryId = Number(primaryId);
        if (primaryId <= 0) {
          this.buttonSubmit = 'Submit';
          this.headingDisplay = 'Create';
          this.buttonDisableInEdit = false;
          this.businessPartnerForm.controls['activeFromDtDisp'].setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
          console.log("check date format ", this.businessPartnerForm.controls['activeFromDtDisp'].value);
          console.log("check date format ", this.businessPartnerForm.controls['activeFromDt'].value);
          this.loadPartnerRoles();
        } else {
          this.businessPartnerId = Number(primaryId);

          if (mode === "view") {
            this.viewMode = true;
            this.headingDisplay = "View";
            this.buttonSubmit = "Update";
            this.businessPartnerForm.disable();
          } else {
            this.viewMode = false;
            this.headingDisplay = "Edit";
            this.buttonSubmit = "Update";
          }

          this.commonService.showSpinner();
          this.commonService.commonGetService('fetchBusinessPartnerInfo.sams', primaryId).subscribe(
            data => {
              this.businessPartnerForm.patchValue(data.responseData);

              this.partnerRolesSource = data.responseData.businessPartnerRoleMapList;
              this.businessPartnerForm.controls.businessPartnerRoleMapList.setValue(this.partnerRolesSource);

              this.businessPartnerSiteList = data.responseData.businessPartnerSiteList;
              this.businessPartnerForm.controls.businessPartnerSiteList.setValue(this.businessPartnerSiteList);

              this.commonService.hideSpinner();
            });
        }
      }
    );
  }

  loadPartnerRoles() {
    this.commonService.commonGetService('listPartnerRoles.sams').subscribe(
      (resultData) => {
        this.partnerRolesSource = resultData.responseData.dataList;
      }
    );
  }

  updateBtnflag() {
    this.uploadBtnFlag = false;
    this.partnerRolesNotSel();
  }

  addBusinessPartnerSite(businessPartnerSite, index, mode, sourceScreen) {
    let dialogRef = this.dialog.open(BusinessPartnerSiteCreateComponent, {
      width: '80%',
      data: {
        'businessPartnerSite': businessPartnerSite,
        'sourceScreen': sourceScreen,
        'businessPartnerName': this.businessPartnerForm.controls.businessPartnerName.value,
        'mode': mode
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          if (index === null) {
            this.businessPartnerSiteList = this.businessPartnerSiteList.concat([data]);
          } else if (index !== null && index !== undefined && index !== '') {
            this.businessPartnerSiteList.splice(index, 1);
            this.businessPartnerSiteList = this.businessPartnerSiteList.concat([data]);
          }
        }
        this.tabelValidation();
      });
  }

  tabelValidation() {
    this.table = (this.businessPartnerSiteList.length > 0) ? false : true;
  }

  exit() {
    localStorage.setItem('previousRoute', this.router.url);
    this.location.back();
    this.router.navigate(['home/settingsmaster/organization']);
  }

  save() {
    const roleActiveStates = this.getRoleActiveStates();
    for (let i = 0; i < roleActiveStates.length; i++) {
      if (roleActiveStates[i]) {
        this.flagForToggleBtn = true;
        break;
      }
    }

    if (!this.flagForToggleBtn) {
      this.commonService.openToastWarningMessage('Kindly select atleast one Business Partner Role!');
    } else if (this.businessPartnerSiteList.length == 0) {
      this.commonService.openToastWarningMessage('Kindly add atlest one Business Partner Site!');
    }
    else {
      this.uploadFlagBusinessPartner = true;
      this.businessPartnerForm.controls.businessPartnerSiteList.setValue(this.businessPartnerSiteList);
      this.businessPartnerForm.controls.businessPartnerRoleMapList.setValue(this.partnerRolesSource);
  
      this.commonService.commonInsertService(this.service.saveUpdateBusinessPartner,this.businessPartnerForm.getRawValue()).subscribe(
        data => {
          if(data.success){
            this.commonService.openToastSuccessMessage(data.message);
            this.exit();
            this.uploadFlagBusinessPartner = false;
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFlagBusinessPartner = false;
          }
        }
      );
    }
    this.flagForToggleBtn = false;
  }


  getRoleActiveStates(): boolean[] {
    return this.partnerRolesSource.map(element => element.roleActive);
  }

  partnerRolesNotSel(){
    const roleActiveStates = this.getRoleActiveStates();
    for (let i = 0; i < roleActiveStates.length; i++) {
      if (roleActiveStates[i]) {
         this.partnerRolesNotSelected = false;
      }
    }
  }


}
