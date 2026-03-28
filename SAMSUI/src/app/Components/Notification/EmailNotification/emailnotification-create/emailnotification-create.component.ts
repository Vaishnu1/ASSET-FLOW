import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { from } from 'rxjs';
import { EmailNotificationService } from 'src/app/Components/Notification/EmailNotification/services/email-notification.service';

import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-email-notification-create',
  templateUrl: './emailnotification-create.component.html',
  styleUrls: ['./emailnotification-create.component.css']
})
export class EmailnotificationCreateComponent implements OnInit {

  templateForm!: FormGroup;
  mode: 'create' | 'edit' | 'view' = 'create';
  templateId!: number;

  emailModuleList: any[] = [];
  emailProcessList: any[] = [];
scrollsyncEmailModule = false;
scrollsyncEmailProcess = false;

emailModulePageNumber = 1;
emailProcessPageNumber = 1;

recordsPerPageForCombo: any;
getData: any;
selectedModuleId: any;
emailUserList: any[] = [];
scrollsyncEmailUser = false;
emailUserPageNumber = 1;
selectedTab: number = 0;
showSettingsButton = false;
 emailServerList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private emailService: EmailNotificationService,
    private commonService: CommonService,
    private userSessionService: UserSessionService
  ) {}


  listOfEmailModule(searchValue: any) {

    //  Prevent multiple parallel calls
    if (this.scrollsyncEmailModule) {
      return;
    }

    this.scrollsyncEmailModule = true;

    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';

    this.commonService.getComboResults(
      'listOfAllEmailModuleCombo.sams',
      searchValue?.term || '',
      '',
      '',
      this.recordsPerPageForCombo,
      this.emailModulePageNumber
    ).subscribe({
      next: (data) => {

        this.getData = this.commonService.fetchDataList(
          searchValue,
          this.emailModulePageNumber,
          this.emailModuleList,
          data.responseData.comboList
        );

        this.emailModulePageNumber = this.getData.pageNumber;
        this.emailModuleList = this.getData.dataList;

        this.scrollsyncEmailModule = false;
      },
      error: () => {
        //  Always reset flag even on error
        this.scrollsyncEmailModule = false;
      }
    
    });
  }
  listOfEmailProcess(searchValue: any) {

    if (this.scrollsyncEmailProcess) return;

    const moduleId = this.templateForm.get('module')?.value;
    if (!moduleId) return;

    this.scrollsyncEmailProcess = true;

    this.commonService.getComboResults(
      'listOfAllEmailProcessCombo.sams',
      searchValue?.term || '',
      moduleId,
      '',
      '10',
      '1'
    ).subscribe({
      next: (data) => {

        this.emailProcessList = data?.responseData?.comboList || [];

        this.scrollsyncEmailProcess = false;
      },
      error: () => {
        this.scrollsyncEmailProcess = false;
      }
    });
  }


  listOfEmailUsers(searchValue: any) {

    if (this.scrollsyncEmailUser) {
      return;
    }

    this.scrollsyncEmailUser = true;

    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';

    this.commonService.getComboResults(
      'listOfAllUserEmailCombo.sams',
      searchValue?.term || '',
      '',
      '',
      this.recordsPerPageForCombo,
      1
    ).subscribe({
      next: (data) => {

        this.emailUserList = data?.responseData?.comboList || [];

        this.scrollsyncEmailUser = false;
      },
      error: () => {
        this.scrollsyncEmailUser = false;
      }
    });
  }



  // ================= INIT =================
  ngOnInit(): void {
    this.buildForm();
    // this.detectMode();

    const orgId = this.userSessionService.getUserOrgId();  

   this.emailService.getActiveEmailServers(orgId).subscribe((res: any) => {
  this.emailServerList = res.map((e: any) => ({
    emailid: e.emailid
  }));
});
this.detectMode();
  }

  // ================= LOAD PROCESSES =================
  onModuleChange(event: any) {

    if (event) {
      this.selectedModuleId = event;
      this.templateForm.patchValue({ process: '' });

      // reset process dropdown properly
      this.emailProcessPageNumber = 1;
      this.emailProcessList = [];

    } else {

      this.emailProcessList = [];
      this.emailProcessPageNumber = 1;
    }
  }


  private shouldGoToNotificationFlow(): boolean {

    const moduleId = this.templateForm.value.module;
    const processId = this.templateForm.value.process;

    const selectedModule = this.emailModuleList.find(m => m.moduleId === moduleId);

    const selectedProcess = this.emailProcessList.find(p => p.processId === processId);

    const moduleName = selectedModule?.moduleName;
    const processName = selectedProcess?.processName;

    return (
      (moduleName === 'SERVICE REQUEST' && processName === 'SERVICE REQUEST ESCALATION') ||
      (moduleName === 'CONTRACT' && processName === 'CONTRACT EXPIRY')
    );
  }


  // ================= FORM =================
  private buildForm() {
    this.templateForm = this.fb.group({
      templateName: ['', [Validators.required, Validators.maxLength(150)]],
      module: ['', Validators.required],
      process: ['', Validators.required],
      subject: ['', [Validators.required, Validators.maxLength(255)]],
      emailid: ['',Validators.required],
      recipientsTo: [[], [Validators.required]],
      recipientsCc: [[]],
      recipientsBcc: [[]],
      isActive: [true],
      emailBody: ['', [Validators.required]]
    });
  }

  // ================= MODE =================
  private detectMode() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.templateId = +id;

        if (this.route.snapshot.routeConfig?.path?.includes('emailView')) {
          this.mode = 'view';
          this.loadTemplateById(this.templateId);
          this.templateForm.disable();
        } else {
          this.mode = 'edit';
          this.loadTemplateById(this.templateId);
         
        }
      }
    });
  }


  // ================= LOAD TEMPLATE =================
 
    loadTemplateById(id: number) {
      this.emailService.getTemplateById(id).subscribe((res: any) => {

        const moduleId = Number(res.module);
        const processId = Number(res.process);
        console.log('Selected processId:', processId, typeof processId);
        console.log('from email :', res.emailid);
        console.log('FULL RESPONSE:', res);
        console.log('Process list sample:', this.emailProcessList[0]?.processId, typeof this.emailProcessList[0]?.processId);
        // Load FULL module list first
        this.commonService.getComboResults(
          'listOfAllEmailModuleCombo.sams',
          '',
          '',
          '',
          '',
          '1'
        ).subscribe((moduleData: any) => {

        this.emailModuleList = moduleData?.responseData?.comboList || [];

        // Patch module AFTER module list loaded
        this.templateForm.patchValue({
          templateName: res.templateName,
          module: moduleId,
          
          subject: res.subject,
          emailid: res.emailid,
          recipientsTo:  this.splitEmails(res.emailTo),
          recipientsCc:  this.splitEmails(res.emailCc),
          recipientsBcc: this.splitEmails(res.emailBcc),
          isActive: res.isActive,
          emailBody: res.emailBody
          
        });

         
        // Now load FULL process list
        this.commonService.getComboResults(
          'listOfAllEmailProcessCombo.sams',
          '',
          moduleId,
          '',
          '',
          '1'
        ).subscribe((processData: any) => {

          this.emailProcessList = processData?.responseData?.comboList || [];

            // Patch process AFTER process list loaded
            this.templateForm.patchValue({
            process: processId 
          });

        });

      });

    });
  }



  // ================= SAVE =================
  // saveTemplate() {

  //   if (this.templateForm.invalid) {
  //     this.templateForm.markAllAsTouched();
  //     return;
  //   }

  //   const payload = {
  //     ...this.mapFormToPayload(),
  //     orgId: Number(localStorage.getItem('orgId')),
  //     createdBy: 'SYSTEM'
  //   };
    
  //   this.emailService.createTemplate(payload).subscribe((res: any) => {

  //     // ✅ Success
  //     this.commonService.openToastSuccessMessage("Template created successfully");


  //     this.templateId = res.emailTemplateId;

  //     if (this.shouldGoToNotificationFlow()) {

  //       this.router.navigate(
  //         ['home/notification/emailNotificationType'],
  //         { state: { templateId: this.templateId } }
  //       );

  //     } else {

  //       this.goBack();

  //     }
      
  //     //  ERROR BLOCK (THIS WAS MISSING)
  //   error: (err) => {

  //     console.log("Error:", err);

  //     //  Handle duplicate constraint
  //     if (
  //       err?.error?.message?.toLowerCase().includes("duplicate") ||
  //       err?.error?.message?.toLowerCase().includes("unique")
  //     ) {
  //       this.commonService.openToastErrorMessage(
  //         "Template already exists for this module and process"
  //       );
  //     } else {
  //       this.commonService.openToastErrorMessage(
  //         err?.error?.message || "Something went wrong"
  //       );
  //     }

  //   }

  //   });

  // }

  saveTemplate() {

  if (this.templateForm.invalid) {
    this.templateForm.markAllAsTouched();
    this.commonService.openToastWarningMessage("Please fill all required fields");
    return;
  }

  const cleanedBody = this.cleanTemplate(this.templateForm.value.emailBody);
  const payload = {
    ...this.mapFormToPayload(),
    emailBody: cleanedBody,
    orgId: this.userSessionService.getUserOrgId(),
    entityId: this.userSessionService.getUserLocationId(),
    createdBy: 'SYSTEM'
  };

  this.emailService.createTemplate(payload).subscribe({

    //  SUCCESS
    next: (res: any) => {

      this.commonService.openToastSuccessMessage("Template created successfully");

      this.templateId = res.emailTemplateId;

      if (this.shouldGoToNotificationFlow()) {
        this.router.navigate(
          ['home/notification/emailNotificationType'],
          { state: { templateId: this.templateId } }
        );
      } else {
        this.goBack();
      }

    },

    //  ERROR (THIS WILL NOW WORK)
    error: (err) => {

      console.log("Error:", err);

      const errorMsg = err?.error?.message || err?.message || "";

      if (
        errorMsg.toLowerCase().includes("duplicate") ||
        errorMsg.toLowerCase().includes("unique")
      ) {
        this.commonService.openToastErrorMessage(
          "Template already exists for this module and process"
        );
      } else if (errorMsg.toLowerCase().includes("validation")) {
        this.commonService.openToastErrorMessage(
          "Validation error: Please check your input"
        );
      }

    }

  });

}
   
  private splitEmails(value: string | null | undefined): string[] {
  if (!value || value.trim() === '') return [];
  return value
    .split(/[,;]/)          // split on BOTH comma and semicolon
    .map(e => e.trim())
    .filter(e => e.includes('@'));  // only keep valid-looking emails
}

  // ================= UPDATE =================
  updateTemplate() {
    if (this.templateForm.invalid) {
      this.templateForm.markAllAsTouched();
      return;
    }
 
    const cleanedBody = this.cleanTemplate(this.templateForm.value.emailBody);
    const payload = {
      ...this.mapFormToPayload(),
      emailBody: cleanedBody,
      updatedBy: 'SYSTEM'
    };
 
    console.log('Update payload:', payload);
    this.emailService.updateTemplate(this.templateId, payload).subscribe({
      next: () => {

      this.commonService.openToastSuccessMessage("Template updated successfully");

      if (this.shouldGoToNotificationFlow()) {

        this.router.navigate([
          'home/notification/notificationTypeEdit',
          this.templateId
        ]);

      } else {

        this.goBack();

      }
    },

      error: (err) => {

  console.log("Error response:", err);

  if (err?.error?.message?.includes("duplicate") ||
      err?.error?.message?.includes("unique")) {

    this.commonService.openToastErrorMessage(
      "Template already exists for this module and process"
    );

  } else {

    this.commonService.openToastErrorMessage(
      err?.error?.message || "Update failed"
    );

  }

}
    });

  }

  deleteTemplate() {
    this.emailService.deleteTemplate(this.templateId)
      .subscribe(() => this.goBack());
  }
  
  private mapFormToPayload() {

    const moduleId = this.templateForm.value.module;
    const processId = this.templateForm.value.process;

    const selectedModule = this.emailModuleList.find(m => m.moduleId == moduleId);

    const selectedProcess = this.emailProcessList.find(p => p.processId == processId);

    return {
      templateName: this.templateForm.value.templateName,

      module: moduleId,
      moduleName: selectedModule? selectedModule.moduleName: null,

      process: processId,
      processName: selectedProcess? selectedProcess.processName: null,

      subject: this.templateForm.value.subject,
      emailid: this.templateForm.value.emailid,
      emailTo: this.templateForm.value.recipientsTo?.join(';'),
      emailCc: this.templateForm.value.recipientsCc?.join(';'),
      emailBcc: this.templateForm.value.recipientsBcc?.join(';'),
      emailBody: this.templateForm.value.emailBody,
      
      isActive: this.templateForm.value.isActive
    };
    
  }

  // ================= NAVIGATION =================
  goBack() {
    this.router.navigate(['home/notification/emailList']);
  }

  clear() {
    this.templateForm.reset({ isActive: true });
  }

  onSubmit() {
    if (this.mode === 'create') {
      this.saveTemplate();
    } else if (this.mode === 'edit') {
      this.updateTemplate();
    }
  }

  toggleSettings() {
    this.showSettingsButton = !this.showSettingsButton;
  }
  
 goToNotificationType(): void {

  const processId = this.templateForm.get('process')?.value;

  if (!processId) return;

  const selectedProcess = this.emailProcessList.find(
    p => p.processId == processId
  );

  const processName = selectedProcess?.processName;

  if (processName !== 'CONTRACT EXPIRY' && processName !== 'SERVICE REQUEST ESCALATION') {
    return;
  }

  if (this.mode === 'create') {
    this.router.navigate(
      ['home/notification/emailNotificationType'],
      { state: { templateId: this.templateId } }
    );
  }

  if (this.mode === 'edit') {
    this.router.navigate([
      'home/notification/notificationTypeEdit',
      this.templateId
    ]);
  }

  if (this.mode === 'view') {
    this.router.navigate([
      'home/notification/notificationTypeView',
      this.templateId
    ]);
  }
}



  // ================= EDITOR =================
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '250px',
    minHeight: '250px',
    placeholder: 'Enter email content here...',
    translate: 'no',
    defaultFontName: 'Arial',
    toolbarPosition: 'top',
    sanitize: false  
  };

  cleanTemplate(content: string): string {
  if (!content) return content;

  return content
    .replace(/\$\{\s*<\/[^>]+>/g, '${')
    .replace(/<\/[^>]+>\s*\}/g, '}')
    .replace(/<[^>]+>\s*\$\{/g, '${')
    .replace(/\}\s*<[^>]+>/g, '}')
    .replace(/\$\{\s+/g, '${')
    .replace(/\s+\}/g, '}');
}
}
