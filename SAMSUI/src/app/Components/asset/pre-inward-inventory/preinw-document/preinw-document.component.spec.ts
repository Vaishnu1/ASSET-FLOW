import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PreinwDocumentComponent } from './preinw-document.component';

describe('PreinwDocumentComponent', () => {
  let component: PreinwDocumentComponent;
  let fixture: ComponentFixture<PreinwDocumentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreinwDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreinwDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
