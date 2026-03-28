import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatutoryRequirementCreateComponent } from './statutory-requirement-create.component';

describe('StatutoryRequirementCreateComponent', () => {
  let component: StatutoryRequirementCreateComponent;
  let fixture: ComponentFixture<StatutoryRequirementCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatutoryRequirementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutoryRequirementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
