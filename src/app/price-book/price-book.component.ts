import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-price-book',
  templateUrl: './price-book.component.html',
  styleUrls: ['./price-book.component.scss']
})
export class PriceBookComponent implements OnInit {

  tableDataSource = new MatTableDataSource<any>();
  tableColumnsDisplayed: string[] = [
    //'number',
    'description','type','status','category','manufacturerListPrice',
    'edit','delete',
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
      //.subscribe((items: TsiWebPriceBookItemSummary[]) => {
      .subscribe((items) => {
        //console.log('items: ', JSON.stringify(items));
        this.tableDataSource = new MatTableDataSource(items);
      });
  }

}
