import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../modules/material-module';

import { ApiModule, Configuration } from '@vorba/tsi';
import { FormsModule } from '@angular/forms';
import { PriceBookComponent } from './price-book/price-book.component';
import { PriceBookItemComponent } from './price-book-item/price-book-item.component';

@NgModule({
  declarations: [
    AppComponent,
    PriceBookComponent,
    PriceBookItemComponent
  ],
  imports: [
    ApiModule,
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
