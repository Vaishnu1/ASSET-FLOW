import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailNotificationService } from '../services/email-notification.service';
import { CommonService } from 'src/app/Services/common-service/common.service';


@Component({
  selector: 'app-emailnotification-type',
  templateUrl: './emailnotification-type.component.html',
  styleUrls: ['./emailnotification-type.component.css']
})
export class EmailnotificationTypeComponent implements OnInit {

  notificationTypeForm!: FormGroup;

  mode: 'create' | 'edit' | 'view' = 'create';
  templateId!: number;
  notificationId!: number;
  moduleList: any[] = [];
  processList: any[] = [];
  filteredToStatusList: any[] = [];
  srStatusList: any[] = [];

  typeList = [
    { label: 'Expiry', value: 'EXPIRY' },
    { label: 'Escalation', value: 'ESCALATION' }
  ];

  selectedType: 'EXPIRY' | 'ESCALATION' | null = null;
  private loadDropdowns() {
   
    
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private emailService: EmailNotificationService,
    private commonService: CommonService  
  ) {}

  private buildForm(): void {
    this.notificationTypeForm = this.fb.group({
      module: ['', Validators.required],
      process: ['', Validators.required],
      type: ['', Validators.required],
      isActive: [true],

      expiryConfig: this.fb.group({
        beforeDays: ['', [Validators.min(1), Validators.max(31)]],
        afterDays: ['', [Validators.min(1), Validators.max(31)]]
      }),

      escalationConfig: this.fb.group({
        fromStatus: [''],
        toStatus: [''],
        hours: ['',[Validators.min(1), Validators.max(24)]]
      })
    });
  }

  // ================= INIT =================
  ngOnInit(): void {

  this.buildForm();

  // TEMPLATE ID HANDLING 
  const nav = this.router.getCurrentNavigation();
  const idFromState = nav?.extras?.state?.['templateId'];

  if (idFromState) {
    this.templateId = idFromState;
  }

  if (!this.templateId && history.state?.templateId) {
    this.templateId = history.state.templateId;
  }

  const idFromUrl = this.route.snapshot.paramMap.get('id');
  if (!this.templateId && idFromUrl) {
    this.templateId = +idFromUrl;
  }

  console.log("Final TemplateId:", this.templateId);

  //  BASIC LOADS 
  this.loadSrStatusList();
  this.loadModules();

  const path = this.route.snapshot.routeConfig?.path;

  if (path === 'emailNotificationType' && idFromUrl) {
    this.mode = 'create';
  }

  if (path?.includes('notificationTypeEdit') && idFromUrl) {
    this.mode = 'edit';
    this.loadModulesAndThenLoadNotification();
  }

  if (path?.includes('notificationTypeView') && idFromUrl) {
    this.mode = 'view';
    this.loadModulesAndThenLoadNotification();
    this.notificationTypeForm.disable();
  }

  // VALUE SUBSCRIPTIONS
  this.notificationTypeForm.get('type')?.valueChanges.subscribe(val => {
    this.selectedType = val;
  });

  this.notificationTypeForm.get('module')?.valueChanges.subscribe(moduleId => {
    this.loadProcesses(moduleId);
  });

  this.notificationTypeForm.get('escalationConfig.fromStatus')?.valueChanges.subscribe(selectedFromStatus => {

    if (!selectedFromStatus) {
      this.filteredToStatusList = [...this.srStatusList];
      return;
    }

    this.filteredToStatusList = this.srStatusList.filter(
      status => status.id !== selectedFromStatus
    );

    this.notificationTypeForm.get('escalationConfig.toStatus')?.setValue(null);
  });

  this.notificationTypeForm.get('process')?.valueChanges.subscribe(processId => { 
    const selectedProcess = this.processList.find(p => p.processId == processId); 
    const processName = selectedProcess?.processName; 
    if (processName === 'CONTRACT EXPIRY') { 
      this.notificationTypeForm.patchValue({ type: 'EXPIRY' }); 
      this.selectedType = 'EXPIRY'; 
      this.notificationTypeForm.get('type')?.disable(); 
    } else if (processName === 'SERVICE REQUEST ESCALATION') { 
      this.notificationTypeForm.patchValue({ type: 'ESCALATION' }); 
      this.selectedType = 'ESCALATION'; 
      this.notificationTypeForm.get('type')?.disable(); 
    } 
  })

}


  loadSrStatusList(): void {

    this.commonService.getComboResults(
    'listOfAllEmailSrStatus.sams',
    '',
    '',
    '',
    '1000',
    '1'
    ).subscribe((res: any) => {

      this.srStatusList = res?.responseData?.comboList || [];
      this.filteredToStatusList = this.srStatusList; // initialize

    });
  }



