import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrViewWorkLogComponent } from './sr-view-work-log.component';

describe('SrViewWorkLogComponent', () => {
  let component: SrViewWorkLogComponent;
  let fixture: ComponentFixture<SrViewWorkLogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrViewWorkLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrViewWorkLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
