import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrViewInfoComponent } from './pr-view-info.component';

describe('PrViewInfoComponent', () => {
  let component: PrViewInfoComponent;
  let fixture: ComponentFixture<PrViewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrViewInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrViewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
