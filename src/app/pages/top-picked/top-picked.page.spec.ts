
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopPickedPage } from './top-picked.page';

describe('TopPickedPage', () => {
  let component: TopPickedPage;
  let fixture: ComponentFixture<TopPickedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TopPickedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
