import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlossaryActionComponent } from './components/glossary-action/glossary-action.component';
import { GlossaryDetailComponent } from './components/glossary-detail/glossary-detail.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'detail/:id', component: GlossaryDetailComponent,
    data: { id: 0, term: '', definition: '' }
  },
  {
    path: 'edit/:id', component: GlossaryActionComponent,
    data: { id: 0, term: '', definition: '' }
  },
  { path: 'add', component: GlossaryActionComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
