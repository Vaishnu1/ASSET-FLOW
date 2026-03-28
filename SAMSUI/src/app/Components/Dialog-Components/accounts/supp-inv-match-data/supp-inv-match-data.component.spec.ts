import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppInvMatchDataComponent } from './supp-inv-match-data.component';

describe('SuppInvMatchDataComponent', () => {
  let component: SuppInvMatchDataComponent;
  let fixture: ComponentFixture<SuppInvMatchDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppInvMatchDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppInvMatchDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
