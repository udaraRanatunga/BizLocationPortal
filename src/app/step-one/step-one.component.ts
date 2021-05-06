import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
  }]
})
export class StepOneComponent implements OnInit {
  private colomboZone: any;
  types: any;
  targetGroups: any;
  businessType: any;
  targetGroupName: any;
  budgetRange: any;
  budgetRanges: any;
  goals: any;
  indeterminate: any;
  checked: any;
  socialuser: any = localStorage.getItem('socialusers');
  name: any;
  spin = false;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: DataService) {
    this.name = JSON.parse(this.socialuser).name;
    this.activatedRoute.params.subscribe(data => {
      if (data.colomboZone == null) {
        this.colomboZone = '';
      } else {
        this.colomboZone = data.colomboZone;
      }

    });
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.getBusinessTypes();
    this.getTargetGroups();
    this.getPriceRange();
    this.getBusinessGoals();
  }
  getBusinessTypes() {
    this.service.getBusinessType().subscribe(data => {
      this.types = data;
    });
  }
  getTargetGroups() {
    this.service.getTargetGroups().subscribe(data => {
      this.targetGroups = data;
    });
  }
  getPriceRange() {
    this.service.getPriceRange().subscribe(data => {
      this.budgetRanges = data;
    });
  }
  getBusinessGoals() {
    this.service.getBusinessGoals().subscribe(data => {
      this.goals = data;
    });
  }
  ngOnInit(): void {
  }

  list_change() {

  }

  saveUser() {
      this.spin = true;
    const body = {
      'email' : JSON.parse(this.socialuser).email,
      'name' : JSON.parse(this.socialuser).name
    };
    this.service.saveUser(this.colomboZone, this.businessType, this.budgetRange, this.targetGroupName, body).subscribe( data => {
      this.router.navigate([`/step-two`, this.colomboZone, this.budgetRange]);
        this.spin = false;
    }, error => {
        console.log(error);
        this.spin = false;
    });
  }
}
