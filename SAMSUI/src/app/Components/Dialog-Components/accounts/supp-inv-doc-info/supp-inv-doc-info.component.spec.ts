import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppInvDocInfoComponent } from './supp-inv-doc-info.component';

describe('SuppInvDocInfoComponent', () => {
  let component: SuppInvDocInfoComponent;
  let fixture: ComponentFixture<SuppInvDocInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppInvDocInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppInvDocInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
