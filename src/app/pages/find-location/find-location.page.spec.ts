
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindLocationPage } from './find-location.page';

describe('FindLocationPage', () => {
  let component: FindLocationPage;
  let fixture: ComponentFixture<FindLocationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FindLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
