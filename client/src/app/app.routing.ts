import { Routes } from '@angular/router';

import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemListComponent } from './item-list/item-list.component';
import { HomeComponent } from './home/home.component';
import { YourListsComponent } from './your-lists/your-lists.component';
import { ListDetailsComponent } from './list-details/list-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'items', component: ItemListComponent },
    { path: 'items/:id', component: ItemDetailsComponent },
    { path: 'lists', component: YourListsComponent },
    { path: 'lists/:id', component: ListDetailsComponent },
    { path: '**', redirectTo: 'home' }
];