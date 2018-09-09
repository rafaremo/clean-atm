import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HistorialComponent } from './components/historial/historial.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { patch } from 'webdriver-js-extender';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'tickets/:userId', component: HistorialComponent},
  {path: 'ticket/:id', component: TicketComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HistorialComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
