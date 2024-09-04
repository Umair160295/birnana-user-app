
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverRatingPage } from './driver-rating.page';

describe('DriverRatingPage', () => {
  let component: DriverRatingPage;
  let fixture: ComponentFixture<DriverRatingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DriverRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
