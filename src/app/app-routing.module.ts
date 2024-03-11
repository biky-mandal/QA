import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('../app/shared/shared.module').then(m => m.SharedModule) },
  { path: 'author', loadChildren: () => import('../app/author/author.module').then(m => m.AuthorModule) },
  { path: 'practice', loadChildren: () => import('../app/practice/practice.module').then(m => m.PracticeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
