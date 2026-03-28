import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrAddLabourComponent } from './sr-add-labour.component';

describe('SrAddLabourComponent', () => {
  let component: SrAddLabourComponent;
  let fixture: ComponentFixture<SrAddLabourComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrAddLabourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrAddLabourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
