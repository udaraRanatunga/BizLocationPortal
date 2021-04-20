import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import { SocialloginService } from '../services/sociallogin.service';
import {Socialusers} from '../models/socialusers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  response;
  socialusers = new Socialusers();
  constructor(
      public OAuth: SocialAuthService,
      private socialloginService: SocialloginService,
      private router: Router
  ) { }


  ngOnInit() {
  }
  // tslint:disable-next-line:typedef
  Savesresponse(socialusers: Socialusers) {

    // tslint:disable-next-line:no-debugger
    this.socialloginService.Savesresponse(socialusers).subscribe((res: any) => { debugger;
      console.log(res);
      this.socialusers = res;
      this.response = res.userDetail;
      localStorage.setItem('socialusers', JSON.stringify(this.socialusers));
      console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));
      this.router.navigate([`/home`]);
    });
  }
}
