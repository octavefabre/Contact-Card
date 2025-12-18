import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  
  private apiUrl = 'http://localhost:3000/contacts';
  searchTerm$ = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  create(data: Contact) {
    return this.http.post<Contact>(this.apiUrl, data);
  }

  update(id: number, data: Partial<Contact>) {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  toggleFavorite(id: number, current: boolean) {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, { favorite: !current });
  }
}
