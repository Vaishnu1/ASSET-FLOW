import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrItemAddComponent } from './pr-item-add.component';

describe('PrItemAddComponent', () => {
  let component: PrItemAddComponent;
  let fixture: ComponentFixture<PrItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrItemAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
