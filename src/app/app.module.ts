import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AddEditEncuestaComponent } from './components/add-edit-encuesta/add-edit-encuesta.component';
import { ListEncuestaComponent } from './components/list-encuesta/list-encuesta.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MensajeConfirmacionComponent } from './components/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddEditEncuestaComponent,
    ListEncuestaComponent,
    NavbarComponent,
    MensajeConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
