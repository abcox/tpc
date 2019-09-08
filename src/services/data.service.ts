import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, delay, tap } from 'rxjs/operators';
import { Guid } from "guid-typescript";
import { environment } from 'src/environments/environment';
import {
  Configuration,
  PriceBookService,
  TsiWebPriceBookItemSummary,
  TsiWebAdvancedSearchRequest,
  TsiWebSearchCriteria,
  TsiWebPriceBookItemResponse,
  TsiWebSearchPriceBookResponse,
  TsiWebCreatePriceBookItemModel,
  TsiWebPriceBookItem,
  TsiWebUpdatePriceBookItemModel
} from '@vorba/tsi';
import {
  TblPriceBookMainsService,
  TblPriceBookMain,
  Configuration as QuoteServiceConfig
} from '@vorba/pqi-typescript-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private priceBookService: PriceBookService,
    private quotingPriceBookService: TblPriceBookMainsService,
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
  
  priceBookGetItemById(
    id:string
    ) {
    
    /* let criteria: string = "{['MatchType':'Contains','Criteria':'System']}";
    let pageSize: number = 10;
    let pageStart: number = 1; */

    return this.priceBookAdvancedSearch(
      <TsiWebAdvancedSearchRequest>{
        Criteria: [
          <TsiWebSearchCriteria>{
            SearchType: "ItemId",
            MatchType: "Contains",
            Criteria: id,
          }
        ]
      }
    ).pipe(map(resp => resp.PriceBookItems[0]));
  }

  priceBookGetItemsByDescription(
    description:string
    ): Observable<TsiWebPriceBookItemSummary[]> {
    return this.priceBookAdvancedSearch(
      <TsiWebAdvancedSearchRequest> {
        Criteria: [
          <TsiWebSearchCriteria>{
            SearchType: "ItemDescription",
            MatchType: "Contains",
            Criteria: description,
          }
        ]
      }
    ).pipe(map(resp => resp.PriceBookItems));
  }
  
  priceBookAdvancedSearch(
    request:TsiWebAdvancedSearchRequest
    ): Observable<TsiWebSearchPriceBookResponse> {

    return this.priceBookService
      //.priceBookSearchByItemDescription(
      .priceBookAdvancedSearch(
        request,
        /* pageSize,
        pageStart, */
      );
      /* .subscribe((resp: TsiWebSearchPriceBookResponse) => {
        console.log('resp: ', JSON.stringify(resp));
        this.tableDataSource = new MatTableDataSource<TsiWebPriceBookItemSummary>(resp.PriceBookItems);
      }); */
  }

  priceBookCreatePriceBookItem(
    summary:TsiWebPriceBookItemSummary
    ): Observable<TsiWebPriceBookItemSummary> {
    let createPriceBookItemModel = <TsiWebCreatePriceBookItemModel>{
      ItemId: Guid.create().toString(),
      Item: summary.Item,
    };
    //console.log("item: ", JSON.stringify(this.priceBookItem));
    return this.priceBookService
      .priceBookCreatePriceBookItem(
        createPriceBookItemModel,
      ).pipe(
        tap(resp => { this.quotePriceBookCreate(resp.Summary); }),
        map(resp => resp.Summary),
        );
  }
  
  quotePriceBookCreate(itemSummary: TsiWebPriceBookItemSummary) {
    this.quotingPriceBookService.apiTblPriceBookMainsPost(<TblPriceBookMain>{
      altPartNumber: itemSummary.ItemId,
      description: itemSummary.Item.ItemDescription,
    }).subscribe(resp => {
      console.log('apiTblPriceBookMainsPost response: ', JSON.stringify(resp));
    });
  }

  priceBookUpdatePriceBookItem(
    summary: TsiWebPriceBookItemSummary,
    recalcalculateClosedAssemblyCost:boolean = false
    ): Observable<TsiWebPriceBookItemSummary> {
    let model = <TsiWebUpdatePriceBookItemModel>{
      ItemId: summary.ItemId,
      Item: summary.Item,
    };
    //console.log("item: ", JSON.stringify(this.priceBookItem));
    return this.priceBookService
      .priceBookUpdatePriceBookItem(
        summary.PriceBookItemNumber,
        model,
        recalcalculateClosedAssemblyCost
      ).pipe(map(resp => resp.Summary));
  }


}
