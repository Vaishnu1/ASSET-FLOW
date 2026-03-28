import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmailConfigService } from '../service/email-config.service';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-email-config-list',
  templateUrl: './email-config-list.component.html',
  styleUrls: ['./email-config-list.component.css']

  
})

export class EmailConfigListComponent implements OnInit{

  searchForm!:FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource=new MatTableDataSource<any>([]);

  // showManageColumns: boolean = false;

  displayedColumns=[
    'select',
    'sno',
    // 'orgName',
    'fromEmailId',
    'fromEmailName',
    'smtpUserName',
    'smtpHost',
    'smtpPort',
    'securityType',
    'active',
    'createdBy'
  ];

  length=0;
  pageSize=10;

  enableActionBtn=true;

  emailNameList:any=[];
  emailIdList:any=[];
  

  selectedRow:any;

  constructor(private fb:FormBuilder, private dialog: MatDialog, private router: Router, private emailConfigService: EmailConfigService, private commonService: CommonService, private assetOptimaServices: AssetOptimaServices){}

  ngOnInit(){

  this.searchForm = this.fb.group({
    emailName: [''],
    emailId: ['']
  });

  this.loadData();
  this.loadEmailDropdown();

  }

  // editManageColumns() {
  //   this.showManageColumns = !this.showManageColumns;
  // }

 loadData() {

  this.emailConfigService.getEmailServerConfigs()
  .subscribe((data:any) => {

    if(data.success){
      this.dataSource.data = data.responseData.dataList;
      this.length = data.responseData.dataTotalRecCount;
      this.dataSource.paginator = this.paginator;
    }

  });

}

 onSearch() {

  const payload = {
  emailName: this.searchForm.value.emailName,
  emailId: this.searchForm.value.emailId
};

  console.log("SEARCH PAYLOAD:", payload);

  this.emailConfigService.searchEmailServers(payload)
    .subscribe((res:any) => {

      const list = res.responseData.dataList;

      console.log("SEARCH RESULT:", res.responseData.dataList);
      this.dataSource.data = list;
      this.length = list.totalElements;
      this.dataSource.paginator = this.paginator;

    });

}

// onSearch() {

//   const payload = {
//     emailName: this.searchForm.value.emailName,
//     emailId: this.searchForm.value.emailId
//   };

//   console.log("SEARCH PAYLOAD:", payload);

//   this.emailConfigService.searchEmailServers(payload)
//     .subscribe((res:any) => {

//       const page = res.responseData.dataList;

//       console.log("SEARCH RESULT:", page);

//       this.dataSource.data = page.content;
//       this.length = page.totalElements;

//     });

// }
 onClearSearch(){

  console.log("Clearing search form and reloading data...");

  this.searchForm.patchValue({
    emailName: '',
    emailId: ''
  });

  console.log("Search form after clearing:", this.searchForm.value);
  console.log("load data :",this.loadData());
  this.loadData();

}
  // selectRow(row:any){
  //   this.selectedRow=row;
  //   this.enableActionBtn=false;
  // }

  selectRow(row:any, event:any){

  if(event.checked){
    // row selected
    this.selectedRow = row;
    this.enableActionBtn = false;
  }else{
    // row unselected
    this.selectedRow = null;
    this.enableActionBtn = true;
  }

}

  onCreate(){
    this.router.navigate(['/home/settings/emailConfig']);
  }

  onEdit(){
    this.router.navigate(['/home/settings/EmailConfigEdit', this.selectedRow.emailServerId]);
  }
  onDelete(){

  if(!this.selectedRow){
    alert("Please select a record");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete this Email Server?");

  if(confirmDelete){

    this.emailConfigService.deleteEmailServerConfig(this.selectedRow.emailServerId)
    .subscribe((res:any)=>{

      alert("Deleted Successfully");

      this.loadData();   // reload table

    });

  }

}
  onView(){
   this.router.navigate(['/home/settings/EmailConfigView', this.selectedRow.emailServerId]);
  }

  onPageChange(event:any){
    console.log(event);
  }

 
  openManageColumns(){

  const dialogRef = this.dialog.open(ManageColumnsDialog,{
    width:'600px',
    data: this.displayedColumns ,  // pass current columns
    // position: {
    //   top: '50%',
    //   left: '50%'
    // },
    // panelClass: 'center-dialog'

  });
  


  dialogRef.afterClosed().subscribe(result => {

    if(result){
      this.displayedColumns = result;
    }

  });

}
  loadEmailDropdown(){

  this.emailConfigService.getEmailServerConfigs()
  .subscribe((data:any)=>{

      if(data.success){

          this.emailNameList = data.responseData.dataList;
          this.emailIdList = data.responseData.dataList;

      }

  });

}

}


@Component({
selector:'manage-columns-dialog',
template:`

<h2 mat-dialog-title>Manage Columns</h2>

<div class="dialog-divider"></div>

<div mat-dialog-content class="column-grid">

<mat-checkbox
*ngFor="let col of columns"
[(ngModel)]="col.checked">

{{col.label}}

</mat-checkbox>

</div>

<div mat-dialog-actions class="dialog-actions">

<button mat-raised-button color="primary" (click)="apply()">Ok</button>

<button mat-raised-button color="primary" (click)="close()">Cancel</button>

</div>

`,
styles:[`
.column-grid{
  display:grid;
  grid-template-columns:repeat(3, auto);
  row-gap:16px;
  column-gap:60px;
  padding:10px 20px 0 20px;   /* add left + right padding */
  font-size:14px;
  font-family:Roboto,"Helvetica Neue",sans-serif;
  width:100%;
  box-sizing:border-box;
}

.dialog-divider{
  border-top:1px solid #e0e0e0;
  margin-bottom:12px;
}

.dialog-actions{
  display:flex;
  justify-content:flex-end;
  gap:12px;
  margin-top:10px;
}

::ng-deep .mat-checkbox-layout{
  font-size:14px;
}

::ng-deep .mat-checkbox-checked.mat-accent .mat-checkbox-background{
  background-color:#1976d2;
}

/* remove dialog scrollbars */
::ng-deep .mat-dialog-container{
  overflow:hidden !important;
}

::ng-deep .mat-dialog-content{
  overflow:hidden !important;
}
`]
})
export class ManageColumnsDialog{

columns:any[] = [];

constructor(
  public dialogRef: MatDialogRef<ManageColumnsDialog>,
  @Inject(MAT_DIALOG_DATA) public data:any
){

this.columns = [

{key:'select',label:'Select',checked:data.includes('select')},
{key:'sno',label:'S.No',checked:data.includes('sno')},
{key:'fromEmailId',label:'Email ID',checked:data.includes('fromEmailId')},
{key:'fromEmailName',label:'Email Name',checked:data.includes('fromEmailName')},
{key:'smtpUserName',label:'SMTP User Name',checked:data.includes('smtpUserName')},
{key:'smtpHost',label:'SMTP Host',checked:data.includes('smtpHost')},
{key:'smtpPort',label:'SMTP Port',checked:data.includes('smtpPort')},
{key:'securityType',label:'Security Type',checked:data.includes('securityType')},
{key:'active',label:'Active',checked:data.includes('active')},
{key:'createdBy',label:'Created By',checked:data.includes('createdBy')}

];

}

apply(){

const result = this.columns
.filter(c => c.checked)
.map(c => c.key);

this.dialogRef.close(result);

}

close(){
this.dialogRef.close();
}

}