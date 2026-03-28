import { Component, OnInit } from '@angular/core';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-service-parameter',
  templateUrl: './service-parameter.component.html',
  styleUrls: ['./service-parameter.component.css']
})
export class ServiceParameterComponent implements OnInit {

  parameterModuleAccess: ModuleAccessModel;
  parameterTypeModuleAccess: ModuleAccessModel;

  constructor(
    private userSession: UserSessionService
  ) { 
    this.parameterModuleAccess = new ModuleAccessModel();
    this.parameterTypeModuleAccess = new ModuleAccessModel();
  }

  ngOnInit() {
    this.parameterModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_PARAMETER'];
    this.parameterTypeModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_PARAMETER_TYPE'];
  }

}