  loadModulesAndThenLoadNotification(): void {
    this.commonService.getComboResults(
      'listOfAllEmailModuleCombo.sams',
      '',
      '',
      '',
      '1000',
      '1'
    ).subscribe((res: any) => {

      this.moduleList = res?.responseData?.comboList || [];

      // AFTER modules loaded → now load notification
      this.loadNotificationType(this.templateId);
    });
  }

  loadModules(): void {
    this.commonService.getComboResults(
      'listOfAllEmailModuleCombo.sams',
      '',
      '',
      '',
      '1000',
      '1'
    ).subscribe((res: any) => {
      this.moduleList = res?.responseData?.comboList || [];
    });
  }

  loadProcesses(moduleId: number): void {

    if (!moduleId) {
      this.processList = [];
      return;
    }

    this.commonService.getComboResults(
      'listOfAllEmailProcessCombo.sams',
      '',
      moduleId,
      '',
      '1000',
      '1'
    ).subscribe((res: any) => {
      this.processList = res?.responseData?.comboList || [];
    });
  }


  // ================= MODE DETECTION =================
//   private detectModeAndLoadData(): void {
//   this.route.paramMap.subscribe(params => {
//     const id = params.get('id');
//     const path = this.route.snapshot.routeConfig?.path;

//     if (id) {
//       this.templateId = +id;

//       if (path?.includes('notificationTypeView')) {
//         this.mode = 'view';
//         this.loadNotificationType(this.templateId);
//         this.notificationTypeForm.disable();
//       }else if (path?.includes('notificationTypeEdit')) {
//         this.mode = 'edit';
//         this.loadNotificationType(this.templateId);
//       } else {
//         this.mode = 'create';
//       }
//     }
//   });
// }

// ================= LOAD BY TEMPLATE =================
  loadNotificationType(templateId: number): void {
    this.emailService.getNotificationTypeByTemplateId(templateId).subscribe((res: any) => {

      this.notificationId = res.notificationId;

      this.notificationTypeForm.patchValue({
        module: res.module,
        process: res.process,
        type: res.type,
        isActive: res.isActive,

        expiryConfig: {
          beforeDays: res.beforeDays,
          afterDays: res.afterDays
        },

        escalationConfig: {
          fromStatus: Number(res.fromStatus),
          toStatus: Number(res.toStatus),
          hours: res.hours
        }
      });
      //this.loadProcesses(res.module);
      this.loadProcessesAndPatchProcess(res);
      this.selectedType = res.type;
    });
  }

  loadProcessesAndPatchProcess(res: any): void {

    this.commonService.getComboResults(
      'listOfAllEmailProcessCombo.sams',
      '',
      res.module,
      '',
      '1000',
      '1'
    ).subscribe((response: any) => {

      this.processList = response?.responseData?.comboList || [];

    // NOW patch full form
    this.notificationTypeForm.patchValue({
      module: Number(res.module),
      process: Number(res.process),
      type: res.type,
      isActive: res.isActive,

      expiryConfig: {
        beforeDays: res.beforeDays,
        afterDays: res.afterDays
      },

      escalationConfig: {
        fromStatus: res.fromStatus ? Number(res.fromStatus) : null,
        toStatus: res.toStatus ? Number(res.toStatus) : null,
        hours: res.hours
      }
    });
     console.log(res);
    this.selectedType = res.type;
  });
}

get selectedModuleName(): string {
  const id = this.notificationTypeForm.value.module;
  return this.moduleList.find(m => m.moduleId == id)?.moduleName || '';
}

get selectedProcessName(): string {
  const id = this.notificationTypeForm.value.process;
  return this.processList.find(p => p.processId == id)?.processName || '';
}


  // ================= NAVIGATION TABS =================
  goToTemplate(): void {
    if (this.mode === 'create') {
      this.router.navigate(['home/notification/emailCreate']);
    } else if (this.mode === 'edit') {
      this.router.navigate(['home/notification/emailEdit', this.templateId]);
    } else {
      this.router.navigate(['home/notification/emailView', this.templateId]);
    }
  }

  goToScheduler(): void {
  if (this.mode === 'create') {
    this.router.navigate(
    ['/home/notification/emailscheduler', this.notificationId]
  );

  } else if (this.mode === 'edit') {
    this.router.navigate(
      ['home/notification/emailSchedulerEdit', this.notificationId]
    );

  } else {
    this.router.navigate(
      ['home/notification/emailSchedulerView', this.notificationId]
    );
  }
}



  goBack() {
    this.router.navigate(['home/notification/emailList']);
  }


