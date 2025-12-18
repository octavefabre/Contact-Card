import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { ContactsService } from '../../services/contacts.services';
import { LabelsService } from '../../services/label.services';
import { Contact } from '../../models/contact.model';
import { Label } from '../../models/label.model';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  contacts: Contact[] = [];
  suggestions: Contact[] = [];
  labels: Label[] = [];
  labelSuggestions: Label[] = [];

  @Output() search = new EventEmitter<string>();

  constructor(
    private router: Router,
    private contactsService: ContactsService,
    private labelsService: LabelsService
  ) {
    this.contactsService.getAll().subscribe((c) => {
      this.contacts = c;
    });
    this.labelsService.getAll().subscribe((l) => {
      this.labels = l;
    });
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
    this.labelsService.getAll().subscribe((l) => {
      this.labels = l;
    });
    this.contactsService.getAll().subscribe((c) => {
      this.contacts = c;
    });
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.search.emit(input.value);

    const v = value.toLowerCase();
    if (!v) {
      this.suggestions = [];
      this.labelSuggestions = [];
      return;
    }
    this.labelSuggestions = this.labels.filter((l) => l.name.toLocaleLowerCase().startsWith(v));
    this.suggestions = this.contacts.filter((c) => c.name.toLowerCase().startsWith(v));
  }

  goToContactDetail(id: number) {
    this.router.navigate(['/contacts', id]);
    this.suggestions = [];
    (document.querySelector('.search-input') as HTMLInputElement).value = '';
  }
  goToLabelDetail(id: number) {
    this.router.navigate(['/contacts']);
    this.labelSuggestions = [];
    (document.querySelector('.search-input') as HTMLInputElement).value = '';
  }
}
