import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  newItem: any;


  constructor(private route: ActivatedRoute,
  private itemService: ItemService) { }

  ngOnInit() {
    this.newItem = {
      title: "",
      BPM: 0,
      time: 0
    }
  }

  insertItem() {
    this.itemService.insertItem(this.newItem);
    this.newItem = {};
  }
}
