import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CreateQuestionsComponent } from './pages/create-questions/create-questions.component';

const routes: Routes = [
    { path: 'create-question', component: CreateQuestionsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorRoutingModule { }