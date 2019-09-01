import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceBookItemComponent } from './price-book-item.component';

describe('PriceBookItemComponent', () => {
  let component: PriceBookItemComponent;
  let fixture: ComponentFixture<PriceBookItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceBookItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceBookItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
