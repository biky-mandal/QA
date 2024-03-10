import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthGuard } from '../guards/auth.guard';
import { CreateQuestionsComponent } from './pages/create-questions/create-questions.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthorLayoutComponent } from './author-layout.component';
import { SharedModule } from '../shared/shared.module';
import { MyQuestionsComponent } from './pages/my-questions/my-questions.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateCategoryDialogComponent } from './pages/create-category-dialog/create-category-dialog.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    CreateQuestionsComponent,
    DashboardComponent,
    AuthorLayoutComponent,
    MyQuestionsComponent,
    CategoriesComponent,
    CreateCategoryDialogComponent,
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    SharedModule,
    MatTreeModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AuthorModule { }
