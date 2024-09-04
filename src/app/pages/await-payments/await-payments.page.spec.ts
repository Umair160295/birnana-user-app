
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AwaitPaymentsPage } from './await-payments.page';

describe('AwaitPaymentsPage', () => {
  let component: AwaitPaymentsPage;
  let fixture: ComponentFixture<AwaitPaymentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AwaitPaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
