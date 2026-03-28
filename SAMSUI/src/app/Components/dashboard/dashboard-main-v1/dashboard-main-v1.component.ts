import { Component, ElementRef, OnInit } from '@angular/core';
import { AppacheDashboardService } from 'src/app/Services/appache-dashboard-service/appache-dashboard.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-dashboard-main-v1',
  templateUrl: './dashboard-main-v1.component.html',
  styleUrls: ['./dashboard-main-v1.component.css']
})
export class DashboardMainV1Component implements OnInit {
  constructor(private elementRef: ElementRef,
    // private embedService: AppacheDashboardService,
    private readonly userSessionService: UserSessionService) { 
  }

  ngOnInit(): void {
    // const orgId = this.userSessionService.getUserOrgId();
    // const locId = this.userSessionService.getUserLocationId();
    // this.embedSupersetDashboard(orgId,locId);
    // this.openSupersetInNewTab();
    // this.embedSupersetDashboard1();
  }

  // embedSupersetDashboard(orgId: number, locId: number): void {
  //   const dashboardElement = this.elementRef.nativeElement.querySelector('#dashboard');
  
  //   if (dashboardElement) {
  //     this.embedService.embedDashboard().subscribe(
  //       () => {
  //         // Adjust the size of the embedded iframe
  //         const iframe = dashboardElement.querySelector('iframe');
  //         if (iframe) {
  //           // Construct the new URL with the query parameters
  //           const originalSrc = iframe.src;
  //           // const modifiedSrc = `${originalSrc}&org_id=${orgId}&loc_id=${locId}`;
            
  //           const modifiedSrc = `${originalSrc}&org_id=${orgId}&expand_filters=0`;

            
  //           // Update the iframe's src with the new URL
  //           iframe.src = modifiedSrc;
  
  //           // Set the iframe's size as needed
  //           iframe.style.width = '100%';
  //           iframe.style.height = '1000px';
  //         }
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }
  


  // openSupersetInNewTab(): void {
  //   this.embedService.openDashboardInNewTab();
  // }


  // embedSupersetDashboard1(): void {
  //   this.embedService.getDashboardUrl().subscribe(
  //     (url: string) => {
  //       const dashboardElement = this.elementRef.nativeElement.querySelector('#dashboard');

  //       if (dashboardElement) {
  //         // Create or find an iframe element
  //         let iframe = dashboardElement.querySelector('iframe');
  //         if (!iframe) {
  //           iframe = document.createElement('iframe');
  //           dashboardElement.appendChild(iframe);
  //         }

  //         // Set iframe properties
  //         iframe.src = url;
  //         iframe.style.width = '100%'; // Set the width as needed
  //         iframe.style.height = '1000px'; // Set the height as needed
  //         iframe.style.border = 'none'; // Optional: Remove border
  //       }
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }



}
