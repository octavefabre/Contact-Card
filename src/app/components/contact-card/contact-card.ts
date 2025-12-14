import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.css',
})
export class ContactCard {
  @Input() contact!: Contact;
  @Output() favoriteToggled = new EventEmitter<number>();

  constructor(private router: Router) {}

  goToDetail() {
    this.router.navigate(['/contacts', this.contact.id]);
  }

  onToggleFavoriteClick(event: Event) {
    event.stopPropagation();
    this.favoriteToggled.emit(this.contact.id);
  }
}
