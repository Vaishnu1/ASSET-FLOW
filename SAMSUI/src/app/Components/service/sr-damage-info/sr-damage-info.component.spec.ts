import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrDamageInfoComponent } from './sr-damage-info.component';

describe('SrDamageInfoComponent', () => {
  let component: SrDamageInfoComponent;
  let fixture: ComponentFixture<SrDamageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrDamageInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrDamageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
