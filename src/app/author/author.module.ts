import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthGuard } from '../guards/auth.guard';
import { CreateQuestionsComponent } from './pages/create-questions/create-questions.component';

@NgModule({
  declarations: [
    CreateQuestionsComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AuthorModule { }
