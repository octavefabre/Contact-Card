import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Label } from '../models/label.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LabelsService {
  private apiUrl = 'http://localhost:3000/labels';
  selectedLabelId$ = new BehaviorSubject<number | null>(null);
  searchTerm$ = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Label[]>(this.apiUrl);
  }

  getByName(name: string) {
    return this.getAll().pipe(map((labels) => labels.find((l) => l.name === name)));
  }

  getById(id: number) {
    return this.getAll().pipe(map((labels) => labels.find((l) => l.id === id)));
  }

  getOrCreateIdByName(name: string) {
    return this.http.post<Label>(this.apiUrl, { name }).pipe(map((label) => label.id));
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
