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
import { MultiselectChipsComponent } from './components/multiselect-chips/multiselect-chips.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { QuestionCardComponent } from './components/question-card/question-card.component';

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
    NavItemComponent,
    MultiselectChipsComponent,
    QuestionCardComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    provideAuth(() => getAuth())
  ],
  exports: [
    ButtonComponent, NavItemComponent, MultiselectChipsComponent, QuestionCardComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class SharedModule { }
