import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrPoViewInfoComponent } from './pr-po-view-info.component';

describe('PrPoViewInfoComponent', () => {
  let component: PrPoViewInfoComponent;
  let fixture: ComponentFixture<PrPoViewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrPoViewInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrPoViewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
