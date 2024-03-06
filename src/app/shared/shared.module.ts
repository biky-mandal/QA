import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BadgeComponent } from './components/badge/badge.component';
import { ButtonComponent } from './components/button/button.component';



@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    ProfileComponent,
    BadgeComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatSlideToggleModule
  ],
  exports: [
    ButtonComponent
  ]
})
export class SharedModule { }
