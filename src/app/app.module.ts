import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../modules/material-module';

import { ApiModule as ErpApiModule } from '@vorba/tsi';
import { ApiModule as QuoteApiModule } from '@vorba/pqi-typescript-angular';
import { FormsModule } from '@angular/forms';
import { PriceBookComponent } from './price-book/price-book.component';
import { PriceBookItemComponent } from './price-book-item/price-book-item.component';
import { ServiceOrderComponent } from './service-order/service-order.component';

@NgModule({
  declarations: [
    AppComponent,
    PriceBookComponent,
    PriceBookItemComponent,
    ServiceOrderComponent
  ],
  imports: [
    ErpApiModule,
    QuoteApiModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [
    //Configuration,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
