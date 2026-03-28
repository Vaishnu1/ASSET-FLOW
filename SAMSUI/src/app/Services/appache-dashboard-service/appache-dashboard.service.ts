import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
// import { embedDashboard } from '@superset-ui/embedded-sdk';
import { SuperSetConstants } from 'src/app/Constants/superSetConstants';


@Injectable({
  providedIn: 'root'
})
export class AppacheDashboardService {
  // server
  // private apiUrl = 'http://192.168.7.37:8088/api/v1/security';
  // private apiUrl = this.superSetConstants.superSetApiUrl;

  constructor(private http: HttpClient,
    private superSetConstants: SuperSetConstants
  ) { }

  // private fetchAccessToken(): Observable<any> {

  //   const body = this.superSetConstants.superSetLoginCredentials;

  //   const headers = new HttpHeaders({ "Content-Type": "application/json" });

  //   return this.http.post<any>(`${this.apiUrl}/login`, body, { headers });
  // }

  /**
   * 
   * @returns { guest token } using @param { accessToken }
   */
    // private fetchGuestToken(accessToken: any): Observable<any> {
    //   const body = {
    //     "resources": [
    //       {
    //         "type": "dashboard",
    //         "id": this.superSetConstants.superSetDashboardUUID
    //       }
    //     ],
    //     /**
    //      * rls: Row Level Security, this differs for client to client ,like what to show each client
    //      */
    //     // "rls": [{ "clause": "stage_of_development = ''" }],
    //     "rls": [],
    //     "user": this.superSetConstants.superSetGuestUserLoginCredentials
    //   };
  
    //   const acc = accessToken["access_token"]; //accessToken is an object in which there are two tokens access_token and refresh_token ,out of which we just need to send access_token to get guest_token
    //   const headers = new HttpHeaders({
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${acc}`,
    //   });
      
    //   //guest_token URL should end with forward_slash(/)
    //   return this.http.post<any>(`${this.apiUrl}/guest_token/`, body, { headers });
    // }

  /**
   * 
   * @returns { guest Token }
   */
  // getGuestToken(): Observable<any> {
  //   return this.fetchAccessToken().pipe(
  //     catchError((error) => {
  //       console.error(error);
  //       return throwError(error);
  //     }),
  //     switchMap((accessToken: any) => this.fetchGuestToken(accessToken))
  //   );
  // }


  /**
   * 
   * @returns { dashboard }
   */
  // embedDashboard(): Observable<void> {
  //   return new Observable((observer) => {
  //     this.getGuestToken().subscribe(
  //       (token) => {
  //         embedDashboard({
  //           // id: '69712018-253b-4474-baa3-06dd1cb372be', // Replace with your dashboard ID
  //           // supersetDomain: 'http://localhost:8088',
  //           id: this.superSetConstants.superSetDashboardUUID,
  //           supersetDomain: this.superSetConstants.superSetDomain,
  //           mountPoint: document.getElementById('dashboard'),
  //           fetchGuestToken: () => token["token"],
  //           dashboardUiConfig: {
  //             hideTitle: false,
  //             hideChartControls: true,
  //             hideTab: true,
  //           },
  //         });
  //         console.log("mountPoint: document.getElementById('dashboard')",document.getElementById('dashboard'))
  //         observer.next();
  //         observer.complete();
  //       },
  //       (error) => {
  //         observer.error(error);
  //       }
  //     );
  //   });
  // }



  // next tab to show the dashboard
  // openDashboardInNewTab(): void {
  //   this.getGuestToken().subscribe(
  //     (token) => {
  //       const dashboardUrl = `http://192.168.7.37:8088/superset/dashboard/13/?token=${token["token"]}`;
  //       window.open(dashboardUrl, '_blank');
  //     },
  //     (error) => {
  //       console.error('Failed to fetch guest token:', error);
  //     }
  //   );
  // }


  /**
 * @returns { Observable<string> } - Dashboard URL with token
 */
// getDashboardUrl(): Observable<string> {
//   return this.getGuestToken().pipe(
//     switchMap((token) => {
//       const dashboardUrl = `http://192.168.7.37:8088/superset/dashboard/24/?token=${token["token"]}`;
//       return of(dashboardUrl);
//     }),
//     catchError((error) => {
//       console.error('Failed to fetch guest token:', error);
//       return throwError(error);
//     })
//   );
// }



}
