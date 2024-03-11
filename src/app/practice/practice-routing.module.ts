import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeDashboardComponent } from './practice-dashboard.component';

const routes: Routes = [
    { path: 'questions', component: PracticeDashboardComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PracticeRoutingModule { }