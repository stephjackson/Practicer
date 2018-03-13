import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-edit-item-form',
  templateUrl: './edit-item-form.component.html',
  styleUrls: ['./edit-item-form.component.css']
})

export class EditItemFormComponent implements OnInit {
  newItem: any;
  @Input() itemId: any;

  constructor(private route: ActivatedRoute,
  private itemService: ItemService) { }

  ngOnInit() {
    this.newItem = {
      title: "",
      BPM: 0,
      time: 0
    }
  }

  editItem() {
    this.itemService.editItem(this.itemId, this.newItem);
    this.newItem = {};
    location.reload();
  }
}