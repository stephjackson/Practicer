import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class ListService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) { }

  getLists() {
    return this.http.get(`${this.BASE_URL}/api/lists`)
    .map((res) => res.json());
  }

  createList(list) {
    this.http.post(`${this.BASE_URL}/api/lists/new`, list)
    .subscribe(err => console.log(err))
  }

  getItemsInList(id) {
    return this.http.get(`${this.BASE_URL}/api/lists/${id}`)
    .map((res) => res.json())
  }

  deleteList(id) {
    this.http.delete(`${this.BASE_URL}/api/lists/${id}`)
    .subscribe(err => console.log(err))
  }
}
