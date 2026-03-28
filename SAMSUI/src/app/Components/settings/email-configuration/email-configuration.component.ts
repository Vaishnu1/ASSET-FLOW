import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmailConfigService } from '../service/email-config.service';
import { CommonService } from 'src/app/Services/common-service/common.service';
@Component({
  selector: 'app-email-configuration',
  templateUrl: './email-configuration.component.html',
  styleUrls: ['./email-configuration.component.css']
})
export class EmailConfigurationComponent implements OnInit {
  serverForm!: FormGroup;



  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private emailConfigService: EmailConfigService, private commonService: CommonService) { }

  securityTypeList:any[] = [];
  ngOnInit(): void {
    this.serverForm = this.fb.group({
      emailId: [''],
      emailName: [''],
      securityType: [''],
      smtpHost: [''],
      smtpPortNumber: [''],
      smtpUserName: [''],
      smtpPassword: [''],
      fromEmailId: [''],
      fromEmailName: [''],
      replyToEmailId: [''],
      maxAttachmentSize: [''],
      maxConcurrentConnectionCount: [''],
      secured: [false],
      verifyCertificate: [false],
      active: [false],
      isMaster: [false]
    });

    this.emailConfigService.getSecurityTypes().subscribe((res:any)=>{
      this.securityTypeList = res;
  });
  }
goBack(){
  this.router.navigate(['/home/settings/EmailConfigList']);
}




 saveConfig(){

const form = this.serverForm.value;

const payload = {
  // emailId: form.fromEmailId,
  // emailName: form.fromEmailName,
  smtpHost: form.smtpHost,
  smtpPortNumber: form.smtpPortNumber,
  smtpUsername: form.smtpUserName,
  smtpPassword: form.smtpPassword,
  securityType: form.securityType,
  fromEmailId: form.fromEmailId,
  fromEmailName: form.fromEmailName,
  replyToEmailId: form.replyToEmailId,
  maxAttachmentSize: form.maxAttachmentSize,
  maxConcurrentConnectionCount: form.maxConcurrentConnectionCount,
  secured: form.secured,
  verifyCertificate: form.verifyCertificate,
  active: form.active,
  isMaster: form.isMaster
};
console.log(payload);
this.emailConfigService.saveEmailServerConfig(payload)
.subscribe({

    //  SUCCESS
    next: (res: any) => {

      console.log(res);

      this.commonService.openToastSuccessMessage("Email configuration saved successfully");

      this.goBack();  // navigate after success
    },

    //  ERROR
    error: (err) => {

      console.log("Error:", err);

      const errorMsg = err?.error?.message || "";

      if (
        errorMsg.toLowerCase().includes("duplicate") ||
        errorMsg.toLowerCase().includes("already")
      ) {
        this.commonService.openToastErrorMessage("Email configuration already exists");
      } else {
        this.commonService.openToastErrorMessage("Failed to save configuration");
      }

    }

  });

}

// deleteConfig(id:number){

//   if(confirm("Are you sure you want to delete?")){

//     this.emailConfigService.deleteEmailServerConfig(id)
//     .subscribe((res:any)=>{
//         console.log(res);
//         alert("Deleted successfully");
//         this.router.navigate(['/home/settings/EmailConfigList']);
//     });

//   }

// }
}
