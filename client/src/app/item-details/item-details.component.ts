import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ItemService } from '../item.service'

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: any;

  constructor(private route: ActivatedRoute, private itemService: ItemService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getItemDetails(params['id'])
    })
  }

  getItemDetails(id) {
    this.itemService.getItemDetails(id)
      .subscribe((item) => {
        this.item = item;
      });
  }        
}
