
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllOffersPage } from './all-offers.page';

describe('AllOffersPage', () => {
  let component: AllOffersPage;
  let fixture: ComponentFixture<AllOffersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllOffersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
