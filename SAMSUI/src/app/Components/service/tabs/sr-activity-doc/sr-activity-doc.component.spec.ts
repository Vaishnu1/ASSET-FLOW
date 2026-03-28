import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrActivityDocComponent } from './sr-activity-doc.component';

describe('SrActivityDocComponent', () => {
  let component: SrActivityDocComponent;
  let fixture: ComponentFixture<SrActivityDocComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrActivityDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrActivityDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
