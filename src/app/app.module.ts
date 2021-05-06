import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CompetitorsComponent } from './modals/competitors/competitors.component';
import { MailComponent } from './modals/mail/mail.component';
import {MatRadioModule} from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    StepOneComponent,
    StepTwoComponent,
    AboutUsComponent,
    ContactUsComponent,
    CompetitorsComponent,
    MailComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        HomeModule,
        SocialLoginModule,
        HttpClientModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyC8_TDuXjcoGYKsb_fV2JUiLvsBVFKsAkI'
        }),
        MatRadioModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatListModule,
        MatProgressSpinnerModule
    ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
              '180786594465-565dnumms3t1sa0r2q11t4gvpl5u8svl.apps.googleusercontent.com'
              // clientsecret:WfMeahraMEzlCIhAzsAz7AQT
              // '180786594465-5u2qsf06lqgupqfqrutccks6fh3d84ek.apps.googleusercontent.com'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  }],
  exports: [
    FooterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
