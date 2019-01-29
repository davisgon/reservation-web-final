import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/service/app.service';
import { Reservation } from '../shared/model/Reservation';
import { SelectItem } from 'primeng/components/common/selectitem';

declare var Swal: any;
declare var jQuery: any;

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent implements OnInit {

  public listReservation: Reservation[];

  public sortKey: string;
  sortField: string;
  sortOrder: number;
  sortOptions: SelectItem[];
  public reservation: Reservation;

  public vRank: number = 2;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.reservation = new Reservation();
    this.sortOptions = [
      { label: 'Newest First', value: '!id' },
      { label: 'Oldest First', value: 'id' },
      { label: 'Name', value: 'name' },
      { label: 'Date', value: 'date' }
    ];


    this.getReservation();
    this.myfavorites();
  }

  getReservation() {
    this.appService.getReservations().then(
      obj => this.success2(obj),
      error => this.failed2(error)
    );
  }
  success2(res: Reservation[]) {
    this.listReservation = [];
    this.listReservation = res;
  }
  failed2(error: any) {
    console.log("ERROR " + JSON.stringify(error));
  };

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  myfavorites() {
    console.log("On construccion");
  }

  openModal(reservation: Reservation) {
    let date = new Date(reservation.date);
    date.setDate(date.getDate() + 1);
    this.reservation = reservation;
    this.reservation.date = date;
    jQuery('#reservationModal').modal('show')
  }

  updateReservarvation() {
    this.appService.updateReservation(this.reservation).then(
      obj => this.successUpdate(obj),
      error => this.failedUpdate(error)
    );

  }
  successUpdate(res: Reservation) {
    jQuery('#reservationModal').modal('hide')
    Swal.fire('Reserva', 'Your reservatoin is updated!', 'success')
    this.getReservation();
  }
  failedUpdate(error: any) {
    console.log("ERROR " + JSON.stringify(error));
  };
}
