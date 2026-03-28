import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrNewItemAddComponent } from './pr-new-item-add.component';

describe('PrNewItemAddComponent', () => {
  let component: PrNewItemAddComponent;
  let fixture: ComponentFixture<PrNewItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrNewItemAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrNewItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
