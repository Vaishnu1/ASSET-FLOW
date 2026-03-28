import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActioncodeListComponent } from './actioncode-list.component';

describe('ActioncodeListComponent', () => {
  let component: ActioncodeListComponent;
  let fixture: ComponentFixture<ActioncodeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActioncodeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActioncodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
