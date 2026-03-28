import { Component, OnInit, HostListener, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { SubMenus } from 'src/app/Constants/SubMenusList';
import { timer, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AssetAssignee } from 'src/app/Model/master/asset-assignee';
import { ServiceRequestModel } from 'src/app/Model/serviceRequest/serviceRequest';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  emailStatus: any;
  loginId: any;
  tokenId: any;

  show: boolean = true
  color = 'primary';
  isSticky: boolean = false;
  mode = 'determinate';
  value = 50;
  topsearchvalue : any = '';
  UserLoggedIn: boolean;
  showMenu: Boolean = false;
  obj: any;
  notifyCount : number;
  assetAssignmentCount: number;
  srCount: number;

  userName: string;

  locationSetForm: FormGroup;
  locationList: any;
  menuList: any;
  public menuData:Menus[];

  //HEADER VISIBILITY PURPOSE
  settingsFlag: boolean = false;
  registrationFlag: boolean = false;
  approvalsFlag: boolean = false;
  serviceFlag: boolean = false;
  reportsFlag: boolean = false;
  organizationMaster:boolean= false;
  assetMaster:boolean= false;
  itemMaster:boolean= false;
  serviceMaster:boolean= false;
  UserMaster:boolean= false;
  labelMenu:boolean= false;
  //REGISTRATION
  assetFlag:boolean= false;
  itemFlag:boolean= false;
  supplierFlag:boolean= false;
  modelFlag:boolean= false;
  employeeFlag:boolean= false;
  //SERVICE
  breakdownFlag:boolean= false;
  preventiveFlag:boolean= false;
  qualityAssuranceFlag:boolean= false;
  performanceAssuranceFlag:boolean= false;
  //REPORTS
  manageReportsFlag:boolean= false;
  ViewRequestFlag:boolean= false;
  //APPROVAL
  itemApprovalFlag:boolean= false;
  //PURCHASE
  purchaseFlag: boolean = false;
  purchaseRequestFlag: boolean = false;
  purchaseOrderFlag: boolean = false;

  subscription: Subscription;
  theme: string;

  empUrl: any;
  emgPath: String = "";
  empImage: any = "";
  userImage: string;
  assetAssignee: AssetAssignee;
 
  serviceRequestModel: ServiceRequestModel;

  pwdChangeCount: number;
 
  constructor( 
    
    private router: Router,
    private userSessionService: UserSessionService,
    private commonService: CommonService,  
    private samsConstants: AssetOptimaConstants,
    private subMenuList: SubMenus) {   
      this.serviceRequestModel = new ServiceRequestModel();
      this.assetAssignee = new AssetAssignee(); 
      this.pwdChangeCount = 0;
  } 

  ngOnInit() {
    this.empUrl= this.samsConstants.connectionUrl;
    this.empImage = this.userSessionService.getUserImage();  
    this.pwdChangeCount = this.userSessionService.getpwdChangeCount();

    this.locationSetForm = new FormGroup({
      locationName : new FormControl(''),
      locationId : new FormControl('')
    });
    this.userName = this.userSessionService.getUserName();
    this.userImage = this.empUrl+"getImage.sams?resourceName="+this.empImage

    this.emailStatus = this.samsConstants.emailValidityStatus;
    this.UserLoggedIn = true;
    this.loginId = localStorage.getItem('loginId');
    this.tokenId = localStorage.getItem('tokenId');

    this.notifyCount = this.userSessionService.getNotifyCount();
    this.assetAssignmentCount = this.userSessionService.getAssetAssignmentCount();
    this.srCount = this.userSessionService.getSrOpenCount();

    this.subscription = timer(0, 10000).pipe(
      switchMap(() => this.commonService.commonGetService('userNotifyCount.sams'))
    ).subscribe(data => this.notifyCount = data.responseData); 
       
  }

  ngAfterViewInit() {
    this.locationSetForm.controls.locationName.setValue(this.samsConstants.defaultuserLocName);
    this.locationSetForm.controls.locationId.setValue(this.samsConstants.defaultuserLocId);
  }

  //  getEmailStatus(value: any) {
  // }
  
  // clearMail() {
  //   this.emailStatus = '1';
  //   localStorage.clear();
  // }

  onTopSearchChange(topsearchValue : string ) {  
    this.topsearchvalue = topsearchValue;
  }

  orgCreate(orgId){
    this.router.navigate(['/newOrg/'+orgId]);

  }

  logout() {
    this.userSessionService.endUserSession();
    this.UserLoggedIn = false;
    this.theme = localStorage.getItem('theme');
    localStorage.clear();
    localStorage.setItem('theme',this.theme);
    this.router.navigate(['/login']);
    this.subMenuList = new SubMenus();

}

 @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 120;
  }

  listOfLocation(searchTerms){
    this.commonService.getComboResults('listAllUserLocForCombo.sams',searchTerms != null ? searchTerms.term : '').subscribe(
      (data) =>{
        this.locationList = data.responseData.comboList;
      }
    );
  }

  getLocationList(event){
    this.samsConstants.userLocId=event.locationId;
    this.samsConstants.userLocName=event.locationName;
    this.samsConstants.defaultuserLocId=event.locationId;
    this.samsConstants.defaultuserLocName=event.locationName;
  }

  changeLocationValue(locationId){
    this.commonService.changeMessage1(locationId);

  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
   }

   locationCreate(locId,mode){
    this.router.navigate(['home/settingsmaster/locationCreate/' + locId + '/' + mode]);
   }

   assetCreate(assetId,mode){  
    this.router.navigate(['home/asset/assetCreate/', assetId,mode, 'asset_info' ]); 
   }

   itemCreate(itemId){ 
    this.router.navigate(['home/inventory/itemCreate/' + itemId + '/create']);
   }

   supplierCreate(supplierId,mode){
    this.router.navigate(['home/purchase/supplierCreate/' + supplierId + '/' + mode]);
   }

   associateCreate(associateId){
    this.router.navigate(['home/employee/employeeCreate/' + associateId ]);
   }

   showNotifyScreen() {
    this.router.navigate(['home/workflow/workflowApproval']);
  }

  showAssetAssignment() {
    this.router.navigate(['home/serviceRequest/assetAssignment']);
  }

  showOpenSrCount(){
    this.router.navigate(['home/serviceRequest/serviceRequestList']);
  }

  verifyMail() {
    this.obj = { 
      'loginId': this.loginId,
      'tokenId': this.tokenId
     };
    this.commonService.commonInsertService('verifyEmailIdNow.sams',this.obj).subscribe(
      data => {
        if(data.success){
          this.commonService.openToastSuccessMessage(data.message);
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

  routingToDashboard(){
    this.router.navigate(['home/dashboard']);
  }
  
  loadNofityCount() { 
    
    this.commonService.commonGetService('userNotifyCount.sams').subscribe(
      (data) => { 
        var sd = document.getElementById("allnotifications") 
        if(sd){ 
              sd.firstElementChild.innerHTML = data.responseData; 
        } 
        console.log("count error" , data.responseData);
        this.notifyCount = data.responseData;
      }
    )
  }

  fetchList(){
    this.assetAssignee.pageNumber = 0;
    this.assetAssignee.recordsPerPage = 100;
    this.commonService.commonListService('fetchListOfAllAssigneeList.sams', this.assetAssignee).subscribe(
      data => {
        if (data.success) { 
        var sd = document.getElementById("menuAssetAssignment")

        if(sd){ 
              sd.firstElementChild.innerHTML = data.responseData.dataTotalRecCount; 
        } 

          this.assetAssignmentCount = data.responseData.dataTotalRecCount;
          
        } else {
        }
      }, error => {
      }
    );
  }   



showHelpDocument(): void {
  console.log("test manual link",localStorage.getItem('helpManual'))
  if(localStorage.getItem('helpManual') != null){
    window.open('assets/help_user_manual/help/index.html#/'+localStorage.getItem('helpManual'), '_blank');
  } else{
    window.open('assets/help_user_manual/help/index.html', '_blank');
  }    
}

}

export class Menus {
  public  id ?:number;
	public  text ?:string;
	public  leaf ?:boolean;
	public  cls ?:string;
	public  menus ?:Menus[];
	public  iconCls ?:string;
	public  desc ?:string;
	public  expanded ?:boolean; 
	public  moduleId ?:number;
	public  routerPath ?:string;
}
