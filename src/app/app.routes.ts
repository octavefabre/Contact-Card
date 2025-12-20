import { Routes } from '@angular/router';

import { HomePage } from './components/home-page/home-page';
import { ContactsPage } from './components/contacts-page/contacts-page';
import { ContactNewPage } from './components/contact-new-page/contact-new-page';
import { ContactDetailPage } from './components/contact-detail-page/contact-detail-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'contacts', component: ContactsPage },
  { path: 'contacts/new', component: ContactNewPage },
  { path: 'contacts/:id', component: ContactDetailPage },
];
