import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { ContactsService } from './services/contacts.services';
import { LabelsService } from './services/label.services';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
})
export class App {
  constructor(private contactsService: ContactsService, private labelsService: LabelsService) {}

  filter(text: string) {
    this.contactsService.searchTerm$.next(text);
    this.labelsService.searchTerm$.next(text);
  }
}
