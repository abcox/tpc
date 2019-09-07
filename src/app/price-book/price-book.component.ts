import { Component, OnInit } from '@angular/core';
import {
  TsiWebPriceBookItemSummary,
} from '@vorba/tsi';
import { MatTableDataSource } from '@angular/material';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-price-book',
  templateUrl: './price-book.component.html',
  styleUrls: ['./price-book.component.scss']
})
export class PriceBookComponent implements OnInit {

  tableDataSource = new MatTableDataSource<TsiWebPriceBookItemSummary>();
  tableColumnsDisplayed: string[] = [
    'number','description','type','status','manufacturerListPrice',
    'action',
  ];

  priceBook = { itemDescription: "" };

  constructor(
    private dataService: DataService,
    ) {
    }

  ngOnInit() {
  }

  searchByItemDescription() {
    
    let criteria: string = "{['MatchType':'Contains','Criteria':'System']}";
    let pageSize: number = 10;
    let pageStart: number = 1;

    this.dataService
      //.priceBookSearchByItemDescription(
      .priceBookGetItemsByDescription(
        this.priceBook.itemDescription,
        /* pageSize,
        pageStart, */
      )
      .subscribe((items: TsiWebPriceBookItemSummary[]) => {
        console.log('resp: ', JSON.stringify(items));
        //console.log('partsUsed: ', JSON.stringify(resp.PartsUsed[0]));
        //let data = [{ itemDescription: "fun" }, { itemDescription: "stuff" }];
        this.tableDataSource = new MatTableDataSource<TsiWebPriceBookItemSummary>(items);
      });
  }

}
