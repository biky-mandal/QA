import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BadgeComponent } from './components/badge/badge.component';
import { ButtonComponent } from './components/button/button.component';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { FeatureCardComponent } from './components/feature-card/feature-card.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    ProfileComponent,
    BadgeComponent,
    ButtonComponent,
    LoginComponent,
    FeatureCardComponent,
    NavItemComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    provideAuth(() => getAuth())
  ],
  exports: [
    ButtonComponent, NavItemComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class SharedModule { }
