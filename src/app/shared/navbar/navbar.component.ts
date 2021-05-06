import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import { SocialloginService } from '../../services/sociallogin.service';
import {Socialusers} from '../../models/socialusers';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    response;
    socialusers = new Socialusers();
    constructor(public location: Location,
                public OAuth: SocialAuthService,
                private socialloginService: SocialloginService,
                private router: Router) {
    }

    ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
            // tslint:disable-next-line:triple-equals
           if (event.url != this.lastPoppedUrl) {
               this.yScrollStack.push(window.scrollY);
           }
       } else if (event instanceof NavigationEnd) {
            // tslint:disable-next-line:triple-equals
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else {
               window.scrollTo(0, 0);
           }
       }
     });
     this.location.subscribe((ev: PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
    }

    isHome() {
        // tslint:disable-next-line:prefer-const
        let titlee = this.location.prepareExternalUrl(this.location.path());

        if ( titlee === '#/home' ) {
            return true;
        } else {
            return false;
        }
    }
    // isDocumentation() {
    //     var titlee = this.location.prepareExternalUrl(this.location.path());
    //     if( titlee === '#/documentation' ) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }
    public socialSignIn(socialProvider: string) {
        let socialPlatformProvider;
        if (socialProvider === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
            // console.log(socialProvider, socialusers);
            // console.log(socialusers);
            localStorage.setItem('socialusers', JSON.stringify(socialusers));
            this.router.navigate([`/home`]);
            // this.Savesresponse(socialusers);

        });
    }
    logout() {
        this.OAuth.signOut().then(data => {
            // debugger;
            localStorage.removeItem('socialusers')
            this.router.navigate([`/login`]);
        });
    }
}
