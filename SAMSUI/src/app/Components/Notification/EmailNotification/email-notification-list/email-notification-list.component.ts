import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmailNotificationService } from 'src/app/Components/Notification/EmailNotification/services/email-notification.service';
import { AfterViewInit } from '@angular/core';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-email-notification-list',
  templateUrl: './email-notification-list.component.html',
  styleUrls: ['./email-notification-list.component.css']
})
export class EmailNotificationListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  length: number = 0;
  pageSize: number = 100;
  pageIndex: number = 0;
  searchForm!: FormGroup;

  selectedTemplateList: any[] = [];
  selectedAllTemplates: boolean = false;
  enableActionBtn: boolean = true;

  displayedColumns = [
    'select',
    'sno',
    'template_name',
    'module_name',
    'process_name',
    'is_active',
    'created_by',
    'updated_by'
  ];

    
  templateNames = [
    'EXPIRY',
    'Contract expiry',
    'ASSET EXPIRY'
  ];
   moduleList: any[] = [];
processList: any[] = [];


  constructor(private router: Router, private fb: FormBuilder,
    private emailService: EmailNotificationService, private commonService: CommonService

  ) {}
  
  ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}


  
ngOnInit(): void {
  this.searchForm = this.fb.group({
    templateName: [''],
    module: [''],
    process: ['']
  });

  this.loadModules();
  this.fetchTemplateList();
  this.searchForm.get('module')?.valueChanges.subscribe((moduleId) => {
    console.log("Selected Module ID:", moduleId);
    this.onModuleChange(moduleId);
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


  fetchTemplateList(): void {
  this.emailService
    .getTemplateList(this.pageIndex, this.pageSize)
    .subscribe((res: any) => {
    
      this.dataSource.data = res.content.map((x: any) => ({
        ...x,
        emailTemplateId: x.emailTemplateId,
        template_name: x.templateName,
        moduleName: x.moduleName || x.module?.moduleName || '',
        processName: x.processName || x.process?.processName || '',
        is_active: x.isActive,
        created_by: x.createdBy,
        created_date: x.createdDate,      //  ADD THIS
        updated_by: x.updatedBy,
        updated_date: x.updatedDate 
      }));
      console.log(res.content);

      const names = res.content.map((x: any) => x.templateName);

this.templateNames = names.filter(
  (value: string, index: number, self: string[]) =>
    self.indexOf(value) === index
);
      this.length = res.totalElements;   // VERY IMPORTANT
      this.resetSelection();
    });
}



  getServerData(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    if (
      this.searchForm.value.templateName ||
      this.searchForm.value.module ||
      this.searchForm.value.process
    ) {
      this.searchTemplates(this.searchForm.value);
    } else {
      this.fetchTemplateList();
    }
  }



 selectedId: number | null = null;

selectTemplates(element: any): void {
  this.selectedId =
    this.selectedId === element.emailTemplateId
      ? null
      : element.emailTemplateId;

  this.enableActionBtn = this.selectedId === null;
}



  selectAll(event: any): void {
  if (event.checked && this.dataSource.data.length) {
    this.selectedId = this.dataSource.data[0].emailTemplateId;
  } else {
    this.selectedId = null;
  }
  this.enableActionBtn = this.selectedId === null;
}


  compareValue(element: any): boolean {
  return this.selectedId === element.emailTemplateId;
}



  getIndexValue(index: number): number {
    
  return (this.pageIndex * this.pageSize) + index + 1;
}

  

  onCreate(): void {
    this.router.navigate(['home/notification/emailCreate']);
  }

  onEdit(): void {
  if (!this.selectedId) return;

  this.router.navigate(['home/notification/emailEdit', this.selectedId]);
}

onView(): void {
  if (!this.selectedId) return;

  this.router.navigate(['home/notification/emailView', this.selectedId]);
}


  onSearch(): void {
  this.searchTemplates(this.searchForm.value);
  console.log(this.searchForm.controls);

}

  onClearSearch(): void {
    this.searchForm.reset();
    this.pageIndex = 0;
    this.refreshList();
  }

  // ================= BACKEND READY FUNCTIONS =================

  // call this when search button clicked
//   searchTemplates(searchObj: any): void {
//   this.emailService
//     .searchTemplates(searchObj, this.pageIndex, this.pageSize)
//     .subscribe((res: any) => {

//       this.dataSource.data = res.content.map((x: any) => ({
//         ...x,
//         emailTemplateId: x.emailTemplateId,
//         template_name: x.templateName,
//         moduleName: x.moduleName || x.module?.moduleName || '',
//         processName: x.processName || x.process?.processName || '',
//         is_active: x.isActive,
//         created_by: x.createdBy,
//         created_date: x.createdDate,
//         updated_by: x.updatedBy,
//         updated_date: x.updatedDate
//       }));
//        console.log("FULL API RESPONSE:", res);
//       console.log("FIRST ROW:", res.content[0]);

//       this.length = res.totalElements;  //  same as list API
//       this.resetSelection();
//     });
// }

searchTemplates(searchObj: any): void {

  console.log("SEARCH OBJ:", searchObj);

  this.emailService
    .searchTemplates(searchObj, this.pageIndex, this.pageSize)
    .subscribe({
      next: (res: any) => {

        console.log("FULL API RESPONSE:", res);
        console.log("FIRST ROW:", res?.content?.[0]);

        this.dataSource.data = res.content.map((x: any) => ({
          ...x,
          emailTemplateId: x.emailTemplateId,
          template_name: x.templateName,
          moduleName: x.moduleName || x.module?.moduleName || '',
          processName: x.processName || x.process?.processName || '',
          is_active: x.isActive,
          created_by: x.createdBy,
          created_date: x.createdDate,
          updated_by: x.updatedBy,
          updated_date: x.updatedDate
        }));

        this.length = res.totalElements;
        this.resetSelection();
      },

      error: (err) => {
        console.error("SEARCH ERROR:", err);
        this.commonService.openToastErrorMessage("Failed to fetch templates");
      }
    });
}



  // common method used after delete / search / pagination
  refreshList(): void {
    this.fetchTemplateList();
  }

  // used after every API call
  resetSelection(): void {
  this.selectedId = null;
  this.enableActionBtn = true;
}


  // delete template (from settings later)
//   deleteTemplate(id: number): void {
//   this.emailService.deleteTemplate(id).subscribe(() => {
//     this.refreshList();
//   });
// }

onModuleChange(moduleId: number): void {

  console.log("Selected Module ID:", moduleId);

  this.searchForm.patchValue({ process: '' });

  if (!moduleId) {
    this.processList = [];
    return;
  }

  this.commonService.getComboResults(
    'listOfAllEmailProcessCombo.sams',
    '',
    moduleId,   //  THIS MUST BE NUMBER
    '',
    '1000',
    '1'
  ).subscribe((res: any) => {
    console.log("PROCESS API RESPONSE:", res);
    console.log(typeof moduleId);

    this.processList = res?.responseData?.comboList || [];
  });
}

}
