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
  styleUrls: ['./contact-detail-page.css'],
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

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      album: [''],
      bestSong: [''],
      labelName: [''],
      photoUrl: ['', Validators.required],
      notes: [''],
    });

    this.loadContact();
  }

  private loadContact() {
    this.contactsService.getById(this.id).subscribe((c) => {
      this.contact = c;

      this.form.patchValue({
        name: c.name,
        email: c.email,
        phone: c.phone,
        album: c.album,
        bestSong: c.bestSong,
        photoUrl: c.photoUrl,
        notes: c.notes,
        labelName: '',
      });

      if (c.labelId !== null) {
        this.labelsService.getById(c.labelId).subscribe((l) => {
          this.label = l ?? undefined;
          this.form.patchValue({ labelName: this.label?.name ?? '' });
        });
      } else {
        this.label = undefined;
        this.form.patchValue({ labelName: '' });
      }
    });
  }

  editContact() {
    this.edit = true;
  }

  deleteContact() {
    if (confirm('Are you sure you want to delete this contact ?')) {
      this.contactsService.delete(this.id).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;
    const labelName = (v.labelName ?? '').trim();

    const updateContact = (labelId: number | null) => {
      const payload: Partial<Contact> = {
        name: v.name,
        email: v.email,
        phone: v.phone,
        album: v.album,
        bestSong: v.bestSong,
        photoUrl: v.photoUrl,
        notes: v.notes,
        labelId,
      };

      this.contactsService.update(this.id, payload).subscribe((c) => {
        this.contact = c;
        this.edit = false;
        this.loadContact();
      });
    };

    if (!labelName) return updateContact(null);

    this.labelsService.getOrCreateIdByName(labelName).subscribe((id) => {
      updateContact(id);
    });
  }
}
