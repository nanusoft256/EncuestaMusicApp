import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditEncuestaComponent } from './components/add-edit-encuesta/add-edit-encuesta.component';
import { ListEncuestaComponent } from './components/list-encuesta/list-encuesta.component';


const routes: Routes = [
  { path: '', component: ListEncuestaComponent },
  { path: 'add', component: AddEditEncuestaComponent },
  { path: 'edit/:id', component: AddEditEncuestaComponent },
  { path: '**', component: ListEncuestaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
