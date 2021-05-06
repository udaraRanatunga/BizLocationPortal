import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../services/data.service';

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
  private budgetColomboZones: Object;
  private competitorData: Object;
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
    this.service.getColomboZoneByBudget(this.priceRange).subscribe( data =>{
      this.budgetColomboZones = data;
    });
  }
  getCompetitorsByZone() {
    this.service.getCompetitorsByZone(this.zoneData.id).subscribe(data =>{
      this.competitorData = data;
        }
    )
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
    console.log('send mail');
  }
}
