import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ContactType } from '../shared/model/ContactType';
import { AppService } from '../shared/service/app.service';
import { Contact } from '../shared/model/Contact';
import { Router } from '@angular/router/';
import { Reservation } from '../shared/model/Reservation';

declare var Swal: any;
declare var jQuery: any;

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {

  public listContactType: SelectItem[];
  public objContact: Contact;
  public filteredContacts: any[];
  public contactSeleted: Contact;
  public existeContacto: String;
  public reservation: Reservation;
  public listReservation: Reservation[];

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.reservation = new Reservation();
    this.objContact = new Contact();
    this.getContactType()
    this.listReservation = [];


  }

  filteredContact(event) {
    let query = event.query;
    this.appService.getContacts().then(contacts => {
      this.filteredContacts = this.filteredContactD(query, contacts);
    });
  }

  filteredContactD(query, contacts: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (contact.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(contact);
      }
    }
    return filtered;
  }

  onBlurMethod() {
    if (typeof (this.contactSeleted) == "object") {
      let date = new Date(this.contactSeleted.birthDate);
      date.setDate(date.getDate() + 1);
      this.objContact.contactoType = this.contactSeleted.contactoType;
      this.objContact.phoneNumber = this.contactSeleted.phoneNumber;
      this.objContact.birthDate = date;
      this.existeContacto = 'S';
      this.findAllReservationByIdContact(this.contactSeleted.id);
    } else {
      this.existeContacto = 'N';
    }

  }


  findAllReservationByIdContact(id: number) {
    this.appService.findAllReservationByIdContact(id).then(
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


  getContactType() {
    this.appService.getContactType().then(
      obj => this.success2(obj),
      error => this.failed2(error)
    );
  }
  success2(res: ContactType[]) {
    this.listContactType = [];
    this.listContactType.push({ label: 'Select ContactType', value: null });
    for (let i of res) {
      this.listContactType.push({ label: i.description, value: i });
    }
  }
  failed2(error: any) {
    console.log("ERROR " + JSON.stringify(error));
  };


  saveContact() {
    if (this.existeContacto == 'N') {
      this.objContact.name = String(this.contactSeleted);
      this.appService.insertContact(this.objContact).then(
        obj => this.successInsertContact(obj),
        error => this.failedInsertContact(error)
      );
    } else {
      jQuery('#reservationModal').modal('show')
    }

  }
  successInsertContact(res: Contact) {
    this.appService.setContact(res);
    jQuery('#reservationModal').modal('show')
    this.contactSeleted = res;


  }
  failedInsertContact(error: any) {
    console.log("ERROR " + JSON.stringify(error));
  };

  saveReservarvation() {
    this.reservation.contacto = this.contactSeleted;
    this.appService.insertReservation(this.reservation).then(
      obj => this.successSave(obj),
      error => this.failedSave(error)
    );
  }
  successSave(res: Reservation) {
    jQuery('#reservationModal').modal('hide')
    Swal.fire('Reserva', 'Su reserva a sido generada con exito!', 'success')
    this.findAllReservationByIdContact(res.contacto.id);
    this.contactSeleted = new Contact();
    this.objContact = new Contact();
    this.reservation = new Reservation();
  }
  failedSave(error: any) {
    console.log("ERROR " + JSON.stringify(error));
  };
}
