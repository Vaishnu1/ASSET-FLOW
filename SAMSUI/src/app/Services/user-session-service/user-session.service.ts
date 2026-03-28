import { Injectable } from '@angular/core';
import { AssetOptimaConstants } from '../../../app/Constants/AssetOptimaConstants';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { CommonService } from '../common-service/common.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(private samsConstants: AssetOptimaConstants,
    private idle: Idle,
    private keepAlive: Keepalive,
    private commonService: CommonService,
    private router: Router
  ) { }

  initiateUserSession(userData: any) {
    localStorage.setItem(this.samsConstants.loggedInUserInfo, JSON.stringify(userData));
    // this.idle.setIdle((userData.userLocationSessionTimeOut * 60) - 5);
    // this.idle.setTimeout(5);
    // this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    // this.idle.onIdleEnd.subscribe(() => this.idleState = 'No Longer idle.');
    // this.idle.onTimeout.subscribe(() => {
    //   this.idleState = 'Timed out!';
    //   this.timedOut = true;
    //   if (this.timedOut) {
    //     this.commonService.userLogoutService().subscribe(
    //       (data) => {
    //         if (data.success) {
    //           alert("Session has Expired!!! Kindly Login Again to Proceed Further"); 
    //           this.endUserSession();
    //           localStorage.clear();
    //           this.router.navigate(['/login']);
    //           this.commonService.openToastSuccessMessage(data.message);
    //         }
    //         else {
    //           this.commonService.openToastErrorMessage(data.message);
    //         }
    //       }
    //     );
    //   }
    // });

    // this.idle.onIdleStart.subscribe(() => this.idleState = 'You have gone idle!');
    // this.idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // this.keepAlive.interval(5);
    // this.keepAlive.onPing.subscribe(() => this.lastPing = new Date());

    // this.resetUserSession();

  }

  getUserOrgId(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.orgId;
  }

  getUserLocationId(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.locationId;
  }

  getUserGroupAccess(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    if (!user.userGroupAccess) {
      return new Proxy({}, { get: () => ({ readFlagDisplay: true, writeFlagDisplay: true, updateFlagDisplay: true, deleteFlagDisplay: true }) });
    }
    return user.userGroupAccess;
  }

  getUserId(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.userId;
  }

  getUserName(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.userName;
  }

  getUserLocationName(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.locationName;
  }

  getUserEmpId(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.empId;
  }

  getUserEmpName(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.employeeTO ? user.employeeTO.employeeFirstName : 'Admin';
  }

  getNotifyCount(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.notifyCount;
  }

  endUserSession() {
    // localStorage.clear();
  }

  resetUserSession() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  checkUserPresence(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return (user === null) ? false : true;
  }

  getToken(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.token;
  }

  getEmailValidityStatus(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.emailValidityStatus;
  }

  getDisplayRegionWiseDashboard():any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.displayRegionWiseDashboard;
  }

  getUserEmpEmailId(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.employeeTO ? user.employeeTO.officeEmailId : 'admin@domain.com';
  }

  getAssetAssignmentCount(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.assetAssigneeCount;
  }

  getSrOpenCount(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.srCount;
  }

  getUserLoginId(): any {
    const user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.loginId;
  }

  getUserImage(): any {
    const user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.employeeTO ? user.employeeTO.imagePath : '';
  }

  getCountryName(): any{
    const user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.countryName;
  }

  getCountryId(): any{
    const user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.countryId;
  }

  getUserEmailId(): any{
    const user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.emailId;
  }

  getlocCurrCd(): any{
    const user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.locCurrCd;
  }
  
  getpwdChangeCount(): any {
    const user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.pwdChangeCount;
  }
  
  getDateFormat(): any {
    const user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.dateFormat;
  }

  getUserData(): any {
    const user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user;
  }

  getUserLocationCode(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));    
    return user.locationTO ? user.locationTO.locationCode : 'LOC';
  }

  getUserOrgCode(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.locationTO ? user.locationTO.orgCode : 'ORG';
  }

  getUserRegionCode(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.locationTO && user.locationTO.regionTO ? user.locationTO.regionTO.regionCode : 'REG';
  }

  getUserLegalEntityCode(): any {
    let user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));    
    return user.locationTO && user.locationTO.legalEntityTO ? user.locationTO.legalEntityTO.legalEntityCode : 'LE';
  }
  
  getUserFinancialStartYear(): any{
    const user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.financialEndYear;
  }

  getUserFinancialEndYear(): any{
    const user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.financialStartYear;
  }

  getContactPhoneNo(): any{
    const user = JSON.parse(localStorage.getItem(this.samsConstants.loggedInUserInfo));
    return user.phoneNumber;
  }
}