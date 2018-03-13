import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    //FIX THIS
    this.itemService.getAllItems()
    .subscribe((items) => {
      this.items = items;
    })
  }

  deleteItem(id) {
    console.log(id);
    this.itemService.deleteItem(id);
    location.reload();
  }
}
