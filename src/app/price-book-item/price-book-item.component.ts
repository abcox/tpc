import { Component, OnInit } from '@angular/core';
import { Guid } from "guid-typescript";
import {
  TsiWebCreatePriceBookItemModel,
  TsiWebPriceBookItem,
  Configuration,
  PriceBookService,
  TsiWebPriceBookItemDetail,
  TsiWebSearchPriceBookResponse,
  TsiWebSearchCriteria,
  TsiWebAdvancedSearchRequest,
  TsiWebPriceBookItemSummary
} from '@vorba/tsi';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import {
  QuoteApiModule,
  TblPriceBookMainsService,
  TblPriceBookMain,
  Configuration as QuoteServiceConfig
} from '@vorba/pqi-typescript-angular';

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
    private priceBookService: PriceBookService,
    private quotingPriceBookService: TblPriceBookMainsService,
    private route: ActivatedRoute,
    ) {
    let config = new Configuration();
      config.apiKeys = {
        private: environment.apiKey_private,
        public: environment.apiKey_public,
      }
      config.basePath = "https://api2.tigerpawsoftware.com";
      priceBookService.configuration = config;

      
    let quoteConfig = new QuoteServiceConfig();
      config.apiKeys = {
        private: environment.apiKey_private,
        public: environment.apiKey_public,
      }
      config.basePath = "http://localhost:65049"; //todo: figure out how to get this effective at the service (right now is hard-coded)
      quotingPriceBookService.configuration = quoteConfig;
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

  /* get(id:string) {    
    this.priceBookService
      .priceBookGetPriceBookDetails(id)
      .subscribe((resp:TsiWebPriceBookItemDetail) => {
        console.log('priceBookItem: ', JSON.stringify(resp));
      });
  } */

  search(itemId:string) {   
    this.priceBookService
      .priceBookSearchByItemId(itemId, true)
      .subscribe((resp:TsiWebSearchPriceBookResponse) => {
        console.log('priceBookItem: ', JSON.stringify(resp));
      });
  }

  searchByItemId(itemId:string) {
    
    let criteria: string = "{['MatchType':'Contains','Criteria':'System']}";
    let pageSize: number = 10;
    let pageStart: number = 1;

    let request = <TsiWebAdvancedSearchRequest>{
      Criteria: [
        <TsiWebSearchCriteria>{
          SearchType: "ItemId",
          MatchType: "Contains",
          Criteria: itemId,
        }
      ]
    }

    this.priceBookService
      .priceBookAdvancedSearch(
        request,
        /* pageSize,
        pageStart, */
      )
      .subscribe((resp: TsiWebSearchPriceBookResponse) => {
        //console.log('resp: ', JSON.stringify(resp));
        this.priceBookItemSummary = resp.PriceBookItems[0];
        console.log('resp: ', JSON.stringify(this.priceBookItemSummary));
        this.priceBookItem = this.priceBookItemSummary.Item;
      });
  }

  create() {
    let createPriceBookItemModel = <TsiWebCreatePriceBookItemModel>{
      ItemId: Guid.create().toString(),
      Item: this.priceBookItem,
    };
    //console.log("item: ", JSON.stringify(this.priceBookItem));
    this.priceBookService
      .priceBookCreatePriceBookItem(
        createPriceBookItemModel,
      )
      .subscribe(resp => {
        console.log('resp: ', JSON.stringify(resp));

        // todo.. add param itemNumber to price-book
        // todo.. on success route to price-book with new itemNumber

        this.createInQuoting(resp.Summary);

      });
  }

  createInQuoting(newItemSummary: TsiWebPriceBookItemSummary) {
    this.quotingPriceBookService.apiTblPriceBookMainsPost(<TblPriceBookMain>{
      altPartNumber: newItemSummary.ItemId,
      description: newItemSummary.Item.ItemDescription,
    }).subscribe(resp => {
      console.log('apiTblPriceBookMainsPost response: ', JSON.stringify(resp));
    });
  }

  update() {
    
  }
}
