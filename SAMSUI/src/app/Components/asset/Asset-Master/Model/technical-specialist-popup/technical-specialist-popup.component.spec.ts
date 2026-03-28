import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TechnicalSpecialistPopupComponent } from './technical-specialist-popup.component';

describe('TechnicalSpecialistPopupComponent', () => {
  let component: TechnicalSpecialistPopupComponent;
  let fixture: ComponentFixture<TechnicalSpecialistPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalSpecialistPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalSpecialistPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
