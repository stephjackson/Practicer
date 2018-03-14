import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) {}
  
  getItemList(id) {
    return this.http.get(`${this.BASE_URL}/api/lists/${id}`)
      .map((res) => res.json());
  }

  getItemDetails(id) {
    return this.http.get(`${this.BASE_URL}/api/items/${id}`)
    .map((res) => res.json());
  }

  getListsExcludingItem(id) {
    return this.http.get(`${this.BASE_URL}/api/lists/excludes/${id}`)
    .map((res) => res.json());
  }

  insertItem(item) {
    this.http.post(`${this.BASE_URL}/api/items/new`, item)
      .subscribe(err => console.log(err))
  }

  getAllItems() {
    return this.http.get(`${this.BASE_URL}/api/items/`)
    .map((res) => res.json());
  }

  addItemToList(listid, itemid) {
    this.http.put(`${this.BASE_URL}/api/items/add/${listid}/${itemid}`, {})
    .subscribe(err => console.log(err))
  }

  removeItemFromList(listid, itemid) {
    this.http.put(`${this.BASE_URL}/api/items/remove/${listid}/${itemid}`, {})
    .subscribe(err => console.log(err))
  }
  
  editItem(id, item) {
    return this.http.put(`${this.BASE_URL}/api/items/${id}`, item)
    .subscribe(err => console.log(err))
  }
  
  deleteItem(id) {
    return this.http.delete(`${this.BASE_URL}/api/items/${id}`)
    .subscribe(err => console.log(err))
  }
}
