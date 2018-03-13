import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) {}

  getList() {
    return this.http.get(`${this.BASE_URL}/api/lists`)
      .map((res) => res.json());
  }
  
  getItemList(id) {
    return this.http.get(`${this.BASE_URL}/api/lists/${id}`)
      .map((res) => res.json());
  }

  getItemDetails(id) {
    return this.http.get(`${this.BASE_URL}/api/items/${id}`)
    .map((res) => res.json());
  }

  insertItem(item) {
    this.http.post(`${this.BASE_URL}/api/items/new`, item)
      .subscribe(err => console.log(err))
  }
  
  edit(phone) {
    return this.http.put(`${this.BASE_URL}/api/phones/${phone.id}`, phone)
      .map((res) => res.json());
  }
  
  remove(id) {
    return this.http.delete(`${this.BASE_URL}/api/phones/${id}`)
      .map((res) => res.json());
  }
}
