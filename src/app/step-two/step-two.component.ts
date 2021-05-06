import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../services/data.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {
  location = 'Wellawatta';
  closeResult: string;
  private zoneId;
  colomboZone: any;
  zoneData: any;
  private cuisines: any;
  private priceRange: any;
  private budgetColomboZones: any;
  private competitorData: any;
  private body: any;
  spin = false;
  private competitor = '';
  private budgetColomboZone = '';
  // tslint:disable-next-line:max-line-length
  constructor( private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal, private service: DataService) {
    this.activatedRoute.params.subscribe(data => {
      if (data.colomboZone == null) {
        this.zoneId = '';
      } else {
        // tslint:disable-next-line:radix
        this.zoneId = parseInt(data.colomboZone);
        this.getColomboZone();
        // console.log(this.zoneId);
      }
      if (data.priceRange == null) {
        this.priceRange = '';
      } else {
        // tslint:disable-next-line:radix
        this.priceRange = parseInt(data.priceRange);
        this.getColomboZoneByBudget();
      }
    });
  }

  ngOnInit(): void {
  }
  getColomboZone() {
    this.service.getColomboZoneByZoneNumber(this.zoneId).subscribe(data => {
      this.zoneData = data;
      this.colomboZone = this.zoneData.name;
      // console.log(this.zoneData);
      this.getCuisineData();
      this.getCompetitorsByZone();
    }, error => {
      console.log(error);
    });
  }

  getCuisineData() {
    this.service.getCuisineDataByZone(this.zoneData.id).subscribe(data => {
      this.cuisines = data;
      console.log(this.cuisines);
    });
  }
  getColomboZoneByBudget() {
    this.service.getColomboZoneByBudget(this.priceRange).subscribe( data => {
      this.budgetColomboZones = data;
    });
  }
  getCompetitorsByZone() {
    this.service.getCompetitorsByZone(this.zoneData.id).subscribe(data => {
      this.competitorData = data;
        }
    );
  }
  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }
  }

  mail() {
    this.spin = true;
    this.competitorData.forEach(obj => {
      this.competitor = this.competitor + 'Restaurant Type: ' + obj.restaurantType + ' No. of outlets: ' + obj.noOfOutlets;
    });
    this.budgetColomboZones.forEach(obj => {
      this.budgetColomboZone = this.budgetColomboZone + obj.name;
    });
    this.body = {
      'name': JSON.parse(localStorage.getItem('socialusers')).name,
      'to': JSON.parse(localStorage.getItem('socialusers')).email,
      'topic': 'BizLocationFinder Results',
      // tslint:disable-next-line:max-line-length
      'message': '<html>' +
                  '<head></head>' +
                  '<body>' +
                  '<ul>' +
                  '<li>Selected Location:' + this.zoneData.name + '</li>' +
                  '<li> Foodie Index: ' + this.zoneData.foodieIndex + '</li>' +
                  '<li> Night Life Index: ' + this.zoneData.nightLifeIndex + '</li>' +
                  '<li> Average Cost for Two: ' + this.zoneData.averageCost + '</li>' +
                  '<li> Average Rating:' + this.zoneData.averageRating + '</li>' +
                  '<li> Competitor Businesses in the area: ' + this.competitor + '</li>' +
                  '<li> Areas matching the budget: ' + this.budgetColomboZone + '</li>' +
                  '</ul>' +
                  '</body>' +
                  '</html>.'
    };
    this.service.sendMail(this.body).subscribe(data => {
      this.spin = false;
      Swal.fire('Success!', 'Email Sent', 'success');
    }, error => {
      this.spin = false;
      console.log(error);
    });
  }
}
