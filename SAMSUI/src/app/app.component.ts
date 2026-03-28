import { Component, OnInit, AfterViewInit, Input  } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouterEvent, NavigationCancel, NavigationError } from '@angular/router';
import { UserSessionService } from './Services/user-session-service/user-session.service';
import { CommonService } from './Services/common-service/common.service';
import { TranslateService } from '@ngx-translate/core';
import { AssetOptimaConstants } from './Constants/AssetOptimaConstants';
import { DateTimeService } from './Services/date-time/date-time.service';
// import * as POM from '../../pom.xml';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {

  title = 'view';
  UserLoggedIn: Boolean = false;
  loader: boolean = true;
  isUserLoggedIn: boolean;
  mavenVersion: string="";
  as: any;
  isLabelloaded: boolean =  false;

  constructor(private router: Router,
              private userSessionService: UserSessionService,
              private commonService: CommonService,
              private translateService: TranslateService,
              private translate: TranslateService,
              private _dateTimeService: DateTimeService,
              private assetOptimaConstants: AssetOptimaConstants) {
            translate.setDefaultLang('en');
            // this.readMavenVersion(); // Hitting a non-existent .sams endpoint throws a 404 'Server Not Reachable'

               
              }


 ngOnInit() {    
   
   this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
         this.isUserLoggedIn = this.userSessionService.checkUserPresence();
         this.UserLoggedIn = this.isUserLoggedIn;
         if (event.url === '/login' || event.url === '/') {
            this.UserLoggedIn=false;
            this.isLabelloaded = true;
         } else {
            if(!this.isUserLoggedIn) {
              this.isLabelloaded = true;
              if(!((event.url).includes('/approve/reject'))){                
                this.router.navigate(['/login']);
                this.isLabelloaded = false;
              }
            }else{
              this.commonService.commonGetService('loadLabelInfo.sams').subscribe(
                data => {
                  if (data.success) {
                   this.isLabelloaded = true;
                    this._dateTimeService.format = (this.userSessionService.getDateFormat()).toUpperCase();;
                    this.translateService.setTranslation('en', data.responseData, true);
                    this.isUserLoggedIn = this.userSessionService.checkUserPresence();
                    this.commonService.hideSpinner(); 
                  }else{
                    this.commonService.hideSpinner();
                  }
                },error => {
                  this.commonService.hideSpinner();
                });
            }                      
         }
      }
   });

     // Override the default route configuration for the specific component
  // const routesWithoutAuthentication: string[] = ['/approve/reject'];
  // this.router.events.subscribe((event) => {
  //   if (event instanceof NavigationEnd) {
  //     const currentUrl = event.url;
  //     const isRouteWithoutAuthentication = routesWithoutAuthentication.includes(currentUrl);
  //     if (isRouteWithoutAuthentication) {
  //       this.isUserLoggedIn = true;
  //       this.UserLoggedIn = true;
  //     }
  //   }
  // });

}

ngAfterViewInit() {
   this.router.events
       .subscribe((event) => {
           if(event instanceof NavigationStart) {
               this.loader = true;
           }
           else if (
               event instanceof NavigationEnd || 
               event instanceof NavigationCancel
               ) {
              setTimeout(() => {
               this.loader = false;
              }, 1000);
           }
       });
}
// ngOnDestroy(): void {
//    this.commonService.userLogoutService().subscribe(
//       (data) => {
//          if(data.success) {
//             this.commonService.openToastSuccessMessage(data.message);
//             this.userSessionService.endUserSession();
//          }else {
//             this.commonService.openToastWarningMessage(data.message);
//          }
//       }
//    );
// }

readMavenVersion(){
   this.commonService.commonGetService('readProductVersion.sams', '').subscribe(
      data => {
        if (data.success) {
         this.assetOptimaConstants.version= data.responseData;
        }else{
         this.commonService.openToastWarningMessage(this.assetOptimaConstants.serverError);
        }
      }, error =>{
         this.commonService.openToastWarningMessage(this.assetOptimaConstants.serverError);
      }
    );
}

}

