import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactCard } from './components/contact-card/contact-card';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Contact } from './models/contact.model';
import { ContactsService } from './services/contacts.services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContactCard, Header, Footer],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  contacts: Contact[] = [];

  constructor(private contactsService: ContactsService) {
    this.contacts = this.contactsService.getAll();
  }

  resetContacts() {
    localStorage.removeItem('contacts');
    this.contacts = this.contactsService.getAll();
  }

  filter(text: string) {
    this.contactsService.searchTerm$.next(text);
  }
}
