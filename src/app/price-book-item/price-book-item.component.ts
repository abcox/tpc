import { Component, OnInit } from '@angular/core';
import {
  TsiWebPriceBookItem,
  TsiWebPriceBookItemSummary,
} from '@vorba/tsi';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { DomainValuesComponent } from '../domain-values.omponent';


const emptyPriceBookItem = (): TsiWebPriceBookItem => ({
  Comments: '',
  ItemDescription: '',
  Status: '',
});

const createNewPriceBookItem = <T extends Partial<TsiWebPriceBookItem>>(initialValues: T): TsiWebPriceBookItem & T => {
  return Object.assign(emptyPriceBookItem(), initialValues);
};

@Component({
  selector: 'app-price-book-item',
  templateUrl: './price-book-item.component.html',
  styleUrls: ['./price-book-item.component.scss']
})
export class PriceBookItemComponent implements OnInit {

  types = [
    { id:"Labour",name:"Labour" },
    { id:"Material",name:"Material" },
    { id:"Special",name:"Special" },
  ];

  statuses = [
    { id:"Active",name:"Active" },
    { id:"Inactive",name:"Inactive" },
    { id:"Recalled",name:"Recalled" },
  ];

  categories = this.domain.PriceBookItemCategory;

  //priceBookItem = <TsiWebPriceBookItem>{};
  priceBookItemSummary = <TsiWebPriceBookItemSummary>{ Item: createNewPriceBookItem({}) };

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private domain: DomainValuesComponent
    ) {
      // override the route reuse strategy
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
          return false;
      };
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

    this.dataService.priceBookGetItemById(id)
      .subscribe(itemSummary => {
        //console.log('item: ', JSON.stringify(itemSummary));
        this.priceBookItemSummary = itemSummary;
      });
  }

  create() {
    this.dataService
      .priceBookCreatePriceBookItem(
        this.priceBookItemSummary
      )
      .subscribe(createdItemSummary => {
        //console.log('resp: ', JSON.stringify(createdItemSummary));
        this.router.navigate(['/price-book-item', createdItemSummary.ItemId]);
      });
  }

  update() {
    console.log('priceBookItemSummary: ', JSON.stringify(this.priceBookItemSummary));
    this.dataService
      .priceBookUpdatePriceBookItem(
        this.priceBookItemSummary
      )
      .subscribe(updatedItemSummary => {
        console.log('updatedItemSummary: ', JSON.stringify(updatedItemSummary));
        this.priceBookItemSummary = updatedItemSummary;
      }); 
  }
}
