
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddresssPage } from './addresss.page';

describe('AddresssPage', () => {
  let component: AddresssPage;
  let fixture: ComponentFixture<AddresssPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddresssPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
