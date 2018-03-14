import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-create-list-form',
  templateUrl: './create-list-form.component.html',
  styleUrls: ['./create-list-form.component.css']
})
export class CreateListFormComponent implements OnInit {
  newList: any;

  constructor(
    private route: ActivatedRoute,
    private listService: ListService
  ) { }

  ngOnInit() {
    this.newList = {
      listTitle: ''
    }
  }

  createList() {
    this.listService.createList(this.newList);
    this.newList = {};
    location.reload();
  }
}
