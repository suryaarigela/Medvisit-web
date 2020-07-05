import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from 'src/app/model/doctor';

@Component({
  selector: 'app-doctor-availability',
  templateUrl: './doctor-availability.component.html',
  styleUrls: ['./doctor-availability.component.scss']
})
export class DoctorAvailabilityComponent implements OnInit {

  @Input() ind: any;
  @Input() doc: Doctor;
  constructor() { }

  ngOnInit() {
    console.log('doctoe....', this.doc)
  }

}
