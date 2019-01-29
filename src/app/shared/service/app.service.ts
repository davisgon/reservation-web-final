import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Reservation } from '../model/Reservation';
import { ContactType } from '../model/ContactType';
import { Contact } from '../model/Contact';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private reservationsUrl = 'https://shrouded-sea-42496.herokuapp.com/api/';  // URL to web api 
  
  private contact: Contact;

  constructor(private http: Http) { }



  getReservations(): Promise<Reservation[]> {
    return this.http.get(this.reservationsUrl + "reservation")
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }


  getContacts(): Promise<Contact[]> {
    return this.http.get(this.reservationsUrl + "contact")
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }


  findAllReservationByIdContact(id: number): Promise<Reservation[]> {
    return this.http.get(this.reservationsUrl + "reservation/contact/" + id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }

  updateReservation(reservation: Reservation): Promise<Reservation> {
    return this.http.put(this.reservationsUrl + "reservation/", reservation)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }

  // contactType
  getContactType(): Promise<ContactType[]> {
    return this.http.get(this.reservationsUrl + "contact_type")
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }

  insertContact(contact: Contact): Promise<Contact> {
    return this.http.post(this.reservationsUrl + "contact", contact)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }

  insertReservation(reservation: Reservation): Promise<Reservation> {
    return this.http.post(this.reservationsUrl + "reservation", reservation)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }


  public extractData(res: Response) {
    return res.json();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // 
  public getContact() {
    return this.contact;
  }
  public setContact(contact: Contact) {
    this.contact = contact;
  }

}