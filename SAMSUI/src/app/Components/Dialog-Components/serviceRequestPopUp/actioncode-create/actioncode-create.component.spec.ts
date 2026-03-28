import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActioncodeCreateComponent } from './actioncode-create.component';

describe('ActioncodeCreateComponent', () => {
  let component: ActioncodeCreateComponent;
  let fixture: ComponentFixture<ActioncodeCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActioncodeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActioncodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
