import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class SuperSetConstants {

    // superSet domain
    readonly superSetDomain = "http://192.168.7.37:8088";

    // get SuperSet token
    readonly superSetApiUrl = 'http://192.168.7.37:8088/api/v1/security';

    // superSet dashboard embeded UUID
    readonly superSetDashboardUUID = "fb1e59b9-82f1-49af-90f2-8340056d994f";    

    // login users
    readonly superSetLoginCredentials = {
        "username": "TL",
        "password": "admin",
        "provider": "db",
        "refresh": true
      };

    // Guest Users
    readonly superSetGuestUserLoginCredentials = {
       "username": "TL",
        "first_name": "TL",
        "last_name": "AO"
      };

    
}