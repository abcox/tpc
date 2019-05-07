import { Component } from '@angular/core';
import { APIS } from '@vorba/tsi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'tpc';

  searchTypes: SearchType[] = [
    { label: 'Account Number', value: 'account-number' },
  ]
  selectedSearchType = this.searchTypes[0];

  matchTypes: MatchType[] = [
    { label: 'Contains', value: 'contains' },
  ]
  selectedMatchType = this.matchTypes[0];

  compareItems(i1, i2) {
    return i1 && i2 && i1.id===i2.id;
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