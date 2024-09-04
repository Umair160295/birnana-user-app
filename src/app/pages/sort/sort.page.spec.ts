
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortPage } from './sort.page';

describe('SortPage', () => {
  let component: SortPage;
  let fixture: ComponentFixture<SortPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SortPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
