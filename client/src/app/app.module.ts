import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { routes } from './app.routing'
import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemService } from './item.service';
import { ItemFormComponent } from './item-form/item-form.component';
import { AddItemToListFormComponent } from './add-item-to-list-form/add-item-to-list-form.component';
import { EditItemFormComponent } from './edit-item-form/edit-item-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemDetailsComponent,
    ItemFormComponent,
    AddItemToListFormComponent,
    EditItemFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ ItemService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
