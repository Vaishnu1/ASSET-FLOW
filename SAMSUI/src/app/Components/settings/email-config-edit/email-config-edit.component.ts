import { Component, OnInit } from '@angular/core';
import { EmailConfigService } from '../service/email-config.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-email-config-edit',
  templateUrl: './email-config-edit.component.html',
  styleUrls: ['./email-config-edit.component.css']
})
export class EmailConfigEditComponent implements OnInit {

  

  serverForm!: FormGroup;
  id:any;
  securityTypeList:any=[];

  constructor(
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private emailConfigService:EmailConfigService,
    private commonService: CommonService
  ){}
  
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
    // get id from URL
    this.id = this.route.snapshot.paramMap.get('id');

    // load dropdown
    this.loadSecurityTypes();

   // load data
   this.loadEmailConfig();
     
  }

  loadSecurityTypes(){
    this.emailConfigService.getSecurityTypes().subscribe((res:any)=>{
      this.securityTypeList = res;
    });
  }

//   loadEmailConfig(){
//     this.emailConfigService.getEmailServerById(this.id).subscribe((res:any)=>{

//   const data = res.responseData;

//   // patch values to form
//   this.serverForm.patchValue({
//     // emailId:data.emailId,
//     // emailName:data.emailName,
//     securityType:data.securityType,
//     smtpHost:data.smtpHost,
//     smtpPortNumber:data.smtpPort,
//     smtpUserName:data.smtpUserName,
//     smtpPassword:data.smtpPassword,
//     fromEmailId:data.fromEmailId,
//     fromEmailName:data.fromEmailName,
//     // replyToEmailId:data.replyToEmailId,
//     maxAttachmentSize:data.maxAttachmentSize,
//     maxConcurrentConnectionCount:data.maxConcurrentConnectionCount,
//     secured:data.secured,
//     verifyCertificate:data.verifyCertificate,
//     active:data.active,
//     isMaster:data.isMaster
//   });

// });

//   }
loadEmailConfig(){

  this.emailConfigService.getEmailServerById(this.id)
  .subscribe((res:any)=>{

    console.log("API RESPONSE:",res);

    const data = res.responseData.emailConfig;

this.serverForm.patchValue({
  fromEmailId: data.fromEmailId,
  fromEmailName: data.fromEmailName,
  securityType: data.securityType,
  smtpHost: data.smtpHost,
  smtpPortNumber: data.smtpPortNumber,
  smtpUserName: data.smtpUsername,
  smtpPassword: data.smtpPassword,
  maxAttachmentSize: data.maxAttachmentSize,
  maxConcurrentConnectionCount: data.maxConcurrentConnectionCount,
  secured: data.secured,
  verifyCertificate: data.verifyCertificate,
  active: data.active,
  isMaster: data.isMaster
});

    if(data){
      this.serverForm.patchValue(data);
    }

  });

}
updateConfig(){

  // check if form exists
  if(!this.serverForm){
    return;
  }

  // form validation check
  if(this.serverForm.invalid){
    this.serverForm.markAllAsTouched();
    return;
  }

  const payload = this.serverForm.value;

  console.log("UPDATE PAYLOAD:", payload);

  this.emailConfigService.updateEmailServerConfig(this.id, payload)
//   .subscribe({

//     next:(res:any)=>{
//       alert("Updated Successfully");
//       this.router.navigate(['/home/settings/EmailConfigList']);
//     },

//     error:(err)=>{
//       console.error("Update Error:",err);
//       alert("Update Failed");
//     }

//   });

// }
.subscribe({

    // ✅ SUCCESS
    next: (res: any) => {

      this.commonService.openToastSuccessMessage("Email configuration updated successfully");

      this.router.navigate(['/home/settings/EmailConfigList']);
    },

    // ❌ ERROR
    error: (err) => {

      console.error("Update Error:", err);

      const errorMsg = err?.error?.message || "";

      if (
        errorMsg.toLowerCase().includes("duplicate") ||
        errorMsg.toLowerCase().includes("already")
      ) {
        this.commonService.openToastErrorMessage("Email configuration already exists");
      } else {
        this.commonService.openToastErrorMessage("Update failed");
      }

    }

  });

}
goBack(){
this.router.navigate(['/home/settings/EmailConfigList']);
}
}
