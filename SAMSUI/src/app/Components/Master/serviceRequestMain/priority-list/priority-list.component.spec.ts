import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PriorityListComponent } from './priority-list.component';

describe('PriorityListComponent', () => {
  let component: PriorityListComponent;
  let fixture: ComponentFixture<PriorityListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
