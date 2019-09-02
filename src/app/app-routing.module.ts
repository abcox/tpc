import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceBookComponent } from './price-book/price-book.component';
import { PriceBookItemComponent } from './price-book-item/price-book-item.component';
import { ServiceOrderComponent } from './service-order/service-order.component';

const routes: Routes = [
  { path: 'price-book', component: PriceBookComponent },
  { path: 'price-book-item', component: PriceBookItemComponent },
  { path: 'service-orders', component: ServiceOrderComponent },
  { path: '',   redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
