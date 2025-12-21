import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactCard } from '../contact-card/contact-card';
import { ContactsService } from '../../services/contacts.services';
import { Contact } from '../../models/contact.model';
import { LabelsService } from '../../services/label.services';

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
  selectedLabelId: number | null = null;

  constructor(private contactsService: ContactsService, private labelsService: LabelsService) {
    this.contactsService.getAll().subscribe((data) => {
      this.contacts = data;
      this.applyFilters();
    });
    this.filteredContacts = this.contacts;
    this.contactsService.searchTerm$.subscribe(() => {
      this.applyFilters();
    });

    this.labelsService.selectedLabelId$.subscribe((id) => {
      this.selectedLabelId = id;
      this.applyFilters();
    });
  }
  private applyFilters() {
    const txt = (this.contactsService.searchTerm$.value || '').toLowerCase();

    this.filteredContacts = this.contacts
      .filter((c) => c.name.toLowerCase().includes(txt))
      .filter((c) => (this.selectedLabelId === null ? true : c.labelId === this.selectedLabelId));
  }
  onToggleFavorite(id: number) {
    const c = this.contacts.find((x) => x.id === id);
    if (!c) return;

    this.contactsService.toggleFavorite(id, c.favorite).subscribe((updated) => {
      this.contacts = this.contacts.map((x) => (x.id === id ? updated : x));
      this.applyFilters();
    });
  }
}
