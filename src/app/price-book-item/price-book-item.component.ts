import { Component, OnInit } from '@angular/core';
import {
  TsiWebPriceBookItem,
  TsiWebSearchPriceBookResponse,
  TsiWebPriceBookItemSummary
} from '@vorba/tsi';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-price-book-item',
  templateUrl: './price-book-item.component.html',
  styleUrls: ['./price-book-item.component.scss']
})
export class PriceBookItemComponent implements OnInit {

  types = [
    {id:"Labour",name:"Labour"},
    {id:"Material",name:"Material"},
    {id:"Special",name:"Special"},
  ]

  statuses = [
    {id:"Active",name:"Active"},
    {id:"Inactive",name:"Inactive"},
    {id:"Recalled",name:"Recalled"},
  ]

  priceBookItem = <TsiWebPriceBookItem>{};
  priceBookItemSummary = <TsiWebPriceBookItemSummary>{};

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    ) {
    }

  itemId = '';

  isCreate() {
    return this.itemId === '';
  }

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    console.log('ItemId: ', this.priceBookItemSummary.ItemId);
    if (this.itemId !== '') {
      this.priceBookItemSummary.ItemId = this.itemId;
      this.searchByItemId(this.priceBookItemSummary.ItemId);
    }
  }

  searchByItemId(id:string) {
    
    let criteria: string = "{['MatchType':'Contains','Criteria':'System']}";
    let pageSize: number = 10;
    let pageStart: number = 1;

    this.dataService.priceBookSearchByItemId(id)
      .subscribe((resp: TsiWebSearchPriceBookResponse) => {
        //console.log('resp: ', JSON.stringify(resp));
        this.priceBookItemSummary = resp.PriceBookItems[0];
        console.log('resp: ', JSON.stringify(this.priceBookItemSummary));
        this.priceBookItem = this.priceBookItemSummary.Item;
      });
  }

  create() {
    this.dataService
      .priceBookCreatePriceBookItem(
        this.priceBookItem
      )
      .subscribe(resp => {
        console.log('resp: ', JSON.stringify(resp));
      });
  }

  update() {

    // todo..    
  }
}
