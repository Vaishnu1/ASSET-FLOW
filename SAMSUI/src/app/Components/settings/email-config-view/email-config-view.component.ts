import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailConfigService } from '../service/email-config.service';

@Component({
  selector: 'app-email-config-view',
  templateUrl: './email-config-view.component.html',
  styleUrls: ['./email-config-view.component.css']
})
export class EmailConfigViewComponent implements OnInit {


  
    serverForm!: FormGroup;
    id:any;
    
  
    constructor(
      private fb:FormBuilder,
      private route:ActivatedRoute,
      private router:Router,
      private emailConfigService:EmailConfigService
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
  
      
      
  
     // load data
     this.loadEmailConfig();
       
    }
  
    
  
 
  loadEmailConfig(){

  this.emailConfigService.getEmailServerById(this.id)
  .subscribe((res:any)=>{

    console.log("API RESPONSE:",res);

    const data = res.responseData.emailConfig;

    if(data){

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

      //Disable form for view-only mode
      this.serverForm.disable();

    }

  });

}
  
  goBack(){
  this.router.navigate(['/home/settings/EmailConfigList']);
  }
  }
  


