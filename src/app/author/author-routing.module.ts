import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CreateQuestionsComponent } from './pages/create-questions/create-questions.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthorLayoutComponent } from './author-layout.component';
import { MyQuestionsComponent } from './pages/my-questions/my-questions.component';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
    {
        path: '', component: AuthorLayoutComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'create-question', component: CreateQuestionsComponent },
            { path: 'my-questions', component: MyQuestionsComponent },
            { path: 'categories', component: CategoriesComponent },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorRoutingModule { }