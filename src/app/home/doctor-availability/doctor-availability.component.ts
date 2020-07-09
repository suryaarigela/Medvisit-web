import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '../../model/doctor';


@Component({
  selector: 'app-doctor-availability',
  templateUrl: './doctor-availability.component.html',
  styleUrls: ['./doctor-availability.component.scss']
})
export class DoctorAvailabilityComponent implements OnInit {

  @Input() date:string;
  @Input() ind: any;
  @Input() doc: Doctor;
  hours:Map<string,boolean>=new Map;
  constructor() { }

  ngOnInit() {
    this.doc.availableHours.forEach(time=>{
      if(this.doc.filledHours[this.date] && this.doc.filledHours[this.date].includes(time)){
        this.hours.set(time,false);
      }else{
        this.hours.set(time,true);
      }
    })
    console.log('doctoe....', this.hours)
  }

  getClass(flag){
    if(flag){
      return 'mat-chip-success'
    }else{
     return 'mat-chip-danger'
    }
  
  }

}
