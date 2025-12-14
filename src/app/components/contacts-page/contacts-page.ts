import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactCard } from '../contact-card/contact-card';
import { ContactsService } from '../../services/contacts.services';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, ContactCard],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.css',
})
export class ContactsPage {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];

  constructor(private contactsService: ContactsService) {
    this.contacts = this.contactsService.getAll();
    this.filteredContacts = this.contacts;
    this.contactsService.searchTerm$.subscribe((t) => {
      const txt = t.toLowerCase();
      this.filteredContacts = this.contacts.filter((c) => c.name.toLowerCase().includes(txt));
    });
  }

  onToggleFavorite(id: number) {
    this.contactsService.toggleFavorite(id);
    this.contacts = this.contactsService.getAll();
    this.filteredContacts = this.contacts;
  }
}
