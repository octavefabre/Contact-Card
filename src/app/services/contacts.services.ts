import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private readonly STORAGE_KEY = 'contacts';

  getAll(): Contact[] {
    // on récupère les données dans le local storage
    const stored = localStorage.getItem(this.STORAGE_KEY);

    if (stored) {
      // fonction permettant de verifier et de renvoyer si contact existe deja
      return JSON.parse(stored) as Contact[];
    }

    const initial: Contact[] = [
      {
        id: 1,
        name: 'Rich Amiri',
        email: 'octave@example.com',
        phone: '+1 000 000 0000',
        album: 'Ghetto Fabulous',
        bestSong: 'Amiri Trendsetter',
        labelId: 1,
        favorite: false,
        notes: 'Underground rapper from Boston',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        photoAlt: 'photo de Rich Amiri',
        photoUrl: 'https://i.scdn.co/image/ab67616d0000b273e5e37f78fe2887953496c294',
      },
      {
        id: 2,
        name: 'Yeat',
        email: 'yeat@lyfestyle.com',
        phone: '+1 000 000 0001',
        album: '2093',
        bestSong: 'Lil Krazy',
        labelId: 1,
        favorite: false,
        notes: 'The Best Rapper Alive',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        photoAlt: 'photo de Yeat',
        photoUrl: 'https://images.genius.com/bfba6bfe51f0f4c3c68eabb6b8048098.1000x1000x1.jpg',
      },
      {
        id: 3,
        name: 'Don Toliver',
        email: 'hardstone@cactusjack.com',
        phone: '+1 000 000 0002',
        album: 'Hardstone Psycho',
        bestSong: 'Geek Time',
        labelId: 2,
        favorite: false,
        notes: 'don toliver is signed in cactus Jack Travis Scott Label',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        photoAlt: 'photo de Don Toliver',
        photoUrl: 'https://i.scdn.co/image/ab6761610000e5eb52258b97639c24efe49fbf9e',
      },
    ];

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  saveAll(contacts: Contact[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
  }

  toggleFavorite(id: number): void {
    const contacts = this.getAll();

    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) {
      return;
    }

    const contact = contacts[index];

    const updated: Contact = {
      ...contact,
      favorite: !contact.favorite,
      updatedAt: new Date().toISOString(),
    };

    contacts[index] = updated;
    this.saveAll(contacts);
  }

  getById(id: number): Contact | undefined {
    const contacts = this.getAll();
    return contacts.find((c) => c.id === id);
  }
  delete(id: number): void {
    const contacts = this.getAll();
    const filtered = contacts.filter((c) => c.id !== id);
    this.saveAll(filtered);
  }
  update(id: number, data: Partial<Contact>) {
    const contacts = this.getAll();
    const index = contacts.findIndex((c) => c.id === id);
    contacts[index] = { ...contacts[index], ...data };
    this.saveAll(contacts);
  }
  //barre de recherche//
  searchTerm$ = new BehaviorSubject<string>('');
}
