import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImportPopupComponent } from './import-popup.component';

describe('ImportPopupComponent', () => {
  let component: ImportPopupComponent;
  let fixture: ComponentFixture<ImportPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
