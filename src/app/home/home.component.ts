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
    public zones: Zone[] = [
        {value: '1', name: 'Colombo 1- Fort'},
        {value: '2', name: 'Colombo 2- Slave Island'},
        {value: '3', name: 'Colombo 3- Kollupitiya'},
        {value: '4', name: 'Colombo 4- Bambalapitiya'},
        {value: '5', name: 'Colombo 5- Havelock Town'},
        {value: '6', name: 'Colombo 6- Wellawatta'},
        {value: '7', name: 'Colombo 7- Cinnamon Gardens'},
        {value: '8', name: 'Colombo 8- Borella'},
        {value: '9', name: 'Colombo 9- Dematagoda'},
        {value: '10', name: 'Colombo 10- Maradana'},
        {value: '11', name: 'Colombo 11- Pettah'},
        {value: '12', name: 'Colombo 12- Hulftsdorp'},
        {value: '13', name: 'Colombo 13- Kotahena'},
        {value: '14', name: 'Colombo 14- Grandpass'},
        {value: '15', name: 'Colombo 15- Modara'}
    ];
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
            const zones: any = data;
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

