import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';

// angular material and other libraries

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DateAdapter, MAT_DATE_FORMATS,MatDateFormats  } from '../../node_modules/@angular/material/core';
import { AppRoutingModule } from './app.routing.module';

import { MaterialModule } from './@shared/material.module';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AssetOptimaServices } from './Constants/AssetOptimaServices';
import { AssetOptimaConstants } from './Constants/AssetOptimaConstants';
import { HttpInterceptorService } from './Services/http-interceptor-service/http-interceptor.service';
import { ComboListData } from './Constants/ComboListData';
import { AppComponent } from './app.component';


import { DataService } from './Services/dataService';
import { SubMenus } from './Constants/SubMenusList';
import { WINDOW_PROVIDERS } from './Services/window-providers';

import { LoginComponent } from './Components/login/login.component';

import {TranslateModule} from '@ngx-translate/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ApproveRejectAssetAssigneeComponent } from './Components/approve-reject-asset-assignee/approve-reject-asset-assignee.component';
import { ConfirmConfirmationComponent } from './Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { RejectConfirmationComponent } from './Components/Common-components/reject-confirmation/reject-confirmation.component';
import { ContractAddAssetComponent } from './Components/asset/contract/contract-add-asset/contract-add-asset.component';
import { PoTcTemplateListComponent } from './Components/Dialog-Components/po-tc-template-list/po-tc-template-list.component';
import { AssetViewNhComponent } from './Components/Dialog-Components/asset-view-nh/asset-view-nh.component';
import { ChangeAssetCodeCreateComponent } from './Components/asset/Asset/change-asset-code-create/change-asset-code-create.component';
import { CommonWorkflowApprovalDialogComponent } from './Components/workflow/workflowApproval/common-workflow-approval-dialog/common-workflow-approval-dialog.component';
import { GatePassSourceInfoComponent } from './Components/asset/Gate-Pass/gate-pass-source-info/gate-pass-source-info.component';
import { GatePassCollectedInfoComponent } from './Components/asset/Gate-Pass/gate-pass-collected-info/gate-pass-collected-info.component';

export class MyFormat {
  value = 1;
  constructor() {}
  get display() {
    return this.value == 1
      ? {
          dateInput: "YYYY/MM/DD",
          monthYearLabel: "MMM YYYY",
          dateA11yLabel: "LL",
          monthYearA11yLabel: "MMMM YYYY"
        }
      : {
          dateInput: "DD/MM/YYYY",
          monthYearLabel: "MM YYYY",
          dateA11yLabel: "DD/MM/YYYY",
          monthYearA11yLabel: "MM YYYY"
        };
  }
  get parse() {
    return this.value == 1
      ? {
          dateInput: "YYYY/MM/DD"
        }
      : {
          dateInput: "DD/MM/YYYY"
        };
  }
}

const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD MMMM YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    ApproveRejectAssetAssigneeComponent,
    ConfirmConfirmationComponent,
    RejectConfirmationComponent,
    ContractAddAssetComponent,
    PoTcTemplateListComponent,
    AssetViewNhComponent,
    ChangeAssetCodeCreateComponent,
    GatePassSourceInfoComponent,
    GatePassCollectedInfoComponent,
    
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    TranslateModule.forRoot(),
    MaterialModule],
  providers: [AssetOptimaConstants,AssetOptimaServices,ComboListData, SubMenus,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
     DataService,
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MyFormat },MatDatepickerModule, WINDOW_PROVIDERS,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
