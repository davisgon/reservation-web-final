import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/service/app.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Reservation } from '../shared/model/Reservation';
import { Contact } from '../shared/model/Contact';

declare var Swal: any;
declare var jQuery: any;


@Component({
  selector: 'app-create-reservation-detail',
  templateUrl: './create-reservation-detail.component.html',
  styleUrls: ['./create-reservation-detail.component.css']
})
export class CreateReservationDetailComponent implements OnInit {

  public listReservation: Reservation[];
  public contact: Contact;
  public reservation: Reservation;

  public sortKey: string;
  sortField: string;
  sortOrder: number;
  sortOptions: SelectItem[];

  public vRank: number = 2;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.reservation = new Reservation();
    this.contact = this.appService.getContact();

    this.sortOptions = [
      { label: 'Newest First', value: '!id' },
      { label: 'Oldest First', value: 'id' },
      { label: 'Name', value: 'name' },
      { label: 'Date', value: 'date' }
    ];


    this.getReservation();
  }

  getReservation() {
    this.appService.getReservations().then(
      obj => this.success(obj),
      error => this.failed(error)
    );
  }
  success(res: Reservation[]) {
    this.listReservation = [];
    this.listReservation = res;
  }
  failed(error: any) {
    console.log("ERROR " + JSON.stringify(error));
  };


  saveReservarvation() {
    this.reservation.contacto = this.contact;
    this.appService.insertReservation(this.reservation).then(
      obj => this.successSave(obj),
      error => this.failedSave(error)
    );
  }
  successSave(res: Reservation) {
    jQuery('#reservationModal').modal('hide')
    Swal.fire('Reserva', 'Su reserva a sido generada con exito!', 'success')
    this.getReservation();

  }
  failedSave(error: any) {
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


}
