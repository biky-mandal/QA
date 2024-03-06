import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './index';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    provideAuth(() => getAuth())
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
