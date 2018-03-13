import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items;

  constructor(private item: ItemService) { }

  ngOnInit() {
    //FIX THIS
    this.item.get('5aa7d15b67f9e7e5241d4292')
    .subscribe((items) => {
      this.items = items;
    })
  }
}
