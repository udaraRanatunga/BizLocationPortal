import { Component, OnInit } from '@angular/core';
import { google } from '@google/maps';
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
    public zones: Zone[] = [
        { value: '1', name: 'Colombo 1- Fort' },
        { value: '2', name: 'Colombo 2- Slave Island' },
        { value: '3', name: 'Colombo 3- Kollupitiya' },
        { value: '4', name: 'Colombo 4- Bambalapitiya' },
        { value: '5', name: 'Colombo 5- Havelock Town' },
        { value: '6', name : 'Colombo 6- Wellawatta' },
        { value: '7', name: 'Colombo 7- Cinnamon Gardens' },
        { value: '8', name: 'Colombo 8- Borella' },
        { value: '9', name: 'Colombo 9- Dematagoda' },
        { value: '10', name: 'Colombo 10- Maradana' },
        { value: '11', name: 'Colombo 11- Pettah' },
        { value: '12', name: 'Colombo 12- Hulftsdorp' },
        { value: '13', name: 'Colombo 13- Kotahena' },
        { value: '14', name: 'Colombo 14- Grandpass' },
        { value: '15', name: 'Colombo 15- Modara' }
    ];
    focus;
    focus1;
    // AIzaSyC8_TDuXjcoGYKsb_fV2JUiLvsBVFKsAkI
    title = 'Angular Google Maps Example';

    lat = 6.9271 ;
    lng = 79.8612;
    constructor() { }

    ngOnInit() {
        // let options = '';
        //
        // for (let i = 0; i < this.zones.length; i++) {
        //     options += '<option value="' + this.zones[i].value + '" label="' + this.zones[i].name + '"/>';
        // }
        //
        // document.getElementById('zones').innerHTML = options;
    }
}
// declare let google: google;
    // tslint:disable-next-line:prefer-const