  // ================= FORM ACTIONS =================
  clear(): void {
    this.notificationTypeForm.reset({ isActive: true });
    this.selectedType = null;
  }

  onSubmit(): void {
    if (this.notificationTypeForm.invalid) {
      this.notificationTypeForm.markAllAsTouched();
      return;
    }

    const form = this.notificationTypeForm;

    //  Expiry validation
    const beforeDays = form.get('expiryConfig.beforeDays')?.value;
    const afterDays = form.get('expiryConfig.afterDays')?.value;

    if (beforeDays && (beforeDays < 1 || beforeDays > 31)) {
      this.commonService.openToastErrorMessage("Before days must be between 1 and 31");
      return;
    }

    if (afterDays && (afterDays < 1 || afterDays > 31)) {
      this.commonService.openToastErrorMessage("After days must be between 1 and 31");
      return;
    }

    //  Escalation validation
    const hours = form.get('escalationConfig.hours')?.value;

    if (hours && (hours < 1 || hours > 24)) {
      this.commonService.openToastErrorMessage("Hours must be between 1 and 24");
      return;
    }

  
  

    if (this.mode === 'create') {
      this.saveNotificationType();
    } else if (this.mode === 'edit') {
      this.updateNotificationType();
    }
  }

  // ================= SAVE =================
  saveNotificationType(): void {

  const form = this.notificationTypeForm.getRawValue();
  console.log('TemplateId:', this.templateId);
  console.log('Form Value:', form);
  const fromStatusObj = this.srStatusList.find(s => s.id == form.escalationConfig.fromStatus);

  const toStatusObj = this.srStatusList.find(s => s.id == form.escalationConfig.toStatus);
 
  console.log('From Status Object:', fromStatusObj);
  console.log('To Status Object:', toStatusObj);    
  console.log("type", form.type);
  const payload = {
    emailTmplId: this.templateId,
    module: form.module,
    process: form.process,
    type: form.type,
    isActive: form.isActive,
    beforeDays: form.expiryConfig.beforeDays,
    afterDays: form.expiryConfig.afterDays,
    fromStatus: form.escalationConfig.fromStatus,
    toStatus: form.escalationConfig.toStatus,
    fromStatusName: fromStatusObj?.statusName,
    toStatusName: toStatusObj?.statusName,
    hours: form.escalationConfig.hours
  };

  // this.emailService.saveNotificationType(payload).subscribe((res: any) => {

    
  //   const notificationId = res.notificationId;   //  THE KEY

  //   this.router.navigate(
  //     ['/home/notification/emailscheduler', notificationId]
  //   );
 
  // });

  this.emailService.saveNotificationType(payload).subscribe({

  //  SUCCESS
  next: (res: any) => {

    this.commonService.openToastSuccessMessage("Notification saved successfully");

    const notificationId = res.notificationId;

    this.router.navigate(
      ['/home/notification/emailscheduler', notificationId]
    );

  },

  //  ERROR
  error: (err) => {

    console.log("Error:", err);

    this.commonService.openToastErrorMessage(
      err?.error?.message || "Failed to save notification"
    );

  }

});
}

  // ================= UPDATE =================
  updateNotificationType(): void {

  const form = this.notificationTypeForm.getRawValue();
  const fromStatusObj = this.srStatusList.find(s => s.id == form.escalationConfig.fromStatus);

  const toStatusObj = this.srStatusList.find(s => s.id == form.escalationConfig.toStatus);
   console.log('From Status Object:', fromStatusObj);
  console.log('To Status Object:', toStatusObj);    
  console.log("type", form.type);
  const payload = {
    module: form.module,
    process: form.process,
    type: form.type,
    isActive: form.isActive,
    
    beforeDays: form.expiryConfig.beforeDays,
    afterDays: form.expiryConfig.afterDays,

    fromStatus: form.escalationConfig.fromStatus,
    toStatus: form.escalationConfig.toStatus,
    fromStatusName: fromStatusObj?.statusName,
    toStatusName: toStatusObj?.statusName,
    hours: form.escalationConfig.hours
  };

  this.emailService
    .updateNotificationType(this.notificationId, payload)
    .subscribe({

  //  SUCCESS
  next: () => {

    this.commonService.openToastSuccessMessage("Notification updated successfully");

    this.goToScheduler();
  },

  // ERROR
  error: (err) => {

    console.log("Error:", err);

    this.commonService.openToastErrorMessage(
      err?.error?.message || "Update failed"
    );

  }

});
}

  // ================= DELETE =================
  deleteNotificationType(): void {
  this.emailService
    .deleteNotificationType(this.notificationId)
    .subscribe(() => this.goBack());
  }



}
