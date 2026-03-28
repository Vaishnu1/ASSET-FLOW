import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonService} from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
@Injectable({ providedIn: 'root' })
export class EmailNotificationService {

  private baseUrl = 'http://localhost:8080/emailServices';

  constructor(private http: HttpClient, private commonService: CommonService, private userSessionService: UserSessionService) { }

  // ================= TEMPLATE =================

  createTemplate(data: any) {
    const orgId = this.userSessionService.getUserOrgId();  

    const requestBody = {
    ...data,
    orgId: Number(orgId)
  };

    return this.http.post(`${this.baseUrl}/api/templates`, requestBody);
  }

  updateTemplate(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/api/templates/${id}`, data);
  }

  getTemplateById(id: number) {
    return this.http.get(`${this.baseUrl}/api/templates/${id}`);
  }

  deleteTemplate(id: number) {
    return this.http.delete(`${this.baseUrl}/api/templates/${id}`);
  }

  // getTemplateList(page: number, size: number) {
  //   const params = new HttpParams()
  //     .set('page', page)
  //     .set('size', size);

  //   return this.http.get(`${this.baseUrl}/templates`, { params });
  // }
  getTemplateList(page: number, size: number) {

  const orgId = this.userSessionService.getUserOrgId();  
  const entityId = this.userSessionService.getUserLocationId();

  const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('orgId', orgId)
    .set('entityId', entityId);  


  return this.http.get(`${this.baseUrl}/api/templates`, { params });
}


//   searchTemplates(searchObj: any, page: number, size: number) {
//   let params = new HttpParams()
//     .set('page', page)
//     .set('size', size);

//   if (searchObj.templateName) {
//     params = params.set('name', searchObj.templateName);
//   }

//   if (searchObj.module) {
//     params = params.set('module', searchObj.module);
//   }

//   if (searchObj.process) {
//     params = params.set('process', searchObj.process);
//   }

//   return this.http.get(`${this.baseUrl}/api/templates/search`, { params });
// }
  
   searchTemplates(searchObj: any, page: number, size: number) {

 const orgId = this.userSessionService.getUserOrgId();     
  const entityId = this.userSessionService.getUserLocationId();
  console.log("enityId in service:", entityId);
  let params = new HttpParams()
    .set('page', page)
    .set('size', size);

  if (orgId) {
    params = params.set('orgId', orgId);
  }

  if (entityId) {
    params = params.set('entityId', entityId);
  }

  if (searchObj.templateName) {
    params = params.set('name', searchObj.templateName);
  }

  if (searchObj.module) {
    params = params.set('module', searchObj.module);
  }

  if (searchObj.process) {
    params = params.set('process', searchObj.process);
  }

  console.log("FINAL PARAMS:", params.toString()); // debug

  return this.http.get(`${this.baseUrl}/api/templates/search`, { params });
}
// ================= NOTIFICATION TYPE =================

// GET for edit / view by template id
getNotificationTypeByTemplateId(templateId: number) {
  return this.http.get(
    `${this.baseUrl}/api/notificationType/template/${templateId}`
  );
}

// SAVE
saveNotificationType(data: any) {
  return this.http.post(
    `${this.baseUrl}/api/notificationType`,
    data
  );
}

// UPDATE  (uses notificationId)
updateNotificationType(notificationId: number, data: any) {
  return this.http.put(
    `${this.baseUrl}/api/notificationType/${notificationId}`,
    data
  );
}

// DELETE (uses notificationId)
deleteNotificationType(notificationId: number) {
  return this.http.delete(
    `${this.baseUrl}/api/notificationType/${notificationId}`
  );
}

// ================= SCHEDULER =================

createScheduler(data: any) {
  return this.http.post(`${this.baseUrl}/api/scheduler`, data);
}

updateScheduler(id: number, data: any) {
  return this.http.put(`${this.baseUrl}/api/scheduler/${id}`, data);
}

getSchedulerList() {
  return this.http.get(`${this.baseUrl}/api/scheduler`);
}

deleteScheduler(id: number) {
  return this.http.delete(`${this.baseUrl}/api/scheduler/${id}`);
}

getSchedulerById(id: number) {
  return this.http.get(`${this.baseUrl}/api/scheduler/${id}`);
}
getSchedulerByNotificationId(notificationId: number) {
  return this.http.get(
    `${this.baseUrl}/api/scheduler/notification/${notificationId}`
  );
}

// getEmailModules() {
//   return this.commonService.commonGetService(
//     'listOfAllEmailModuleCombo.sams',
//     '',     // searchParameter
//     '',     // attribute1
//     '',     // attribute2
//     '10',   // recordsPerPage
//     '1'     // pageNumber
//   );  
// }

// getEmailProcesses(moduleId: number) {
//   return this.commonService.commonGetService(
//     'listOfAllEmailProcessCombo.sams',
//     '',          // searchParameter
//     moduleId,    // attribute1 (VERY IMPORTANT)
//     '',          // attribute2
//     '10',
//     '1'
//   ); 
// }


getActiveEmailServers(orgId: number) {
  return this.http.get(
    this.baseUrl + '/email-config/email-servers',
    { params: { orgId: orgId } }
  );
}

// getTimeZones(){
//   return this.http.get(
//     this.baseUrl + 'api/scheduler/getTimeZones');
// }

getTimeZones() {
  return this.http.get(`${this.baseUrl}/api/scheduler/getTimeZones`);
}
}