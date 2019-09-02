import { Component, ApplicationInitStatus, OnInit } from '@angular/core';
import {
  ServiceOrdersService,
  ApiModule,
  Configuration,
  BASE_PATH,
  ConfigurationParameters,
  TsiWebCreateServiceOrderPartsUsedModel,
  TsiWebServiceOrderPartUsed,
  TsiWebServiceOrderPartUsedResponse,
  TsiWebServiceOrder
} from '@vorba/tsi';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material';

const env = environment;

@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.scss']
})
export class ServiceOrderComponent implements OnInit {
  
  title = 'tpc';

  searchTypes: SearchType[] = [
    { label: 'Account Number', value: 'account-number' },
  ]
  selectedSearchType = this.searchTypes[0];

  matchTypes: MatchType[] = [
    { label: 'Contains', value: 'contains' },
  ]
  selectedMatchType = this.matchTypes[0];

  tableDataSource = new MatTableDataSource<TsiWebServiceOrderPartUsed>();
  tableColumnsDisplayed: string[] = ['number','description'];

  constructor(
    private serviceOrdersService: ServiceOrdersService,
    //private apiConfig: Configuration,
  ) {
    //apiConfig.apiKeys = {"private": ""};
    //let params: ConfigurationParameters = new Configuration({ apiKeys: {}, basePath: "");
    let config = new Configuration();
    config.apiKeys = {
      private: env.apiKey_private,
      public: env.apiKey_public,
    };
    //config.withCredentials = false;

    console.log('private: ', config.apiKeys["private"]);
    console.log('public: ', config.apiKeys["public"]);

    config.basePath = "https://api2.tigerpawsoftware.com";
    serviceOrdersService.configuration = config;
  }
  
  ngOnInit() {
  }

  compareItems(i1, i2) {
    return i1 && i2 && i1.id===i2.id;
  }

  serviceOrder = <TsiWebServiceOrder>{ OriginalServiceOrderNumber: 80280 };

  serviceOrdersCreateServiceOrderPartsUsed() {
    console.log('getServiceOrders called');
    console.log('config: ', JSON.stringify(this.serviceOrdersService.configuration));

    let serviceOrderNumber = this.serviceOrder.OriginalServiceOrderNumber; // todo.. ask where serviceOrderNumber is?
    let description = "Cat 6 RJ45 test2";
    let model: TsiWebCreateServiceOrderPartsUsedModel = {
      LineNumber: 1, // Note: existing line item will be pushed down
      //itemId: "Cat 6 RJ45 insert",
      PriceBookItemNumber: 97, // look up via PriceBookSearchByItemTypeTest
      ItemDescription: description,
      UseBookPricesAndDiscounts: true,
      Quantity: 9,
    };

    this.serviceOrdersService
      //.serviceOrdersGetServiceOrderDetail(10)
      .serviceOrdersCreateServiceOrderPartsUsed(
        serviceOrderNumber,
        model,
      )
      .subscribe(resp => {
        console.log('resp: ', JSON.stringify(resp));
        console.log('partsUsed: ', JSON.stringify(resp.PartsUsed[0]));
        let data = [{ itemDescription: "fun" }, { itemDescription: "stuff" }];
        this.tableDataSource = new MatTableDataSource<any>(resp.PartsUsed);/* resp.partsUsed */
      });
  }

  getServiceOrders() {
    console.log('getServiceOrders called');
    console.log('config: ', JSON.stringify(this.serviceOrdersService.configuration));

    let serviceOrderNumber = 80280;
    let description = "Cat 6 RJ45 test2";
    let model: TsiWebCreateServiceOrderPartsUsedModel = {
      LineNumber: 1, // Note: existing line item will be pushed down
      //itemId: "Cat 6 RJ45 insert",
      PriceBookItemNumber: 97, // look up via PriceBookSearchByItemTypeTest
      ItemDescription: description,
      UseBookPricesAndDiscounts: true,
      Quantity: 9,
    };

    this.serviceOrdersService
      //.serviceOrdersGetServiceOrderDetail(10)
      .serviceOrdersCreateServiceOrderPartsUsed(
        serviceOrderNumber,
        model,
      )
      .subscribe(resp => {
        console.log('resp: ', JSON.stringify(resp));
        console.log('partsUsed: ', JSON.stringify(resp.PartsUsed[0]));
        let data = [{ itemDescription: "fun" }, { itemDescription: "stuff" }];
        this.tableDataSource = new MatTableDataSource<any>(resp.PartsUsed);/* resp.partsUsed */
      });
  }

  searchServiceOrders() {

  }


}

export interface MatchType {
  label: string;
  value: string;
}

export interface SearchType {
  label: string;
  value: string;
}
