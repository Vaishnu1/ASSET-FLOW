import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatutoryRequirementListComponent } from './statutory-requirement-list.component';

describe('StatutoryRequirementListComponent', () => {
  let component: StatutoryRequirementListComponent;
  let fixture: ComponentFixture<StatutoryRequirementListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatutoryRequirementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutoryRequirementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
