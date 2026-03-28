import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoItemAddComponent } from './po-item-add.component';

describe('PoItemAddComponent', () => {
  let component: PoItemAddComponent;
  let fixture: ComponentFixture<PoItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoItemAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
