import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { EmployeeModel } from 'src/app/Model/master/employee';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  title = 'Asset Optima - Employee';
  empUrl: string;
  empId : any;
  employeeData : any = [];
  employeeId: string;
  employee: any=[];
  showReplaceEmp: boolean = false;
  public employeeModel : EmployeeModel;
  designationDispCol = ['sno','designationName','fromDateDisp','tillDateDisp','reportingPersonName', 'reportingHodName'];
  skillTrainingDispCol=['sno','skillName','noOfYears','level','remarks'];
  experienceDispCol=['sno','companyName','startDateDisp','endDateDisp','designation','address'];
  qualificationDispCol=['sno','qualificationName','startDateDisp','completedDateDisp','university','percentage','yearOfPassing']
  locationAccessDispCol=['sno','locName','assign'];


  //Data Sources
  designationDataSource: any[] = [];
  skillTrainingDataSource: any[] = [];
  experienceDataSource: any[] = [];
  qualificationDataSource: any[] = [];
  locationAccessDataSource: any[] = [];

  constructor(public router: Router,
    private active_route: ActivatedRoute,
    private commonService:CommonService,
    private assetOptimaServices:AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private titleService: Title) {

    this.employeeModel = new EmployeeModel(); 
    this.empId = this.active_route.snapshot.params['employeeId'];
    this.commonService.commonGetService(this.assetOptimaServices.loadEmployeeDtl,this.empId).subscribe(
      data => {
        this.employeeData = data.responseData;
        this.designationDataSource = this.employeeData.empDesignationList;
        this.skillTrainingDataSource = this.employeeData.skillList;
        this.experienceDataSource = this.employeeData.experienceList;
        this.qualificationDataSource = this.employeeData.qualificationList;
        this.locationAccessDataSource = this.employeeData.locationAccessList;
        this.empUrl = this.assetOptimaConstants.connectionUrl + "getImage.sams?resourceName=";

        if(this.employeeData.replaceEmpStatus == true) {
          this.showReplaceEmp = true;
        } else {
          this.showReplaceEmp = false;
        }
        this.loadDesignationDetails();
      })
  }
  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  GoBack(){
    this.router.navigate(['home/employee']);
  }

  loadDesignationDetails(){
    let i : number = 0;
    for(i=0; i<this.designationDataSource.length;i++){
      if(i===this.designationDataSource.length-1){
        this.employeeData.reportingHodName= this.designationDataSource[i].reportingHodName;
        this.employeeData.reportingPersonName= this.designationDataSource[i].reportingPersonName;
      }
    }
  }


}
