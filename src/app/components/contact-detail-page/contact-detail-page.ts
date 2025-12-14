import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Contact } from '../../models/contact.model';
import { Label } from '../../models/label.model';
import { ContactsService } from '../../services/contacts.services';
import { LabelsService } from '../../services/label.services';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-contact-detail-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-detail-page.html',
  styleUrls: ['./contact-detail-page.css',]
})
export class ContactDetailPage {
  id!: number;
  contact!: Contact;
  edit = false;
  form!: FormGroup;
  label?: Label;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private labelsService: LabelsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.contact = this.contactsService.getById(this.id)!;
    if (this.contact.labelId !== null) {
      this.label = this.labelsService.getById(this.contact.labelId);
    }

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      album: [''],
      bestSong: [''],
      photoUrl: ['', Validators.required],
      notes: [''],
    });
    this.form.patchValue({
      name: this.contact.name,
      email: this.contact.email,
      phone: this.contact.phone,
      album: this.contact.album,
      bestSong: this.contact.bestSong,
      photoUrl: this.contact.photoUrl,
      notes: this.contact.notes,
    });
  }

  editContact() {
    this.edit = true;
  }

  deleteContact() {
    if (confirm('Are you sure you want to delete this contact ?')) {
      this.contactsService.delete(this.id);
      this.router.navigate(['/contacts']);
    }
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.contactsService.update(this.id, this.form.value);
      this.edit = false;
      this.contact = { ...this.contact, ...this.form.value };
    }
  }
}
