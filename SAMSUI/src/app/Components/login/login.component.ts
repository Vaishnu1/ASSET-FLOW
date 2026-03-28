import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from '../Common-components/header/header.component';

import { DateTimeService } from '../../Services/date-time/date-time.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  title = 'Asset Optima';

  loginForm: FormGroup;
  forgotpwdForm: FormGroup;
  userName: FormControl;
  password: FormControl;
  preferredTimeZone: FormControl;
  isDisabled: boolean = false;
  initCount: number = 0;
  showPwd: boolean = false;
  hide: boolean = true;
  selectedIndex: number = 0;
  public mavenVersion: string = "";

  @Output() userMenus = new EventEmitter<any>();
  @Output() emailStatus = new EventEmitter<number>();
  @Output() loginId = new EventEmitter<number>();
  @Output() tokenId = new EventEmitter<number>();

  @ViewChild(HeaderComponent) headercomponent: HeaderComponent;

  constructor(private router: Router,
    private samsService: AssetOptimaServices,
    private commonService: CommonService,
    public samsConstants: AssetOptimaConstants,
    private translateService: TranslateService,
    private userSessionService: UserSessionService,
    private _dateTimeService: DateTimeService,
    private titleService: Title) {
    this.mavenVersion = this.samsConstants.version;
  }


  ngOnInit() {

    this.mavenVersion = this.samsConstants.version;
    this.titleService.setTitle(this.title);
    this.initiateForm();
    this.forgotpwdForm = new FormGroup({
      pwdName: new FormControl('', Validators.required),
      pwdEmail: new FormControl('', [Validators.required, Validators.pattern(this.samsConstants.emailValidation)])
    })

  }
 
  authenticateUser() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.loginForm.controls.preferredTimeZone.setValue(timezone);
    this.commonService.showSpinner();
    this.commonService.loginUserService(this.samsService.authenticateUser, this.loginForm.value).subscribe(
      (data) => {
        if (data.success) {          
          
          this._dateTimeService.format = (data.responseData.dateFormat).toUpperCase();

          this.userSessionService.initiateUserSession(data.responseData);
          this.samsConstants.defaultuserLocId = data.responseData.locationId;
          this.samsConstants.defaultuserLocName = data.responseData.locationName;
          this.samsConstants.fyStartYear = data.responseData.financialStartYear;
          this.samsConstants.fyEndYear = data.responseData.financialEndYear;
          this.samsConstants.locCurrCd = data.responseData.locCurrCd;
          this.samsConstants.relocationApproval= data.responseData.assetRelocationApproval;
          this.samsConstants.purchaseRequisitionApproval=data.responseData.purchaseRequestApproval;
          this.samsConstants.orgPurchaseReqForNHModule=data.responseData.orgPurchaseModuleForNH;
          this.samsConstants.tlApproved=data.responseData.tlApproved;
          this.samsConstants.rmApproved=data.responseData.rmApproved;
          this.samsConstants.sourcingApproved=data.responseData.sourcingApproved;
          this.samsConstants.itemApproval=data.responseData.itemApproval;
          this.samsConstants.assetGatePassApproval=data.responseData.assetGatePassApproval;
          this.samsConstants.assetPhysicalAuditApproval=data.responseData.assetPhysicalAuditApproval;         
          this.samsConstants.defaultUseFulYrsForAsset=data.responseData.defaultUseFulLife;
          this.samsConstants.manufacturerApproval=data.responseData.manufacturerApproval;
          this.samsConstants.loginUserPhoneNumber = data.responseData.phoneNumber;
          this.samsConstants.contractApproval=data.responseData.contractApproval;
          this.samsConstants.contractCancel=data.responseData.contractCancel;
          this.samsConstants.loanReturnApproval=data.responseData.loanReturnApproval;
          this.samsConstants.locationType=data.responseData.locationType;
          this.samsConstants.defaultuserLocRegionName = data.responseData.userLocRegionName;
          this.samsConstants.emailValidityStatus = data.responseData.emailValidityStatus;
          localStorage.setItem('loginId', data.responseData.loginId);
          localStorage.setItem('tokenId', data.responseData.token);
          localStorage.setItem('orgId', data.responseData.orgId);
          localStorage.setItem('EntityId', data.responseData.entityId);
          this.samsConstants.pwdChangeCount = data.responseData.pwdChangeCount;
         
          
          
          // By-passing missing loadLabelInfo.sams endpoint
          this.commonService.hideSpinner();
          if(this.userSessionService.getpwdChangeCount() > 0) {
            this.router.navigate(['/home/dashboard']);
          } else {
            this.router.navigate(['/home/changePassword']);
          }
        }else {
          this.commonService.hideSpinner();
          this.commonService.openToastWarningMessage(data.message);
        }
      }, error => {
        this.commonService.hideSpinner();
        this.commonService.openToastErrorMessage(this.samsConstants.serverError);
      }
    );
    localStorage.clear();
  }

  initiateForm() {
    this.userName = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.preferredTimeZone = new FormControl('');
    this.loginForm = new FormGroup({
      userName: this.userName,
      password: this.password,
      preferredTimeZone: this.preferredTimeZone
    });
  }


  onStart(): Observable<boolean> {
    if (this.userName.hasError('required') &&
      this.password.hasError('required') && this.initCount === 1) {
      this.isDisabled = false;
      this.initCount++;
    }

    return new BehaviorSubject<boolean>(true).asObservable();
  }

  validateForm() {
    if (this.userName.value !== '' && this.password.value !== '') {
      this.isDisabled = false;
    } else if (this.userName.value === '' || this.password.value === '') {
      this.isDisabled = true;
    }
  }
  viewPwd() {
    this.showPwd = !this.showPwd;
    this.hide = !this.hide;
  }
  emailSend() {

    this.commonService.commonInsertService('forgotPassword.sams', this.forgotpwdForm.value).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }
  nextStep() {
    this.selectedIndex = this.selectedIndex + 1;
  }

 
}
