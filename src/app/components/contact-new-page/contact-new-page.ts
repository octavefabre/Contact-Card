import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.services';
import { LabelsService } from '../../services/label.services';
import { Contact } from '../../models/contact.model';
import { Label } from '../../models/label.model';

@Component({
  selector: 'app-contact-new-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-new-page.html',
  styleUrls: ['./contact-new-page.css'],
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
    if (this.form.invalid){
      alert("champs invalides");
      return;
    }

    const v = this.form.value;
    const labelName = v.labelName?.trim();

    if (labelName) {
      this.labelsService.getOrCreateIdByName(labelName).subscribe((labelId) => {
        this.createContact(labelId);
      });
    } else {
      this.createContact(null);
    }
  }

  private createContact(labelId: number | null) {
    const v = this.form.value;

    const data: Partial<Contact> = {
      name: v.name,
      email: v.email,
      phone: v.phone,
      album: v.album,
      bestSong: v.bestSong,
      notes: v.notes,
      photoUrl: v.photoUrl,
      labelId,
      favorite: false,
    };

    this.contactsService.create(data as Contact).subscribe(() => {
      this.router.navigate(['/contacts']);
    });
  }
}