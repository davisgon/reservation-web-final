import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ContactType } from '../shared/model/ContactType';
import { AppService } from '../shared/service/app.service';
import { Contact } from '../shared/model/Contact';
import { Router } from '@angular/router/';



declare var Swal: any;
declare var jQuery: any;

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  public listContactType: SelectItem[];
  public objContact: Contact;
  public filteredContacts: any[];
  public contactSeleted: Contact;
  public existeContacto: String;
  public contact: Contact;
  public listContacts: Contact[];

  public sortKey: string;
  sortField: string;
  sortOrder: number;
  sortOptions: SelectItem[];


  public vRank: number = 2;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.contact = new Contact();

    this.objContact = new Contact();
    this.getContactType()
    this.listContacts = [];
    this.getContact();


  }

  getContact() {
    this.appService.getContacts().then(
      obj => this.success3(obj),
      error => this.failed3(error)
    );
  }
  success3(con: Contact[]) {
    this.listContacts = [];
    this.listContacts = con;
  }
  failed3(error: any) {
    console.log("ERROR " + JSON.stringify(error));
  };


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
    if (this.contactSeleted == undefined) {
      alert("The name of the contact is required");
      return 0;
    }

    if (typeof (this.contactSeleted) == "object") {
      let date = new Date(this.contactSeleted.birthDate);
      date.setDate(date.getDate() + 1);
      this.objContact.contactoType = this.contactSeleted.contactoType;
      this.objContact.phoneNumber = this.contactSeleted.phoneNumber;
      this.objContact.birthDate = date;
      this.existeContacto = 'S';
     
    } else {
      this.existeContacto = 'N';
    }

  }


  


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
      alert("Contacto ya existe")
    }

  }
  successInsertContact(res: Contact) {
    this.appService.setContact(res);
    Swal.fire('Contacto', 'Contacto creado con exito!', 'success')
    this.contactSeleted = res;


  }
  failedInsertContact(error: any) {
    console.log("ERROR " + JSON.stringify(error));
  };


}
