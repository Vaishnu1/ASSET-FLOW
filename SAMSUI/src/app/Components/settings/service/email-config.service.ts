import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';

@Injectable({
  providedIn: 'root'
})
export class EmailConfigService {

  constructor(private http: HttpClient, private constants: AssetOptimaConstants) {}

  baseUrl = "http://localhost:8080/emailServices";

  getEmailServerConfigs(){
    return this.http.get(this.constants.getServerURL() + 'fetchEmailServerConfigList.sams');
  }

 searchEmailServers(payload:any){
  return this.http.get(
    this.constants.getServerURL() + 'searchEmailServerConfigList.sams',
    { params: payload }
  );
}

  // VIEW
  getEmailServerById(id:number){
    return this.http.get(
      this.constants.getServerURL() + 'viewEmailServerConfig.sams?id=' + id
    );
  }

  // SAVE
  saveEmailServerConfig(payload:any){
    return this.http.post(
      this.constants.getServerURL() + 'saveEmailServerConfig.sams',
      payload
    );
  }

  // UPDATE
  updateEmailServerConfig(id:number, payload:any){
    return this.http.put(
      this.constants.getServerURL() + 'updateEmailServerConfig.sams?id=' + id,
      payload
    );
  }

  // DELETE
  deleteEmailServerConfig(id:number){
    return this.http.delete(
      this.constants.getServerURL() + 'deleteEmailServerConfig.sams?id=' + id
    );
  }

  getSecurityTypes(){
  return this.http.get(
    this.baseUrl + '/SecurityTypes'
  );
}

getActiveEmailServers(orgId: number) {
  return this.http.get(
    this.baseUrl + '/email-config/email-servers',
    { params: { orgId: orgId } }
  );
}
}