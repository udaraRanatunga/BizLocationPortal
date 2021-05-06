import {Component, OnInit} from '@angular/core';
import {google} from '@google/maps';
import {DataService} from '../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import { SocialloginService } from '../services/sociallogin.service';
import {Socialusers} from '../models/socialusers';
declare var $: any;
// declare let google: google;
export interface Zone {
    value: string;
    name: string;
}
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };
    socialusers = new Socialusers();
    focus;
    focus1;
    // AIzaSyC8_TDuXjcoGYKsb_fV2JUiLvsBVFKsAkI
    // title = 'Angular Google Maps Example';

    lat;
    lng;
    selectedOption: any;
    private latlng: google.maps.LatLng;
    private colomboZone: any;

    constructor(private service: DataService, private router: Router,
                public OAuth: SocialAuthService,
                private socialloginService: SocialloginService) {
        this.getUsers();
        this.lat = 6.92;
        this.lng = 79.86;
    }

    ngOnInit() {
    console.log(this.colomboZone);
    }

    getUsers() {
        this.service.getColomboZone().subscribe(data => {
            let zones: any = data;
            zones = zones.sort(function(a, b) {
                return a.id - b.id;
            });

            $('#zone').append('<option selected disabled> Select the Colombo Zone...</option>');
            for (const zone of zones) {
                // @ts-ignore
                $('#zone').append('<option value=" ' + zone.id + ' ">' + zone.name + '</option>');
            }
        }, error => {
            console.log(error);
        });
    }

    optionChanged() {
        this.service.getColomboZoneById(this.selectedOption).subscribe( data => {
            const zoneData: any = data;
            this.lat = zoneData.lat;
            this.lng = zoneData.longitude;
        });
    }

    login(socialProvider: string) {
        let socialPlatformProvider;
        if (socialProvider === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
            console.log(socialProvider, socialusers);
            console.log(socialusers);
            localStorage.setItem('socialusers', JSON.stringify(socialusers));
            this.router.navigate([`/step-one`, this.selectedOption]);
            // this.Savesresponse(socialusers);

        });
        // [routerLink]="['/step-one',selectedOption]"
    }
}


// tslint:disable-next-line:prefer-const

