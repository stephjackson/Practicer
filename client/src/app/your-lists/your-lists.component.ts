import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service'

@Component({
  selector: 'app-your-lists',
  templateUrl: './your-lists.component.html',
  styleUrls: ['./your-lists.component.css']
})
export class YourListsComponent implements OnInit {
  lists;

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.getLists()
    .subscribe((lists) => {
      this.lists = lists;
    })
  }

}
