import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ListService } from '../list.service'

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {
  lists: any;
  id: any;

  constructor(private route: ActivatedRoute, private listService: ListService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getListDetails(params['id'])
    })
  }

  getListDetails(id) {
    this.listService.getItemsInList(id)
      .subscribe((list) => {
        this.lists = list;
        this.id = id;
      });
  }   
}
