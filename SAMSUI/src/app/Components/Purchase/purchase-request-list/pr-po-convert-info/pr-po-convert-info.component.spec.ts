import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrPoConvertInfoComponent } from './pr-po-convert-info.component';

describe('PrPoConvertInfoComponent', () => {
  let component: PrPoConvertInfoComponent;
  let fixture: ComponentFixture<PrPoConvertInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrPoConvertInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrPoConvertInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
