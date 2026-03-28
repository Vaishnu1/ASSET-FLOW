import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrAssignEngineerComponent } from './sr-assign-engineer.component';

describe('SrAssignEngineerComponent', () => {
  let component: SrAssignEngineerComponent;
  let fixture: ComponentFixture<SrAssignEngineerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrAssignEngineerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrAssignEngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
