import { Routes } from '@angular/router';

import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemListComponent } from './item-list/item-list.component';

export const routes: Routes = [
    { path: '', component: ItemListComponent },
    { path: 'item/:id', component: ItemDetailsComponent },
    { path: '**', redirectTo: '' }
];