import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditorModule } from 'primeng/editor';
import { ListReservationComponent } from './list-reservation/list-reservation.component';

import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppService } from './shared/service/app.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RatingModule } from 'primeng/rating';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CreateReservationDetailComponent } from './create-reservation-detail/create-reservation-detail.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CreateContactComponent } from './create-contact/create-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ListReservationComponent,
    CreateReservationComponent,
    CreateReservationDetailComponent,
    CreateContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginatorModule,
    EditorModule,
    BrowserAnimationsModule,
    DataViewModule,
    TableModule,
    FormsModule,
    HttpModule,
    RatingModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
