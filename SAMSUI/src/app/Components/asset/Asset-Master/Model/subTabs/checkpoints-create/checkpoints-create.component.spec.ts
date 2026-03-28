import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckpointsCreateComponent } from './checkpoints-create.component';

describe('CheckpointsCreateComponent', () => {
  let component: CheckpointsCreateComponent;
  let fixture: ComponentFixture<CheckpointsCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckpointsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckpointsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
