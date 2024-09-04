
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderRatingPage } from './order-rating.page';

describe('OrderRatingPage', () => {
  let component: OrderRatingPage;
  let fixture: ComponentFixture<OrderRatingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrderRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
