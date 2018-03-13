import { Routes } from '@angular/router';

import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemListComponent } from './item-list/item-list.component';

export const routes: Routes = [
    { path: 'items', component: ItemListComponent },
    { path: 'items/:id', component: ItemDetailsComponent },
    { path: '**', redirectTo: 'items' }
];