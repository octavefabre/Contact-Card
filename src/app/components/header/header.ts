import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { ContactsService } from '../../services/contacts.services';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  contacts: Contact[] = [];
  suggestions: Contact[] = [];

  @Output() search = new EventEmitter<string>();

  constructor(private router: Router, private contactsService: ContactsService) {
    this.contacts = this.contactsService.getAll();
  }

  goToContacts() {
    this.router.navigate(['/contacts']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToNew() {
    this.router.navigate(['/contacts/new']);
  }

  onSearch(event: Event) {
    this.contacts = this.contactsService.getAll();
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.search.emit(input.value);

    const v = value.toLowerCase();
    if (!v) {
      this.suggestions = [];
      return;
    }
    this.suggestions = this.contacts.filter((c) => c.name.toLowerCase().startsWith(v));
  }

  goToContactDetail(id: number) {
    this.router.navigate(['/contacts', id]);
    this.suggestions = [];
    (document.querySelector('.search-input') as HTMLInputElement).value = '';
  }
}
