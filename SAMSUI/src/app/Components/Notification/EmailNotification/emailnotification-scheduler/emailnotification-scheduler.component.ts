import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailNotificationService } from 'src/app/Components/Notification/EmailNotification/services/email-notification.service';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-emailnotification-scheduler',
  templateUrl: './emailnotification-scheduler.component.html',
  styleUrls: ['./emailnotification-scheduler.component.css']
})
export class EmailnotificationSchedulerComponent implements OnInit {

  mode: 'create' | 'edit' | 'view' = 'create';
  scheduleId!: number;

  schedulerForm!: FormGroup;
  private updatingFromFields = false;

  moduleList: any[] = [];
  processList: any[] = [];
  timeZoneList: string[] = [];

  scheduleText = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private emailService: EmailNotificationService,
    private commonService: CommonService

  ) {}

  ngOnInit(): void {
  this.buildForm();
  this.handleCronAutoBuild();

  this.loadModules();   //FIRST load dropdown data
  this.loadTimeZones();

  this.schedulerForm.get('module')?.valueChanges.subscribe(moduleId => {
    if (moduleId) {
      this.loadProcesses(moduleId);
    }
  });

  this.detectModeAndLoad();   //THEN detect edit/view
  
}

  loadTimeZones() {
  this.emailService.getTimeZones().subscribe({
    next: (res: any) => {
      this.timeZoneList = res;
      console.log("Timezones:", this.timeZoneList);
    },
    error: (err) => {
      console.error("Timezone load error:", err);
      this.commonService.openToastErrorMessage("Failed to load timezones");
    }
  });
}

  private loadModules(): void {
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

private loadProcesses(moduleId: number): void {
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



  // ================= FORM =================
  private buildForm() {
    this.schedulerForm = this.fb.group({
      module: ['', Validators.required],
      process: ['', Validators.required],
      timeZone: [''],
      cron: ['', Validators.required],
      minute: [''],
      hour: [''],
      day: [''],
      month: [''],
      week: [''],
      isActive: [true]
    });
  }

  // ================= MODE DETECTION =================
  
  private detectModeAndLoad() {
  const notificationId = +this.route.snapshot.paramMap.get('id')!;
  const path = this.route.snapshot.routeConfig?.path;

  if (path?.includes('emailSchedulerEdit') || path?.includes('emailSchedulerView')) {

    this.mode = path.includes('Edit') ? 'edit' : 'view';

    this.emailService
      .getSchedulerByNotificationId(notificationId)
      .subscribe((res: any) => {

        this.scheduleId = res.schedulerId;

        const moduleId = Number(res.module);
        const processId = Number(res.process);

        // Patch module first
        this.schedulerForm.patchValue({ module: moduleId });

        // Load processes based on module
        this.loadProcesses(moduleId);

        // Wait for process list then patch remaining
        setTimeout(() => {
          this.schedulerForm.patchValue({
            process: processId,
            timeZone: res.timeZone,
            cron: res.cronExpression,
            isActive: res.isActive
          });

          this.buildScheduleFromCron(res.cronExpression);

          if (this.mode === 'view') {
            this.schedulerForm.disable();
          }

        }, 300);
      });
  }

  else {
    this.mode = 'create';
  }
}
  // ================= CRON LOGIC =================
  // private handleCronAutoBuild() {
  //   this.schedulerForm.valueChanges.subscribe(val => {
  //     if (this.updatingFromFields) {
  //       this.updatingFromFields = false;
  //       return;
  //     }

  //     if (val.minute || val.hour || val.day || val.month || val.week) {
  //       const cron =
  //         `${val.minute || '*'} ${val.hour || '*'} ${val.day || '*'} ${val.month || '*'} ${val.week || '*'}`;

  //       this.updatingFromFields = true;
  //       this.schedulerForm.patchValue({ cron }, { emitEvent: true });
  //       this.buildScheduleFromCron(cron);
  //     }
  //     else if (val.cron) {
  //       this.buildScheduleFromCron(val.cron);
  //     }
  //   });
  // }

  private handleCronAutoBuild() {
  this.schedulerForm.valueChanges.subscribe(val => {
    if (this.updatingFromFields) {
      this.updatingFromFields = false;
      return;
    }

    if (val.minute || val.hour || val.day || val.month || val.week) {

      const cron =
        `0 ${val.minute || '*'} ${val.hour || '*'} ${val.day || '*'} ${val.month || '*'} ${val.week || '*'}`;

      this.updatingFromFields = true;
      this.schedulerForm.patchValue({ cron }, { emitEvent: true });
      this.buildScheduleFromCron(cron);

    } else if (val.cron) {
      this.buildScheduleFromCron(val.cron);
    }
  });
}
private buildScheduleFromCron(cron: string) {
  const parts = cron.split(' ');
  if (parts.length !== 6) return;

  const [, min, hr, day, mon, wk] = parts;

  this.scheduleText =
    `Execute: at ${min} minute, ${hr} hour, ${day} day, ${mon} month, week ${wk}`;
}

  // private buildScheduleFromCron(cron: string) {
  //   const parts = cron.split(' ');
  //   if (parts.length !== 5) return;

  //   const [min, hr, day, mon, wk] = parts;

  //   this.scheduleText =
  //     `Execute: at ${min} minute, ${hr} hour, ${day} day, ${mon} month, week ${wk}`;
  // }

  // ================= API READY METHODS =================

 

  private getScheduleById(id: number) {
  this.emailService.getSchedulerById(id).subscribe((res: any) => {
    this.schedulerForm.patchValue({
      module: res.module,
      process: res.process,
      timeZone: res.timeZone,
      cron: res.cronExpression,
      isActive: res.isActive
    });
    this.buildScheduleFromCron(res.cronExpression);
  });
}

  

  saveSchedule() {
    //if (this.schedulerForm.invalid) return;
      // FORM INVALID
  if (this.schedulerForm.invalid) {
    this.schedulerForm.markAllAsTouched();
    this.commonService.openToastWarningMessage("Please fill all required fields");
    return;
  }

  const form = this.schedulerForm.value;

  const minute = form.minute;
  const hour = form.hour;
  const day = form.day;
  const month = form.month;
  const week = form.week;

  //  MINUTE
  if (minute !== '' && minute != null && (minute < 0 || minute > 59)) {
    this.commonService.openToastErrorMessage("Minute must be between 0 and 59");
    return;
  }

  //  HOUR
  if (hour !== '' && hour != null && (hour < 0 || hour > 23)) {
    this.commonService.openToastErrorMessage("Hour must be between 0 and 23");
    return;
  }

  //  DAY
  if (day !== '' && day != null && (day < 1 || day > 31)) {
    this.commonService.openToastErrorMessage("Day must be between 1 and 31");
    return;
  }
  //  MONTH
  if (month !== '' && month != null && (month < 1 || month > 12)) {
    this.commonService.openToastErrorMessage("Month must be between 1 and 12");
    return;
  }

  //  WEEK
  if (week !== '' && week != null && (week < 0 || week > 6)) {
    this.commonService.openToastErrorMessage("Week must be between 0 and 6");
    return;
  }

    if (this.mode === 'create') {
      this.createSchedule();
    } else if (this.mode === 'edit') {
      this.updateSchedule();
    }
    
  }

 private createSchedule() {

 const notificationId = +this.route.snapshot.paramMap.get('id')!;


  const moduleId = this.schedulerForm.value.module;
  const processId = this.schedulerForm.value.process;

  const selectedModule = this.moduleList.find(m => m.moduleId == moduleId);
  const selectedProcess = this.processList.find(p => p.processId == processId);

  const payload = {
    notification: {                      
      notificationId: notificationId
    },
    module: moduleId,
    moduleName: selectedModule?.moduleName,
    process: processId,
    processName: selectedProcess?.processName,
    cronExpression: this.schedulerForm.value.cron,
    // timeZone: this.schedulerForm.value.timeZone,
    timeZone: typeof this.schedulerForm.value.timeZone === 'object'
    ? this.schedulerForm.value.timeZone.value
    : this.schedulerForm.value.timeZone,
    isActive: this.schedulerForm.value.isActive
  };

  console.log('Scheduler Payload', payload);

  // this.emailService.createScheduler(payload).subscribe(() => {
  //   this.goBack();
  // });
  this.emailService.createScheduler(payload).subscribe({

  //  SUCCESS
  next: () => {

    this.commonService.openToastSuccessMessage("Scheduler created successfully");

    this.goBack();
  },

  //  ERROR
  error: (err) => {

    console.log("Error:", err);

    this.commonService.openToastErrorMessage(
      err?.error?.message || "Failed to create scheduler"
    );

  }

});
}




  private updateSchedule() {

  const moduleId = this.schedulerForm.value.module;
  const processId = this.schedulerForm.value.process;

  const selectedModule = this.moduleList.find(m => m.moduleId == moduleId);
  const selectedProcess = this.processList.find(p => p.processId == processId);

  const payload = {
    notification: {
      notificationId: this.route.snapshot.paramMap.get('id')
    },
    module: moduleId,
    moduleName: selectedModule?.moduleName,
    process: processId,
    processName: selectedProcess?.processName,
    cronExpression: this.schedulerForm.value.cron,
    // timeZone: this.schedulerForm.value.timeZone,
    timeZone: typeof this.schedulerForm.value.timeZone === 'object'
    ? this.schedulerForm.value.timeZone.value
    : this.schedulerForm.value.timeZone,
    isActive: this.schedulerForm.value.isActive
  };
  console.log('Scheduler updated Payload', payload);
  this.emailService
    .updateScheduler(this.scheduleId, payload)
    // .subscribe(() => this.goBack());
    .subscribe({

  // SUCCESS
  next: () => {

    this.commonService.openToastSuccessMessage("Scheduler updated successfully");

    this.goBack();
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


  deleteSchedule() {
  this.emailService.deleteScheduler(this.scheduleId)
    .subscribe(() => this.goBack());
}

  // ================= NAVIGATION =================
  goToTemplate() {
    this.router.navigate(
      this.mode === 'create'
        ? ['home/notification/emailCreate']
        : this.mode === 'edit'
        ? ['home/notification/emailEdit', this.scheduleId]
        : ['home/notification/emailView', this.scheduleId]
    );
  }

  goToNotificationType() {
    this.router.navigate(
      this.mode === 'create'
        ? ['home/notification/emailNotificationType']
        : this.mode === 'edit'
        ? ['home/notification/notificationTypeEdit', this.scheduleId]
        : ['home/notification/notificationTypeView', this.scheduleId]
    );
  }

  goBack() {
    this.router.navigate(['home/notification/emailList']);
  }

  clear() {
    this.schedulerForm.reset({ isActive: true });
  }
}
