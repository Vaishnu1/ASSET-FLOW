import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../app/Services/common-service/common.service'; 
import { Router } from '@angular/router';
import { AssetOptimaConstants } from '../../../../app/Constants/AssetOptimaConstants'; 
import { UserSessionService } from '../../../../app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-build-menu',
  templateUrl: './build-menu.component.html',
  styleUrls: ['./build-menu.component.css']
})
export class BuildMenuComponent implements OnInit {

  enteredButton = false;
  isMatMenuOpen = false;
  // isMatMenu2Open = false;
  prevButtonTrigger;

  public menuData: Menus[]; 

  showMenu: boolean = false;

  pwdChangeCount: number;

  constructor(
    private readonly commonService: CommonService,  
    private readonly router: Router, 
    private readonly samsConstants: AssetOptimaConstants,
    private readonly userSessionService: UserSessionService) { 
      this.pwdChangeCount = 0;
     }

  ngOnInit() {
    this.commonService.showSpinner();
    this.pwdChangeCount = this.userSessionService.getpwdChangeCount();
    if (this.pwdChangeCount > 0) {
    this.commonService.getListOfMenus("loadUserMenus.sams").subscribe(
      data => {
        if (data.success) {          
          this.menuData = data.menus;
          console.log(this.menuData);
          if (this.commonService.getPreviousUrl().includes('/login') && !(this.menuData.findIndex(data => data.text == "Dashboard") === -1)) {      
            this.router.navigate(['home/dashboard']);
          }
          this.commonService.hideSpinner();
        } else {
          this.commonService.hideSpinner();
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        this.commonService.hideSpinner();
        this.commonService.openToastErrorMessage(this.samsConstants.serverError);
      }
    )
    } else {
      this.router.navigate(['/home/changePassword']);
    }
  }

  enableDashboard(navigateMenu) { 
    if (navigateMenu === 'Dashboard') {
      this.router.navigate(['home/dashboard']);
      // this.router.navigate(['home/dashboard/superSet']);

    }
  }

  enableReports(navigateMenu) { 
    if (navigateMenu === 'Reports') {
      this.router.navigate(['home/manageReports']);
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  menuEnter() {
    this.isMatMenuOpen = true;
  }

  menuLeave(trigger, button) {
    setTimeout(() => {
      if (!this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80)
  }


  // buttonEnter(trigger, mainMenuName) {
  //   if (mainMenuName != 'Dashboard') {
  //     setTimeout(() => {
  //       if (this.prevButtonTrigger && this.prevButtonTrigger != trigger) {
  //         this.prevButtonTrigger.closeMenu();
  //         this.prevButtonTrigger = trigger;
  //         this.isMatMenuOpen = false;
  //         trigger.openMenu();
  //       }
  //       else if (!this.isMatMenuOpen) {
  //         this.enteredButton = true;
  //         this.prevButtonTrigger = trigger
  //         trigger.openMenu();
  //       }
  //       else {
  //         this.enteredButton = true;
  //         this.prevButtonTrigger = trigger
  //       }
  //     })
  //   }
  // }

  // buttonLeave(trigger, button, mainMenuName) {
  //   setTimeout(() => {
  //     if (this.enteredButton && !this.isMatMenuOpen) {
  //       trigger.closeMenu();
  //     } if (!this.isMatMenuOpen) {
  //       trigger.closeMenu();
  //     } else {
  //       this.enteredButton = false;
  //     }
  //   }, 100)
  // }

}


export class Menus {
  public id?: number;
  public text?: string;
  public leaf?: boolean;
  public cls?: string;
  public menus?: Menus[];
  public iconCls?: string;
  public desc?: string;
  public expanded?: boolean;
  public moduleId?: number;
  public routerPath?: string;
}


