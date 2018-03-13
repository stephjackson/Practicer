import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-add-item-to-list-form',
  templateUrl: './add-item-to-list-form.component.html',
  styleUrls: ['./add-item-to-list-form.component.css']
})
export class AddItemToListFormComponent implements OnInit {
  lists: any;
  listItem: any;
  @Input() itemId: any;

  constructor(private route: ActivatedRoute,
  private itemService: ItemService,
  private router: Router) { }

  ngOnInit() {
    this.itemService.getList()
    .subscribe((lists) => {
      this.lists = lists;
    })
  }

  regetList() {
    this.itemService.getList()
    .subscribe((lists) => {
      this.lists = lists;
    })
  }

  addItemToList(listid, itemid) {
    this.itemService.addItemToList(listid, itemid)
    this.regetList();
    location.reload();
  }
}
