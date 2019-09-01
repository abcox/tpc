import { Component, OnInit } from '@angular/core';
import { Guid } from "guid-typescript";
import { TsiWebCreatePriceBookItemModel, TsiWebPriceBookItem, Configuration, PriceBookService } from '@vorba/tsi';
import { environment } from 'src/environments/environment';

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

  constructor(
    private priceBookService: PriceBookService,
    ) {
    let config = new Configuration();
      config.apiKeys = {
        private: environment.apiKey_private,
        public: environment.apiKey_public,
      }
      config.basePath = "https://api2.tigerpawsoftware.com";
      priceBookService.configuration = config;
    }

  ngOnInit() {
  }

  submit() {
    
    let createPriceBookItemModel = <TsiWebCreatePriceBookItemModel>{
      ItemId: Guid.create().toString(),
      Item: this.priceBookItem,
    };

    console.log("item: ", JSON.stringify(this.priceBookItem));

    this.priceBookService
      .priceBookCreatePriceBookItem(
        createPriceBookItemModel,
      )
      .subscribe(resp => {
        console.log('resp: ', JSON.stringify(resp));

        // todo.. add param itemNumber to price-book
        // todo.. on success route to price-book with new itemNumber

      });
  }
}
