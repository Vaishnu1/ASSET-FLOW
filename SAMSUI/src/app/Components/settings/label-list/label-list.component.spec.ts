import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LabelListComponent } from './label-list.component';

describe('LabelListComponent', () => {
  let component: LabelListComponent;
  let fixture: ComponentFixture<LabelListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
