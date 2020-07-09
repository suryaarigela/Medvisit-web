import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators'
import { SpecialitySerService } from '../speciality-ser.service';
import { Speciality } from '../model/speciality';
import { DoctorsService } from '../doctors.service';
import { Doctor } from '../model/doctor';
import { SharedServService } from '../shared-serv.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  minDate: Date;
  maxDate: Date;
  selectedDate:FormControl;

  ngOnDestroy(): void {
    this.doctors = [];
    this.getAllDocSub.unsubscribe();
    this.getAllSpecSub.unsubscribe();
  }
  doctors: Doctor[] = []


  ngOnInit() {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.selectedDate=new FormControl(this.minDate)
    this.specialityServ.getAllSpeciality();
    if (!this.shared.isValidUser) {
      this.router.navigate(['login'])
    }
  }

  showButtons() {
    return !this.shared.isValidUser
  }

  login() {
    this.router.navigate(['login']);
  }

  signUp() {
    this.router.navigate(['signUp'])
  }
  getAllDocSub: Subscription;
  getAllSpecSub: Subscription
  searchControl: FormControl;
  zipSearch: FormControl;
  insuranceSearch: FormControl;
  filteredResults$: Observable<string[]>;
  filteredInsuResults$: Observable<string[]>;
  results: string[] = []
  parsedDate:string;
  insuresults: string[] = ['United Health Group', 'Sigma', 'My Health']
  constructor(private readonly router: Router,
    private readonly specialityServ: SpecialitySerService, private readonly shared: SharedServService, private readonly docServ: DoctorsService) {
    this.searchControl = new FormControl('');
    this.zipSearch = new FormControl('');
    this.insuranceSearch = new FormControl('');
    this.filteredResults$ = this.searchControl.valueChanges.pipe(
      map(val => this.filterResults(val)),
      map(val => val.slice(0, 4)))
      ;

    this.filteredInsuResults$ = this.insuranceSearch.valueChanges.pipe(
      map(val => this.filterInsuResults(val)),
      map(val => val.slice(0, 4)))
      ;

    this.getAllDocSub = this.docServ.getAllDoc$.subscribe(docs => {
      this.doctors = docs;
    })
    this.getAllSpecSub = this.specialityServ.getAllSpec$.subscribe(data => {

      this.results = data.map(row => {
        return row.name;
      })
    })
  }

  private filterResults(val: string): string[] {
    return val ? this.results.filter(v => v.toLowerCase().indexOf(val.toLowerCase()) === 0) : [];
  }

  private filterInsuResults(val: string): string[] {
    return val ? this.insuresults.filter(v => v.toLowerCase().indexOf(val.toLowerCase()) === 0) : [];
  }

  searchDoc() {
    console.log(moment(this.selectedDate.value).format('MM-DD-YYYY'))
    this.parsedDate=moment(this.selectedDate.value).format('MM-DD-YYYY');
    this.docServ.getAllDoctor(this.searchControl.value);
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    //this.events.push(`${type}: ${event.value}`);
    this.searchDoc();
  }
}
