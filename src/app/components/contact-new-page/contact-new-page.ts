import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { Label } from '../../models/label.model';
import { ContactsService } from '../../services/contacts.services';
import { LabelsService } from '../../services/label.services';

@Component({
  selector: 'app-contact-new-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-new-page.html',
  styleUrl: './contact-new-page.css',
})
export class ContactNewPage {
  form!: FormGroup;
  labels: Label[] = [];

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private labelsService: LabelsService,
    private router: Router
  ) {
    this.labels = this.labelsService.getAll();
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      album: [''],
      labelName: [''],
      bestSong: [''],
      photoUrl: ['', Validators.required],
      notes: [''],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const contacts = this.contactsService.getAll();
    const maxId = contacts.length ? Math.max(...contacts.map((c) => c.id)) : 0;
    const now = new Date().toISOString();
    const v = this.form.value;
    const name = (v.labelName ?? '').trim();
    const labelId = name ? this.labelsService.getOrCreateIdByName(name) : null;

    const newContact: Contact = {
      id: maxId + 1,
      name: v.name!,
      email: v.email!,
      phone: v.phone!,
      album: v.album ?? '',
      bestSong: v.bestSong ?? '',
      labelId: labelId ?? null,
      favorite: false,
      notes: v.notes ?? '',
      createdAt: now,
      updatedAt: now,
      photoUrl: v.photoUrl ?? '',
      photoAlt: v.name ?? '',
    };

    this.contactsService.saveAll([...contacts, newContact]);

    this.router.navigate(['/contacts']);
  }
}
