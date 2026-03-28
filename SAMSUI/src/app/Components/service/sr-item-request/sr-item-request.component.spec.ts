import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrItemRequestComponent } from './sr-item-request.component';

describe('SrItemRequestComponent', () => {
  let component: SrItemRequestComponent;
  let fixture: ComponentFixture<SrItemRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrItemRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrItemRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
