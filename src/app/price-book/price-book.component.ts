import { Component, OnInit } from '@angular/core';
import { PriceBookService, TsiWebSearchPriceBookResponse, TsiWebPriceBookItemSummary, Configuration, TsiWebAdvancedSearchRequest, TsiWebSearchCriteria } from '@vorba/tsi';
import { MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-price-book',
  templateUrl: './price-book.component.html',
  styleUrls: ['./price-book.component.scss']
})
export class PriceBookComponent implements OnInit {

  tableDataSource = new MatTableDataSource<TsiWebPriceBookItemSummary>();
  tableColumnsDisplayed: string[] = ['number','description'];

  priceBook = { itemDescription: "" };

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

  searchByItemDescription() {
    
    let criteria: string = "{['MatchType':'Contains','Criteria':'System']}";
    let pageSize: number = 10;
    let pageStart: number = 1;

    let request = <TsiWebAdvancedSearchRequest>{
      Criteria: [
        <TsiWebSearchCriteria>{
          SearchType: "ItemDescription",
          MatchType: "Contains",
          Criteria: this.priceBook.itemDescription,
         /*  CategoryName: "",
          CustomFieldName: "", */
        }
      ]
    }

    this.priceBookService
      //.priceBookSearchByItemDescription(
      .priceBookAdvancedSearch(
        request,
        /* pageSize,
        pageStart, */
      )
      .subscribe(resp => {
        console.log('resp: ', JSON.stringify(resp));
        //console.log('partsUsed: ', JSON.stringify(resp.PartsUsed[0]));
        //let data = [{ itemDescription: "fun" }, { itemDescription: "stuff" }];
        this.tableDataSource = new MatTableDataSource<TsiWebPriceBookItemSummary>(resp.PriceBookItems);
      });
  }

}
