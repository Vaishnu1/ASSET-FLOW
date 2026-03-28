import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrSubStatusInfoComponent } from './sr-sub-status-info.component';

describe('SrSubStatusInfoComponent', () => {
  let component: SrSubStatusInfoComponent;
  let fixture: ComponentFixture<SrSubStatusInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrSubStatusInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrSubStatusInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
