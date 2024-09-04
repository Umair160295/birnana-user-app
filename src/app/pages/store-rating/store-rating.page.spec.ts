
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreRatingPage } from './store-rating.page';

describe('StoreRatingPage', () => {
  let component: StoreRatingPage;
  let fixture: ComponentFixture<StoreRatingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StoreRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
