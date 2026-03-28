import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrDocumentComponent } from './sr-document.component';

describe('SrDocumentComponent', () => {
  let component: SrDocumentComponent;
  let fixture: ComponentFixture<SrDocumentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
