import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceBookComponent } from './price-book/price-book.component';

const routes: Routes = [
  { path: 'price-book', component: PriceBookComponent },
  { path: '',   redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
