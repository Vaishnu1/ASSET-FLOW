import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppInvAddInfoComponent } from './supp-inv-add-info.component';

describe('SuppInvAddInfoComponent', () => {
  let component: SuppInvAddInfoComponent;
  let fixture: ComponentFixture<SuppInvAddInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppInvAddInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppInvAddInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
