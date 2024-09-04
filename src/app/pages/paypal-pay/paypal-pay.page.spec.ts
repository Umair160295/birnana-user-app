
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaypalPayPage } from './paypal-pay.page';

describe('PaypalPayPage', () => {
  let component: PaypalPayPage;
  let fixture: ComponentFixture<PaypalPayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaypalPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
