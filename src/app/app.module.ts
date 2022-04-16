import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AulasListComponent } from './views/home/aulas-list/aulas-list.component';
import { AulasFormComponent } from './views/home/aulas-form/aulas-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalDateTimePipe } from './shared/pipe/local-date-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AulasListComponent,
    AulasFormComponent,
    LocalDateTimePipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    LocalDateTimePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
