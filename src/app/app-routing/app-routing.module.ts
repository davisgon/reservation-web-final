import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { ListReservationComponent } from '../list-reservation/list-reservation.component';
import { CreateReservationComponent } from '../create-reservation/create-reservation.component';
import { CreateReservationDetailComponent } from '../create-reservation-detail/create-reservation-detail.component';
import { CreateContactComponent } from '../create-contact/create-contact.component';

const routes: Routes = [
  {
    path: '',
    component: ListReservationComponent
  },
  {
    path: 'create-reservation',
    component: CreateReservationComponent
  },
  {
    path: 'create-reservation-detail',
    component: CreateReservationDetailComponent
  },
  {
    path: 'create-contact',
    component: CreateContactComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }



