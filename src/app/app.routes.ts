import { Routes } from '@angular/router';

import { HomePage } from './components/home-page/home-page';
import { ContactsPage } from './components/contacts-page/contacts-page';
import { ContactNewPage } from './components/contact-new-page/contact-new-page';
import { ContactDetailPage } from './components/contact-detail-page/contact-detail-page';
// import { CategoriesPage } from './categories-page/categories-page';
// import { CategoryNewPage } from './category-new-page/category-new-page';
// import { CategoryDetailPage } from './category-detail-page/category-detail-page';
// import { FavoritesPage } from './favorites-page/favorites-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'contacts', component: ContactsPage },
  { path: 'contacts/new', component: ContactNewPage },
  { path: 'contacts/:id', component: ContactDetailPage },
  // { path: 'categories', component: CategoriesPage },
  // { path: 'categories/new', component: CategoryNewPage },
  // { path: 'categories/:id', component: CategoryDetailPage }, 

  // { path: 'favorites', component: FavoritesPage }, 
];