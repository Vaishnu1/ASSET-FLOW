import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dash-board-duration',
  templateUrl: './dash-board-duration.component.html',
  styleUrls: ['./dash-board-duration.component.css']
})
export class DashBoardDurationComponent implements OnInit {

  @ViewChild('picker1') picker1: MatDatepicker<Date>;
  @ViewChild('picker2') picker2: MatDatepicker<Date>;

  currentDate: Date = new Date();
  startDate:string;
  firstDate:string;
  

  public durationForm: FormGroup;
  
  disableNextAndPrevButton: boolean;
  exceedsCurrentDate: boolean;
  fromDateDisabled: boolean;
  periodOption = [
    { period: 'Monthly' },
    { period: 'Weekly' },
    { period: 'Daily' },
    { period: 'Till' },
  ]

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data, public dialogRef: MatDialogRef<DashBoardDurationComponent>,
  private readonly commonService: CommonService,) { 
    this.disableNextAndPrevButton = false;
    this.exceedsCurrentDate = false;
    this.fromDateDisabled = false;
    this.firstDate = "1970-01-01";
  }

  ngOnInit() {

    this.durationForm = new FormGroup({
      createdDtDisp: new FormControl(''),
      updatedDtDisp: new FormControl(new Date()),
      period : new FormControl('Daily'),
    });

    this.durationForm.controls.period.setValue('Daily');
    this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
    this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));

    this.hidePeriod(this.durationForm.controls.period.value);
  }


  setDuration(event) {
    this.fromDateDisabled =false;
    if (event === undefined) {
      this.durationForm.controls.period.setValue('');
    } else {
      if(event.period === 'Daily'){
        this.exceedsCurrentDate =true;
        this.durationForm.controls.createdDtDisp.setValue(this.commonService.getCurrentDateYYYYMMDD());
        this.durationForm.controls.updatedDtDisp.setValue(this.commonService.getCurrentDateYYYYMMDD())
      }else if(event.period === 'Monthly'){
        const date= new Date();
        //get month frist date
        const firstDay =   new Date(date.getFullYear(), date.getMonth(), 1); 

        //month last date
        const lastDay =   new Date(date.getFullYear(), date.getMonth() + 1, 0); 

        //check whether last date exceeds current date
        if(lastDay> new Date()){
          //next button should be disabled if last day exceed current date
          this.exceedsCurrentDate=true;
          this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstDay));
          this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));           
        }else{
          this.exceedsCurrentDate = false;
        this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstDay));
        this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(lastDay)); 
        }          
      }else if(event.period === 'Weekly'){
        const currentDate = new Date;
        //week first date
        const firstWeekday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
        //week last date
        const lastWeekday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()+6));

        //check whether last date exceeds current date
        if(lastWeekday>new Date()){
          this.exceedsCurrentDate= true;
          this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday));
          this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
        }else{
        this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday));
        this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(lastWeekday));  
        }
      }else if(event.period === 'Till'){
        this.fromDateDisabled =true;
        this.durationForm.controls.createdDtDisp.setValue('');
      }
      this.durationForm.controls.period.setValue(event.period);
     this.hidePeriod(this.durationForm.controls.period.value)
    }
  }

  changeToPrevious(event){
    this.fromDateDisabled =false;
    const currentFromDate= new Date(this.durationForm.controls.createdDtDisp.value);
    const currentToDate = new Date(this.durationForm.controls.updatedDtDisp.value)
    if(this.durationForm.controls.period.value === 'Daily'){

      currentFromDate.setDate(currentFromDate.getDate()-1);
      currentToDate.setDate(currentToDate.getDate()-1)

      //check if currentFromDate exceeds today's date
      if(currentToDate>= new Date() ) {
        this.exceedsCurrentDate=true;
        this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()))
         this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
      }else{
        this.exceedsCurrentDate=false;
      this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(currentFromDate))
      this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(currentToDate))
      }
    }else if(this.durationForm.controls.period.value === 'Monthly'){
        const currentDate= new Date(this.durationForm.controls.createdDtDisp.value);
        const firstDay =   new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1); 
        const lastDay =   new Date(currentDate.getFullYear(), (currentDate.getMonth()-1) + 1, 0);
        
        if(lastDay>= new Date()){
          this.exceedsCurrentDate= true;
          this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstDay));
        this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()))
        }else{
          this.exceedsCurrentDate= false;
        this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstDay));
        this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(lastDay));
        }
      }else if(this.durationForm.controls.period.value === 'Weekly'){
        
        currentFromDate.setDate(currentFromDate.getDate() - (currentFromDate.getDay() +6) % 7);
        const firstWeekday = new Date(currentFromDate.setDate(currentFromDate.getDate() - currentFromDate.getDay()));
        const lastWeekday = new Date(currentFromDate.setDate(currentFromDate.getDate() - currentFromDate.getDay()+6));
        if(firstWeekday>= new Date()){
          this.exceedsCurrentDate= true;
          this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.durationForm.controls.createdDtDisp.value));
          this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.durationForm.controls.updatedDtDisp.value));
        }else if(lastWeekday >= new Date()){
           this.exceedsCurrentDate = true;
           this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday));
          this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
           
        }else{
          this.exceedsCurrentDate=false;
        this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday));
        this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(lastWeekday));
        }
      }else if(this.durationForm.controls.period.value === 'Till'){
        this.fromDateDisabled =true;
        this.durationForm.controls.createdDtDisp.setValue('');
        currentToDate.setDate(currentToDate.getDate()-1);
        if(currentToDate>= new Date() ) {
          this.exceedsCurrentDate=true;
          this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
        }else{
          this.exceedsCurrentDate=false;
          this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(currentToDate))
        }
      }

    }


    changeToNext(event){
      this.fromDateDisabled =false;
      this.exceedsCurrentDate=false;
    
      const currentFromDate= new Date(this.durationForm.controls.updatedDtDisp.value);
      const currentToDate = new Date(this.durationForm.controls.updatedDtDisp.value)
      if(this.durationForm.controls.period.value === 'Daily'){
        currentFromDate.setDate(currentFromDate.getDate()+1);
        currentToDate.setDate(currentToDate.getDate()+1)
  
        //check if currentFromDate exceeds today's date
        if(currentToDate>=new Date() ) {
          this.exceedsCurrentDate=true;
          this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()))
        this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
        }else{
          this.exceedsCurrentDate=false;
          this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(currentFromDate))
          this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(currentToDate))
  
        }   
      }else if(this.durationForm.controls.period.value === 'Monthly'){
        const currentDate= new Date(this.durationForm.controls.createdDtDisp.value);
        const firstDay =   new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1); 
        const lastDay =   new Date(currentDate.getFullYear(), (currentDate.getMonth()+1) + 1, 0); 
        if(lastDay >= new Date()){
          this.exceedsCurrentDate= true;
          this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstDay));
        this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()))
        }else{
          this.exceedsCurrentDate= false;
        this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstDay));
        this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(lastDay));
        }
      }else if(this.durationForm.controls.period.value=== 'Weekly'){
          currentFromDate.setDate(currentFromDate.getDate() + (1 + 7 - currentFromDate.getDay()) % 7);
          const firstWeekday = new Date(currentFromDate.setDate(currentFromDate.getDate() - currentFromDate.getDay()));
          const lastWeekday = new Date(currentFromDate.setDate(currentFromDate.getDate() - currentFromDate.getDay()+6));
          if(firstWeekday>= new Date()){
            this.exceedsCurrentDate=true;
            this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.durationForm.controls.createdDtDisp.value));
            this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.durationForm.controls.updatedDtDisp.value));
          }else if(lastWeekday >= new Date()){
            this.exceedsCurrentDate = true;
            this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday));
            this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
          }else{
          this.exceedsCurrentDate=false;
          this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday));
          this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(lastWeekday));
      }
    }else  if(this.durationForm.controls.period.value === 'Till'){
      this.fromDateDisabled =true;
      this.durationForm.controls.createdDtDisp.setValue('');
      currentToDate.setDate(currentToDate.getDate()+1)

      if(currentToDate>=new Date() ) {
        this.exceedsCurrentDate=true;
      this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
      }else{
        this.exceedsCurrentDate=false;
        this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(currentToDate))

      }
    }
    }
    
  hidePeriod(period){
    if(period != null){
      this.disableNextAndPrevButton = true;
    }else{
      this.disableNextAndPrevButton = false;
    }
  }

  getFromDate(fromDate) {
    
    if(this.durationForm.controls.period.value === 'Daily'){
      this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(fromDate.value));
      this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(fromDate.value));
  
    }else{
    this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(fromDate.value));
  }
  }

  dateValidation1(event) {
    return false;
  }

  dateValidation2(event) {
    return false;
  }

  getToDate(toDate) {
    
    if(this.durationForm.controls.period.value ==='Daily'){
      this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(toDate.value));
      this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(toDate.value));
      
    }else{
    this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(toDate.value));
  }
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit(){
   
   if(this.durationForm.controls.createdDtDisp.value === ''){
     this.startDate = this.firstDate;
   }else{
     this.startDate = this.durationForm.controls.createdDtDisp.value;
   }
   if(this.durationForm.controls.createdDtDisp.value !== ''){
    const fromDate = new Date(this.durationForm.controls.createdDtDisp.value);
    this.durationForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(fromDate));
   }
    const endDate = this.durationForm.controls.updatedDtDisp.value;
    const toDate = new Date(this.durationForm.controls.updatedDtDisp.value);
    this.durationForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(toDate));
    
  
    const date = [{
      fromDate: this.durationForm.controls.createdDtDisp.value,
      toDate: this.durationForm.controls.updatedDtDisp.value,
      period: this.durationForm.controls.period.value,
      fromDateForBackend:this.startDate,
      toDateForBackend: endDate,
    }]
 
    this.dialogRef.close(date);
  }

}
